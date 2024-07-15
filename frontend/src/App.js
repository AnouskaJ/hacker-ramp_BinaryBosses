import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Slider from "./components/Slider/Slider";
import Virtual from "./components/virtual/Virtual";
import Products from "./components/products/Products";
import Testimonials from "./components/testimonials/Testimonials";
import Footer from "./components/footer/Footer";
import UploadPage from "./components/uploadPage/UploadPage"; 
import ProductPage from './components/ProductPage/ProductPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Hero />
                <Slider />
                <Virtual />
                <Products />
                <Testimonials />
              </>
            }
          />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/product" element={<ProductPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
