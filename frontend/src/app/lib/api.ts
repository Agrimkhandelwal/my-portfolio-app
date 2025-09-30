import type { IProfile, IProject, IExperience, ISkill } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Define the shape of the search results
export interface SearchResults {
  projects: IProject[];
  skills: ISkill[];
}

export async function getProfile(): Promise<IProfile | null> {
  const res = await fetch(`${API_BASE_URL}/profile`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function getProjects(skill?: string): Promise<IProject[]> {
  const url = skill ? `${API_BASE_URL}/projects?skill=${skill}` : `${API_BASE_URL}/projects`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function getSkills(): Promise<ISkill[]> {
    const res = await fetch(`${API_BASE_URL}/skills`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    return res.json();
}

export async function getExperiences(): Promise<IExperience[]> {
    const res = await fetch(`${API_BASE_URL}/experiences`);
    if (!res.ok) throw new Error('Failed to fetch experiences');
    return res.json();
}

// New function to handle the general search
export async function searchContent(query: string): Promise<SearchResults> {
    const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to perform search');
    return res.json();
}
