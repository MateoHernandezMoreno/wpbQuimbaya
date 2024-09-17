import React from 'react';
import Slider from 'react-slick';




const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        SlidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const images = require.context('../../../resources/carousel', false,/\.(png|jp?g|svg)$/);  
    return (
        <div className="skills" id='skill'>
            <Slider {...settings}>
                {images.keys().map((path,index) => (
                    <div className='skills-content' key={index}>
                        <img src={images(path)} alt={`Slide ${index}`} className='images'></img>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Carousel;
