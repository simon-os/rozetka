import React from 'react';
import { Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const ProductSlider = ({ 
  children = [], classList, heading, 
  breakpoints, simulateTouch, loop
}) => {

  if (!children.length) {
    return null;
  }

  return (
    <div className={'product-slider' + (classList ? ' '+classList : '')}>
      {
        heading && 
        <h4 className="product-slider__heading">{ heading }</h4>
      }

      <Swiper
        modules={[Navigation, Scrollbar]}
        navigation
        spaceBetween={0}
        slidesPerView={1}
        simulateTouch={simulateTouch || false}
        scrollbar={{ draggable: true }}
        breakpoints={breakpoints}
        loop={loop || false}
      >
        {
          children.map((item, idx) => (
            <SwiperSlide 
              key={item.id || idx}
            >
              {item}
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};

export default ProductSlider;
