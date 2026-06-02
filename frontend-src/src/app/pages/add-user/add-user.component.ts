import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  // These two are bound to the form inputs via [(ngModel)] (two-way binding).
  name = '';
  age: number | null = null;

  // Status message shown to the user after submitting.
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    // Step 1: log values in the frontend (as you asked).
    console.log('Form values:', { name: this.name, age: this.age });

    // Basic validation.
    if (!this.name.trim() || this.age === null) {
      this.status = 'error';
      this.errorMessage = 'Please enter both a name and an age.';
      return;
    }

    const newUser: User = { name: this.name, age: this.age };

    this.status = 'loading';

    // Step 2: send the data to the backend via the service.
    // .subscribe() actually triggers the HTTP request.
    this.userService.addUser(newUser).subscribe({
      next: (saved) => {
        // The backend returned the saved user (with an id). Log it too.
        console.log('Saved on the server:', saved);
        this.status = 'success';
        this.name = '';
        this.age = null;
      },
      error: (err) => {
        console.error('API error:', err);
        this.status = 'error';
        this.errorMessage =
          'Could not reach the server. Is the backend running on port 8080?';
      },
    });
  }

  goToList(): void {
    this.router.navigate(['/users']);
  }
}
