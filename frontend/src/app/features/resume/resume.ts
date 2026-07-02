import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

interface Experience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  bullets: string[];
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface Skill {
  id: number;
  name: string;
  level: number; // 1-5
}

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
}

type ActiveSection = 'personal' | 'experience' | 'education' | 'skills' | 'certificates';
type ActiveTab = 'edit' | 'preview';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resume.html',
  styleUrl:    './resume.scss',
})
export class Resume {
  activeSection: ActiveSection = 'personal';
  activeTab: ActiveTab = 'edit';
  lastSaved = 'Just now';

  sections = [
    { key: 'personal'     as ActiveSection, label: 'Personal Info',  icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { key: 'experience'   as ActiveSection, label: 'Experience',     icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { key: 'education'    as ActiveSection, label: 'Education',      icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
    { key: 'skills'       as ActiveSection, label: 'Skills',         icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2' },
    { key: 'certificates' as ActiveSection, label: 'Certificates',   icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  ];

  personal: PersonalInfo = {
    fullName: 'Alex Johnson',
    title: 'Senior Frontend Engineer',
    email: 'alex@example.com',
    phone: '+1 (555) 000-1234',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    website: 'alexjohnson.dev',
    summary: 'Results-driven frontend engineer with 6+ years of experience building scalable web applications. Passionate about crafting exceptional user experiences with modern frameworks like Angular and React.',
  };

  experiences: Experience[] = [
    {
      id: 1,
      company: 'Stripe',
      role: 'Senior Frontend Engineer',
      startDate: '2022-03',
      endDate: '',
      current: true,
      location: 'Remote',
      bullets: [
        'Led development of Stripe Dashboard v3 — improved load time by 40%.',
        'Mentored a team of 4 junior engineers on Angular best practices.',
        'Architected reusable component library used across 12 product teams.',
      ],
    },
    {
      id: 2,
      company: 'Notion',
      role: 'Frontend Engineer',
      startDate: '2020-01',
      endDate: '2022-03',
      current: false,
      location: 'San Francisco, CA',
      bullets: [
        'Built core editor features used by 20M+ daily active users.',
        'Reduced bundle size by 35% through code-splitting and lazy loading.',
      ],
    },
  ];

  educations: Education[] = [
    {
      id: 1,
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016-08',
      endDate: '2020-05',
      gpa: '3.8',
    },
  ];

  skills: Skill[] = [
    { id: 1, name: 'Angular',    level: 5 },
    { id: 2, name: 'TypeScript', level: 5 },
    { id: 3, name: 'React',      level: 4 },
    { id: 4, name: 'Node.js',    level: 4 },
    { id: 5, name: 'GraphQL',    level: 3 },
    { id: 6, name: 'Docker',     level: 3 },
  ];

  certificates: Certificate[] = [
    { id: 1, name: 'Google Professional Cloud Developer', issuer: 'Google',     date: '2023-06' },
    { id: 2, name: 'AWS Solutions Architect Associate',   issuer: 'Amazon AWS', date: '2022-11' },
  ];

  newBullet = '';
  newSkillName = '';
  newSkillLevel = 3;
  expandedExpId: number | null = 1;

  get atsScore(): number {
    let score = 0;
    if (this.personal.fullName)  score += 10;
    if (this.personal.email)     score += 10;
    if (this.personal.phone)     score += 5;
    if (this.personal.summary && this.personal.summary.length > 80) score += 15;
    if (this.experiences.length > 0) score += 20;
    if (this.educations.length > 0)  score += 10;
    if (this.skills.length >= 5)     score += 15;
    if (this.certificates.length > 0) score += 10;
    if (this.personal.linkedin)  score += 5;
    return Math.min(score, 100);
  }

  get atsColor(): string {
    if (this.atsScore >= 80) return '#10b981';
    if (this.atsScore >= 60) return '#f59e0b';
    return '#f43f5e';
  }

  get atsLabel(): string {
    if (this.atsScore >= 80) return 'Excellent';
    if (this.atsScore >= 60) return 'Good';
    return 'Needs Work';
  }

  setSection(key: ActiveSection): void {
    this.activeSection = key;
  }

  setTab(tab: ActiveTab): void {
    this.activeTab = tab;
  }

  toggleExpanded(id: number): void {
    this.expandedExpId = this.expandedExpId === id ? null : id;
  }

  // ── Experience helpers ────────────────────────────────────────────────────
  addExperience(): void {
    const newId = Date.now();
    this.experiences.push({
      id: newId, company: '', role: '', startDate: '', endDate: '',
      current: false, location: '', bullets: [],
    });
    this.expandedExpId = newId;
  }

  removeExperience(id: number): void {
    this.experiences = this.experiences.filter(e => e.id !== id);
  }

  addBullet(exp: Experience): void {
    if (this.newBullet.trim()) {
      exp.bullets.push(this.newBullet.trim());
      this.newBullet = '';
    }
  }

  removeBullet(exp: Experience, index: number): void {
    exp.bullets.splice(index, 1);
  }

  // ── Education helpers ─────────────────────────────────────────────────────
  addEducation(): void {
    this.educations.push({
      id: Date.now(), institution: '', degree: '', field: '',
      startDate: '', endDate: '', gpa: '',
    });
  }

  removeEducation(id: number): void {
    this.educations = this.educations.filter(e => e.id !== id);
  }

  // ── Skills helpers ────────────────────────────────────────────────────────
  addSkill(): void {
    if (this.newSkillName.trim()) {
      this.skills.push({ id: Date.now(), name: this.newSkillName.trim(), level: this.newSkillLevel });
      this.newSkillName = '';
      this.newSkillLevel = 3;
    }
  }

  removeSkill(id: number): void {
    this.skills = this.skills.filter(s => s.id !== id);
  }

  skillDots(level: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  // ── Certificates helpers ──────────────────────────────────────────────────
  addCertificate(): void {
    this.certificates.push({ id: Date.now(), name: '', issuer: '', date: '' });
  }

  removeCertificate(id: number): void {
    this.certificates = this.certificates.filter(c => c.id !== id);
  }

  // ── Misc ──────────────────────────────────────────────────────────────────
  saveResume(): void {
    this.lastSaved = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  downloadResume(): void {
    window.print();
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr + '-01');
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  trackById(index: number, item: { id: number }): number {
    return item.id;
  }
}
