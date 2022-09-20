import store from '../store';
import { observer } from 'mobx-react'; 

const ProductDetails = () => {
     return <div>
      product details
      <div>
      {store.selectedProduct?store.selectedProduct.text:"nothind to display"}
      </div>
      </div>
  };
  
const ProductDetailsObserver = observer(ProductDetails)


  export default ProductDetailsObserver;