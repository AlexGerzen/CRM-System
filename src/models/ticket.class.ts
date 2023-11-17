export class Ticket {
    title: string;
    date: Date;
    dueDate: number;
    urgency: string;
    assignedEmployee: string;
    ticketNumber: string;
    ticketStatus: string;
    contact: string;
    description: string;
    company:string;

    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.date = obj ? obj.date : '';
        this.dueDate = obj ? obj.dueDate : '';
        this.urgency = obj ? obj.importance : '';
        this.assignedEmployee = obj ? obj.assignedEmployee : '';
        this.ticketNumber = obj ? obj.ticketNumber : '';
        this.ticketStatus = obj ? obj.ticketStatus : '';
        this.contact = obj ? obj.contact : '';
        this.description = obj ? obj.description : '';
        this.company = obj ? obj.company : '';
    }

    public toJson() {
        return {
            title: this.title,
            date: this.date,
            urgency: this.urgency,
            assignedEmployee: this.assignedEmployee,
            ticketNumber: this.ticketNumber,
            ticketStatus: this.ticketStatus,
            contact: this.contact,
            description: this.description,
            dueDate: this.dueDate,
            company : this.company,
        }
    }
}