import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/ProductService';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  constructor(public modalRef: MdbModalRef<UpdateProductComponent>, private productService:ProductService){}
  item:any={}

  updateProduct():void{
    let discount = this.item.discount;
    let quantityInStock = this.item.quantityInStock;
    let unitPrice = this.item.unitPrice;
    let id = this.item.id;

    if(isNaN(discount)||isNaN(quantityInStock)||isNaN(unitPrice)){
      Swal.fire('Error', 'Data must be a number', 'error');
      return;
    }else if(discount<0||quantityInStock<0||unitPrice<=0){
      Swal.fire('Error', 'Data must be greater than zero', 'error');
      return;
    }else if(discount>100){
      Swal.fire('Error', 'Discount has to be lesser than 100', 'error');
      return;
    }
    let product = {id,discount,quantityInStock,unitPrice}
    this.productService.addProduct(product).subscribe({
          next: ()=>{
            Swal.fire('Updated!', 'Product updated successfully.', 'success');
          },
          error: (err)=>{
            if(err.status===400 && err.error){
              let errorMessage = '';
              let errorObj;
    
              try{
                errorObj = typeof err.error === 'string'?JSON.parse(err.error):err.error;
              }catch(e){
                console.error('Error parsing error response', e);
                errorObj = {}  
              } 
    
              if (typeof errorObj === 'object' && errorObj !== null) {
                errorMessage = Object.values(errorObj).join('<br>'); 
              } else {
                errorMessage = 'An unexpected error occurred';
              }
    
              Swal.fire('Error', errorMessage.trim(), 'error');
            }else {
              Swal.fire(
                'Error',
                'Something went wrong. Please try again.',
                'error'
              );
            }
          }
        });
  }

  setUnitPrice(event:any){
    this.item.unitPrice=parseFloat(event.target.value);
  }

  setDiscount(event:any){
    this.item.discount=parseFloat(event.target.value);
  }

  setQuantityInStock(event:any){
    this.item.quantityInStock=parseInt(event.target.value);
  }
}
