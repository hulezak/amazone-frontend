import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import classes from './carousel.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the CSS file for the carousel
import { img } from './img/data';

const CarouselEffect = () => {
  return (
    <div>
      <Carousel  
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {
          img.map((imageItem, index) => (
            <div key={index}>
              <img src={imageItem}  />
            </div>
          ))
        }
      </Carousel>

<div className={classes.hero__img}>

</div>


    </div>
  );
};

export default CarouselEffect;

