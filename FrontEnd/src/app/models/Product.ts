export class Product{
    id: null | number;
    itemCode: string;
    itemType: string;
    itemName: string;
    unitPrice: number;
    discount: number;
    quantityInStock: number;

    constructor(id:null|number,itemCode:string, itemType:string, itemName:string, unitPrice:number, discount:number, quantityInStock:number){
        this.id = id;
        this.itemCode = itemCode;
        this.itemType = itemType;
        this.itemName = itemName;
        this.unitPrice = unitPrice;
        this.discount = discount;
        this.quantityInStock = quantityInStock;
    }
}