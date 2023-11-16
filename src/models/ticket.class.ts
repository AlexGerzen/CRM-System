export class Ticket {
    title: string;
    date: number;
    importance: string;
    assignedEmployee: string;
    ticketNumber: number;
    ticketStatus: string;
    contact: string;
    description: string;

    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.date = obj ? obj.date : '';
        this.importance = obj ? obj.importance : '';
        this.assignedEmployee = obj ? obj.assignedEmployee : '';
        this.ticketNumber = obj ? obj.ticketNumber : '';
        this.ticketStatus = obj ? obj.ticketStatus : '';
        this.contact = obj ? obj.contact : '';
        this.description = obj ? obj.description : '';
    }

    public toJson() {
        return {
            title: this.title,
            date: this.date,
            importance: this.importance,
            assignedEmployee: this.assignedEmployee,
            ticketNumber: this.ticketNumber,
            ticketStatus: this.ticketStatus,
            contact: this.contact,
            description: this.description,
        }
    }
}