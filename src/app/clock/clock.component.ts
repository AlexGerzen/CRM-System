import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  currentTime: Date = new Date();

  ngOnInit(): void {
    this.setClock();
  }

  /**
   * This function sets up the clock
   */
  setClock() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
}
