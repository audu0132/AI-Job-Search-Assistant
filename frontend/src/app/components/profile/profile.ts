import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService, UserProfile } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent {
  private readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);

  readonly profileForm: FormGroup;
  readonly isEditing = signal(false);
  readonly saveSuccess = signal(false);
  readonly currentSkills = signal<string[]>([]);
  newSkillInput = '';

  constructor() {
    const user = this.authService.currentUser();
    
    // Prepare form fields
    this.profileForm = this.fb.group({
      firstName: [user?.firstName || '', Validators.required],
      lastName: [user?.lastName || '', Validators.required],
      email: [{ value: user?.email || '', disabled: true }],
      phone: [user?.phone || '', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      experience: [user?.experience || '1 Year'],
      targetRoles: [user?.targetRoles?.join(', ') || 'AI Engineer, Full Stack Developer']
    });

    if (user?.skills) {
      this.currentSkills.set([...user.skills]);
    } else {
      this.currentSkills.set(['Angular', 'TypeScript', 'Node.js', 'Python', 'SQL']);
    }
  }

  toggleEdit(): void {
    if (this.isEditing()) {
      // Revert values
      const user = this.authService.currentUser();
      this.profileForm.patchValue({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
        experience: user?.experience || '1 Year',
        targetRoles: user?.targetRoles?.join(', ') || ''
      });
      this.isEditing.set(false);
    } else {
      this.isEditing.set(true);
    }
  }

  addSkill(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const val = this.newSkillInput.trim().replace(/,$/, '');
      if (val && !this.currentSkills().includes(val)) {
        this.currentSkills.update(skills => [...skills, val]);
        this.newSkillInput = '';
      }
    }
  }

  removeSkill(skillToRemove: string): void {
    this.currentSkills.update(skills => skills.filter(s => s !== skillToRemove));
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const formVal = this.profileForm.getRawValue();
    const updatedUser: UserProfile = {
      ...this.authService.currentUser()!,
      firstName: formVal.firstName,
      lastName: formVal.lastName,
      phone: formVal.phone,
      experience: formVal.experience,
      targetRoles: formVal.targetRoles.split(',').map((r: string) => r.trim()).filter((r: string) => r !== ''),
      skills: this.currentSkills()
    };

    // Update state via auth service
    this.authService.updateUserProfile(updatedUser);
    this.isEditing.set(false);
    this.saveSuccess.set(true);
    
    setTimeout(() => {
      this.saveSuccess.set(false);
    }, 3000);
  }
}
