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

  async getOpenTickets() {
    await onSnapshot(collection(this.firestore, 'tickets'), (ticket) => {
      this.allTickets = [];
      this.rankedTickets = [];
      ticket.forEach(ticketData => {
        this.allTickets.push(ticketData.data());
      })
      this.rankTickets();
    })
  }

  rankTickets() {
    // Ein Objekt erstellen, um die Anzahl der Vorkommen jeder "company" zu zählen
    const companyZaehlungen = {};
  
    // Durch das Array von Tickets iterieren
    this.allTickets.forEach(ticket => {
      const company = ticket.company;
      
  
      // Überprüfen, ob die "company" bereits gezählt wurde, wenn nicht, mit 1 initialisieren
      companyZaehlungen[company] = (companyZaehlungen[company] || 0) + 1;
    });
  
    // Ein Array von Objekten erstellen, jedes Objekt enthält die "company" und die Anzahl ihrer Vorkommen
    const companyArray = Object.keys(companyZaehlungen).map(company => ({
      company: company,
      anzahl: companyZaehlungen[company]
    }));
  
    // Das Array nach der Anzahl der Vorkommen absteigend sortieren
    companyArray.sort((a, b) => b.anzahl - a.anzahl);
  
    // Die Top 3 Unternehmen auswählen
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

    console.log(this.rankedTickets);
  
    this.dataSource = new MatTableDataSource(this.rankedTickets);
  }
}
