import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Program } from '../interface/Program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private _http: HttpClient) { }

  getPrograms(token: any):Observable<any>{
    return this._http.get(`${environment.api}v1/programs`, 
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
     
  }

  addProgram(model: Program, token: string): Observable<any>{
    return this._http.post(`${environment.api}v1/programs`, model,
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
  }

  editProgram(model: Program, token: string, id:any): Observable<any>{
    return this._http.put(`${environment.api}v1/programs/${id}`, model,
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
  }

  deleteProgram( token: string, id:number): Observable<any>{
    return this._http.delete(`${environment.api}v1/programs/${id}`,
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
  }
}
