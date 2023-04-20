import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  color: string = '';
  bgColor: string = '';
  border: string = '';
  shadow: string = '';
}
