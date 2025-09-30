"use client";

import { useState } from 'react';
// Fix 1: Use the correct interface names (IProfile, IProject, etc.)
import { type IProfile, type IProject, type ISkill, type IExperience } from '../lib/types';
import { Github, Linkedin, User, Briefcase, Code, Star, Link as LinkIcon } from 'lucide-react';
import SearchBar from './SearchBar';
import { searchContent } from '../lib/api';

interface PortfolioClientProps {
  // Fix 1: Use the correct interface names here as well
  profile: IProfile | null;
  projects: IProject[];
  experiences: IExperience[];
  skills: ISkill[];
}

export default function PortfolioClient({
  profile: initialProfile,
  projects: initialProjects,
  experiences: initialExperiences,
  skills: initialSkills
}: PortfolioClientProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [skills, setSkills] = useState(initialSkills);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!query) {
        // If the query is empty, reset to the initial state
        setProjects(initialProjects);
        setSkills(initialSkills);
      } else {
        const results = await searchContent(query);
        setProjects(results.projects || []);
        setSkills(results.skills || []);
      }
    } catch (_err: unknown) {
      setError("Failed to perform search. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  if (!initialProfile) {
    return <div className="text-center text-red-500">Failed to load profile data.</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Profile Section */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{initialProfile.name}</h1>
          <p className="text-lg text-gray-400 mb-4">{initialProfile.education}</p>
          <div className="flex space-x-4">
            <a href={initialProfile.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Github /></a>
            <a href={initialProfile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Linkedin /></a>
            <a href={initialProfile.links.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><User /></a>
          </div>
        </section>

        {/* Search Bar */}
        <section className="mb-12">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </section>

        {/* Dynamic Content: Skills & Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-4 flex items-center"><Star className="mr-2"/> Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill._id} className="bg-gray-700 text-sm rounded-full px-3 py-1">{skill.name}</span>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center"><Code className="mr-2"/> Projects</h2>
            <div className="space-y-6">
              {projects.map((project) => (
                 <div key={project._id} className="bg-gray-800 p-4 rounded-lg">
                   <h3 className="font-bold text-lg flex items-center">{project.title} <a href={project.link} target="_blank" rel="noopener noreferrer"><LinkIcon className="ml-2 h-4 w-4"/></a></h3>
                   <p className="text-gray-400 text-sm mb-2">{project.description}</p>
                   <div className="flex flex-wrap gap-2">
                    {/* Fix 3: Add explicit types for map parameters */}
                     {project.skills.map((skill: string, i: number) => (
                       <span key={i} className="bg-gray-600 text-xs rounded-full px-2 py-1">{skill}</span>
                     ))}
                   </div>
                 </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center"><Briefcase className="mr-2"/> Experience</h2>
            <div className="space-y-6">
              {initialExperiences.map((exp) => (
                <div key={exp._id} className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-bold text-lg">{exp.title} - <span className="font-normal text-gray-300">{exp.organization}</span></h3>
                  <p className="text-sm text-gray-500">{exp.duration} | {exp.type}</p>
                  <ul className="list-disc list-inside mt-2 text-gray-400 text-sm">
                    {/* Fix 3: Add explicit types for map parameters */}
                    {exp.description.map((desc: string, i: number) => <li key={i}>{desc}</li>)}
                  </ul>
                </div>
              ))}
            </div>
        </section>
      </main>
    </div>
  );
}

