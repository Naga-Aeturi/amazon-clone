import React, { useState ,useEffect } from 'react'
import './Payment.css'
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import { db } from './firebase';
import firebase from 'firebase';

function Payment() {
  const [{basket,user},dispatch]=useStateValue();
  const navigate=useNavigate();

  const stripe=useStripe();
  const elements=useElements();

  const [error,setError]=useState(null);
  const [disabled,setDisabled]=useState(true);
  const [processing,setProcessing]=useState('');
  const [succeeded,setSucceeded]=useState(false);
  const [clientSecret,setClientSecret]=useState(true);

  useEffect(()=>{
    const getClientSecret=async ()=>{
       const response=await axios({
        method:'post',
        url: `/payments/create?total=${getBasketTotal(basket)*100}`
       });
       setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
  },[basket])

  const handleChange=e=>{
     setDisabled(e.empty);
     setError(e.error?e.error.message:'')
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
     
    if(!disabled && getBasketTotal(basket)!=0){
    setProcessing(true);
    const payload=await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
           card:elements.getElement(CardElement)
        }
    }).then(({paymentIntent})=>{
        db.collection('users')
          .doc(user.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket:basket,
            amount:paymentIntent.amount,
            created:paymentIntent.created
          })

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        
        dispatch({
            type:'EMPTY_BASKET'
        })

        navigate('/orders');
      }
    )}else if(getBasketTotal(basket)==0){
      alert("Please add items into basket")
    }else{
      alert("Please provide the card number");
    }
  }
  return (
    <div className='payment'>
      <div className='container_box'>
          <h1>
            Checkout(
             <Link to='/checkout'>{basket.length} items</Link>
            )
          </h1>

          <div className='address'>
            <div className='address_title'>
                <h1>Delivery Address</h1>
            </div>
            <div className='user_address'>
                <p>{user?user.email:'Guest'}</p>
                <p>Yerramukkapalli,Kadapa</p>
                <p>AndhraPradesh,India</p>
            </div>
          </div>

          <div className='review_items'>
            <div className='review_title'>
                <h1>Review items and Delivery</h1>
            </div>
            <div className='items'>
                {
                    basket.map(item=>(
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))
                }
            </div>
          </div>

          <div className='payment_box'>
            <div className='payment_title'>
                <h3>Payment Method</h3>
            </div>
            <div className='payment_details'>
                <form onSubmit={handleSubmit}>
                    <CardElement onChange={handleChange} />
                    <div className='cost'>
                    <CurrencyFormat
                       renderText={(value)=>(
                            <h3>Order Total :{value}</h3>
                       )}
                       decimalScale={2}
                       value={getBasketTotal(basket)}
                       displayType={'text'}
                       thousandSeparator={true}
                       prefix={'₹'}
                    />
                    <button disable={processing || disabled || succeeded}>
                        <span>{processing? <p>Processing</p>:'Buy Now'}</span>
                    </button>
                    </div>
                    {error && <div>{error}</div>}
                </form>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Payment
