import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character, Gender, Species, Status } from 'src/app/services';
import { CharacterCardStatusGender } from '../interfaces';

@Component({
  selector: 'character-card',
  templateUrl: 'characters-character-card.component.html',
  styleUrls: ['characters-character-card.component.scss'],
})
export class CharactersCharacterCard implements OnInit {
  public isAlive = false;
  public isDead = false;
  public isUnknown = false;

  @Input() character: Character;
  @Input() statusGender: CharacterCardStatusGender;

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

    this.statusGender = {
      status: {
        isAlive: false,
        isUnknown: false,
        isDead: false,
      },
      gender: {
        isFemale: false,
        isMale: false,
        isGenderless: false,
        isUnknownSelected: false,
      },
    };
  }
  ngOnInit(): void {
    this.isAlive = this.character.status === Status.Alive;
    this.isDead = this.character.status === Status.Dead;
    this.isUnknown = this.character.status === Status.Unknown;
  }

  public getCharacterDetail(characterId: number): void {
    this.showDetail.emit(characterId);
  }
}
