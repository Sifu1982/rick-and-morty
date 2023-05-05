import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  Character,
  CharactersFiltered,
  CharactersService,
} from 'src/app/services';

@Component({
  selector: 'characters-main',
  templateUrl: 'characters-main.component.html',
  styleUrls: ['characters-main.component.scss'],
})
export class CharactersMainComponent implements OnInit {
  public characters: Character[] = [];
  public currentPage = Number(localStorage.getItem('currentPage')) || 1;
  public form!: FormGroup;
  //TODO: revisar para que este 42 no esté puesto a fuego y venga de la API
  public maxPagesNumb = 42;
  public minPagesNumb = 1;
  public placeholder =
    `Page ${localStorage.getItem('currentPage')}` || 'Go to page...';
  public showNextButton = true;
  public showPreviousButton = true;

  private getCurrentPageFromLocalStorage = localStorage.getItem('currentPage');

  constructor(
    private charactersService: CharactersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.formSubscription();
    this.getCharacters();
  }

  public nextPage(): void {
    if (this.currentPage < this.maxPagesNumb) {
      this.currentPage++;
      this.changePage();
      this.form.controls['pageNumber'].setValue(this.currentPage);
    }
  }

  public previousPage(): void {
    if (this.currentPage > this.minPagesNumb) {
      this.currentPage--;
      this.changePage();
      this.form.controls['pageNumber'].setValue(this.currentPage);
    }
  }

  public getCharacterDetail(characterId: number): void {
    this.router.navigate(['characters', 'detail'], {
      state: { characterId: characterId },
    });
  }

  public handleFilter(filter: CharactersFiltered): void {
    console.log('Manejo el filtero', filter);
    this.charactersService
      .getFilteredCharacters(filter)
      .subscribe((charactersFiltered) => {
        console.log(charactersFiltered);
        this.characters = charactersFiltered.results;
      });
  }

  public resetFilter(): void {
    this.currentPage = this.form.controls['pageNumber'].value;
    this.changePage();
  }

  private formSubscription(): void {
    this.form.valueChanges.subscribe((formValue: { pageNumber: number }) => {
      this.currentPage = formValue.pageNumber;
      if (this.currentPage) {
        this.changePage();
      }
    });
  }

  private setForm(): void {
    this.form = new FormGroup({
      pageNumber: new FormControl(
        this.getCurrentPageFromLocalStorage,
        this.minMaxValidator(this.minPagesNumb, this.maxPagesNumb)
      ),
    });
  }

  private minMaxValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value > max || control.value < min) {
        return {
          min: true,
          max: true,
        };
      }
      return null;
    };
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
      .subscribe((charactersResponse) => {
        this.characters = charactersResponse.results;
        this.maxPagesNumb = charactersResponse.info.pages;
      });
  }
}
