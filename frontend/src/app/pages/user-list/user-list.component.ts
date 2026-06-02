import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error = '';

  constructor(private userService: UserService) {}

  /**
   * ngOnInit() runs once when this component is first shown.
   * We use it to fetch the list of users from the API.
   */
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
        console.log('Received from API:', data);
      },
      error: (err) => {
        console.error(err);
        this.error =
          'Could not reach the server. Is the backend running on port 8080?';
        this.loading = false;
      },
    });
  }
}
