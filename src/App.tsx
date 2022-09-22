import { useEffect } from "react";
import "./App.css";
import ProductsListObserver from "./components/productsList/ProductsList";
import ProductDetailsObserver from "./productsDetails/ProductsDetails";
import store from "./store";
import { observer } from "mobx-react";

function App() {
  useEffect(() => {
    store.loadProducts();
  });
  return (
    <div className="body-container">
      <header className="header">My Store</header>
      {store.finishLoadingProducts ? (
        <div className="main-container">
          <div className="content-container">
            <div className="products-column">
              <ProductsListObserver />
            </div>
            <div className="product-details-column">
              <ProductDetailsObserver />
            </div>
          </div>
          <div>pagination later-on be here</div>
        </div>
      ) : (
        <div>LOADING PRODUCTS...</div>
      )}
      <footer className="footer">footer</footer>
    </div>
  );
}
const AppObserver = observer(App);

export default AppObserver;
