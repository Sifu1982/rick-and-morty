import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberComponent } from './components';

@NgModule({
  declarations: [InputNumberComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputNumberComponent],
})
export class Sharedmodule {}
