import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character, CharactersService } from 'src/app/services';

@Component({
  selector: 'characters-main',
  templateUrl: 'characters-main.component.html',
  styleUrls: ['characters-main.component.scss'],
})
export class CharactersMainComponent implements OnInit {
  public characters: Character[] = [];
  public page = 1;
  public showNextButton = true;
  public showPreviousButton = false;

  private maximumNumberOfPages = 42;
  private minimumNumberOfPages = 1;

  constructor(
    private charactersService: CharactersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  public nextPage(): void {
    if (this.page < this.maximumNumberOfPages) {
      this.page++;
      this.changePage();
    }
  }

  public previousPage(): void {
    if (this.page > this.minimumNumberOfPages) {
      this.page--;
      this.changePage();
    }
  }

  public getCharacterDetail(characterId: number): void {
    this.router.navigate(['characters', 'detail'], {
      state: { characterId: characterId },
    });
  }

  private changePage(): void {
    this.getCharacters();
    this.showNextButton = this.page < this.maximumNumberOfPages;
    this.showPreviousButton = this.page > this.minimumNumberOfPages;
  }

  private getCharacters(): void {
    this.charactersService
      .getCharactersByPage(this.page)
      .subscribe((response) => {
        this.characters = response.results;
        this.maximumNumberOfPages = response.info.pages;
      });
  }
}
