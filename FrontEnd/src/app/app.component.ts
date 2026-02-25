import { Component } from '@angular/core';
import { NavbarComponent } from './common/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./common/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
}
