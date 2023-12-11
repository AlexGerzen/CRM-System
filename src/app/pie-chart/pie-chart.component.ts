import { Component, ViewChild } from '@angular/core';
import { ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ChartComponent } from "ng-apexcharts";

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

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13],
      // colors: ["pink", "yellow", "green"],
      dataLabels: {
        style: {
          colors: ["white", "white", "white"], // Hier die Farben der einzelnen Slices eintragen
        },
      },
      // fill: {
      //   colors: ['white', 'red', 'green'],
      //   opacity: 1,
      //   type: "solid"
      // },
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["High Prio", "Middle Prio", "Low Prio"],
      legend: {
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

