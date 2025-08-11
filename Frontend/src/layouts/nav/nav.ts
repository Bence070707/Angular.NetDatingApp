import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  private router = inject(Router);
  private toast = inject(ToastService);
  protected accountService : AccountService = inject(AccountService);
  protected creds : any = {}

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
