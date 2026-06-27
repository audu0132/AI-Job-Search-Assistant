import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  readonly authService = inject(AuthService);
  readonly jobsService = inject(JobsService);

  // Statistics metrics computed from job listings
  readonly totalApplied = computed(() => this.jobsService.filteredJobs().filter(j => j.applied).length);
  
  // Recommend top 3 jobs sorted by AI Match Score
  readonly recommendedJobs = computed(() => {
    return [...this.jobsService.filteredJobs()]
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  });

  // Recent activities list
  readonly activities = [
    {
      id: 'act-1',
      icon: 'bi-check-circle-fill',
      iconClass: 'text-success bg-success bg-opacity-15',
      title: 'Profile Updated',
      description: 'You added Node.js, Express, and MongoDB to your target skills.',
      time: '2 hours ago'
    },
    {
      id: 'act-2',
      icon: 'bi-send-fill',
      iconClass: 'text-primary bg-primary bg-opacity-15',
      title: 'Applied to NeuralFlow AI',
      description: 'Application for AI Machine Learning Engineer role was submitted.',
      time: 'Yesterday'
    },
    {
      id: 'act-3',
      icon: 'bi-bell-fill',
      iconClass: 'text-warning bg-warning bg-opacity-15',
      title: 'New Match Identified',
      description: 'QuantSync Labs matched 78% with your engineering background.',
      time: '2 days ago'
    }
  ];

  applyJob(jobId: string, event: Event): void {
    event.stopPropagation(); // Avoid navigating if card clicks are registered
    this.jobsService.applyToJob(jobId);
  }
}
