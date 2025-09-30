import { getProfile, getProjects, getExperiences, getSkills } from './lib/api';
import PortfolioClient from './components/PortfolioClient';

export default async function HomePage() {
  
  const [profile, projects, experiences, skills] = await Promise.all([
    getProfile().catch((err: any) => { console.error("Failed to fetch profile:", err.message); return null; }),
    getProjects().catch((err: any) => { console.error("Failed to fetch projects:", err.message); return []; }),
    getExperiences().catch((err: any) => { console.error("Failed to fetch experiences:", err.message); return []; }),
    getSkills().catch((err: any) => { console.error("Failed to fetch skills:", err.message); return []; })
  ]);

  return (
    <PortfolioClient 
      profile={profile} 
      projects={projects} 
      experiences={experiences} 
      skills={skills}
    />
  );
}
