import React from 'react'
import {categoryInfos} from './catagoryFullinfos'
import CatagoryCard from './CatagoryCard'
import classes from './Catagory.module.css'

const Catagory = () => {
  return (
    <div className={classes.catagory__container} >
    
       
    { categoryInfos.map((infos)=>  <CatagoryCard data={infos}/>
      )  } 
    </div>
  )
}

export default Catagory
