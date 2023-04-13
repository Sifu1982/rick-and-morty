import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character, CharactersResponse } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCharactersByPage(page: number): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(
      `${this.baseUrl}/character/?page=${page}`
    );
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }
}
