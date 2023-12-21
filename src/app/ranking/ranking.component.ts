import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
 


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'tickets'];
  dataSource: any = [];
  allTickets: any = [];
  rankedTickets: any = [];
  private firestore: Firestore = inject(Firestore);

  constructor() {
    
  }

  ngOnInit(): void {
    this.getOpenTickets();
  }

  /**
   * This function will get the tickets from the database
   */
  async getOpenTickets() {
    await onSnapshot(collection(this.firestore, 'tickets'), (ticket) => {
      this.allTickets = [];
      this.rankedTickets = [];
      ticket.forEach(ticketData => {
        this.allTickets.push(ticketData.data());
      })
      this.countCompanies();
    })
  }
 
  /**
   * This function will count how often a company has created a ticket
   */
  countCompanies() {
    const companyCounts = {};

    this.allTickets.forEach(ticket => {
      const company = ticket.company;
      
      companyCounts[company] = (companyCounts[company] || 0) + 1;
    });
  
    const companyArray = Object.keys(companyCounts).map(company => ({
      company: company,
      anzahl: companyCounts[company]
    }));
    this.rankCompanies(companyArray)
    this.dataSource = new MatTableDataSource(this.rankedTickets);
  }

  /**
   * This function will get the top 3 companies with the most tickets
   * 
   * @param companyArray This is the array with the info how often each company has created a ticket
   */
  rankCompanies(companyArray) {
    companyArray.sort((a, b) => b.anzahl - a.anzahl);

    const top3 = companyArray.slice(0, 3);
  
    top3.forEach((companyInfo, index) => {
      const position = index + 1;
      const name = companyInfo.company;
      const ticketAnzahl = companyInfo.anzahl;

      this.rankedTickets.push({
        position: position,
        name: name,
        tickets: ticketAnzahl
      });
    });
  }
}
