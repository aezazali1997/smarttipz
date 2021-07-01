/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import ImageOne from '../public/img2.jpg';
import Image from 'next/image';
import Link from 'next/link'
function Home() {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="container-fluid py-3">
      <div className="flex flex-row justify-between bg-white px-4">
        <div className="flex flex-col flex-start">
          <h1 className="text-purple-800 text-bold text-3xl font-bold">
            ST Platform
          </h1>
          <span className="mt-4 text-gray-500">
            Ut enim ad minim veniam, quis nostrud exercitation <br />
            ullamico laboris nisi ut allquip ex ea commodo.
          </span>
        </div>
      </div>

      <div className="flex h-screen flex-col sm:flex-row mt-7">
        <div className=" hidden w-full sm:w-1/2 sm:flex h-100 relative " >
          <Image className="" src={ImageOne} alt="banner" />
        </div>

        <div className="flex flex-col w-full sm:w-1/2  px-7">
          <div className="flex flex-col justify-start ">
            <h1 className="text-3xl text-bold font-bold">
              Sign Up
            </h1>
            <span className="mt-4 text-gray-400 font-semibold">
              Let's create your account
            </span>
          </div>
          <div className="flex w-full sm:max-w-sm justify-evenly flex-col mt-12">
            <form className="w-full">
              <div className="floating-input mb-5 relative">
                <input
                  type="text"
                  id="username"
                  className="border bg-gray-100 border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16" placeholder="name@example.com" autoComplete="off" />
                <label
                  htmlFor="username"
                  className="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                  Username
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-6 h-6 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
              </div>
              <div className="floating-input mb-5 relative">
                <input
                  type="email"
                  id="email"
                  className="border bg-gray-100 border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16" placeholder="name@example.com" autoComplete="off" />
                <label
                  htmlFor="email"
                  className="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                  Email
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
              </div>
              <div className="floating-input mb-5 relative">
                <input
                  type="password"
                  id="password"
                  className="border bg-gray-100 border-gray-200 focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16" placeholder="password" autoComplete="off" />
                <label
                  htmlFor="password"
                  className="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                  Password
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </div>
              </div>
              <button className="w-full bg-indigo-600 text-white p-3 rounded-md">Submit</button>
              <div className="flex mt-8 text-center items-center">
                <p className="text-md text-gray-500">By creating an account you agree to the{' '}
                  <Link
                    href="/">
                    <a className="text-blue-800 text-sm font-semibold hover:underline"
                    >Terms & Conditions
                    </a>
                  </Link> and{' '}
                  <Link

                    href="/">
                    <a
                      className="text-blue-800 text-sm font-semibold hover:underline"
                    >Privacy Policy
                    </a>
                  </Link>.
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
