import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'character-form-main',
  templateUrl: 'character-form-main.component.html',
  styleUrls: ['character-form-main.component.scss'],
})
export class CharacterFormMainComponent implements OnInit {
  ngOnInit(): void {
    console.log('Hola Mundo');
  }
}
