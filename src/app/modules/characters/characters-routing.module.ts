import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CharacterDetailComponent,
  CharactersMainComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: CharactersMainComponent,
  },
  {
    path: 'detail',
    component: CharacterDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
