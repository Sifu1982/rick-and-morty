import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class CharacterDetailComponent implements OnInit, OnDestroy {
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
  public showNextButton = true;
  public showPreviousButton = true;

  private characterId = 1;
  private getAllCharactersSubscription = new Subscription();
  private getCharacterDetailSubscription = new Subscription();
  private totalNumberOfCharacters = 0;

  constructor(
    private charactersService: CharactersService,
    private router: Router
  ) {
    this.getCharacterId();
  }

  ngOnInit(): void {
    this.setNumberOfCharacters();
    this.getCharacterDetail(
      Number(localStorage.getItem('currentCharacterId')) || this.characterId
    );
  }

  ngOnDestroy(): void {
    this.getAllCharactersSubscription.unsubscribe();
    this.getCharacterDetailSubscription.unsubscribe();
  }

  public setEpisodeNumber(episode: string): string {
    return episode.split('episode/')[1];
  }

  public navigateToCharactersMain(): void {
    this.router.navigate(['characters']);
  }

  public changeCharacter(pageNumber: number) {
    this.showPreviousButton = true;
    this.showNextButton = true;
    localStorage.setItem(
      'currentCharacterId',
      (this.character.id + pageNumber).toString()
    );

    this.getCharacterDetail(this.character.id + pageNumber);
  }

  private setNumberOfCharacters(): void {
    this.getAllCharactersSubscription = this.charactersService
      .getAllCharacters()
      .subscribe({
        next: (characters) =>
          (this.totalNumberOfCharacters = characters.info.count),
      });
  }

  private getCharacterDetail(characterId: number): void {
    this.charactersService.getCharacterById(characterId).subscribe({
      next: (character) => {
        this.character = character;
        this.setShowPreviousNextButton();
      },
    });
  }

  private setShowPreviousNextButton(): void {
    if (this.character.id === 1) {
      this.showPreviousButton = false;
    }
    if (this.character.id === this.totalNumberOfCharacters) {
      this.showNextButton = false;
    }
  }

  private getCharacterId(): void {
    const { characterId } = this.router.getCurrentNavigation()?.extras
      ?.state as { characterId: number };
    this.characterId = characterId;
  }
}
