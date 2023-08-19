import React, { useEffect, useState } from 'react'
import '../CSS/Orders.css'
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import Order from './Order'

function Orders() {
    const [orders,setOrders]=useState([]);
    const [{user},]=useStateValue();

    useEffect(()=>{ 
      if(user){
        db.collection('users')
        .doc(user.uid)
        .collection('orders')
        .orderBy('created','desc')
        .onSnapshot((snapShot)=>{
            setOrders(snapShot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
        })
      }else{
        setOrders([]);
      }
    },[])
  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders_order'>
        {orders.map((order)=>(
            <Order order={order}/>
        ))}
      </div>
    </div>
  )
}

export default Orders
