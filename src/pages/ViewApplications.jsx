import React, { useContext, useState } from 'react'
import { viewApplicationsPageData } from "../assets/assets"
import { assets } from "../assets/assets"
import { useEffect } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from "react-toastify";
import Loading from "../components/Loading"; // Adjust the path as needed

const ViewApplications = () => {

  const {backendUrl, companyToken} = useContext(AppContext)

  const [applicants, setApplicants] = useState(false)

  //Function to fetch company Job Applications Data
  const fetchCompanyJobApplications = async () => {
    // Check for valid token first
    if (!companyToken) {
      toast.error("Please log in as a recruiter.");
      return;
    }
    
    try {
      const {data} = await axios.get(`${backendUrl}/api/company/applicants`,
        {headers:{token: companyToken}}
      )

      if (data.success && Array.isArray(data.applicants)) {
        setApplicants(data.applicants.reverse());
      } else {
        setApplicants([]);
        toast.error(data.message || "No applicants found");
      }
      
    } catch (error) {
      // Check for JWT errors
      if (error.response?.data?.message?.toLowerCase().includes("jwt")) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(error.message || "Failed to fetch applications");
      }
      setApplicants([]);
    }
  }

  //function to update job application status
  const changeJobApplicationStatus = async (id,status) => {
    try {

      const {data} = await axios.post(backendUrl + '/api/company/change-status',
          {id,status},
          {headers: {token: companyToken}}
      )
      
      if (data.success){
        fetchCompanyJobApplications()
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken, backendUrl]); // Add backendUrl as dependency

  return applicants ? applicants.length === 0 ? (
     <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No Applications Available</p>
      </div>
   ) : (
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
            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
              <tr key={applicant._id} className='text-gray-700 border-b'>
                <td className='py-3 px-4 text-center align-middle'>{index + 1}</td>
                
                {/* User Name Column */}
                <td className='py-3 px-4 text-center align-middle flex items-center'>
                  <div className='flex items-center gap-3'>
                    <img 
                      className='w-8 h-8 rounded-full max-sm:hidden' 
                      src={applicant.userId?.image || assets.default_profile} 
                      alt="User" 
                      onError={(e) => {e.target.src = assets.default_profile}}
                    />
                    <span>{applicant.userId?.name || "Unknown User"}</span>
                  </div>
                </td>

                {/* Job Title & Location */}
                <td className='py-3 px-4 align-middle max-sm:hidden'>{applicant.jobId?.title || "Unknown Job"}</td>
                <td className='py-3 px-4 align-middle max-sm:hidden'>{applicant.jobId?.location || "Unknown Location"}</td>

                {/* Resume Column - Added proper null checks */}
                <td className='py-3 px-4 align-middle'>
                  {applicant.userId?.resume ? (
                    <a 
                      href={applicant.userId.resume} 
                      target='_blank' 
                      rel="noopener noreferrer"
                      className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center'
                    >
                      Resume <img src={assets.resume_download_icon} alt="" />
                    </a>
                  ) : (
                    <span className="text-gray-400">No resume</span>
                  )}
                </td>

                {/* Action Column */}
                <td className='py-3 px-4 align-middle relative'>
                  {applicant.status === "Pending"
                  ?<div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                      <button onClick={()=> changeJobApplicationStatus(applicant._id,'Accepted')} className='block w-full px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                      <button onClick={()=> changeJobApplicationStatus(applicant._id,'Rejected')} className='block w-full px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                    </div>
                  </div>
                  : <div>{applicant.status}</div>
                }
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />
}

export default ViewApplications
