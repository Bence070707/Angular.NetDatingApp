import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() {
    this.createToastContainer();
  }

  private createToastContainer(){
    if(!document.getElementById('toast-container')){
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end z-50';
      document.body.appendChild(container);
    }
  }

  private createToastElement(message: string[], alertClass: string, duration: number = 3000){
    const toastContainer = document.getElementById('toast-container');
    if(toastContainer){
      const toast = document.createElement('div');
      toast.classList.add(`alert`, alertClass, 'shadow-lg');
      toast.innerHTML = `
      <ul>
        ${message.map(msg => `<li>${msg}</li>`).join('')}
      </ul>
      <button class="ml-4 btn btn-sm btn-ghost">x</button>
      `;
      toast.querySelector('button')?.addEventListener('click', () => {
        toast.remove();
      });
      toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, duration);
    }
  }



  success(message:string[], duration?: number){
    this.createToastElement(message, 'alert-success', duration);
  }

  warning(message:string[], duration?: number){
    this.createToastElement(message, 'alert-warning', duration);
  }

  error(message:string[], duration?: number){
    this.createToastElement(message, 'alert-error', duration);
  }

  info(message:string[], duration?: number){
    this.createToastElement(message, 'alert-info', duration);
  }

}
