import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Sharedmodule } from '../shared';
import { CharactersRoutingModule } from './characters-routing.module';
import {
  CharactersCharacterCard,
  CharactersFilterComponent,
  CharactersPagesHandler,
} from './components';
import {
  CharacterDetailComponent,
  CharactersMainComponent,
} from './containers';

@NgModule({
  declarations: [
    CharactersCharacterCard,
    CharacterDetailComponent,
    CharactersFilterComponent,
    CharactersMainComponent,
    CharactersPagesHandler,
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    ReactiveFormsModule,
    Sharedmodule,
  ],
})
export class CharactersModule {}
