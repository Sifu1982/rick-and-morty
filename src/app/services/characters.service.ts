import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character, Characters } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCharactersByPage(page: number): Observable<Characters> {
    return this.http.get<Characters>(`${this.baseUrl}/character/?page=${page}`);
  }
}
