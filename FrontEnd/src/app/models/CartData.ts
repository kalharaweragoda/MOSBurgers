import { Customer } from "./Customer";
import { Employee } from "./Employee";

export interface CartData{
    customers: Customer[],
    employees: Employee[]
}