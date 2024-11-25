import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Generation } from '../interface/generation';

@Injectable({
  providedIn: 'root'
})
export class GenerationService {

  constructor(private _http: HttpClient) { }

  getGenerations(token: string):Observable<any>{
    return this._http.get(`${environment.api}v1/generations`, 
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
  }

  addGeneration(generation :Generation, token: string):Observable<any>{
    return this._http.post(`${environment.api}v1/generations`, generation,
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}})
  }

  deleteGeneration( token: string, id:any): Observable<any>{
    return this._http.delete(`${environment.api}v1/generations/${id}`,
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
  }
}
