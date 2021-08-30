import React from 'react'
import BusinessCard from '../BusinessCard'

const PopupBusinessCard = ({ _ShowCard, name, image, phone, website, email }) => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className=" min-h-screen pt-4 px-4 pb-20 text-center block p-0">
                <div onClick={() => _ShowCard()} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="inline-block align-middle h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block overflow-hidden transform skew-x-0 skew-y-0 scale-0 translate-x-0 transition-all  my-8 align-middle max-w-3xl">
                    <BusinessCard
                        image={image}
                        name={name}
                        email={email}
                        phone={phone}
                        website={website}
                    />
                </div>
            </div>
        </div>

    )
}

export default PopupBusinessCard;
