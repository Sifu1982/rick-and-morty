import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character, Gender, Species, Status } from 'src/app/services';

@Component({
  selector: 'character-card',
  templateUrl: 'characters-character-card.component.html',
  styleUrls: ['characters-character-card.component.scss'],
})
export class CharactersCharacterCard {
  @Input() character: Character;
  @Output() showDetail = new EventEmitter<number>();

  constructor() {
    this.character = {
      id: 0,
      name: 'string',
      status: Status.Alive,
      species: Species.Alien,
      type: 'string',
      gender: Gender.Unknown,
      origin: {
        name: '',
        url: '',
      },
      location: {
        name: '',
        url: '',
      },
      image: 'string',
      episode: [''],
      url: 'string',
      created: new Date(),
    };
  }

  public getCharacterDetail(characterId: number): void {
    this.showDetail.emit(characterId);
  }
}
