/* eslint-disable @next/next/no-img-element */
import React from 'react'
import moment from 'moment';

const ChatCard = ({ image, name, badge, connected, message, time, containerStyle, cardStyle, imgStyle, headerStyle, contentStyle, messageStyle }) => {
    return (
        <div className={containerStyle}>
            <div className={cardStyle}>
                <div className="md:flex-shrink-0">
                    {
                        image ?
                            <div className="relative inline-block">
                                <img src={image}
                                    className={imgStyle}
                                    alt="pic"
                                    layout="fill"
                                />
                                {badge && (
                                    <span className={`absolute bottom-0 right-0 inline-block w-3 h-3 ${connected ? 'bg-green-600' : ''} border-2 border-white rounded-full`}></span>
                                )}
                            </div>
                            :
                            <img src='https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg'
                                className={imgStyle}
                                alt="pic"
                                layout="fill"
                            />
                    }
                </div>

                <div className={contentStyle}>
                    <div className={headerStyle}>
                        <div className="tracking-wide text-xs md:text-sm lg:text-md text-black font-semibold">{name}</div>
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
