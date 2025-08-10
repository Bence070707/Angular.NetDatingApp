import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../types/user';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  protected accountService = inject(AccountService);
  protected registerUser = {} as RegisterCreds;
  protected cancelRegister = output<boolean>();

  register() {
    this.accountService.register(this.registerUser).subscribe({
      next: (user) => {
        console.log('Registration successful:', user);
        this.cancel();
      },
      error: (error) => {
        console.error('Registration failed:', error);
      }
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
