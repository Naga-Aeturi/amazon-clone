import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  
  return (
    <div className='header'>
      <Link to='/'>
      <img className="logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"></img>
      </Link>
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
