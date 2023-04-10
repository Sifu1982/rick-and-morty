import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharacterFormRoutingModule } from './character-form-routing.module';
import { CharacterFormMainComponent } from './containers';

@NgModule({
  declarations: [CharacterFormMainComponent],
  imports: [CommonModule, CharacterFormRoutingModule],
})
export class CharacterFormModule {}
