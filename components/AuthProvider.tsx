'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { UserRole } from '@/lib/types';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  currentUser: {
    name: string;
    email: string;
    role: UserRole;
  };
}

const RoleContext = createContext<RoleContextType>({
  role: 'participant',
  setRole: () => {},
  toggleRole: () => {},
  currentUser: {
    name: 'Ahmed Khan (Participant)',
    email: 'ahmed.k@ubit.uok.edu.pk',
    role: 'participant',
  },
});

export const useRole = () => useContext(RoleContext);

function RoleProviderInner({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [role, setRoleState] = useState<UserRole>('participant');

  useEffect(() => {
    if (session?.user && (session.user as any).role) {
      setRoleState((session.user as any).role);
    }
  }, [session]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const toggleRole = () => {
    setRoleState((prev) => (prev === 'participant' ? 'judge' : 'participant'));
  };

  const currentUser = {
    name:
      role === 'judge'
        ? 'Dr. Tariq Rahim (Head Judge - UBIT)'
        : (session?.user?.name || 'Ahmed Khan (Lead Participant)'),
    email:
      role === 'judge'
        ? 'judge.panel@ubit.uok.edu.pk'
        : (session?.user?.email || 'ahmed.k@ubit.uok.edu.pk'),
    role,
  };

  return (
    <RoleContext.Provider value={{ role, setRole, toggleRole, currentUser }}>
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
