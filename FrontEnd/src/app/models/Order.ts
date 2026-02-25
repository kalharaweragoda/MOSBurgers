export class Order{
    id: number|null;
    date: string;
    employeeId: number;
    employeeName: string;
    customerId: number;
    total: number;
    paymentType: string

    constructor(id: number|null, date: string, employeeId: number, employeeName: string, customerId: number, total: number, paymentType: string) {
        this.id = id;
        this.date = date;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.customerId = customerId;
        this.total = total;
        this.paymentType = paymentType;
    }
}