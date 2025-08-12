import { Component } from '@angular/core';
import { Nav } from "../layouts/nav/nav";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App{
  protected readonly title = "Dating app";
}
