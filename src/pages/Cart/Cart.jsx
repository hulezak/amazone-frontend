import React, { useContext } from 'react'
import {DataContext} from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/product/ProductCard'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import classes from './Cart.module.css'
import{Type}from './../../Utility/action.type'
import {IoIosArrowDown} from 'react-icons/io'
import {IoIosArrowUp} from 'react-icons/io'



const Cart = () => {
  const [{basket,user},dispatch]=useContext(DataContext)


  // basket price adding logic

  const total = basket.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)
  // console.log(basket)


const increment =(item)=>{
  // console.log('increment, please wait increamenting....')
dispatch({
  type:Type.ADD_TO_BASKET,
  item
})}


const decrement = (id)=>{
  dispatch({
    type:Type.REMOVE_FROM_BASKET,
    id
  })
}





  return ( 
    <div className={classes.container}>
<div className={classes.cart__container}>
<h2>Hello</h2>
<h3>Your shoping basket</h3>
<hr />
{basket?.length === 0 ? (
        <p>Oops! No item in your cart</p>
      ) : (
        basket.map((item, index) => {  


          return <section className={classes.cart_product}>
            
          <ProductCard key={index} product={item} renderDesc={true} flex={true} renderAdd={false}/>
        <div className={classes.btn_container}>
          <button className={classes.btn} onClick={()=>increment(item)}><IoIosArrowUp size={20}/></button>
          <span>{item.amount}</span>
          <button  className={classes.btn} onClick={()=>decrement(item.id)}>

         <IoIosArrowDown size={20}/>

          </button>

        </div>
         
          </section>

        
})
      )}


</div>
<div >
{basket?.length !==0&&( 
  <div className={classes.subtotal}>


    <div>
 <p>Subtotal ({basket?.length} items)</p>
  <CurrencyFormat amount={total}/>
 </div>

  <span>
    <input type="checkbox" />
    <small>This order containes a gift</small>

<Link to='/payment'>Continue to Checkout</Link>


  </span>


      </div>
   
)

}



</div>
    </div>
  )
}

export default Cart
