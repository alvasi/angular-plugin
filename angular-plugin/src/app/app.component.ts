import { Component, Inject } from '@angular/core';
import { Client, CLIENT } from './client';

@Component({
  selector: 'engine-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular Plugin Test';
  constructor(@Inject(CLIENT) private client: Client) {}
}