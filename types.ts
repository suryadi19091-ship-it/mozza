
export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  achievements: string[];
}

export interface Project {
  title: string;
  description: string;
  year: string;
  stack: string[];
  impact?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  details: string;
}

export interface PortfolioData {
  name: string;
  headline: string;
  summary: string;
  profileImage: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    location: string;
  };
  education: {
    institution: string;
    major: string;
    period: string;
    details: string[];
  }[];
  experience: Experience[];
  skills: {
    category: string;
    items: string[];
  }[];
  certifications: Certification[];
  projects: Project[];
}
