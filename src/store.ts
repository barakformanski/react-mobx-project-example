import { makeAutoObservable, toJS,computed } from "mobx";
import Product from "./interface"
import { nanoid } from "nanoid";

class Store{
    products: Product[]=[];
    selectedProduct: Product|null=null
constructor(){
    makeAutoObservable(this)
}


addProduct(text:string){

    this.selectedProduct = {
            text,id:nanoid()
        }
        this.products.push(this.selectedProduct)
}

removeProduct(id:string){
    this.selectedProduct=null
    this.products=this.products.filter(product=>product.id!=id)
};


}


const store = new Store();
export default store;