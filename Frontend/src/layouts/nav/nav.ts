import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { BusyService } from '../../core/services/busy-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {
  private router = inject(Router);
  private toast = inject(ToastService);
  protected accountService : AccountService = inject(AccountService);
  protected busyService = inject(BusyService);
  protected creds : any = {}
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected currentTheme = 0;
  protected themes = ["light", "dark"];

    ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  handleSelectTheme(){
    if(this.currentTheme == 0){
      this.currentTheme++;
      this.selectedTheme.set(this.themes[this.currentTheme]);
      localStorage.setItem('theme', this.selectedTheme());
      document.documentElement.setAttribute('data-theme', this.selectedTheme());

    }else{
      this.currentTheme--;
      this.selectedTheme.set(this.themes[this.currentTheme]);
      localStorage.setItem('theme', this.selectedTheme());
      document.documentElement.setAttribute('data-theme', this.selectedTheme());
    }
  }

  login(){
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.creds = {};
        this.router.navigate(['/members']);
        this.toast.success(['Login successful!']);

      },
      error: (error) => {
        console.log(error.error.errors);
        this.toast.error([error.error?.errors?.Email?.[0] ?? '',
          error.error?.errors?.Password?.[0] ?? '']);
      }
    });
  }

  logout(){
    this.accountService.logout();
    this.router.navigate(['/']);
    this.toast.info(['You have been logged out.']);
  }

  }
