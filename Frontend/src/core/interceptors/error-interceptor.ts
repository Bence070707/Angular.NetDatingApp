import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { NavigationExtras, Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);
  return next(req).pipe(
    catchError(error => {
      if(error){
        switch(error.status){
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 400:
            if(error.error.errors){
              toastService.error([
                error.error?.errors?.DisplayName?.[0] ?? '',
                error.error?.errors?.Email?.[0] ?? '',
                error.error?.errors?.Password?.[0] ?? ''
              ]);
            }
            else{
              toastService.error([error.error]);
            }
            break;
            case 401:
              toastService.error(['Unauthorized access']);
              break;
          case 500:
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            router.navigate(['/server-error'], navigationExtras);
            break;
          default:
            toastService.error(['Unknown Error']);
        }
      }

      throw error;
    })
  );
};
