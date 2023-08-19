import React, { } from 'react'
import '../CSS/Home.css'
import Product from './Product'
import { useStateValue } from "../StateProvider";

function Home() {
	
	const [{ filtered_products }, ] = useStateValue();

  	return (
    	<div className='home'>
      		<div className='container'>
        		<img className='image' src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg' alt=''/>
        			<div className='row'>
        			{
						filtered_products.map((product, index) => (
						<Product 
							id = {index}
							style={{
								width: 'calc(33.33% - 20px)',
								marginBottom: '20px'
							}}
							title={product.data.title}
							image= {product.data.image}
							price= {product.data.price}
							rating={product.data.rating.rate}
						/>
						))
        			}
        			</div>
      		</div>
    	</div>
  	)
}

export default Home
