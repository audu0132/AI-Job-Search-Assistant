import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    navLinks = [
        { path: '/', label: 'Home' },
        { path: '/jobs', label: 'Jobs' },
        { path: '/settings', label: 'Settings' }
    ]

   logout(){

localStorage.removeItem('token');

this.router.navigate(['/login']);

}
}
