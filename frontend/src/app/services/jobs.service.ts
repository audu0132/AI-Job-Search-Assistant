import { Injectable, signal, computed } from '@angular/core';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract';
  salary: string;
  description: string;
  requirements: string[];
  skillsRequired: string[];
  matchScore: number; // AI score matching user's profile
  applied: boolean;
  appliedDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  // Master list of jobs
  private readonly _jobs = signal<Job[]>([
    {
      id: 'job-1',
      title: 'AI Machine Learning Engineer',
      company: 'NeuralFlow AI',
      location: 'Pune (Hybrid)',
      type: 'Full-time',
      salary: '₹18,00,000 - ₹24,00,000 / year',
      description: 'We are seeking an experienced ML Engineer to design and deploy Large Language Model integrations and automated agents for job tracking pipeline optimizations.',
      requirements: [
        '3+ years of experience with Python, PyTorch, and NLP.',
        'Strong hands-on experience with LLMs (Gemini, GPT) and Prompt Engineering.',
        'Familiarity with Pinecone or other vector databases.'
      ],
      skillsRequired: ['Python', 'NLP', 'LLMs', 'Vector Databases', 'PyTorch'],
      matchScore: 92,
      applied: false
    },
    {
      id: 'job-2',
      title: 'Senior Frontend Engineer (Angular)',
      company: 'AppScale Technologies',
      location: 'Remote',
      type: 'Remote',
      salary: '₹14,00,000 - ₹19,00,000 / year',
      description: 'Looking for a passionate frontend developer who is an expert in Angular (v17+), TypeScript, and modern state management patterns. You will build highly responsive analytical dashboards.',
      requirements: [
        'Expert in Angular, RxJS, and Angular Signals.',
        'Experience building customizable data-heavy dashboards.',
        'Stunning eye for clean UI, CSS architecture, and animations.'
      ],
      skillsRequired: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'Bootstrap'],
      matchScore: 85,
      applied: false
    },
    {
      id: 'job-3',
      title: 'Full Stack Developer',
      company: 'QuantSync Labs',
      location: 'Mumbai (On-site)',
      type: 'Full-time',
      salary: '₹12,00,000 - ₹16,00,000 / year',
      description: 'Join our agile engineering team to construct robust REST APIs in Node.js/Express and client-side applications in Angular. You will have full ownership of features from inception to deployment.',
      requirements: [
        'Strong experience with MongoDB, Express.js, Angular, and Node.js.',
        'Understanding of JWT-based authentication and secure API principles.',
        'Excellent troubleshooting and clean code practices.'
      ],
      skillsRequired: ['Node.js', 'Express', 'Angular', 'MongoDB', 'TypeScript'],
      matchScore: 78,
      applied: false
    },
    {
      id: 'job-4',
      title: 'Data Analyst & Visualization Expert',
      company: 'InfoMatrix Research',
      location: 'Bengaluru (Hybrid)',
      type: 'Part-time',
      salary: '₹60,000 - ₹80,000 / month',
      description: 'Seeking a detail-oriented analyst to build interactive dashboards and prepare performance summaries for our clients. Experience with SQL and PowerBI/Tableau is required.',
      requirements: [
        'Proficiency in SQL query optimization.',
        'Strong portfolio of visual dashboards.',
        'Ability to present complex data findings to stakeholders.'
      ],
      skillsRequired: ['SQL', 'Data Visualization', 'Python', 'PowerBI'],
      matchScore: 65,
      applied: false
    },
    {
      id: 'job-5',
      title: 'Cloud DevOps Architect',
      company: 'Apex Cloud Solutions',
      location: 'Remote',
      type: 'Remote',
      salary: '₹22,00,000 - ₹30,00,000 / year',
      description: 'Help us scale our SaaS product infrastructure by migrating workflows to Kubernetes and establishing robust CI/CD pipelines using GitHub Actions and GCP Cloud Build.',
      requirements: [
        'Hands-on with Kubernetes (EKS/GKE), Docker, and Terraform.',
        'Solid experience with GCP or AWS cloud architectures.',
        'Strong scripting skills (Bash, Python).'
      ],
      skillsRequired: ['GCP', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
      matchScore: 45,
      applied: false
    },
    {
      id: 'job-6',
      title: 'Junior QA Engineer',
      company: 'Zetta Systems',
      location: 'Pune (On-site)',
      type: 'Contract',
      salary: '₹45,00,00 - ₹6,00,000 / year',
      description: 'Looking for a QA engineer to write unit tests, run manual regression test suites, and write automated E2E tests using Cypress or Playwright.',
      requirements: [
        'Understanding of QA lifecycles and bug-tracking workflows.',
        'Basic JavaScript scripting capabilities.',
        'Attention to detail and writing clean reproduction steps.'
      ],
      skillsRequired: ['Manual Testing', 'JavaScript', 'Cypress', 'Git'],
      matchScore: 70,
      applied: false
    }
  ]);

  // Search filter signals
  readonly searchQuery = signal<string>('');
  readonly selectedType = signal<string>('All');
  readonly minMatchScore = signal<number>(0);

  // Filtered list of jobs
  readonly filteredJobs = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const type = this.selectedType();
    const minScore = this.minMatchScore();
    
    return this._jobs().filter(job => {
      const matchesQuery = 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.skillsRequired.some(s => s.toLowerCase().includes(query));
        
      const matchesType = type === 'All' || job.type === type;
      const matchesScore = job.matchScore >= minScore;
      
      return matchesQuery && matchesType && matchesScore;
    });
  });

  // Apply to a job
  applyToJob(jobId: string): void {
    this._jobs.update(allJobs => 
      allJobs.map(job => 
        job.id === jobId 
          ? { ...job, applied: true, appliedDate: new Date().toLocaleDateString() }
          : job
      )
    );
  }
}
