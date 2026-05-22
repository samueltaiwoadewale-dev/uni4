/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Shared Type declarations for UniVerse Startup Playbook and MVP Hub

export interface PitchSlide {
  id: string;
  title: string;
  subtitle: string;
  section: "vision" | "audience" | "problems" | "usp" | "strategy" | "positioning" | "scaling";
  badge: string;
}

export interface StudentPersona {
  name: string;
  avatar: string;
  role: string;
  university: string;
  painPoints: string[];
  goals: string[];
  quote: string;
  dataBehavior: string; // Explaining data/internet realities
}

export interface Course {
  id: string;
  name: string;
  units: number;
  grade: "A" | "B" | "C" | "D" | "E" | "F" | "";
}

export interface University {
  id: string;
  name: string;
  abbreviation: string;
  location: string;
  established: string;
  popularSlang: string;
  scale: 4.0 | 5.0 | 7.0;
}

export interface BuzzPost {
  id: string;
  universityId: string;
  authorName: string;
  authorRole: "Student" | "Rep" | "Lecturer" | "Alumni" | "Admin";
  authorClass?: string;
  timestamp: string;
  category: "announcements" | "buzz" | "marketplace" | "gigs";
  title?: string;
  content: string;
  likes: number;
  dislikes: number;
  commentsCount: number;
  hasLiked?: boolean;
  hasDisliked?: boolean;
  price?: string; // for marketplace items
  locationDetail?: string; // e.g. "Outside LT 1", "Moremi Hall"
  contactInfo?: string; // e.g. "WhatsApp Link" or "DM inside UniVerse"
}

export interface Opportunity {
  id: string;
  title: string;
  provider: string;
  type: "Scholarship" | "Fellowship" | "Hackathon" | "Campus Gig" | "Internship";
  location: string; // e.g., "Remote (Nigeria)", "Lagos", "Accra"
  eligibility: string; // e.g., "300 level students", "All African undergraduates"
  deadline: string;
  description: string;
  benefit: string; // e.g. "₦250,000 allowance", "Stipend + laptop", "Mentorship"
  applyUrl: string;
}
