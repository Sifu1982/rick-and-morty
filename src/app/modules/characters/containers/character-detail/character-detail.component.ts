import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Character,
  CharactersService,
  Gender,
  Species,
  Status,
} from 'src/app/services';

@Component({
  selector: 'character-detail',
  templateUrl: 'character-detail.component.html',
  styleUrls: ['character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  public character: Character = {
    id: 0,
    name: 'string',
    status: Status.Unknown,
    species: Species.Alien,
    type: 'string',
    gender: Gender.Unknown,
    origin: {
      name: 'string',
      url: 'string',
    },
    location: {
      name: 'string',
      url: 'string',
    },
    image: 'string',
    episode: ['string'],
    url: 'string',
    created: new Date(),
  };

  private characterId!: number;

  constructor(
    private charactersService: CharactersService,
    private router: Router
  ) {
    this.getCharacterId();
  }

  ngOnInit(): void {
    this.getCharacterDetail();
  }

  private getCharacterDetail(): void {
    this.charactersService
      .getCharacterById(this.characterId)
      .subscribe((character) => {
        this.character = character;
      });
  }

  private getCharacterId(): void {
    const { characterId } = this.router.getCurrentNavigation()?.extras
      ?.state as { characterId: number };
    this.characterId = characterId;
  }
}
