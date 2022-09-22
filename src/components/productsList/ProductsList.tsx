import Product from '../../interface';
import "./ProductList.css";
import store from "../../store";
import { observer } from "mobx-react";
import SearchBarComponent from "../../assets/searchBarComponent/SerachBarComponent";
import { useEffect, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState<any>("");
  const products = store.products;
  const filteredProducts = filterProducts(products, searchQuery);
  let productsWithPaginations = filteredProducts.slice(
    store.paginationStartPoint,
    store.paginationStartPoint + 4
  );

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
        {productsWithPaginations.map((product: Product) => {
          return (
            <li
              key={product.id}
              onClick={() => {
                store.setSelectedProduct(product.id);
              }}
              className="li-container"
              style={{
                backgroundColor:
                  store.productToDisplay?.id == product.id
                    ? "skyblue"
                    : "white",
              }}
            >
              <div className="image-li-contianer">
                <img
                  src={product.thumbnail}
                  alt="image"
                  className="product-image"
                />
              </div>
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
          );
        })}
      </ul>
    </div>
  );
};

const ProductsListObserver = observer(ProductsList)

  export default ProductsListObserver;