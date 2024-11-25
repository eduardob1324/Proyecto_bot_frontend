import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { LoginInterface } from '../interface/login-interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor( private _http: HttpClient ) { }


  getToken(login: LoginInterface):Observable<any> {
    return this._http.post(`${environment.api}auth/login`, login,{'headers': {'content-type': 'application/json'}});
  }

}
