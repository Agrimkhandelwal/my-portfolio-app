import { getProfile, getProjects, getExperiences, getSkills } from './lib/api';
import PortfolioClient from './components/PortfolioClient';

// This is a Next.js Server Component, so we can make it async
// and fetch data directly on the server for optimal performance.
export default async function HomePage() {
  
  // Fetch all necessary data in parallel
  const [profile, projects, experiences, skills] = await Promise.all([
    // The fix: Type err as 'Error' instead of 'any'
    getProfile().catch((err: Error) => { console.error("Failed to fetch profile:", err.message); return null; }),
    getProjects().catch((err: Error) => { console.error("Failed to fetch projects:", err.message); return []; }),
    getExperiences().catch((err: Error) => { console.error("Failed to fetch experiences:", err.message); return []; }),
    getSkills().catch((err: Error) => { console.error("Failed to fetch skills:", err.message); return []; })
  ]);

  // Pass the server-fetched data to a Client Component for rendering
  return (
    <PortfolioClient 
      profile={profile} 
      projects={projects} 
      experiences={experiences} 
      skills={skills}
    />
  );
}

