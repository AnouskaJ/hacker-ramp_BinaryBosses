// src/components/products/Products.js
import React, { useState } from 'react';
import css from './products.module.css';
import Plane from '../../assets/plane.png';
import { ProductsData } from '../../data/products';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Products = ({ additionalProducts = [] }) => {
  const [parent] = useAutoAnimate();
  const [MenuProducts, setMenuProducts] = useState([...ProductsData, ...additionalProducts]);

  const filter = (type) => {
    setMenuProducts([...ProductsData, ...additionalProducts].filter((product) => product.type === type))
  }

  return (
    <div className={css.container}>
      <img src={Plane} alt="Plane" />
      <h1>Our Featured Products</h1>
      <div className={css.products}>
        <ul className={css.menu}>
          <li onClick={()=>setMenuProducts([...ProductsData, ...additionalProducts])} className='cat1'>All</li>
          <li onClick={()=>filter("Eco")} className='cat2'>Eco Friendly</li>
          <li onClick={()=>filter("Genz")} className='cat3'>Latest Genz</li>
          <li onClick={()=>filter("Your Style")} className='cat4'>Your Style</li>
          <li onClick={()=>filter("Hot")} className='cat4'>What's Hot</li>
          <li onClick={()=>filter("Uploaded")} className='cat5'>Uploaded</li>
        </ul>
        <div className={css.list} ref={parent}>
          {MenuProducts.map((product, i) => (
            <div className={css.product} key={i}>
              <div className="left-s">
                <div className="name">
                  <span>{product.name}</span>
                  <span>{product.detail}</span>
                </div>
                <span>${product.price}</span>
                <div>View Item</div>
              </div>
              <img src={product.img} alt="product" className="img-p" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;