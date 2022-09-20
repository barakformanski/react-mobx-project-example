import './App.css';
import ControlLine from './components/controlLine/ControlLine';
import ProductsListObserver from './components/productsList/ProductsList';
import ProductDetailsObserver from './productsDetails/ProductsDetails';

function App() {
  return (
    <div className="container">
    <h1 className="headerLine">        
       My Store
     </h1>
     <div className='content'>
   <div className='products-column'>
     <ProductsListObserver/>
     <ControlLine/>
     </div>
     <div className='product-details-column'>
     <ProductDetailsObserver/>
 </div>
 </div>
 </div>
  );
}

export default App;
