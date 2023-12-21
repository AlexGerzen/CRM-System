import { Component, ViewChild, inject } from '@angular/core';
import { ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ChartComponent } from "ng-apexcharts";
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  colors: string[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  private firestore: Firestore = inject(Firestore);
  allTickets = [];
  allLowTickets = [];
  allMiddleTickets = [];
  allUrgentTickets = [];
  showChart: boolean = false;

  constructor() {
    this.getOpenTickets();
  }

  /**
   * This function will get all the tickets from the database
   */
  async getOpenTickets() {
    await onSnapshot(collection(this.firestore, 'tickets'), (ticket) => {
      ticket.forEach(ticketData => {
        this.allTickets.push(ticketData.data());
      })
      this.sortTicket();
      this.generateChart();
      this.showChart = true;
    })
  }

  /**
   * This function will sort all the tickets depending on the urgency
   */
  sortTicket() {
    for (let i = 0; i < this.allTickets.length; i++) {
      if (this.allTickets[i].urgency == 'Urgent') {
        this.allUrgentTickets.push(this.allTickets[i]);
      } else if (this.allTickets[i].urgency == 'Middle') {
        this.allMiddleTickets.push(this.allTickets[i]);
      } else if (this.allTickets[i].urgency == 'Low') {
        this.allLowTickets.push(this.allTickets[i]);
      }
    }
  }

  /**
   * This function will generate the chart
   */
  generateChart() {
    this.chartOptions = {
      series: [this.allUrgentTickets.length, this.allMiddleTickets.length, this.allLowTickets.length],
      // colors: ["pink", "yellow", "green"],
      dataLabels: {
        style: {
          colors: ["white", "white", "white"], // Hier die Farben der einzelnen Slices eintragen
        },
      },
      chart: {
        width: 400,
        type: "pie",
      },
      labels: ["High Prio", "Middle Prio", "Low Prio"],
      legend: {
        position: "bottom",
        show: true,
        labels: {
          colors: ["white", "white", "white"]
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  }
}

