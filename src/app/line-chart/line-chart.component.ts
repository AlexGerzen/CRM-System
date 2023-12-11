import { Component, ViewChild, inject } from "@angular/core";
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexYAxis,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  private firestore: Firestore = inject(Firestore);

  showChart: boolean = false;

  ticketsJan: number;
  ticketsFeb: number;
  ticketsMar: number;
  ticketsApr: number;
  ticketsMay: number;
  ticketsJun: number;
  ticketsJul: number;
  ticketsAug: number;
  ticketsSep: number;
  ticketsOct: number;
  ticketsNov: number;
  ticketsDez: number;
  allTickets = [];
  allFinishedTickets = []

  ticketsDone:boolean = false;
  finishedTicketsDone:boolean = false;

  constructor() {

  }

  ngOnInit(): void {
    this.getTickets();
  }

  async getTickets() {
    this.clearAllMonths();
    await this.getOpenTickets();
    this.getFinishedTickets();
    
  }

  async getOpenTickets() {
    await onSnapshot(collection(this.firestore, 'tickets'), (ticket) => {
      ticket.forEach(ticketData => {
        this.allTickets.push(ticketData.data());
      })
      this.sortTicket(this.allTickets);
      this.ticketsDone = true;
      if (this.ticketsDone && this.finishedTicketsDone) {
        this.generateChart();
        this.showChart = true;
      }
    })
  }

  getFinishedTickets() {
    onSnapshot(collection(this.firestore, 'ticketHistory'), (ticket) => {
      ticket.forEach(ticketData => {
        this.allFinishedTickets.push(ticketData.data());
      })
      this.sortTicket(this.allFinishedTickets);
      this.finishedTicketsDone = true;
      if (this.ticketsDone && this.finishedTicketsDone) {
        this.generateChart();
        this.showChart = true;
      }
    })
  }

  sortTicket(ticket) { 
    for (let i = 0; i < ticket.length; i++) {
      let timeStamp = ticket[i].date;

      let date = new Date(timeStamp);
      let month = date.getMonth() + 1;

      this.addToMonth(month)
    }
  }

  addToMonth(month) {
    if (month === 1) {
      this.ticketsJan++
    } else if (month === 2) {
      this.ticketsFeb++
    } else if (month === 3) {
      this.ticketsMar++
    } else if (month === 4) {
      this.ticketsApr++
    } else if (month === 5) {
      this.ticketsMay++
    } else if (month === 6) {
      this.ticketsJun++
    } else if (month === 7) {
      this.ticketsJul++
    } else if (month === 8) {
      this.ticketsAug++
    } else if (month === 9) {
      this.ticketsSep++
    } else if (month === 10) {
      this.ticketsOct++
    } else if (month === 11) {
      this.ticketsNov++
    } else if (month === 12) {
      this.ticketsDez++
    }
  }

  clearAllMonths() {
    this.ticketsJan = 0;
    this.ticketsFeb = 0;
    this.ticketsMar = 0;
    this.ticketsApr = 0;
    this.ticketsMay = 0;
    this.ticketsJun = 0;
    this.ticketsJul = 0;
    this.ticketsAug = 0;
    this.ticketsSep = 0;
    this.ticketsOct = 0;
    this.ticketsNov = 0;
    this.ticketsDez = 0;
  }

  generateChart() {
    this.ticketsDone = false;
    this.finishedTicketsDone = false;
    this.chartOptions = {
      series: [
        {
          name: "Amount of tickets",
          data: [this.ticketsJan, this.ticketsFeb, this.ticketsMar, this.ticketsApr, this.ticketsMay, this.ticketsJun, this.ticketsJul, this.ticketsAug, this.ticketsSep, this.ticketsOct, this.ticketsNov, this.ticketsDez]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false,
        }
      },
      tooltip: {
        theme: 'dark', // Wähle ein Tooltip-Thema (dark, light)
        x: {
          show: true, // Zeige X-Wert im Tooltip
        },
        y: {
          formatter: function (val) {
            return val + " Einheiten"; // Passe das Y-Wert-Format an
          }
        }
        // Weitere Tooltip-Optionen hier
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Created tickets by month",
        align: "left",
        style: {
          color: 'white'
        },
      },
      grid: {
        row: {
          colors: ["#c72a68", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: 'white'
          }
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dez"
        ],
        labels: {
          style: {
            colors: 'white'
          }
        }
      },
    };
  }

}
