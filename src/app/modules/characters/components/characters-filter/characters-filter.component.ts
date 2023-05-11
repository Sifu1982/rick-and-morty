import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CharacterGender,
  CharacterStatus,
  CharactersFiltered,
} from 'src/app/services';

@Component({
  selector: 'characters-filter',
  templateUrl: 'characters-filter.component.html',
  styleUrls: ['characters-filter.component.scss'],
})
export class CharactersFilterComponent implements OnInit {
  public form!: FormGroup;

  @Input() charactersFilteredNumber = 0;
  @Input() showFilteredNumber = false;

  @Output() filterResult = new EventEmitter<CharactersFiltered>();
  @Output() filterReseted = new EventEmitter<boolean>();

  ngOnInit(): void {
    // console.log(this.charactersFilteredNumber);

    this.setForm();
  }

  public resetFilter(): void {
    const initialFormValue: CharactersFiltered = {
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
    };
    this.form.reset(initialFormValue);
    this.filterReseted.emit(true);
  }

  private setForm(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      status: new FormControl<CharacterStatus | ''>(''),
      species: new FormControl(''),
      type: new FormControl(''),
      gender: new FormControl<CharacterGender | ''>(''),
    });

    this.form.valueChanges.subscribe((form) => {
      this.filterResult.emit(form);
    });
  }
}
