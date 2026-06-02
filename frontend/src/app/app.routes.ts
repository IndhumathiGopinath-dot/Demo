import { Routes } from '@angular/router';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { UserListComponent } from './pages/user-list/user-list.component';

/**
 * URL paths in the app:
 *   /          -> redirects to /add
 *   /add       -> form to add a new user
 *   /users     -> list of all users
 */
export const routes: Routes = [
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  { path: 'add', component: AddUserComponent },
  { path: 'users', component: UserListComponent },
];
