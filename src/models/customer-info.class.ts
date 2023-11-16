export class Customer {
    name: string;
    city: string;
    streetname: string;
    openTicket: boolean;
    zipCode: string;
    contact: string;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.city = obj ? obj.city : '';
        this.streetname = obj ? obj.streetname : '';
        this.openTicket = obj ? obj.openTicket : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.contact = obj ? obj.contact : '';
    }

    public toJson() {
        return {
            name: this.name,
            city: this.city,
            streetname: this.streetname,
            openTicket: this.openTicket,
            zipCode: this.zipCode,
            contact: this.contact
        }
    }

}