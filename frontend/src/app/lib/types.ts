// This file defines the TypeScript types for all the data from our API.

export interface ILinks {
    github: string;
    linkedin: string;
    portfolio: string;
}

export interface IProfile {
    _id: string;
    name: string;
    email: string;
    education: string;
    links: ILinks;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IProject {
    _id: string;
    title: string;
    description: string;
    skills: string[];
    link: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISkill {
    _id: string;
    name: string;
    level: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum ExperienceType {
    INTERNSHIP = 'Internship',
    ACADEMIC = 'Academic Project',
    VOLUNTEER = 'Volunteer',
    PERSONAL = 'Personal Project'
}

export interface IExperience {
    _id: string;
    title: string;
    organization: string;
    type: ExperienceType;
    duration: string;
    description: string[];
    link?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
