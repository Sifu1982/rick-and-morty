import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersCharacterCard } from './components';
import {
  CharacterDetailComponent,
  CharactersMainComponent,
} from './containers';

@NgModule({
  declarations: [
    CharactersMainComponent,
    CharactersCharacterCard,
    CharacterDetailComponent,
  ],
  imports: [CommonModule, CharactersRoutingModule],
})
export class CharactersModule {}
