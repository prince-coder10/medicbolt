import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "./Products.css";

function CreateProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    ProductName: "",
    ProductImages: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // Limit to 3 images
    const promises = [];

    if (files.length > 0) {
      files.forEach((file) => {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        const uploadTask = fileRef.put(file);

        const promise = new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.error("Error uploading file:", error);
              reject(error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log("Download URL:", downloadURL);
                resolve(downloadURL);
              });
            }
          );
        });

        promises.push(promise);
      });

      Promise.all(promises)
        .then((downloadURLs) => {
          console.log("All download URLs:", downloadURLs);
          setProduct((prevProduct) => ({
            ...prevProduct,
            ProductImages: downloadURLs,
          }));
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
        });
    } else {
      console.log("No file selected");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/createProduct", product, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(product); // You can send the product data to your backend or perform other actions here
      navigate("/clone");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <h1 className="heading__text">Add Product</h1>
      <form onSubmit={handleSubmit} className="product__form">
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="ProductName"
            value={product.ProductName}
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <div className="form__style">
            <label htmlFor="productImages">Product Images (up to 3):</label>
            <input
              type="file"
              id="productImages"
              name="productImages"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />
          </div>
          {product.ProductImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              style={{ width: "100px", height: "100px", margin: "5px" }}
            />
          ))}
        </div>
        <button type="submit" className="btn-success">
          Submit
        </button>
      </form>
      <Link to="/clone">
        <button className="btn"> Go back</button>
      </Link>
    </>
  );
}

export default CreateProduct;
