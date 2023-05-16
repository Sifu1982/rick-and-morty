import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';
import {
  Character,
  CharacterGender,
  CharacterStatus,
  CharactersErrorResponse,
  CharactersFiltered,
  CharactersService,
} from 'src/app/services';
import { CharacterCardStatusGender } from '../../components/interfaces';

@Component({
  selector: 'characters-main',
  templateUrl: 'characters-main.component.html',
  styleUrls: ['characters-main.component.scss'],
})
export class CharactersMainComponent implements OnInit, OnDestroy {
  public characters: Character[] = [];
  public charactersFilteredNumber = 0;
  public currentPage = Number(localStorage.getItem('currentPage')) || 1;
  public errorText = '';
  public maxPagesNumb = 42;
  public minPagesNumb = 1;
  public placeholder =
    `Page ${localStorage.getItem('currentPage')}` || 'Go to page...';
  public showCards = true;
  public showFilteredNumber = true;
  public showNextButton = true;
  public showPageNumber = true;
  public showPreviousButton = true;
  public statusGender: CharacterCardStatusGender;

  private getCharactersByPageSubscription = new Subscription();
  private getFilteredCharactersSubscription = new Subscription();

  constructor(
    private charactersService: CharactersService,
    private router: Router
  ) {
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
    this.changePageNumber(this.currentPage);
  }

  ngOnDestroy(): void {
    this.getFilteredCharactersSubscription.unsubscribe();
    this.getCharactersByPageSubscription.unsubscribe();
  }

  public goToCharacterDetail(characterId: number): void {
    localStorage.setItem('currentCharacterId', characterId.toString());
    this.router.navigate(['characters', 'detail'], {
      state: { characterId: characterId },
    });
  }

  public handleFilter(filter: CharactersFiltered): void {
    this.showPageNumber = false;
    this.showFilteredNumber = true;
    this.showCards = true;
    this.getFilteredCharactersSubscription = this.charactersService
      .getFilteredCharacters(filter)
      .pipe(debounceTime(500))
      .subscribe({
        next: (charactersFiltered) => {
          this.charactersFilteredNumber = charactersFiltered.info.count;
          this.characters = charactersFiltered.results;
          this.setStatusSelected(filter);
        },
        error: (error: CharactersErrorResponse) => {
          this.errorText = error.error.error;
          this.showCards = false;
          this.showFilteredNumber = false;
        },
      });
  }

  public resetFilter(): void {
    this.showPageNumber = true;
    this.showFilteredNumber = false;
    this.currentPage = Number(localStorage.getItem('currentPage'));
  }

  public changePageNumber(pageNumber: number) {
    this.getCharactersByPageSubscription = this.charactersService
      .getCharactersByPage(pageNumber)
      .subscribe((charactersResponse) => {
        this.characters = charactersResponse.results;
        this.maxPagesNumb = charactersResponse.info.pages;
      });
  }

  public trackByFn(index: number, character: Character): number {
    return character.id;
  }

  private setStatusSelected(filter: CharactersFiltered): void {
    this.statusGender = {
      status: {
        isAlive: filter.status === CharacterStatus.Alive,
        isUnknown: filter.status === CharacterStatus.Dead,
        isDead: filter.status === CharacterStatus.Unknown,
      },
      gender: {
        isFemale: filter.gender === CharacterGender.Female,
        isMale: filter.gender === CharacterGender.Male,
        isGenderless: filter.gender === CharacterGender.Genderless,
        isUnknownSelected: filter.gender === CharacterGender.Unknown,
      },
    };
  }
}
