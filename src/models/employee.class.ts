export class Employee {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    position: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.phoneNumber = obj ? obj.phoneNumber : '';
        this.position = obj ? obj.position : '';
    }

    public toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            position: this.position,
        }
    }
}