/* eslint-disable @next/next/no-img-element */
import React from "react";
import { createPopper } from "@popperjs/core";
import { useOutsideClick } from 'src/hooks';
import axios from "axios";
import axiosInstance from "src/APIs/axiosInstance";
import Swal from "sweetalert2";

const PostActionDropdown = ({ _HandleCatalogue, _HandleDeleteVideo, catalogue, ownerId, isPost }) => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "left-start",
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    useOutsideClick(popoverDropdownRef, () => {
        setDropdownPopoverShow(false);
    })

    return (
        <>
            <a
                className="text-blueGray-500 block"
                href="#pablo"
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <div className="items-center flex">
                    <span className="">
                        <svg className="w-7 h-7 text-gray-400 hover:text-purple-600 cursor-pointer rounded-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </span>
                </div>
            </a>
            <div
                ref={popoverDropdownRef}
                className={
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-10 float-left  list-none text-left rounded shadow-lg min-w-48"
                }
            >
                {
                    parseInt(localStorage.getItem('id')) == ownerId &&
                    <>
                        <div
                            className={
                                "text-sm py-2 px-4 font-normal block w-full cursor-pointer whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-200"
                            }
                            onClick={_HandleCatalogue}
                        >
                            {catalogue ? 'Remove from Catalogue' : 'Add to Catalogue'}
                        </div>
                        {
                            isPost &&
                            <div
                                className={
                                    "text-sm py-2 px-4 font-normal block w-full cursor-pointer whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-200"
                                }
                                onClick={_HandleDeleteVideo}
                            >
                                Delete Video
                            </div>
                        }
                    </>
                }
            </div>
        </>
    );
};

export default PostActionDropdown;
