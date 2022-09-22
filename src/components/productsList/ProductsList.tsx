import Product from '../../interface';
import "./ProductList.css";
import store from "../../store";
import { observer } from "mobx-react";
import SearchBarComponent from "../../assets/searchBarComponent/SerachBarComponent";
import { useState } from "react";
const filterProducts = (products: any, query: any) => {
  if (!query) {
    return products;
  }

  return products.filter((product: any) => {
    const productName = product?.title?.toLowerCase();
    return productName?.includes(query);
  });
};

const ProductsList = () => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState<any>(query || "");
  const products = store.products;
  const filteredProducts = filterProducts(products, searchQuery);
  return (
    <div className="product-list-container">
      <div className="control-buttons-container">
        <button className="add-button" onClick={() => store.addProduct()}>
          + Add
        </button>
        <SearchBarComponent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <ul className="ul-container">
        {filteredProducts.map((product: Product) => (
          <li
            key={product.id}
            onClick={() => {
              store.setSelectedProduct(product.id);
            }}
            className="li-container"
            style={{
              backgroundColor:
                store.productToDisplay?.id == product.id ? "skyblue" : "white",
            }}
          >
            <img src={product.thumbnail} alt="Logo" className="product-image" />
            <div className="title-and-description">
              <div className="bold">{product.title}</div>
              <div>{product.description}</div>
            </div>
            <button
              className="delete-button bold"
              onClick={() => {
                store.removeProduct(product.id);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductsListObserver = observer(ProductsList)

  export default ProductsListObserver;