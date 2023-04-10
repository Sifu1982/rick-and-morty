import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterFormMainComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: CharacterFormMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterFormRoutingModule {}
