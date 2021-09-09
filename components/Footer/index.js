import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Index = () => {
    return (
        <div className="flex flex-col md:flex-row items-center md:justify-evenly w-full py-4 px-3 footer text-white">
            <Link href="/privacy-policy"><a className="hover:underline">Privacy Policy</a></Link>
            <Link href="/terms-and-conditions"><a className="hover:underline">Terms and Conditions</a></Link>
            <div>
                <Link href="/copyrights" ><a className="hover:underline">© 2021 CopyRights Reserved.</a></Link>
            </div>
            <div className="text-center">
                <Link href="/trademark-license"><a className="hover:underline">™ Trademark license agreement - Intellectual property</a></Link>
            </div>

            {/* <div className="xl:px-40 pb-12 lg:px-20 md:px-10 sm:px-5 px-10">
                <div className="w-full pt-12 flex flex-col sm:flex-row space-y-2  justify-start">
                    <div className="w-full sm:w-2/5 pr-6 flex flex-col space-y-4">
                        <Image src={logo} alt="brand logo" />
                        <p className="opacity-60">Concord Royal Court (3rd floor)
                            Dhanmondi, Dhaka 1209, Bangladesh.</p>
                    </div>
                    <div className="w-full sm:w-1/5 flex flex-col space-y-4">
                        <a className="opacity-60">About Us</a>
                        <a className="opacity-60">Responsibilities</a>
                        <a className="opacity-60">Out Services</a>
                        <a className="opacity-60">Contact</a>
                    </div>
                    <div className="w-full sm:w-1/5 flex flex-col space-y-4">
                        <a className="opacity-60">Disclaimer</a>
                        <a className="opacity-60">Testimonials</a>
                        <a className="opacity-60">Privacy Policy</a>
                        <a className="opacity-60">Terms of Service</a>
                    </div>
                    <div className="w-full sm:w-1/5 pt-6 flex items-end mb-1">
                        <div className="flex flex-row space-x-4">
                            <i className="fab fa-facebook-f"></i>
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-instagram"></i>
                            <i className="fab fa-google"></i>
                        </div>
                    </div>
                </div>
                <div className="opacity-60 pt-2">
                    <p>© 2020 Executive Trade International.</p>
                </div>
            </div> */}
        </div>
    )
}

export default Index;
