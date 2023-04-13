import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'error',
  templateUrl: 'error.component.html',
  styleUrls: ['error.component.scss'],
})
export class ErrorComponent implements OnInit {
  ngOnInit(): void {
    console.log('Error');
  }
}
