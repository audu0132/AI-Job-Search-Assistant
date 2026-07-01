import { Component, OnInit, inject, HostListener } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

import { Sidebar } from '../../../layouts/sidebar/sidebar';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  userName = 'User';
  userInitials = 'U';
  sidebarCollapsed = false;
  userMenuOpen = false;
  notifCount = 3;
  searchQuery = '';
  currentPageLabel = 'Dashboard';

  /** Route → readable label map */
  private readonly routeLabels: Record<string, string> = {
    home:     'Dashboard',
    jobs:     'Job Search',
    resume:   'Resume',
    profile:  'Profile',
    settings: 'Settings',
  };

  ngOnInit(): void {
    // Load user profile
    this.authService.getProfile().subscribe({
      next: (res) => {
        if (res?.user) {
          const { firstName, lastName } = res.user;
          this.userName = `${firstName} ${lastName}`.trim() || 'User';
          this.userInitials = [firstName?.[0], lastName?.[0]]
            .filter(Boolean).join('').toUpperCase() || 'U';
        }
      },
      error: () => {},
    });

    // Update breadcrumb on navigation
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        const nav = e as NavigationEnd;
        const segment = nav.urlAfterRedirects.split('/').pop() ?? 'home';
        this.currentPageLabel = this.routeLabels[segment] ?? 'Dashboard';
      });

    // Set initial breadcrumb
    const seg = this.router.url.split('/').pop() ?? 'home';
    this.currentPageLabel = this.routeLabels[seg] ?? 'Dashboard';

    // Redirect to home sub-route if at /dashboard
    if (this.router.url === '/dashboard') {
      this.router.navigate(['/dashboard/home']);
    }
  }

  /** Close dropdown on outside click */
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.topbar-avatar') && !target.closest('.user-dropdown')) {
      this.userMenuOpen = false;
    }
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  toggleNotifications(): void {
    this.notifCount = 0; // mark as read
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/dashboard/jobs'], {
        queryParams: { q: this.searchQuery.trim() },
      });
    }
  }

  navigate(path: string): void {
    this.userMenuOpen = false;
    this.router.navigate([path]);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
