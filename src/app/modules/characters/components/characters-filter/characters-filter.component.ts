import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
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
export class CharactersFilterComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  @Input() charactersFilteredNumber = 0;
  @Input() showFilteredNumber = false;

  @Output() filterResult = new EventEmitter<CharactersFiltered>();
  @Output() filterReseted = new EventEmitter<boolean>();

  private formSubscription = new Subscription();

  ngOnInit(): void {
    this.setForm();
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
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

    this.formSubscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe((form) => {
        this.filterResult.emit(form);
      });
  }
}
