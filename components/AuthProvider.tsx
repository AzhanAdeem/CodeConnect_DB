'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { UserRole } from '@/lib/types';

interface RoleContextType {
  role: UserRole;
  isJudgeLoggedIn: boolean;
  loginAsJudge: (password: string) => Promise<{ success: boolean; error?: string }>;
  logoutJudge: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  currentUser: {
    name: string;
    email: string;
    role: UserRole;
  };
}

const RoleContext = createContext<RoleContextType>({
  role: 'participant',
  isJudgeLoggedIn: false,
  loginAsJudge: async () => ({ success: false }),
  logoutJudge: () => {},
  isLoginModalOpen: false,
  setIsLoginModalOpen: () => {},
  currentUser: {
    name: 'Participant',
    email: 'participant@ubit.uok.edu.pk',
    role: 'participant',
  },
});

export const useRole = () => useContext(RoleContext);

function RoleProviderInner({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [role, setRoleState] = useState<UserRole>('participant');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Check saved judge session from sessionStorage on client load
  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem('cc26_judge_auth');
      if (savedAuth) {
        setRoleState('judge');
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const loginAsJudge = async (password: string) => {
    try {
      const res = await fetch('/api/judge/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRoleState('judge');
        try {
          sessionStorage.setItem('cc26_judge_auth', data.token || 'authenticated');
        } catch (e) {
          // ignore
        }
        setIsLoginModalOpen(false);
        return { success: true };
      }
      return { success: false, error: data.error || 'Invalid password' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login network error' };
    }
  };

  const logoutJudge = () => {
    setRoleState('participant');
    try {
      sessionStorage.removeItem('cc26_judge_auth');
    } catch (e) {
      // ignore
    }
  };

  const currentUser = {
    name:
      role === 'judge'
        ? 'Azha Nadeem (Jury / Organizer)'
        : (session?.user?.name || 'Participant'),
    email:
      role === 'judge'
        ? 'azhanadeem999@gmail.com'
        : (session?.user?.email || 'participant@ubit.uok.edu.pk'),
    role,
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        isJudgeLoggedIn: role === 'judge',
        loginAsJudge,
        logoutJudge,
        isLoginModalOpen,
        setIsLoginModalOpen,
        currentUser,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RoleProviderInner>{children}</RoleProviderInner>
    </SessionProvider>
  );
}
