import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest, RegisterRequest } from '../../models/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginMode = true;
  errorMessage = '';
  isLoading = false;

  loginRequest: LoginRequest = {
    username: '',
    password: ''
  };

  registerRequest: RegisterRequest = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    return;
  }

  onLogin(): void {
    if (!this.loginRequest.username || !this.loginRequest.password) {
      this.errorMessage = 'ユーザー名とパスワードを入力してください';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/todos']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'ログインに失敗しました';
      }
    });
  }

  onRegister(): void {
    if (!this.registerRequest.username || !this.registerRequest.email || !this.registerRequest.password) {
      this.errorMessage = 'すべてのフィールドを入力してください';
      return;
    }

    if (this.registerRequest.password.length < 6) {
      this.errorMessage = 'パスワードは6文字以上で入力してください';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/todos']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || '登録に失敗しました';
      }
    });
  }

}
