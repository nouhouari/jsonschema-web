import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormDefinition } from '../model/formdefinition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 

  constructor(private http: HttpClient) { }

  getFormDefinition(): Observable<FormDefinition> {
    return this.http.get<FormDefinition>('/api/registrationform');
  }
}
