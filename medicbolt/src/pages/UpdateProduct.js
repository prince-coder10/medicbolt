import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "./Products.css";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState({
    ProductName: "",
    ProductImages: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducts((prevProduct) => ({
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
          setProducts((prevProduct) => ({
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

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/getUser/${id}`)
      .then((result) => {
        console.log(result);
        setProducts({
          ProductName: result.data.ProductName,
          ProductImages: result.data.ProductImages,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let updatedData = {
        ProductName: products.ProductName,
      };

      if (
        products.ProductImages.length === 0 &&
        products.ProductImages.length !== 0
      ) {
        // If no new images are chosen but there are existing images, send back the existing images as they are
        updatedData.ProductImages = JSON.stringify(products.ProductImages);
      }
      console.log(updatedData);

      await axios.put(`http://127.0.0.1:5000/updateProduct/${id}`, updatedData);
      navigate("/clone");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1 className="heading__text"> Edit Product</h1>

      <form onSubmit={handleUpdate} className="product__form">
        <div>
          <label htmlFor="ProductName">Product Name:</label>
          <input
            type="text"
            id="ProductName"
            name="ProductName"
            value={products.ProductName}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </div>
        <div>
          <div className="form__style">
            <label htmlFor="ProductImages">Product Images (up to 3):</label>
            <input
              type="file"
              id="ProductImages"
              name="ProductImages"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
          {products.ProductImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              style={{ width: "100px", height: "100px", margin: "5px" }}
            />
          ))}
        </div>
        <button type="submit" className="btn-success ">
          Update
        </button>
      </form>
      <Link to="/clone">
        <button className="btn"> Go back</button>
      </Link>
    </div>
  );
}

export default UpdateProduct;
