import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/shared/header/header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TodoApp';
  isAuthenticated = false;
  private authSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 認証状態の監視
    this.authSubscription = this.authService.currentUser$.subscribe(
      user => {
        this.isAuthenticated = !!user; // ユーザーが存在する場合はtrue
      }
    );
    // アプリ起動時に認証情報をチェック
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'])
    }
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
