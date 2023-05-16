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
  private getAllCharactersSubscription: Subscription = new Subscription();
  private getCharacterDetailSubscription: Subscription = new Subscription();
  private numberOfCaharacters = 0;

  constructor(
    private charactersService: CharactersService,
    private router: Router
  ) {
    this.getCharacterId();
  }

  ngOnInit(): void {
    this.setInitialShowPreviousButton();
    this.setNumberOfCharacters();
    this.getCharacterDetail(this.characterId);
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

  public changePageNumber(pageNumber: number) {
    this.showPreviousButton = true;
    this.showNextButton = true;
    if (pageNumber <= 1) {
      this.showPreviousButton = false;
    }

    if (pageNumber >= this.numberOfCaharacters) {
      this.showNextButton = false;
    }
    this.getCharacterDetail(pageNumber);
  }

  private setInitialShowPreviousButton(): void {
    if (this.character.id === 0) {
      this.showPreviousButton = false;
    }
  }

  private setNumberOfCharacters(): void {
    this.getAllCharactersSubscription = this.charactersService
      .getAllCharacters()
      .subscribe({
        next: (characters) => {
          this.numberOfCaharacters = characters.info.count;
        },
      });
  }

  private getCharacterDetail(characterId: number): void {
    this.charactersService.getCharacterById(characterId).subscribe({
      next: (character) => {
        this.character = character;
      },
    });
  }

  private getCharacterId(): void {
    const { characterId } = this.router.getCurrentNavigation()?.extras
      ?.state as { characterId: number };
    this.characterId = characterId;
  }
}
