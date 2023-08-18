import React from 'react';
import './Product.css';
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  const [{}, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className='product'>
      <div className='info'>
        <p className='title'>{title}</p>
        <p className='price'>
          <small style={{fontSize :15}}>Price: $ </small>
          <strong>{price}</strong>
        </p>
        <div className='rating'>
          { Array(Math.round(rating))
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
          ))}
        </div>
      </div>

      <img src={image} alt=''/>

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;