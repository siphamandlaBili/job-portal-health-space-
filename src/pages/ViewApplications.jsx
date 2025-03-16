import React from 'react'
import { viewApplicationsPageData } from "../assets/assets"
import { assets } from "../assets/assets"

const ViewApplications = () => {
  return (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='border-b bg-gray-100'>
              <th className='py-3 px-4 text-left'>#</th>
              <th className='py-3 px-4 text-left'>User Name</th>
              <th className='py-3 px-4 text-left max-sm:hidden'>Job Title</th>
              <th className='py-3 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 text-left'>Resume</th>
              <th className='py-3 px-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={applicant._id} className='text-gray-700 border-b'>
                <td className='py-3 px-4 text-center align-middle'>{index + 1}</td>
                
                {/* User Name Column */}
                <td className='py-3 px-4 text-center align-middle'>
                  <div className='flex items-center gap-3'>
                    <img className='w-8 h-8 rounded-full max-sm:hidden' src={applicant.imgSrc} alt="" />
                    <span>{applicant.name}</span>
                  </div>
                </td>

                {/* Job Title & Location */}
                <td className='py-3 px-4 align-middle max-sm:hidden'>{applicant.jobTitle}</td>
                <td className='py-3 px-4 align-middle max-sm:hidden'>{applicant.location}</td>

                {/* Resume Column */}
                <td className='py-3 px-4 align-middle'>
                  <a href="" target='_blank' className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center'>
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>

                {/* Action Column */}
                <td className='py-3 px-4 align-middle relative'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                      <button className='block w-full px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                      <button className='block w-full px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications
