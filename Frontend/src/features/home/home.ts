import { Component, Input, OnInit, signal } from '@angular/core';
import { Register } from "../register/register";

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  protected registerMode = signal(false);

  toggleRegisterMode(value:boolean) {
    this.registerMode.set(value);
  }

  ngOnInit() {
   setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
      this.currentPhrase.set(this.phrases[this.currentIndex]);
    }, 5000);
  }

  private phrases = [
    { title: "Find your spark", sub: "Meet someone who makes your heart race." },
    { title: "Love starts here", sub: "Your next chapter is just one match away." },
    { title: "Your story begins today", sub: "Every great romance starts with hello." },
    { title: "Swipe into your future", sub: "The love of your life could be a tap away." }
    // add the rest
  ];

  currentIndex = 0;
  currentPhrase = signal(this.phrases[0]);
}
