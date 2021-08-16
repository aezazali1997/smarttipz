/* eslint-disable @next/next/no-img-element */
import React from 'react'

const ChatCard = ({ image, name, message, containerStyle, cardStyle, imgStyle, headerStyle, contentStyle, messageStyle }) => {
    return (
        <div className={containerStyle}>
            <div className={cardStyle}>
                <div className="md:flex-shrink-0">
                    <img className={imgStyle}
                        src={image}
                        alt="pic"
                    />
                </div>
                <div className={contentStyle}>
                    <div className={headerStyle}>
                        <div className="tracking-wide text-md text-black font-semibold">{name}</div>
                        <div className="tracking-wide text-xs text-indigo-600 font-semibold">an hour ago</div>
                    </div>
                    <p className={messageStyle}>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatCard;
