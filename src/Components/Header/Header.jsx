import React from 'react'
import {Link} from 'react-router-dom'
import classes from './header.module.css'
import {SlLocationPin} from 'react-icons/sl'
import {BsSearch} from 'react-icons/bs'
import {BiCart} from 'react-icons/bi'
import LowerHeader from './LowerHeader'
import { DataContext } from '../DataProvider/DataProvider'
import { useContext } from 'react'
import {auth} from '../../Utility/firebase'




const Header = () => {

const[{user,basket},dispatch]=useContext(DataContext)
const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
},0)
  return (

        <section className={classes.fixed} >


<div className={classes.header__container}>



 <div  className={classes.logo__container}>  
{/* logo */}
 <Link to="/">

<img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />

 </Link>

 </div>


{/* delivery */}


<div className={classes.delivery}>   
<span>
    <SlLocationPin/>
</span>

 <div>
    <p>Delivered To</p>
    <span>Ethiopia</span>
 </div>

 </div>



<div className={classes.search}>


    {/* serch bar */}
    <select name="" id="">
        <option value="">All</option>
    </select>
    <input type="text" name='' id='' placeholder='Search product' />
    {/* icon */}
    <BsSearch size={38}/>
</div>


{/* Right side Link */}
<div className={classes.order__container}>

 <div >
   

    <Link className={classes.language} to=""> 
     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/383px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png" alt="" />
    </Link>
   <select>
    <option value="">EN</option>
   </select>
 </div>


{/* three components */}

<Link to={!user && '/auth'}>

    <div>
        
        { user ? (<> <p>hello {user?.email?.split('@')[0]}</p>  <span onClick={()=>auth.signOut()}>Sign Out</span></>)
   :( <>  <p>Sign In</p>  <span>Accounts & Lists</span> </>
   )}</div>
       


 


</Link>


{/* orders */}


<Link to="/orders">
   <p>returns</p>
   <span>& orders</span>
</Link>

{/* cart */}

<Link to='/cart'  className={classes.cart}>
<BiCart size={35}/>
<span>{totalItem}</span>
</Link>

</div>

</div>
<LowerHeader/>
      
    </section>
   
  )
}

export default Header
