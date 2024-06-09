import React,{useContext,useState} from 'react'
import classes from './Payment.module.css'
import {DataContext} from '../../Components/DataProvider/DataProvider'
import ProductCard from './../../Components/product/ProductCard'
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import {axiosInstance} from '../../Api/axios'
import { ClipLoader } from 'react-spinners';
import {db} from '../../Utility/firebase'
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';




const Payment = () => {
const [processing,setProcessing]=useState(false)

const [{user,basket},dispatch]=useContext(DataContext)
const totalItem = basket?.reduce((amount,item)=>{
  return item.amount + amount
},0)
const total = basket.reduce((amount,item)=>{
  return item.price * item.amount + amount
},0)

const stripe = useStripe();
const elements = useElements();
const [cardError,setCardError]=useState(null)
// 
const navigate = useNavigate()

// function
const handleChange = (e)=>{
console.log(e)
e?.error?.message? setCardError(e?.error?.message):(setCardError(''))

}


const handlePayment= async(e)=>{
  e.preventDefault()



  try{
    // 1. backend || functions ----> contact to get the client secret

    setProcessing(true)
const response= await axiosInstance({
  method:"POST",
  url:`/payment/create?total=${total*100}`  
})

console.log(response.data)


const clientSecret = response.data?.client_secret;

// 2. client side (react side confirmation)

const {paymentIntent} = await stripe.confirmCardPayment(
clientSecret,{

  payment_method:{
  card:elements.getElement(CardElement),
},

}

)

 console.log(paymentIntent)

// 3.  after the confirmation ---> order firestore database and clear the basket

await db.collection('users')
  .doc(user.uid)
  .collection('orders')
  .doc(paymentIntent.id)
  .set({
    basket: basket,
    amount: paymentIntent.amount,
    created: paymentIntent.created
  });


// empty the basket 

dispatch({type:Type.EMPTY_BASKET
})


 setProcessing(false)


navigate('/orders',{state:{msg:'you have placed new order'}})


  }catch(error){
console.log(error)
setProcessing(false)
}







}




  return (
    <div>
      {/* header */}
      <div className={classes.payment__header}>Checkout({totalItem}) items</div>
      {/* payment method */}
      <section className={classes.payment}>

      {/* adress */}
      <div className={classes.flex}>
      <h3>Delivery Address</h3>
        <div> 
          <h3>{user?.email}</h3>
          <div>123 react Lane</div>
          <div>chicago,Il</div>
        
       </div>
        
      </div>
     <hr />
    
    {/* product */}
    <div className={classes.flex}>

<h3>Review items and delivery</h3>

<div>
  {basket?.map((item)=><ProductCard product={item} flex={true} />)}
</div>
    </div>
    <hr />
    {/* card form */}
    <div className={classes.flex}>
      <h3>Payment method</h3>
      <div className={classes.payment__card__container}>
<div className={classes.payment__detailes}> 
  <form onSubmit={handlePayment}
>
    {/* error */}
    {cardError && <small style={{color:'red'}}>{cardError}</small>}
    {/* card element */}
    <CardElement onChange={handleChange}  />

    {/* price */}
    <div className={classes.payment__price}>
      <div>
        <span style={{display:'flex', gap:'10px'}}>
          <p>   Total Order | </p>
         <CurrencyFormat amount={total*100}/> </span>
      </div>



      <button type='submit'>
        {
          processing ? (<div className={classes.loading}>  
            <ClipLoader color='grey' size={12}/>
            <p>please wait ...</p>
          </div>):("Pay Now")
        }
        </button>




    </div>
  </form>
</div>
      </div>
       </div>
    </section>
    </div>
  )
}

export default Payment
