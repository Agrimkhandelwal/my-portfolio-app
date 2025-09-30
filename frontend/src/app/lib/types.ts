
export interface IProfile {
  _id: string;
  name: string;
  email: string;
  education: string;
  links: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
}

export interface IProject {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  link: string;
}

export interface ISkill {
  _id: string;
  name: string;
  level: string;
}

export interface IExperience {
  _id: string;
  title: string;
  organization: string;
  type: string;
  duration: string;
  description: string[];
  link?: string;
}


// --- New interface for the search results ---
// This defines the shape of the response from the /api/search endpoint
export interface SearchResults {
    projects: IProject[];
    skills: ISkill[];
    experiences: IExperience[];
}
