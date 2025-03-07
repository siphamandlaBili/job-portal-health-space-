import React from 'react'

import { assets } from '../assets/assets'
const Navbar = () => {
  return (
    <div className='shadow-lg py-4 flex justify-between items-center'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
      <img src={assets.logo} alt="logo" class="w-22 h-auto sm:w-28 md:w-35 lg:w-35" />
      <div className='flex gap-4 mx-sm:text-sm'>
  <button className='text-gray-600'>Recruiter Login</button>
  <button className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full no-underline'>Login</button>
</div>

      </div>
    </div>
  )
}

export default Navbar
