import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';
import {
  Character,
  CharactersErrorResponse,
  CharactersFiltered,
  CharactersService,
} from 'src/app/services';

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
  //TODO: revisar para que este 42 no esté puesto a fuego y venga de la API y revisar cuando no hay local storage: el input no funciona bien
  public maxPagesNumb = 42;
  public minPagesNumb = 1;
  public placeholder =
    `Page ${localStorage.getItem('currentPage')}` || 'Go to page...';
  public showCards = true;
  public showFilteredNumber = true;
  public showNextButton = true;
  public showPageNumber = true;
  public showPreviousButton = true;

  private getCharactersByPageSubscription = new Subscription();
  private getFilteredCharactersSubscription = new Subscription();

  constructor(
    private charactersService: CharactersService,
    private router: Router
  ) {}

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
}
