import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestTraduttore } from '../interfaces/RequestTraduttore';
import { ResponseTranslaction } from '../interfaces/ResponseTraduttore';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  private apiUrl = 'http://localhost:5201/translator';

  constructor(private http: HttpClient) { }

  translate(request: RequestTraduttore): Observable<ResponseTranslaction> {
    return this.http.post<ResponseTranslaction>(this.apiUrl, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
