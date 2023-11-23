import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { Ticket } from 'src/models/ticket.class';

@Component({
  selector: 'app-dialog-ticket-info',
  templateUrl: './dialog-ticket-info.component.html',
  styleUrls: ['./dialog-ticket-info.component.scss']
})
export class DialogTicketInfoComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  ticketInfo: Ticket;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
  }

  ngOnInit(): void {
    this.getDocument();
    this.transformDate2();
  }

  async getDocument() {
    await getDoc(doc(collection(this.firestore, 'tickets'), this.data.id))
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          this.ticketInfo = new Ticket(docSnapshot.data());
          console.log(this.ticketInfo);

        } else {
          console.log('Dokument nicht gefunden.');
        }
      })
      .catch((error) => {
        console.error('Fehler beim Auslesen des Dokuments:', error);
      });
  }

  transformDate() {
    let date = new Date(this.ticketInfo.dueDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Monate beginnen bei 0 (Januar) bis 11 (Dezember), daher +1
    let day = date.getDate();

    let transformedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

    return transformedDate
  }

  transformDate2() {
    var timestamp = 1700496942; // Sekunden seit dem 1. Januar 1970 (Epoch)
    var milliseconds = timestamp * 1000; // Umrechnung in Millisekunden

    var normalesDatum = new Date(milliseconds);

    console.log(normalesDatum);
  }

}
