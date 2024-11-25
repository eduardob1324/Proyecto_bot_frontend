import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; //npm install swaeetalert2 --save
import { TokenService } from '../../services/token.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: any;

  constructor (private tokenService: TokenService, private cookieService: CookieService){
    this.user = {
      email:"",
      password:""
    };
  }

  send(){
    if(this.user.email == 0 || this.user.email == ''){
      Swal.fire({
        icon: 'error',
        timer:2000,
        title:'Ups',
        text:'el campo email es obligatorio'
      });
      return false;
    }
    if(this.user.password == 0 || this.user.password == ''){
      Swal.fire({
        icon: 'error',
        timer:2000,
        title:'Ups',
        text:'el campo password es obligatorio'
      });
      return false;
    }
    this.tokenService.getToken({email: this.user.email, password: this.user.password})
      .subscribe({
        next:data => {
          this.cookieService.set('token',data.token, 1);
          this.cookieService.set('name',data.username, 2);
          this.cookieService.set('profile',data.profile, 3);
           this.cookieService.set('profile_id',data.profile_id, 4);
          window.location.href="/home"
        },
        error(err){
          Swal.fire({
          icon: 'error',
          title:'Ops....',
          text:'Las credenciales no son validas'
          });
          setInterval(() =>{
            window.location.href="/login"
          }, 2000);
        }
      });
    return true;
  }


}

// next(data){
//           this.cookieService.set('token',data.token, 1)
//         },error(err){

//           //window.location.href="/login"
    
//         }