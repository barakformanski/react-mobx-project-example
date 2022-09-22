import store from '../store';
import { observer } from 'mobx-react'; 
import { useEffect, useState } from "react";
import "./ProductsDetails.css";

type ErrorObject = {
  errTitles?: string;
  errPrice?: string;
};

const initialErrorObject: ErrorObject = {
  errTitles: "",
  errPrice: "",
};

const ProductDetails = () => {
  const [productTitle, setProductTitle] = useState<string | undefined>(
    store.productToDisplay?.title ? store.productToDisplay?.title : ""
  );
  const [productDescription, setProductDescription] = useState<
    string | undefined
  >(
    store.productToDisplay?.description
      ? store.productToDisplay?.description
      : ""
  );
  const [productPrice, setProductPrice] = useState<number | undefined>(
    store.productToDisplay?.price ? store.productToDisplay?.price : undefined
  );
  const [errorMessage, setErrorMessage] =
    useState<ErrorObject>(initialErrorObject);
  const handleOnChange = (e: any) => {
    let { name, value } = e.target;
    console.log(name);

    switch (name) {
      case "title":
        setProductTitle(value);
        break;
      case "price":
        setProductPrice(value);
        break;
      case "description":
        setProductDescription(value);
        break;
    }
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    setErrorMessage(
      validator({ productTitle, productDescription, productPrice })
    );
  };

  useEffect(() => {
    setErrorMessage(initialErrorObject);
    setProductTitle(store.productToDisplay?.title);
    setProductDescription(
      store.productToDisplay?.description
        ? store.productToDisplay?.description
        : ""
    );
    setProductPrice(
      store.productToDisplay?.price ? store.productToDisplay?.price : undefined
    );
  }, [store.productToDisplay?.title]);
  useEffect(() => {
    if (Object.keys(errorMessage).length > 0) {
      console.log("errorMessage", errorMessage);
    } else {
      const savedProduct = {
        title: productTitle,
        id: store.productToDisplay!.id,
        description: productDescription,
        price: productPrice,
        thumbnail: "",
      };
      store.saveProduct(savedProduct);
    }
  }, [errorMessage]);

  return (
    <div className="products-details-container">
      {store.productToDisplay ? (
        <div className="products-details-second-container">
          <div className="product-details-title">
            {store.productToDisplay.title} Details
          </div>
          <div className="products-details-form-container">
            <img
              src={store.productToDisplay.thumbnail}
              alt="Logo"
              className="product-image-details-side"
            />
            <form onSubmit={handleOnSubmit} className="form-container">
              <div className="input-label-container">
                {errorMessage.errTitles &&
                (productTitle == undefined || productTitle == "") ? (
                  <p>{errorMessage.errTitles}</p>
                ) : null}
                <label>Name</label>
                <input
                  type="text"
                  name="title"
                  onChange={handleOnChange}
                  value={productTitle}
                  className="product-input"
                />
              </div>

              <div className="input-label-container">
                <label>description</label>
                <textarea
                  value={productDescription}
                  onChange={handleOnChange}
                  name="description"
                  className="product-input"
                  rows={4}
                />
              </div>
              <div className="input-label-container">
                <label>price</label>
                <div>
                  <input
                    type="number"
                    name="price"
                    onChange={handleOnChange}
                    value={productPrice}
                    className="product-input price-input"
                  />
                  $
                </div>
                {errorMessage.errPrice &&
                (productPrice == undefined || productPrice <= 0) ? (
                  <p>{errorMessage.errPrice}</p>
                ) : null}
              </div>
              <input type="submit" value={"save"} className="save-button" />
            </form>
          </div>
        </div>
      ) : (
        <div>nothing to display,please add a product</div>
      )}
    </div>
  );
};

const ProductDetailsObserver = observer(ProductDetails);

export default ProductDetailsObserver;

const validator = (data: {
  productTitle: string | undefined;
  productDescription: string | undefined;
  productPrice: number | undefined;
}) => {
  let err: ErrorObject = {};
  if (!data.productTitle?.trim()) {
    err.errTitles = "name is required";
  }

  if (!data.productPrice || data.productPrice <= 0) {
    err.errPrice = "price must be bigger than 0";
  }

  return err;
};
 