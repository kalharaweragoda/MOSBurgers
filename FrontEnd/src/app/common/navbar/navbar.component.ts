import { CommonModule, Location } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatProgressSpinnerModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{
  
  isLoaded: boolean = false;
  location: Location;

  constructor(location:Location){
    this.location=location;
  }

  ngOnInit(): void {
    this.isLoaded=true;
  }

}
