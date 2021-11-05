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
        </div>
    )
}

export default Index;
