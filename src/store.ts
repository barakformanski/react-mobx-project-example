import { makeAutoObservable, toJS,computed } from "mobx";
import Product from "./interface"

class Store{
    products: Product[] =[];
    finishLoadingProducts:boolean = false;
    selectedProduct: Product|undefined=undefined;
    paginationStartPoint:number=0;
constructor(){
    makeAutoObservable(this)
}

async loadProducts(){
    const products =await fetch('https://dummyjson.com/products')
.then(res => res.json())
this.products = products.products
this.finishLoadingProducts=true
}

addProduct(){
    this.selectedProduct = {
            title:`product ${this.products.length+1}`,
            id:this.products.length+1,
            description: "",
            price: undefined,
            thumbnail: "",

        }
        this.products.unshift(this.selectedProduct)
        this.paginationStartPoint=0
}
saveProduct(savedProduct:Product){
const productPosition= this.products.findIndex(product=>product.id === savedProduct.id)
this.products[productPosition]=
    {...this.products[productPosition],
            title:savedProduct.title,
            id:savedProduct.id,
            description:savedProduct.description,
            price:savedProduct.price,
        }
}

removeProduct(id:number){
    this.selectedProduct=undefined;
    this.products=this.products.filter(product=>product.id != id)
};


setSelectedProduct(id:number){
    this.selectedProduct=this.products.find(product=>product.id==id)
}

changePaginationStartPoint(direction:string){
    const startPoint:number=this.paginationStartPoint;
let newStartPoint=0;
    if(direction=="forward"){
        newStartPoint=startPoint+4
        if(newStartPoint+4>this.products.length){
            newStartPoint=this.products.length-4
        }
        else{     
            console.log(
             "startPoint",startPoint)
            console.log("this.products.length",this.products.length);
                   
        newStartPoint=startPoint+4;
}    }
if(direction=="backward"){
if(startPoint-4<0)
{newStartPoint=0}
else{
    newStartPoint=startPoint-4}
}
console.log(newStartPoint);

this.paginationStartPoint=newStartPoint;
this.setSelectedProduct(this.products[newStartPoint].id)
}

get productToDisplay (){
    if(this.selectedProduct)
    return this.selectedProduct
    else if(this.products.length)
    return this.products[0]
    else return undefined
}
}




const store = new Store();
export default store;