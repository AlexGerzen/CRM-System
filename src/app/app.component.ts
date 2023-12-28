import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crm-system';
  linkStatus = {
    finishedTickets: false,
    addTicket: false,
    openTickets: false,
    employees: false,
    dashboard: false,
    legalNotice: false,
  };
  staticPath;


  constructor(private location: Location) {

  }

  ngOnInit(): void {
    this.updateStaticPath();
    this.checkUrlChange();
  };

  /**
   * This function will check if the url is changed
   */
  checkUrlChange() {
    this.location.onUrlChange(() => {
      this.updateStaticPath();
    });
  }

  /**
   * This function will update the static path when the url is changed
   */
  updateStaticPath(): void {
    this.staticPath = this.getLastSegmentOfUrl();

    if (this.staticPath == '') {
      this.staticPath = 'dashboard'
    }

    this.highlightBackground();
  }

  /**
   * This function will get the last segment of the url
   * 
   * @returns It returns the last segment of the url
   */
  getLastSegmentOfUrl(): string {
    const path = this.location.path();
    const segments = path.split('/');
    return segments.length > 0 ? segments[segments.length - 1] : '';
  }


  /**
   * This function will highlight the background
   */
  highlightBackground() {
    this.clearAllBackgrounds();

    this.linkStatus[this.staticPath] = true;
  }

  /**
   * This function will clear all the backgorunds
   */
  clearAllBackgrounds() {
    this.linkStatus.addTicket = false;
    this.linkStatus.dashboard = false;
    this.linkStatus.employees = false;
    this.linkStatus.finishedTickets = false;
    this.linkStatus.openTickets = false;
  }
}
