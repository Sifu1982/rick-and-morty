import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'characters-pages-handler',
  templateUrl: 'characters-pages-handler.component.html',
  styleUrls: ['characters-pages-handler.component.scss'],
})
export class CharactersPagesHandler implements OnInit {
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

  ngOnInit(): void {
    this.setForm();
  }

  public nextPage(): void {
    if (this.currentPage < this.maxPagesNumb) {
      this.currentPage++;
      this.storageCurrentPage();
      this.form.controls['pageNumber'].setValue(this.currentPage);
      this.changePage();
    }
  }

  public previousPage(): void {
    if (this.currentPage > this.minPagesNumb) {
      this.currentPage--;
      this.storageCurrentPage();
      this.form.controls['pageNumber'].setValue(this.currentPage);
      this.changePage();
    }
  }

  private changePage(): void {
    this.changePageNumber.emit(this.currentPage);
    this.showNextButton = this.currentPage < this.maxPagesNumb;
    this.showPreviousButton = this.currentPage > this.minPagesNumb;
  }

  private setForm(): void {
    this.form = new FormGroup({
      pageNumber: new FormControl(
        this.getCurrentPageFromLocalStorage,
        this.minMaxValidator(this.minPagesNumb, this.maxPagesNumb)
      ),
    });

    this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (formValue: Partial<{ pageNumber: number }>) => {
        this.currentPage = formValue.pageNumber as number;
        this.storageCurrentPage();
        this.changePage();
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
