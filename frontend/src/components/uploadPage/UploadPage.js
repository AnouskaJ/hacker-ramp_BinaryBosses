import React, { useState } from 'react';
import css from './UploadPage.module.css';

const UploadPage = () => {
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productCondition, setProductCondition] = useState('');
  const [uploadedProducts, setUploadedProducts] = useState([]);

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleAdditionalImagesChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setAdditionalImages([...additionalImages, ...filesArray]);
  };

  const handleUpload = () => {
    if (mainImage && productName && productCategory && productCondition) {
      const newProduct = {
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
        condition: productCondition,
        mainImage: URL.createObjectURL(mainImage),
        additionalImages: additionalImages.map(file => URL.createObjectURL(file))
      };
      setUploadedProducts([...uploadedProducts, newProduct]);
      setMainImage(null);
      setAdditionalImages([]);
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductCategory('');
      setProductCondition('');
    }
  };

  return (
    <div className={css.container}>
      <div className={css.card}>
        <h1>Upload Your Favorite Items</h1>
        <div className={css.uploadForm}>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
          />
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Product Description"
          />
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Product Price"
          />
          <input type="file" onChange={handleMainImageChange} />
          <input type="file" multiple onChange={handleAdditionalImagesChange} />
          <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home Goods">Home Goods</option>
            <option value="Books">Books</option>
            {/* Add more categories as needed */}
          </select>
          <select value={productCondition} onChange={(e) => setProductCondition(e.target.value)}>
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Used - Like New">Used - Like New</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Fair">Used - Fair</option>
            {/* Add more conditions as needed */}
          </select>
          <button onClick={handleUpload}>UPLOAD</button>
        </div>
      </div>
      <div className={css.uploadedProducts}>
        {uploadedProducts.map((product, index) => (
          <div key={index} className={css.productItem}>
            <div className={css.productTitle}>{product.name}</div>
            <img src={product.mainImage} alt={product.name} />
            <div className={css.additionalImages}>
              {product.additionalImages.map((image, idx) => (
                <img key={idx} src={image} alt={`Additional ${idx}`} />
              ))}
            </div>
            <div className={css.productDetails}>
              <div className={css.productDescription}>{product.description}</div>
              <div className={css.productPrice}>${product.price}</div>
              <div>Category: {product.category}</div>
              <div>Condition: {product.condition}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadPage;
