import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { LoginRequest, RegisterRequest, AuthResponse, User } from "../models/auth";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:5004/api/auth';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        const token = this.getToken();
        if (token && !this.isTokenExpired(token)) {
            const user = this.getUserFromToken(token);
            this.currentUserSubject.next(user);
        }
    }

    login(loginRequest: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginRequest)
            .pipe(
                tap(response => {
                    this.setToken(response.token);
                    const user: User = {
                        username: response.username,
                        email: response.email
                    };
                    this.currentUserSubject.next(user);
                })
            );
    }

    register(registerRequest: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, registerRequest)
            .pipe(
                tap(response => {
                    this.setToken(response.token);
                    const user: User = {
                        username: response.username,
                        email: response.email
                    };
                    this.currentUserSubject.next(user);
                })
            );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        return token != null && !this.isTokenExpired(token);
    }

    private setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    private isTokenExpired(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp < currentTime;
        } catch (error) {
            return true;
        }
    }

    private getUserFromToken(token: string): User | null {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                username: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
                email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
            };
        } catch {
            return null;
        }
    }
}