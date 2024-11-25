import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import  swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  authMethod(){
    if(!this.cookieService.check('token')){
      window.location.href="/login"
    }
  }

  getToken(){
    return this.cookieService.get('token');
  }

  getUserName(){
    return this.cookieService.get('name');
  }

  getProfile(){
    return this.cookieService.get('profile');
  }

  getProfile_id(){
    return this.cookieService.get('profile_id');
  }

  methodCloseSesion(){
    swal.fire({
      position: 'center',
      title: '¿you really want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then( async (result) => {
      if(result.isConfirmed){
        this.cookieService.deleteAll();
        window.location.href="/login";
      }
    });
  }

}
