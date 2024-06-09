import React from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import Carousel from '../../Components/Carousel/Carousel'
import Catagory from '../../Components/Catagory/Catagory'
import Product from '../../Components/product/Product'
import Loader from '../../Components/Loader/Loader'



const Landing = () => {
  return ( <> 
        {/* // <LayOut>   */}
            <Carousel/>
            <Catagory/>
            <Product/>
         
      {/* </LayOut> */}
      </>
  )
}

export default Landing
