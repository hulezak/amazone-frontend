import React,{useState,useEffect} from 'react'
import classes from './Results.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ProductUrl } from '../../Api/Endpoints'
import ProductCard from '../../Components/product/ProductCard'
import Loader from '../../Components/Loader/Loader'


const Results = () => {
    const [results, setResults]=useState([])
    const {catagoryName}=useParams()
    const [isLoading, setIsLoading]=useState(true)

    useEffect(()=>{
        axios.get(`${ProductUrl}/products/category/${catagoryName}`)
        .then((res) => {
            setResults(res.data);
            console.log(res.data)
            setIsLoading(false)
    
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false)
        });

    },[])

   



  return (
<> 
    {isLoading ?(<Loader/>):(<section>
        <h1 style={{padding:'30px'}}>Results</h1>
              <p style={{padding:'30px'}}> Category/{catagoryName}</p>
              <hr />
        
        <div className={classes.products_container}>
        
        
        
            {results.map((product)=>{
               return <ProductCard renderAdd={true} key={product.id} renderDesc={false} product={product} />
              
            })}
        </div>
        
        
        
            </section>)

    }
    </>
  )
}

export default Results
