import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import UpdateProduct from "./pages/UpdateProduct";
import CreateProduct from "./pages/CreateProduct";
import Clone from "./pages/Clone";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/clone" element={<Clone />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
