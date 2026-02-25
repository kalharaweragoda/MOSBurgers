export class Employee{
    id: null | number;
    name: string;
    email: string;
    password: string;

    constructor(id:null|number,name:string, email:string, password:string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}