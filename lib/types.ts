export type UserRole = 'participant' | 'judge';

export interface RoundInfo {
  id: string;
  number: number;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tagline: string;
  story: string;
  task: string;
  skills: string[];
  requiresCodeStorage: boolean;
  venueType: 'Online' | 'On-Campus';
  date: string;
  scaleStats: {
    customers: string;
    restaurants: string;
    riders?: string;
  };
  judgePdf?: {
    filename: string;
    uploadedAt: string;
    uploadedBy: string;
    url: string;
    size: string;
  };
}

export interface ParticipantSubmission {
  id: string;
  roundId: string;
  teamName: string;
  leadEmail: string;
  leadName: string;
  university: string;
  submittedAt: string;
  syncStatus: 'synced_to_sheets' | 'pending' | 'failed';
  webhookId?: string;

  // Round 1 specific fields
  sqlCode?: string;
  erdLink?: string;
  normalizationNotes?: string;

  // Round 2 specific fields
  updatedSchemaSql?: string;
  indexingStrategySql?: string;
  transactionsSql?: string;
  queryNotes?: string;

  // Round 3 specific fields
  presentationDeckUrl?: string;
  scalingArchitectureSummary?: string;
  concurrencyPlan?: string;
  presenterNames?: string;

  // General notes
  notes?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Submissions & Code' | 'Judging' | 'On-Campus';
}

export interface ScheduleDay {
  dayNumber: number;
  date: string;
  title: string;
  mode: 'Online' | 'On-Campus';
  venue: string;
  roundAssociated: string;
  highlights: string[];
  agenda: {
    time: string;
    activity: string;
  }[];
}
