import React,{useState,useContext} from 'react'
// import LayOut from '../../Components/LayOut/LayOut'
import classes from "./SignUp.module.css"
import {Link, useNavigate,useLocation, useLoaderData} from "react-router-dom"
import {auth} from '../../Utility/firebase'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import {Type} from '../../Utility/action.type'
import {DataContext, DataProvider} from '../../Components/DataProvider/DataProvider'
import {ClipLoader} from 'react-spinners'
import { Navigate } from 'react-router-dom'




const Auth = () => {
const navigate = useNavigate()
const navStateData = useLocation()
const [email,setEmail]= useState('')
const [password,setPassword] = useState('')
const [error,setError] = useState('')
const [{user},dispatch]=useContext(DataContext)
const [loading,setLoading]=useState({signIn:false,signUP:false})



console.log(user)
const authHandler = async (e)=>{
     e.preventDefault()
     console.log(e.target.name)
    

if(e.target.name =='signin'){
  // firebase auth

setLoading({...loading,signIn:true})
  signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
  
    dispatch({
      type:Type.SET_USER,
      user:userInfo.user
})
setLoading({...loading,signIn:false})



navigate(navStateData?.state?.redirect || '/')



  }).catch((err)=>{

   
  setError(err.message)
  setLoading({...loading,signIn:false})

  })




}else{

createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
  setLoading({...loading,signUp:true})
  dispatch({
    type:Type.SET_USER,
    user:userInfo.user
})
setLoading({...loading,signUp:false})
navigate(navStateData?.state?.redirect || '/')
}).catch((err)=>{
  setError(err.message)
  setLoading({...loading,signUp:false})

  })


}

}


// console.log(password,email)
  return (
 
    
    <div className={classes.login}>
 
<Link to='/'>

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/120px-Amazon_logo.svg.png" alt="amazon logo" />
</Link>

  {/* logo */}
{/* form */}

<div className={classes.login__container}>
  <h1>Sign In</h1>

{navStateData?.state?.msg && (
  <small style={{
    padding:'5px',
    textAlign:'center',
    color:'red',
    fontWeight:'bold'
  }}> {navStateData?.state?.msg}</small>
)


}
  <form action="">

<div>
  <label htmlFor="email">Email</label>
  <input 
  value={email} onChange={(e)=> setEmail(e.target.value)}
   type='text' id='email'/>

</div>

<div>
  <label htmlFor="password">Password</label>
  <input
   value={password} onChange={(e)=>setPassword(e.target.value)}
   type='text' id='password'/>
</div>

<button onClick={authHandler} name='signin'  type='submit' className={classes.login_signInButton}>  {
  loading.signIn ? (<ClipLoader color='#000' size={15}></ClipLoader>):('Sign In')
}
  
  </button>

  </form>


{/* agreement */}


<p>
  By signing in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice
</p>

<button onClick={authHandler} name='signup' className={classes.registerButton}>
{
  loading.signUp ? (<ClipLoader color='#000' size={15}></ClipLoader>):(' Create your Amazon Account')
}
 
  </button>

  {error &&  <small style={{paddingTop:'5px',color:'red'}}>{error}</small>    }
  
  </div>



    </div>
  )
}

export default Auth
