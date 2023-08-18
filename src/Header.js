import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth }from './firebase';
import { db } from './firebase';

function Header() {
  const [{ basket, user, total_products }, dispatch] = useStateValue();
  const [userName, setUserName] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    const filteredProducts = total_products.filter(product =>
      product.data.title.toLowerCase().includes(searchText.toLowerCase())
    );
    dispatch({
      type: "SET_FILTERED_PRODUCTS",
      item: filteredProducts
    });
  };

  if(user)
  {
    const userRef = db.collection('users').doc(user.uid);
    userRef.get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setUserName(userData.username);
          // setAddress(userData.address);
          } else {
          console.log('No such document!');
        }
      })
      .catch(error => {
        console.error('Error getting document:', error);
      });
  }

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }

  return (
    <div className='header'>
      <Link to='/'>
      <img className="logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"></img>
      </Link>
      <div className='search_bar'>
        <input 
          className='searchInput'
          type="text"
          placeholder="Search products"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SearchIcon className='searchIcon' onClick={handleSearch}></SearchIcon>
      </div>
      <div className='navigation'>
        <Link to={!user && '/login'}>
        <div onClick={handleAuthenticaton} className='navig_options'>
            <span className='hello'>Hello {!user?'Guest':userName}</span>
            <span className='signIn'>{user?'Sign Out':'Sign In'}</span>
        </div>
        </Link>

        <Link to='/orders'>
           <div className='navig_options'>
             <span className='returns'>Returns</span>
             <span className='Orders'>& Orders</span>
           </div>
        </Link>

        <div className='navig_options'>
            <span className='your'>Your</span>
            <span className='prime'>Prime</span>
        </div>
        <Link to='/checkout'>
        <div className='basket'>
            <ShoppingBasketIcon/>
            <span className='basketCount'>{basket.length}</span>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
