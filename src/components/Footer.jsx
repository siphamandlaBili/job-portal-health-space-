import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2x1:px-20 mx-auto flex items-center justify-between gap-4  mt-20'>
      <img width={160} src="./src/assets/image.png" alt="" />
      <p className='flex-1 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright of @Aflu Med healthcare | All right reserved.</p>
      <div className='flex gap-2.5'>
        <img width={38} src={assets.facebook_icon} alt="" />
        <img width={38} src={assets.twitter_icon} alt="" />
        <img width={38} src={assets.facebook_icon} alt="" />
      </div>
    </div>
  )
}

export default Footer
