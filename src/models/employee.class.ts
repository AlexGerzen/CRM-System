export class Employee {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    status: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.phoneNumber = obj ? obj.phoneNumber : '';
        this.status = obj ? obj.status : '';
    }

    public toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            status: this.status,
        }
    }
}