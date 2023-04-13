import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersMainComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: CharactersMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
