/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import ItemsCarousel from 'react-items-carousel';

const Index = ({ children }) => {

    const [renderItems, setRenderItems] = useState(4);
    const [renderArrow, setRenderArrow] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

    const handleResize = () => {

        if (window.innerWidth > 1024 && window.innerWidth < 1920) {
            setRenderItems(4)
            setRenderArrow(false);
        }
        else if (window.innerWidth > 464 && window.innerWidth < 1024) {
            setRenderItems(2);
            setRenderArrow(true);
        }
        else if (window.innerWidth > 0 && window.innerWidth < 464) {
            setRenderItems(1);
            setRenderArrow(true);
        }
        else {
            setRenderItems(5)
            setRenderArrow(false);
        }
    }

    useEffect(() => {
        handleResize()
    }, [])

    useEffect(() => {
        // create an event listener
        window.addEventListener("resize", handleResize)
    })



    return (
        <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={renderItems}
            slidesToScroll={renderItems}
            gutter={10}
            alwaysShowChevrons={renderArrow}
            leftChevron={
                <div className={"CarouselLeftIcon"} >
                    <span className="iconin">&lt;</span>
                </div>
            }
            rightChevron={
                <div className={"CarouselRightIcon"} >
                    <span className="iconin">&gt;</span>
                </div>
            }
            outsideChevron={false}
            chevronWidth={chevronWidth}
        >
            {children}
        </ItemsCarousel>
    )
}

export default Index;
