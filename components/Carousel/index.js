/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Carousel from 'nuka-carousel';

const Index = ({ children }) => {

    return (
        <Carousel
            slidesToShow={4}
            dragging={false}
            cellSpacing={10}
            scrollMode="page"
            defaultControlsConfig={{
                nextButtonText: '>',
                prevButtonText: '<',
                pagingDotsContainerClassName: 'hidden',
                pagingDotsClassName: 'hidden'
            }}
        >
            {children}
        </Carousel>
    )
}

export default Index;
