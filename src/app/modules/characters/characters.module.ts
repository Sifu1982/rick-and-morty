import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Sharedmodule } from '../shared';
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CharactersRoutingModule,
    Sharedmodule,
  ],
})
export class CharactersModule {}
