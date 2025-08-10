import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl : string = 'https://localhost:5001/api/account/';
  currentUser = signal<User | null>(null);

  login(creds: LoginCreds){
    return this.http.post<User>(`${this.baseUrl}login`, creds).pipe(
      tap((user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
      })
    );
  }

  register(creds:RegisterCreds){
    return this.http.post<User>(`${this.baseUrl}register`, creds).pipe(
      tap((user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
