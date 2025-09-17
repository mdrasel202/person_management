import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Personcomponent } from "./personcomponent/personcomponent";

@Component({
  selector: 'app-root',
  imports: [Personcomponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('perosn_management_angular');
}
