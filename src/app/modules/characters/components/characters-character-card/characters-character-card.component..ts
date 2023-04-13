import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/services';

@Component({
  selector: 'character-card',
  templateUrl: 'characters-character-card.component.html',
  styleUrls: ['characters-character-card.component.scss'],
})
export class CharactersCharacterCard {
  @Input() character!: Character;
  @Output() showDetail = new EventEmitter<number>();

  public getCharacterDetail(characterId: number): void {
    this.showDetail.emit(characterId);
  }
}
