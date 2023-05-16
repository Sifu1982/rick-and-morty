import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'characters-pages-handler',
  templateUrl: 'characters-pages-handler.component.html',
  styleUrls: ['characters-pages-handler.component.scss'],
})
export class CharactersPagesHandler implements OnInit, OnDestroy {
  @Input() currentPage = 0;
  @Input() minPagesNumb = 0;
  @Input() maxPagesNumb = 0;
  @Input() placeholder = '';
  @Input() showNextButton = false;
  @Input() showPageNumber = false;
  @Input() showPreviousButton = false;
  @Output() changePageNumber = new EventEmitter<number>();

  public form = new FormGroup({
    pageNumber: new FormControl(),
  });

  private getCurrentPageFromLocalStorage = localStorage.getItem('currentPage');

  private formSubscription = new Subscription();

  ngOnInit(): void {
    this.setForm();
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  public changePage(page: number): void {
    this.currentPage = this.currentPage + page;
    this.storageCurrentPage();
    this.form.controls['pageNumber'].setValue(this.currentPage);
    this.emitPage();
  }

  private emitPage(): void {
    this.changePageNumber.emit(this.currentPage);
    this.showNextButton = this.currentPage < this.maxPagesNumb;
    this.showPreviousButton = this.currentPage > this.minPagesNumb;
  }

  private setForm(): void {
    this.form = new FormGroup({
      pageNumber: new FormControl(
        this.getCurrentPageFromLocalStorage || 1,
        this.minMaxValidator(this.minPagesNumb, this.maxPagesNumb)
      ),
    });

    this.formSubscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (formValue: Partial<{ pageNumber: number }>) => {
          this.currentPage = formValue.pageNumber as number;
          this.storageCurrentPage();
          this.emitPage();
        },
      });
  }

  private minMaxValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value > max || control.value < min) {
        return {
          min: true,
          max: true,
        };
      }
      return null;
    };
  }

  private storageCurrentPage(): void {
    localStorage.setItem('currentPage', this.currentPage.toString());
  }
}
