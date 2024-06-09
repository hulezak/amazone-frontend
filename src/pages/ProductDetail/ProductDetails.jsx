import React, { useState,useEffect } from 'react'
import classes from './ProductDetailes.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ProductUrl } from '../../Api/Endpoints'
import ProductCard from '../../Components/product/ProductCard'
import Loader from '../../Components/Loader/Loader'






const ProductDetails = () => {

const {productId}=useParams()
const [product,setProduct]=useState({})
const [isLoading, setIsLoading]=useState(true)
console.log(productId)

useEffect(()=>{
  // setIsLoading(true)
  const reqUrl=`${ProductUrl}/products/${productId}`
  // console.log(reqUrl)
  axios.get(reqUrl)
  .then((res) => {
      setProduct(res.data);
      setIsLoading(false)
     

  })
  .catch((err) => {
      console.log(err);
      setIsLoading(false)
  });

},[])

  return (
    <div>
      {isLoading ? (<Loader/>):(<ProductCard 
      product={product} flex={true} 
      
      renderDesc={true}
      renderAdd={true}
      />)
      
      }
  

    </div>
  )
}

export default ProductDetails
