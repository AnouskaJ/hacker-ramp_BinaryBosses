import { React, useState } from 'react';
import css from './header.module.css';
import Logo from '../../assets/logo.png';
import { FiShoppingBag, FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showMenu, setShowMenu] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  
  const toggleMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const handleProductClick = () => {
    navigate('/product'); 
  };

  return (
    <div className={css.container}>
      <div className={css.logo}>
        <img src={Logo} alt="Logo" />
        <span>Awear</span>
      </div>
      <div className={css.right}>
        <div className={css.burger} onClick={toggleMenu}>
          <FiMenu />
        </div>
        <div className={css.menu} style={{display: showMenu? 'inherit': 'none'}}>
          <ul className={css.menu}>
            <li className='cat1' onClick={handleProductClick}>Product</li>
            <li className='cat2'>About Brands</li>
            <li className='cat3'>Sustainable</li>
            <li className='cat4'>Category</li>
            <li className='cat5'>ENG</li>
          </ul>
        </div>
        <input type="text" className={css.search} placeholder="Search"/>
        <FiShoppingBag className={css.cart}/>
      </div>
    </div>
  );
}
export default Header;