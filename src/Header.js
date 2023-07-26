import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

function Header() {
  return (
    <div className='header'>
      <img className="logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"></img>
      <div className='search_bar'>
        <input className='searchInput' type="text"/>
        <SearchIcon className='searchIcon'></SearchIcon>
      </div>
      <div className='navigation'>
        <div className='navig_options'>
            <span className='hello'>Hello Guest</span>
            <span className='signIn'>Sign In</span>
        </div>
        <div className='navig_options'>
            <span className='returns'>Returns</span>
            <span className='Orders'>& Orders</span>
        </div>
        <div className='navig_options'>
            <span className='your'>Your</span>
            <span className='prime'>Prime</span>
        </div>
        <div className='basket'>
            <ShoppingBasketIcon/>
            <span className='basketCount'>0</span>
        </div>
      </div>
    </div>
  )
}

export default Header
