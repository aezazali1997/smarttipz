/* eslint-disable @next/next/no-img-element */
import React from 'react'
import moment from 'moment';

const ChatCard = ({ image, name, message, time, containerStyle, cardStyle, imgStyle, headerStyle, contentStyle, messageStyle }) => {
    return (
        <div className={containerStyle}>
            <div className={cardStyle}>
                <div className="md:flex-shrink-0">
                    {
                        image ?
                            <img src={image}
                                className={imgStyle}
                                alt="pic"
                                layout="fill"
                            /> :
                            <img src='https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg'
                                className={imgStyle}
                                alt="pic"
                                layout="fill"
                            />
                    }
                </div>

                <div className={contentStyle}>
                    <div className={headerStyle}>
                        <div className="tracking-wide text-md text-black font-semibold">{name}</div>
                        {
                            time && (
                                <div className="tracking-wide text-xs text-indigo-600 font-semibold">{moment(time).format('h:mm a')}</div>
                            )
                        }

                    </div>
                    <p className={messageStyle}>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatCard;
