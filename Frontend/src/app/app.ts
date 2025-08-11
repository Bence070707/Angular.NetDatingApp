import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../layouts/nav/nav";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App{
  protected readonly title = "Dating app";
}
