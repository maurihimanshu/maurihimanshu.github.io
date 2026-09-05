export interface PersonalInfo {
  name: string;
  title: string;
  headline: string;
  location: string;
  phone?: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
  yearsOfExperience: string;
  managerRating: string;
  teamsImpacted: string;
  availability: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    tags?: string[];
  }[];
}

export interface ExperienceRole {
  title: string;
  company: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  achievements: string[];
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Banking Platform' | 'Event Streaming' | 'Cloud & Microservices' | 'Enterprise SDK' | 'Personal Projects';
  architectureHighlights: string[];
  keyOutcomes: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  docsId?: string;
}

export interface PatentItem {
  id: string;
  title: string;
  patentNumber: string;
  status: 'Published / Granted';
  summary: string;
  domain: string;
  keyInnovations: string[];
  link: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  code?: string;
  badgeColor: string;
  skillsVerified: string[];
  link?: string;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface AchievementItem {
  title: string;
  description: string;
  metric?: string;
  icon: string;
}
