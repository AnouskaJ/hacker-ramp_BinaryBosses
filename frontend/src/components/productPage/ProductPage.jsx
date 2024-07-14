// ProductPage.jsx
import React from 'react';
import './ProductPage.module.css';
import dress from '../../assets/red.jpeg';
import dress1 from '../../assets/bdj.avif';
import dress2 from '../../assets/gfd.avif';
import dress3 from '../../assets/wgt.avif';

const ProductPage = () => {
  return (
    <div className="product-page">
      <main>
        <div className="product-card">
          <div className="product-display">
            <div className="product-images">
              <img src={dress} alt="Red Floral Dress Front" className="product-image" />
            </div>
            
            <div className="product-info">
              <h1>Stylish Red Floral Dress</h1>
              <p className="price">$79.99</p>
              
              <div className="sustainability">
                <p>Sustainability Rating</p>
                <p>This product is eco-friendly and has a sustainability rating of 85%.</p>
              </div>
              
              <p className="description">
                This stylish red floral dress is perfect for any occasion. Made from
                sustainable materials, it offers both comfort and elegance. The dress
                features intricate floral patterns, a comfortable fit, and a
                flattering design.
              </p>
              
              <button className="add-to-cart">ADD TO CART</button>
              
              <div className="social-share">
                <span>Share:</span>
                <button className="social-button">Facebook</button>
                <button className="social-button">Twitter</button>
                <button className="social-button">Pinterest</button>
              </div>
            </div>
          </div>
        </div>
        
        <section className="related-products">
          <h2>Related Products</h2>
          <div className="related-products-grid">
            <div className="related-product">
              <img src={dress1} alt="Blue Denim Jacket" className="related-product-image" />
              <p className="related-product-name">Blue Denim Jacket</p>
              <p className="related-product-price">$49.99</p>
            </div>
            <div className="related-product">
              <img src={dress2} alt="Green Floral Summer Dress" className="related-product-image" />
              <p className="related-product-name">Green Floral Summer Dress</p>
              <p className="related-product-price">$59.99</p>
            </div>
            <div className="related-product">
              <img src={dress3} alt="White Graphic T-Shirt" className="related-product-image" />
              <p className="related-product-name">White Graphic T-Shirt</p>
              <p className="related-product-price">$19.99</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductPage;
