/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import Carousel from 'nuka-carousel';

const Index = ({ children }) => {

    const [renderItems, setRenderItems] = useState(5)

    const handleResize = () => {
        window.innerWidth > 3000 && window.innerWidth < 4000 ? setRenderItems(5) :
            window.innerWidth > 1024 && window.innerWidth < 3000 ? setRenderItems(4) :
                window.innerWidth > 464 && window.innerWidth < 1024 ? setRenderItems(2) :
                    window.innerWidth > 0 && window.innerWidth < 464 ? setRenderItems(1) : ''
    }

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    return (
        <Carousel
            slidesToShow={renderItems}
            slidesToScroll={renderItems}
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
