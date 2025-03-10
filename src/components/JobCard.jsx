import React from 'react'
import { assets } from '../assets/assets'
const JobCard = ({ job }) => {
  return (
    <div className='border p-6 shadow rounded'>
      <div className='flex justify-between items-center'>
        <img className='h-8' src={assets.copany_icon} alt="" />
      </div>
      <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
      <div className='flex iitems-center gap-3 mt-2 text-xs'>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
        <span className='bg-red-50 border border-red-200 px-4  py-1.5 rounded'>{job.level}</span>
      </div>
      <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
      <div className='mt-4 flex gap-4 text-xm'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded'>Apply Now</button>
        <button className='text-gray-400 border border-gray-50 rounded px-4 py-2'>Learn More</button>

      </div>
    </div>
  )
}

export default JobCard
