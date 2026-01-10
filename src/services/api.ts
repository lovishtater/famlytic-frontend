import { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        message: 'API request failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Person endpoints
  async createPerson(personData: {
    name: string;
    firstName?: string;
    lastName?: string;
    nickname?: string;
    birthdate?: string;
    deathdate?: string;
    gender?: 'male' | 'female' | 'other';
    photo?: string;
    occupation?: string;
    description?: string;
    birthPlace?: string;
    deathPlace?: string;
    isAlive?: boolean;
  }): Promise<ApiResponse> {
    return this.request('/person', {
      method: 'POST',
      body: JSON.stringify(personData),
    });
  }

  async getPeople(): Promise<ApiResponse> {
    return this.request('/person');
  }

  async getPersonById(id: string): Promise<ApiResponse> {
    return this.request(`/person/${id}`);
  }

  async getPersonByName(name: string): Promise<ApiResponse> {
    return this.request(`/person?name=${encodeURIComponent(name)}`);
  }

  async getFamilyTree(personId: string, depth?: number): Promise<ApiResponse> {
    const query = depth ? `?depth=${depth}` : '';
    return this.request(`/person/${personId}/family-tree${query}`);
  }

  async updatePerson(id: string, updates: any): Promise<ApiResponse> {
    return this.request(`/person/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deletePerson(id: string): Promise<ApiResponse> {
    return this.request(`/person/${id}`, {
      method: 'DELETE',
    });
  }

  // Relationship endpoints
  async createRelationship(relationshipData: {
    personA: string;
    personB: string;
    type: 'PARENT_OF' | 'CHILD_OF' | 'SPOUSE_OF' | 'SIBLING_OF' | 'CUSTOM';
  }): Promise<ApiResponse> {
    return this.request('/relation', {
      method: 'POST',
      body: JSON.stringify(relationshipData),
    });
  }

  async getAllRelationships(personId?: string): Promise<ApiResponse> {
    const endpoint = personId 
      ? `/relation/all?person=${encodeURIComponent(personId)}`
      : '/relation/all';
    return this.request(endpoint);
  }

  async getChildren(personId: string): Promise<ApiResponse> {
    return this.request(`/relation/children/${encodeURIComponent(personId)}`);
  }

  async getParents(personId: string): Promise<ApiResponse> {
    return this.request(`/relation/parents/${encodeURIComponent(personId)}`);
  }

  async getSpouses(personId: string): Promise<ApiResponse> {
    return this.request(`/relation/spouses/${encodeURIComponent(personId)}`);
  }

  async getRelationshipPath(personAId: string, personBId: string): Promise<ApiResponse> {
    return this.request(`/relation/relation/${encodeURIComponent(personAId)}/${encodeURIComponent(personBId)}`);
  }

  // Event endpoints
  async createEvent(eventData: any): Promise<ApiResponse> {
    return this.request('/event', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async getEvents(personName?: string): Promise<ApiResponse> {
    const endpoint = personName 
      ? `/event/person/${encodeURIComponent(personName)}`
      : '/event';
    return this.request(endpoint);
  }

  async getEventsByType(type: string): Promise<ApiResponse> {
    return this.request(`/event/type/${encodeURIComponent(type)}`);
  }

  // AI endpoints
  async queryAI(query: string): Promise<ApiResponse> {
    return this.request('/ai/query', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  }

  async getAISuggestions(query: string): Promise<ApiResponse> {
    return this.request('/ai/suggestions', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  }

  async checkAIHealth(): Promise<ApiResponse> {
    return this.request('/ai/health');
  }

  // Map endpoints
  async getMapLocations(): Promise<ApiResponse> {
    return this.request('/map');
  }

  async getPersonLocation(name: string): Promise<ApiResponse> {
    return this.request(`/map/person/${encodeURIComponent(name)}`);
  }

  async getNearbyLocations(lat: number, lng: number, radius = 50): Promise<ApiResponse> {
    return this.request(`/map/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health');
  }

  // Google Contacts API endpoints (Enhanced with Upsert)
  
  // Check sync status - whether user has synced before
  async getSyncStatus(userId: string): Promise<ApiResponse> {
    return this.request(`/google-contacts/sync-status/${userId}`);
  }

  // Sync contacts with intelligent upsert
  async syncGoogleContacts(userId: string, accessToken: string): Promise<ApiResponse> {
    return this.request('/google-contacts/sync', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        accessToken
      })
    });
  }

  // Legacy import method (for backward compatibility)
  async importGoogleContacts(userId: string, accessToken: string): Promise<ApiResponse> {
    return this.request('/google-contacts/import', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        accessToken
      })
    });
  }

  async getUserContacts(userId: string): Promise<ApiResponse> {
    return this.request(`/google-contacts/user/${userId}`);
  }

  async getPendingContacts(userId: string): Promise<ApiResponse> {
    return this.request(`/google-contacts/pending/${userId}`);
  }

  async selectContactsForFamilyTree(userId: string, selectedContactIds: string[]): Promise<ApiResponse> {
    return this.request('/google-contacts/select-for-family-tree', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        selectedContactIds
      })
    });
  }

  async getContactStats(userId: string): Promise<ApiResponse> {
    return this.request(`/google-contacts/stats/${userId}`);
  }

  async checkGoogleContactsHealth(): Promise<ApiResponse> {
    return this.request('/google-contacts/health');
  }
}

export const apiService = new ApiService();

// Export individual methods bound to the service instance
export const createPerson = apiService.createPerson.bind(apiService);
export const getPeople = apiService.getPeople.bind(apiService);
export const getPersonById = apiService.getPersonById.bind(apiService);
export const getPersonByName = apiService.getPersonByName.bind(apiService);
export const getFamilyTree = apiService.getFamilyTree.bind(apiService);
export const updatePerson = apiService.updatePerson.bind(apiService);
export const deletePerson = apiService.deletePerson.bind(apiService);
export const createRelationship = apiService.createRelationship.bind(apiService);
export const getAllRelationships = apiService.getAllRelationships.bind(apiService);
export const getChildren = apiService.getChildren.bind(apiService);
export const getParents = apiService.getParents.bind(apiService);
export const getSpouses = apiService.getSpouses.bind(apiService);
export const getRelationshipPath = apiService.getRelationshipPath.bind(apiService);
export const checkGoogleContactsHealth = apiService.checkGoogleContactsHealth.bind(apiService);
export const importGoogleContacts = apiService.importGoogleContacts.bind(apiService);
export const getUserContacts = apiService.getUserContacts.bind(apiService);
export const getSyncStatus = apiService.getSyncStatus.bind(apiService);
export const syncGoogleContacts = apiService.syncGoogleContacts.bind(apiService);
export const getPendingContacts = apiService.getPendingContacts.bind(apiService);
export const selectContactsForFamilyTree = apiService.selectContactsForFamilyTree.bind(apiService);
export const getContactStats = apiService.getContactStats.bind(apiService);
