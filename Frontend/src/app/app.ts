import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../layouts/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected readonly title = "Dating app";
  protected members = signal<User[]>([]);


  ngOnInit(): void {
    this.setCurrentUser();
    this.http.get<User[]>('https:localhost:5001/api/members').subscribe({
      next: response => this.members.set(response),
      error: error => console.error('Error fetching members:', error),
      complete: () => console.log('Request complete')
    })
  }

  setCurrentUser() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    this.accountService.currentUser.set(JSON.parse(user));
  }

}
