
import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Auth from './pages/Auth/Auth'
import Payment from './pages/Payment/Payment'
import Orders from './pages/Orders/Orders'
import Cart from './pages/Cart/Cart'
import Header from './Components/Header/Header'
import Results from './pages/Results/Results'
import productDetail from './pages/ProductDetail/ProductDetails'
import ProductDetails from './pages/ProductDetail/ProductDetails'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe('pk_test_51PPPeeLPcIxD7V42d3XBqUDvRBnOX6Jwqib5jZnaAlaqUbvLfjIXUqECjEjaj5jZSq0fyZDaJUbUkvMON21239GX00FCkggYUL');



const Routing = () => {


  return (
    <Router>
        <Header/>    
      <Routes>
       <Route path='/' element={<Landing/>}/>
       <Route path='/auth' element={<Auth/>}/>
       <Route path='/catagory/:catagoryName' element={<Results/>}/>
       <Route path='/products/:productId' element={<ProductDetails/>}/>


       <Route path='/payment' element={
        <ProtectedRoute msg={'you must log in to pay'} redirect={'/payment'}>
   <Elements stripe={stripePromise}>
          <Payment/>
        </Elements>
  </ProtectedRoute>

       
        }/>





       <Route path='/orders' element={
        
        <ProtectedRoute msg={'you must log in to access your orders'}
         redirect={'/orders'}>

             <Orders/>
            
       </ProtectedRoute>
        
        }/>



       <Route path='/cart' element={<Cart/>}/>

      </Routes>
    </Router>
  )
}

export default Routing
