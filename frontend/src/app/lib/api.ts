import { type IProfile, type IProject, type ISkill, type IExperience, type SearchResults } from './types';

// The API_BASE_URL should be set in your deployment environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function for robust fetching
async function fetchData<T>(endpoint: string, errorMessage: string): Promise<T> {
  console.log(`Fetching data from: ${API_BASE_URL}${endpoint}`);
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, { cache: 'no-store' }); // Disable caching for fresh data

    if (!res.ok) {
      // If the response is not OK, log the details before throwing an error
      const errorBody = await res.text();
      console.error(`API Error on ${endpoint}: Status ${res.status}. Body: ${errorBody}`);
      throw new Error(`${errorMessage}: Status ${res.status}`);
    }
    
    return res.json() as T;
  } catch (error) {
    console.error(`Network or fetch error on ${endpoint}:`, error);
    // Re-throw the error so Promise.all can catch it
    throw error;
  }
}

export async function getProfile(): Promise<IProfile | null> {
  return fetchData<IProfile>('/profile', 'Failed to fetch profile');
}

export async function getProjects(): Promise<IProject[]> {
  return fetchData<IProject[]>('/projects', 'Failed to fetch projects');
}

export async function getExperiences(): Promise<IExperience[]> {
  return fetchData<IExperience[]>('/experiences', 'Failed to fetch experiences');
}

export async function getSkills(): Promise<ISkill[]> {
  return fetchData<ISkill[]>('/skills', 'Failed to fetch skills');
}

export async function searchContent(query: string): Promise<SearchResults> {
    return fetchData<SearchResults>(`/search?q=${query}`, 'Failed to perform search');
}
