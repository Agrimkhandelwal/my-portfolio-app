'use client'; 

import { useState } from 'react';
import type { IProfile, IProject, IExperience, ISkill } from '../lib/types';
import { searchContent, type SearchResults } from '../lib/api';
import { Github, Linkedin, Globe, Mail, BookOpen } from 'lucide-react';
import SearchBar from './SearchBar';

interface PortfolioClientProps {
  profile: IProfile | null;
  projects: IProject[];
  experiences: IExperience[];
  skills: ISkill[];
}

export default function PortfolioClient({ profile, projects, experiences, skills }: PortfolioClientProps) {
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>(projects);
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSkillFilter = (skill: string) => {
    setSelectedSkill(skill);
    setSearchResults(null); 
    if (skill === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.skills.includes(skill)));
    }
  };
  
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchContent(query);
      setSearchResults(results);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setError(null);
  };

  if (!profile) {
    return <div className="text-center text-red-400"><h2>Error loading profile data.</h2><p>Please ensure the backend server is running and accessible.</p></div>;
  }

  return (
    <div className="space-y-12">
      {/* Header & Profile Section */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white">{profile.name}</h1>
          <p className="text-lg text-cyan-400 mt-1">{profile.education}</p>
          <div className="flex items-center gap-4 mt-4 text-gray-400">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-cyan-400 transition-colors"><Mail size={18} /><span>{profile.email}</span></a>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github size={24} /></a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
            <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Globe size={24} /></a>
          </div>
        </div>
      </header>
      
      {/* Search Bar Section */}
      <section>
          <h2 className="text-2xl font-bold text-white border-b-2 border-cyan-500 pb-2 mb-4">Search</h2>
          <SearchBar onSearch={handleSearch} onClear={clearSearch} />
          {isLoading && <p className="text-cyan-400 mt-2">Searching...</p>}
          {error && <p className="text-red-400 mt-2">{error}</p>}
      </section>

      
      {searchResults ? (
        <section>
          <h2 className="text-2xl font-bold text-white pb-2 mb-4">Search Results</h2>
          {searchResults.projects.length === 0 && searchResults.skills.length === 0 ? (
            <p className="text-gray-400">No results found.</p>
          ) : (
            <div className="space-y-8">
              {searchResults.projects.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Matching Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {searchResults.projects.map(project => (
                        <div key={project._id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all transform hover:-translate-y-1">
                          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                          <p className="text-gray-400 mt-2 text-sm">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.skills.map((skill: string) => (
                              <span key={skill} className="bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{skill}</span>
                            ))}
                          </div>
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-400 hover:underline mt-4">View Project <Globe size={16} /></a>
                        </div>
                    ))}
                  </div>
                </div>
              )}
               {searchResults.skills.length > 0 && (
                 <div>
                    <h3 className="text-xl font-semibold text-cyan-400 mb-4">Matching Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {searchResults.skills.map(skill => (
                        <span key={skill._id} className="bg-gray-700 text-cyan-300 text-md font-medium px-4 py-2 rounded-lg">{skill.name}</span>
                      ))}
                    </div>
                 </div>
               )}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Skills Section */}
          <section>
            <h2 className="text-2xl font-bold text-white border-b-2 border-cyan-500 pb-2 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
                <button onClick={() => handleSkillFilter('All')} className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedSkill === 'All' ? 'bg-cyan-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>All</button>
                {skills.map(skill => (
                  <button key={skill._id} onClick={() => handleSkillFilter(skill.name)} className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedSkill === skill.name ? 'bg-cyan-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    {skill.name}
                  </button>
                ))}
            </div>
          </section>

          {/* Projects Section */}
          <section>
            <h2 className="text-2xl font-bold text-white border-b-2 border-cyan-500 pb-2 mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map(project => (
                <div key={project._id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all transform hover:-translate-y-1">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-gray-400 mt-2 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.skills.map((skill: string) => (
                      <span key={skill} className="bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{skill}</span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-400 hover:underline mt-4">View Project <Globe size={16} /></a>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section>
            <h2 className="text-2xl font-bold text-white border-b-2 border-cyan-500 pb-2 mb-4">Experience</h2>
            <div className="space-y-6">
              {experiences.map(exp => (
                <div key={exp._id} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                            <p className="text-md text-gray-400">{exp.organization} - <span className="text-cyan-400">{exp.type}</span></p>
                        </div>
                        <p className="text-sm text-gray-500">{exp.duration}</p>
                    </div>
                    <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1 pl-2">
                        {exp.description.map((desc: string, i: number) => <li key={i}>{desc}</li>)}
                    </ul>
                    {exp.link && <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-400 hover:underline mt-3">Learn More <BookOpen size={16} /></a>}
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

