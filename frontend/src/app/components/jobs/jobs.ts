import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobsService, Job } from '../../services/jobs.service';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule, FormsModule],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss'
})
export class JobsComponent {
  readonly jobsService = inject(JobsService);
  
  // Active selected job for detail drawer
  readonly selectedJob = signal<Job | null>(null);

  // Search models bound to inputs
  searchVal = '';
  typeVal = 'All';
  minScoreVal = 0;

  constructor() {
    // Select first job by default if available on desktop
    const jobs = this.jobsService.filteredJobs();
    if (jobs.length > 0) {
      this.selectedJob.set(jobs[0]);
    }
  }

  // Update filter parameters in service
  onSearchChange(): void {
    this.jobsService.searchQuery.set(this.searchVal);
  }

  onTypeChange(type: string): void {
    this.typeVal = type;
    this.jobsService.selectedType.set(type);
    this.autoSelectFirst();
  }

  onScoreChange(): void {
    this.jobsService.minMatchScore.set(this.minScoreVal);
    this.autoSelectFirst();
  }

  selectJob(job: Job): void {
    this.selectedJob.set(job);
  }

  applyJob(jobId: string): void {
    this.jobsService.applyToJob(jobId);
    // Update local selectedJob state to reflect applied status
    const current = this.selectedJob();
    if (current && current.id === jobId) {
      this.selectedJob.set({
        ...current,
        applied: true,
        appliedDate: new Date().toLocaleDateString()
      });
    }
  }

  private autoSelectFirst(): void {
    setTimeout(() => {
      const jobs = this.jobsService.filteredJobs();
      if (jobs.length > 0) {
        this.selectedJob.set(jobs[0]);
      } else {
        this.selectedJob.set(null);
      }
    });
  }
}
