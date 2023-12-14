import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crm-system';
  linkStatus = {
    linkFinishedTickets: false,
    linkAddTickets: false,
    linkOpenTickets: false,
    linkEmployees: false,
    linkDashboard: true
  };

  highlightBackground(link) {
    this.clearAllBackgrounds();

    let part1 = 'link';
    let part2 = link;

    let linkName = part1 + part2;

    this.linkStatus[linkName] = true;
  }

  clearAllBackgrounds() {
    this.linkStatus.linkAddTickets = false;
    this.linkStatus.linkDashboard = false;
    this.linkStatus.linkEmployees = false;
    this.linkStatus.linkFinishedTickets = false;
    this.linkStatus.linkOpenTickets = false;
  }
}
