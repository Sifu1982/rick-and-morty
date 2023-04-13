import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'character-form-main',
  templateUrl: 'character-form-main.component.html',
  styleUrls: ['character-form-main.component.scss'],
})
export class CharacterFormMainComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    planet: new FormControl('', Validators.required),
    isAlive: new FormControl(false, Validators.requiredTrue),
  });

  public valueChanges: any;

  ngOnInit(): void {
    console.log('Formulario');

    this.form.valueChanges.subscribe(
      (formValue) => (this.valueChanges = formValue)
    );
  }

  public onSubmit(): void {
    console.log(this.form.value);
  }
}
