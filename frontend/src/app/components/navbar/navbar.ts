import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  readonly authService = inject(AuthService);
  
  // Output event to toggle sidebar
  readonly toggleSidebar = output<void>();

  logout(): void {
    this.authService.logout();
  }
}
