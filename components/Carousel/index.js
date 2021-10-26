/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Carousel from 'nuka-carousel';

const Index = ({ children }) => {

    return (
        <Carousel
            slidesToShow={4}
            slidesToScroll={4}
            dragging={false}
            cellSpacing={10}
            defaultControlsConfig={{
                nextButtonText: '>',
                prevButtonText: '<',
                prevButtonClassName: 'mb-16 text-2xl font-bold ',
                nextButtonClassName: 'mb-16 text-2xl font-bold ',
                pagingDotsContainerClassName: 'hidden',
                pagingDotsClassName: 'hidden'
            }}
        >
            {children}
        </Carousel>
    )
}

export default Index;
