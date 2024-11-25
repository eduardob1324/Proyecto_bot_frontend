import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Program } from '../interface/Program';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private _http: HttpClient) { }

  getSpecialitys(token: any):Observable<any>{
    return this._http.get(`${environment.api}v1/specialities`, 
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
     
  }

   addSpeciality(model: Program, token: string): Observable<any>{
    return this._http.post(`${environment.api}v1/specialities`, model,
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
  }

  editSpeciality(model: Program, token: string, id:any): Observable<any>{
    return this._http.put(`${environment.api}v1/specialities/${id}`, model,
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
  }

  deleteSpeciality( token: string, id:number): Observable<any>{
    return this._http.delete(`${environment.api}v1/specialities/${id}`,
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
  }


}
