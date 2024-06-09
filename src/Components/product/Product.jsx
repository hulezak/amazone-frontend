import React, { useState,useEffect } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './product.module.css'
import Loader from '../Loader/Loader'

const Product = () => {
const [product,setProduct]=useState([])
const [isLoading, setIsLoading]=useState(true)
useEffect(() => {
  console.log('fetching')
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
     setProduct(res.data);
     
     setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
     
        setIsLoading(false) });
  }, []);

  

  return (
    <div>
     
{isLoading ? (<Loader/>):(<section className={classes.products_container}>

{
    product.map((singleProduct)=>{
        return <ProductCard  renderAdd={true} product={singleProduct} key={singleProduct.id}/>



    })
}
</section>
)}



    </div>
  )
}

export default Product
