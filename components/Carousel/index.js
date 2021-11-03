/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
// import Carousel from 'nuka-carousel';
import ItemsCarousel from 'react-items-carousel';

const Index = ({ children }) => {

    const [renderItems, setRenderItems] = useState(4)
    // const [renderSlither, setRenderSlither] = useState(true)
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

    const handleResize = () => {
        window.innerWidth > 1024 && window.innerWidth < 3000 ? setRenderItems(4) :
            window.innerWidth > 464 && window.innerWidth < 1024 ? setRenderItems(2) :
                window.innerWidth > 0 && window.innerWidth < 464 ? setRenderItems(1) :
                    setRenderItems(5)
    }

    // const handleSlither = () => {
    //     window.innerWidth < 1024 ? setRenderSlither(true) : setRenderSlither(false)
    // }

    useEffect(() => {
        handleResize();
        // handleSlither();
    }, [])

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        // window.addEventListener("arrow", handleSlither);
    })

    // create an event listener


    return (
        <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={renderItems}
            slidesToScroll={renderItems}
            // showSlither={renderSlither}
            gutter={10}
            leftChevron={
                <div div className={"CarouselLeftIcon hidden lg:flex"} >
                    <span className="iconin">&lt;</span>
                </div>
            }
            rightChevron={
                <div div className={"CarouselRightIcon hidden lg:flex"} >
                    <span className="iconin">&gt;</span>
                </div>
            }
            outsideChevron={false}
            chevronWidth={chevronWidth}
        >
            {children}
        </ItemsCarousel>
        // <Carousel
        //     slidesToShow={renderItems}
        //     slidesToScroll={renderItems}
        //     dragging={false}
        //     cellSpacing={10}
        //     defaultControlsConfig={{
        //         nextButtonText: '>',
        //         prevButtonText: '<',
        //         prevButtonClassName: 'mb-16 text-2xl font-bold ',
        //         nextButtonClassName: 'mb-16 text-2xl font-bold ',
        //         pagingDotsContainerClassName: 'hidden',
        //         pagingDotsClassName: 'hidden'
        //     }}
        // >
        //     {children}
        // </Carousel>
    )
}

export default Index;
