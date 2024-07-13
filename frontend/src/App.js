import "./App.css";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Footer from "./components/footer/Footer";
import Slider from "./components/Slider/Slider";
import Products from "./components/products/Products";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Slider />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
