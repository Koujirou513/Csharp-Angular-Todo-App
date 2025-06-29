import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoListComponent } from './components/todos/todo-list/todo-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'todos', component: TodoListComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '/login' }
];
