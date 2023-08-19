import React from 'react'
import '../CSS/CheckoutProduct.css'
import { useStateValue } from '../StateProvider'

function CheckoutProduct({id, image, title, price, rating, hideButton}) {
  const [{},dispatch]=useStateValue();
  const removeFromBasket=()=>{
    dispatch({
      type:'REMOVE_FROM_BASKET',
      id:id
    })
  }
  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct__image' src={image} alt=''/>
      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>
          {title}
        </p>
        <p className='price'>
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className='checkoutProduct__rating'>
          {Array(Math.round(rating)).fill().map(()=>(
            <p>🌟</p>
          ))}
        </div>
        {!hideButton &&(
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  )
}

export default CheckoutProduct
