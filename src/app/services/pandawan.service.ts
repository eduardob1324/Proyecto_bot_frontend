import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pandawan } from '../interface/pandawan';

@Injectable({
  providedIn: 'root'
})
export class PandawanService {

  constructor(private _http: HttpClient) { }

  getPandawans(token: string):Observable<any>{
    return this._http.get(`${environment.api}v1/pandawans`, 
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
  }

  addPandawan(pandawan :Pandawan, token: string):Observable<any>{
    return this._http.post(`${environment.api}v1/pandawans`, pandawan,
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}})
  }

  editPandawan(pandawan :Pandawan, token: string, id:any): Observable<any>{
    console.log(id)
    return this._http.put(`${environment.api}v1/pandawans/${id}`, pandawan,
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
  }

  deletePandawan( token: string, id:any): Observable<any>{
    return this._http.delete(`${environment.api}v1/pandawans/${id}`,
      {'headers': {'content-type': 'application/json', 'Authorization':`Bearer ${token}`}});
  }


}
