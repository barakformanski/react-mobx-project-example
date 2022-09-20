import Product from '../../interface';
import store from '../../store';
import { observer } from 'mobx-react'; 

const ProductsList=()=> {
  return <div>
      available products
      <ul>
          {store.products.map((product:Product) => (
             <li onClick={()=>{
            //   store.setSelectedProduct(product.id)
              store.removeProduct(product.id)
             }}
              key={(product.id)}>{product.text}</li>
          ))}
        </ul>
      </div>
  };

const ProductsListObserver = observer(ProductsList)

  export default ProductsListObserver;