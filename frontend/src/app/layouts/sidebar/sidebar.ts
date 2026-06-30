// import { Component, inject, signal } from '@angular/core';
// import { RouterLink, RouterLinkActive, Router } from '@angular/router';
// import { Auth } from '../../core/services/auth';

// interface NavItem {
//   path: string;
//   label: string;
//   icon: string;
// }

// @Component({
//   selector: 'app-sidebar',
//   imports: [RouterLink, RouterLinkActive],
//   templateUrl: './sidebar.html',
//   styleUrl: './sidebar.scss',
// })
// export class Sidebar {
//   private readonly authService = inject(Auth);
//   private readonly router = inject(Router);

//   readonly currentUser = this.authService.;
//   readonly collapsed = signal(false);

//   readonly navItems: NavItem[] = [
//     { path: '/dashboard', label: 'Dashboard',  icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
//     { path: '/jobs',      label: 'Job Search',  icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
//     { path: '/resume',    label: 'Resume',      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
//     { path: '/profile',   label: 'Profile',     icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
//     { path: '/settings',  label: 'Settings',    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
//   ];

//   toggleCollapse(): void {
//     this.collapsed.update(v => !v);
//   }

//   logout(): void {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }

//   getUserInitials(): string {
//     const user = this.currentUser();
//     if (!user) return '?';
//     const name = (user as any).name || (user as any).email || '';
//     return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '?';
//   }

//   getUserName(): string {
//     const user = this.currentUser();
//     if (!user) return 'Guest';
//     return (user as any).name || (user as any).email || 'User';
//   }
// }
