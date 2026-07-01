import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

interface Stat {
  applications: number;
  interviews: number;
  savedJobs: number;
  resumeScore: number;
}

interface AiInsight {
  id: number;
  type: 'tip' | 'warning' | 'success';
  icon: string;
  title: string;
  description: string;
  tag: string;
}

interface Application {
  id: number;
  role: string;
  company: string;
  location: string;
  color: string;
  status: string;
  statusLabel: string;
  appliedDate: string;
}

interface PipelineStage {
  label: string;
  count: number;
  percent: number;
  color: string;
}

interface Interview {
  id: number;
  role: string;
  company: string;
  day: string;
  month: string;
  time: string;
  type: string;
  color: string;
}

interface QuickAction {
  label: string;
  icon: string;
  bg: string;
  handler: () => void;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  userName = 'User';
  todayDate = '';

  stats: Stat = {
    applications: 12,
    interviews: 3,
    savedJobs: 8,
    resumeScore: 74,
  };

  aiInsights: AiInsight[] = [
    {
      id: 1,
      type: 'tip',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      title: 'Add skills to your profile',
      description: 'Profiles with 8+ skills get 3× more recruiter views. You currently have 5.',
      tag: 'Tip',
    },
    {
      id: 2,
      type: 'warning',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      title: 'Resume needs updating',
      description: 'Your resume was last updated 45 days ago. Keep it fresh to stay competitive.',
      tag: 'Action',
    },
    {
      id: 3,
      type: 'success',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Interview preparation on track',
      description: 'You\'ve practiced 4 mock interviews this week. Great job!',
      tag: 'Good',
    },
  ];

  recentApplications: Application[] = [
    {
      id: 1,
      role: 'Senior Frontend Engineer',
      company: 'Stripe',
      location: 'Remote',
      color: '#6772e5',
      status: 'interview',
      statusLabel: 'Interview',
      appliedDate: 'Jun 28',
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      company: 'Notion',
      location: 'San Francisco, CA',
      color: '#1a1a1a',
      status: 'screening',
      statusLabel: 'Screening',
      appliedDate: 'Jun 25',
    },
    {
      id: 3,
      role: 'React Developer',
      company: 'Vercel',
      location: 'Remote',
      color: '#000000',
      status: 'applied',
      statusLabel: 'Applied',
      appliedDate: 'Jun 22',
    },
    {
      id: 4,
      role: 'UI Engineer',
      company: 'Linear',
      location: 'Remote',
      color: '#5e6ad2',
      status: 'offer',
      statusLabel: 'Offer',
      appliedDate: 'Jun 18',
    },
    {
      id: 5,
      role: 'Software Engineer',
      company: 'Figma',
      location: 'New York, NY',
      color: '#a259ff',
      status: 'rejected',
      statusLabel: 'Rejected',
      appliedDate: 'Jun 14',
    },
  ];

  pipeline: PipelineStage[] = [
    { label: 'Applied',    count: 12, percent: 100, color: '#6366f1' },
    { label: 'Screening',  count: 7,  percent: 58,  color: '#06b6d4' },
    { label: 'Interview',  count: 3,  percent: 25,  color: '#f59e0b' },
    { label: 'Offer',      count: 1,  percent: 8,   color: '#10b981' },
    { label: 'Rejected',   count: 4,  percent: 33,  color: '#f43f5e' },
  ];

  upcomingInterviews: Interview[] = [
    {
      id: 1,
      role: 'Senior Frontend Engineer',
      company: 'Stripe',
      day: '04',
      month: 'Jul',
      time: '10:00 AM',
      type: 'Video Call',
      color: '#6772e5',
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      company: 'Notion',
      day: '07',
      month: 'Jul',
      time: '2:30 PM',
      type: 'Technical',
      color: '#8b5cf6',
    },
  ];

  quickActions!: QuickAction[];

  ngOnInit(): void {
    this.todayDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    this.authService.getProfile().subscribe({
      next: (res) => {
        if (res.user) {
          this.userName = `${res.user.firstName} ${res.user.lastName}`.trim() || 'User';
        }
      },
      error: () => { /* silently ignore — demo data shows */ }
    });

    this.quickActions = [
      {
        label: 'Search Jobs',
        icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        bg: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        handler: () => this.searchJobs(),
      },
      {
        label: 'Update Resume',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        bg: 'linear-gradient(135deg, #06b6d4, #0284c7)',
        handler: () => this.router.navigate(['/resume']),
      },
      {
        label: 'My Profile',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        bg: 'linear-gradient(135deg, #10b981, #059669)',
        handler: () => this.router.navigate(['/profile']),
      },
      {
        label: 'Settings',
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
        bg: 'linear-gradient(135deg, #f59e0b, #d97706)',
        handler: () => this.router.navigate(['/settings']),
      },
    ];
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  searchJobs(): void {
    this.router.navigate(['/jobs']);
  }

  viewAllApplications(): void {
    this.router.navigate(['/jobs']);
  }
  }
