export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  technologies: string[];
  description: string;
  link?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
}

export interface Suggestion {
  id: string;
  type: 'phrasing' | 'action-verb' | 'skill' | 'keyword';
  original: string;
  suggested: string;
  reason: string;
  section: string;
  accepted: boolean;
}