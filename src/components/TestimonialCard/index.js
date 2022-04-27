/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Switch } from 'src/components';

const TestimonialCard = ({ image, name, designation, description, checked, otherUser, _Toggle, index }) => {
  return (
    <div className=" bg-white rounded-xl custom-width mb-4 sm:mb-0">
      <div className="flex  ">
        <div className="flex-shrink-1  mt-6 sm:mt-0">
          {image ? (
            <img className="h-10 w-10 sm:h-20 rounded-full object-cover sm:w-20" src={image} alt="testimonial" />
          ) : (
            <img
              className="h-10 w-10 sm:h-20 rounded-full object-cover sm:w-20  "
              src="https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg"
              alt="testimonial"
            />
          )}
        </div>
        <div className="flex flex-row justify-between flex-1 py-2 px-4 bg-gray-50 rounded-3xl   ">
          <div className="flex flex-col ">
            <div className="tracking-wide text-md text-black font-semibold">{name}</div>
            <p className="block text-xs leading-tight text-gray-600">{designation}</p>
            <p className=" break-words text-sm text-black whitespace-pre-wrap">{description}</p>
          </div>
          {!otherUser && (
            <div
              data-tip
              data-for={`testimonial${index}`}
              className="flex flex-col items-center justify-center divide-y-2 space-y-2">
              <Switch name="toggleTestimonial" onChange={_Toggle} checked={checked} />
              <ReactTooltip
                className="max-w-md break-words"
                id={`testimonial${index}`}
                place="top"
                effect="float"
                border={false}
                borderColor="white"
                clickable={false}>
                {checked ? 'Click to hide testimonial' : 'Click to show testimonial'}
              </ReactTooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
