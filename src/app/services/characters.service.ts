import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CharacterGender, CharacterStatus } from './constants';
import {
  Character,
  CharactersFiltered,
  CharactersResponse,
} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private baseUrlCharacter = environment.baseUrlCharacter;

  constructor(private http: HttpClient) {}

  getCharactersByPage(page: number): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(
      `${this.baseUrlCharacter}/?page=${page}`
    );
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrlCharacter}/${id}`);
  }

  getFilteredCharacters(
    filteredCharacter: CharactersFiltered
  ): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(
      `${this.baseUrlCharacter}/?name=${filteredCharacter.name}&status=${filteredCharacter.status}&species=${filteredCharacter.species}&type=${filteredCharacter.type}&gender=${filteredCharacter.gender}`
    );
  }
}
