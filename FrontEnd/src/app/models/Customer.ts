export class Customer{
    id: number | null;
    name: string;
    email: string;
    phoneNo: string;

    constructor(id: number | null, name: string, email: string, phoneNo: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNo = phoneNo;
    }
}