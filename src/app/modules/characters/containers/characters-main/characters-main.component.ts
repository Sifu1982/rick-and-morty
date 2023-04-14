import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Character, CharactersService } from 'src/app/services';

@Component({
  selector: 'characters-main',
  templateUrl: 'characters-main.component.html',
  styleUrls: ['characters-main.component.scss'],
})
export class CharactersMainComponent implements OnInit {
  public characters: Character[] = [];
  public currentPage = Number(localStorage.getItem('currentPage')) || 1;
  public form!: FormGroup;
  //TODO: revisar para que este 42 no esté puesto a fuego y venfa de la API
  public maxPagesNumb = 42;
  public minPagesNumb = 1;
  public placeholder = 'Go to page...';
  public showNextButton = true;
  public showPreviousButton = true;

  constructor(
    private charactersService: CharactersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCharacters();
    this.setForm();
  }

  public nextPage(): void {
    if (this.currentPage < this.maxPagesNumb) {
      this.currentPage++;
      this.changePage();
    }
  }

  public previousPage(): void {
    if (this.currentPage > this.minPagesNumb) {
      this.currentPage--;
      this.changePage();
    }
  }

  public getCharacterDetail(characterId: number): void {
    this.router.navigate(['characters', 'detail'], {
      state: { characterId: characterId },
    });
  }

  public goToPage(): void {
    this.form.valueChanges.subscribe((formValue: { pageNumber: number }) => {
      this.currentPage = formValue.pageNumber;
      this.changePage();
    });
  }

  private setForm(): void {
    this.form = new FormGroup({
      pageNumber: new FormControl(),
    });
  }

  private changePage(): void {
    this.storageCurrentPage();
    this.getCharacters();
    this.showNextButton = this.currentPage < this.maxPagesNumb;
    this.showPreviousButton = this.currentPage > this.minPagesNumb;
  }

  private storageCurrentPage(): void {
    localStorage.setItem('currentPage', this.currentPage.toString());
  }

  private getCharacters(): void {
    this.charactersService
      .getCharactersByPage(this.currentPage)
      .subscribe((response) => {
        this.characters = response.results;
        this.maxPagesNumb = response.info.pages;
      });
  }
}
