import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterFormRoutingModule } from './character-form-routing.module';
import { CharacterFormMainComponent } from './containers';

@NgModule({
  declarations: [CharacterFormMainComponent],
  imports: [CommonModule, ReactiveFormsModule, CharacterFormRoutingModule],
})
export class CharacterFormModule {}
