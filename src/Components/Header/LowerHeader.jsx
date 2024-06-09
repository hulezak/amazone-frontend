import React from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import classes from './header.module.css'
const LowerHeader = () => {
  return (
    <div className={classes.lower__container}>
      <ul >
        <li>
            <AiOutlineMenu/>
            <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Custumer Services</li>
        <li>Registry</li>
        <li>Gift Card</li>
        <li>Sell</li>
      </ul>
    </div>
  )
}

export default LowerHeader
