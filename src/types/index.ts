export interface Person {
  id: string;
  name: string;
  nickname?: string;
  birthdate?: string;
  photo?: string;
  location?: {
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreatePersonRequest {
  name: string;
  nickname?: string;
  birthdate?: string;
  photo?: string;
  location?: {
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

export interface Event {
  id: string;
  type: string;
  date: string;
  description: string;
  people: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventRequest {
  type: string;
  date: string;
  description: string;
  people: string[];
}

export interface Relationship {
  id: string;
  type: 'PARENT_OF' | 'CHILD_OF' | 'SPOUSE_OF' | 'CUSTOM';
  personA: string;
  personB: string;
  createdAt: string;
}

export interface CreateRelationshipRequest {
  personA: string;
  personB: string;
  type: 'PARENT_OF' | 'CHILD_OF' | 'SPOUSE_OF' | 'CUSTOM';
}

export interface RelationshipPath {
  path: RelationshipT[];
  description: string;
}

export interface RelationshipT {
  person: string;
  relationship: string;
}

export interface MapLocation {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address?: string;
}

export interface AIQuery {
  task: 'get_children' | 'get_parents' | 'get_relationship' | 'get_events' | 'get_locations' | 'custom';
  person?: string;
  personB?: string;
  parameters?: Record<string, any>;
}

export interface AIResponse {
  answer: string;
  data?: any;
  suggestions?: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

// UI Specific types
export interface TreePerson extends Person {
  x?: number;
  y?: number;
  children?: TreePerson[];
  parents?: TreePerson[];
  spouses?: TreePerson[];
  level?: number;
}

export interface TimelineEvent {
  id: string;
  type: string;
  date: string;
  description: string;
  people: Person[];
  color: string;
}

export interface ViewMode {
  type: 'tree' | 'timeline' | 'map' | 'chat';
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
  data?: any;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
