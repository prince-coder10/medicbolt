import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import axios from "axios";

function Clone() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [nextImage, setNextImage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slide, setSlide] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleViewDetails = (productId) => {
    const selectedProd = products.find((prod) => prod._id === productId);
    setSelectedProduct(selectedProd);
    setIsDescriptionOpen(true);
    setSlide(selectedProd.ProductImages || []); // Set slide to the first image or an empty array if no images are available
    setCurrentIndex(0); // Reset the currentIndex to 0 when a new product is selected
  };

  const handleGoBack = () => {
    setIsDescriptionOpen(false);
  };

  const handleNextIMage = () => {
    setNextImage(true);
    if (nextImage) {
      setSlide(selectedProduct.ProductImages);
      // console.log(slide);
      if (currentIndex < slide.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setNextImage(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/")
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://127.0.0.1:5000/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = async () => {
    // Check if the query is empty before making the API request
    if (query.trim() === "") {
      // Optionally, you can display an error message or perform other actions here
      console.log("Search query is empty");
      return; // Exit the function early if the query is empty
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/searchProduct/${query}`
      );
      setResults(response.data);
      console.log(results);
    } catch (error) {
      console.error("Error searching for products:", error);
      // You can handle errors here, such as displaying an error message to the user
    }
  };

  const handleSearchClose = () => {
    setResults([]);
  };

  return (
    <div>
      <h1 className="center">Product</h1>
      <div className="search__cont">
        <input
          type="search"
          placeholder="search for a product"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <i
          className="fa-solid fa-magnifying-glass fa-lg search"
          onClick={handleSearch}
        ></i>
        {results.length > 0 && (
          <div className="search__result">
            {results && (
              <i
                className="fa-solid fa-xmark fa-lg"
                onClick={handleSearchClose}
              ></i>
            )}
            {results &&
              results.map((product) => (
                <div key={product._id} className="product__card">
                  <img
                    className="product__img"
                    src={product.ProductImages && product.ProductImages[0]}
                    alt={product.ProductName}
                  />
                  <p className="product__name">{product.ProductName}</p>
                  <button
                    type="button"
                    onClick={() => handleViewDetails(product._id)}
                    className="btn btn-p"
                  >
                    View details
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
      <Link to="/create" className="add">
        <button className="btn btn-success">Add new product</button>
      </Link>
      <div className="container">
        {products.map((product) => (
          <div key={product._id} className="product__card">
            <img
              className="product__img"
              src={product.ProductImages && product.ProductImages[0]}
              alt={product.ProductName}
            />
            <p className="product__name">{product.ProductName}</p>
            <button
              type="button"
              onClick={() => handleViewDetails(product._id)}
              className="btn btn-p"
            >
              View details
            </button>
          </div>
        ))}
      </div>
      {isDescriptionOpen && selectedProduct && (
        <div className="description__container">
          <div className="description__content">
            <div className="product_img__cont">
              <img
                className="product_desc__img"
                src={slide && slide[currentIndex]}
                alt={selectedProduct.ProductName}
                onClick={handleNextIMage}
              />
            </div>
            <div className="description">
              <p className="prd__name">{selectedProduct.ProductName}</p>
              <div className="buttons">
                <div className="buttons2">
                  <Link className="link" to="tel:+2347087000600">
                    <button>Call to order</button>
                  </Link>
                  <p>OR</p>
                  <Link className="link" to="https://wa.me/+2347062642542">
                    <button>Send us a message</button>
                  </Link>
                </div>

                <button onClick={handleGoBack} className="btn btn-back">
                  Go Back
                </button>
              </div>
            </div>
          </div>
          <button
            className="btn btn-danger"
            onClick={(e) => handleDelete(selectedProduct._id)}
          >
            Delete
          </button>
          <Link to={`/update/${selectedProduct._id}`}>
            <button className="btn btn-success">Edit</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Clone;
