import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharactersMainComponent } from './containers';
import { CharactersRoutingModule } from './characters-routing.module';

@NgModule({
  declarations: [CharactersMainComponent],
  imports: [CommonModule, CharactersRoutingModule],
})
export class CharactersModule {}
