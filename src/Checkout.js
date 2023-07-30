import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
  const [{basket,user},dipatch]=useStateValue();
  return (
    <div className='checkout'>
      <div className='left'>
        <img className='ad' src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'/>
        <div>
            <h3 className='title'>{`Hello ${user?user.email:'Guest'}`}</h3>
            <h2 className='title'>
                Your Shopping Basket
            </h2>
            {
              basket.map(item=>(
                <CheckoutProduct id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating}/>
              ))
            }
        </div>
      </div>
      <div className='right'>
        <Subtotal/>
      </div>
    </div>
  )
}

export default Checkout
