export interface SocialLink {
  name: string;
  url: string;
}

export interface ProjectBullet {
  text: string;
}

export interface Project {
  id: string;
  title: string;
  description: string; // One-line objective
  link: string; // LinkedIn/GitHub/Live
  bullets: string[];
  demoVideo?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string; // "(mm/yyyy) - present" or date
  link?: string;
  achievements: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  program: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface VitaeData {
  documentTitle?: string;
  themeColor?: string;
  logoUrl?: string;
  targetCompany?: string;
  targetRole?: string;
  personalInfo: {
    fullName: string;
    targetPosition: string;
    email: string;
    phone?: string;
    location: string;
    relocation: string;
    socialLinks: SocialLink[];
  };
  coverLetter?: string;
  summary: string;
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}
