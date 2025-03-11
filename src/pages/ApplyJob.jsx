import React from 'react';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading  from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from "moment";

const ApplyJob = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);



  useEffect(() => {
    if (jobs.length > 0) {
      findJob();
    }
  }, [id, jobs]);

  const findJob = () => {
    const job = jobs.find(job => job._id === id);
    setTimeout(() => {
      setJobData(job); 
    }, 2000);
  };

  return jobData ? (
    <>
      <Navbar/>
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-10 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className='flex flex-col md:flex-row items-center'>
            <img className='h-24 w-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4' src={jobData?.companyId?.image} alt="" />
            <div className="text-center md:text-left text-neutral-700">
              <h1 className='text-2xl sm:text-4xl font-medium'>{jobData?.title}</h1>
              <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
              <span className='flex flex-row gap-2 items-center'>
                <img src={assets?.suitcase_icon} alt="" />
                {jobData?.companyId?.name}
              </span>
              <span className='flex flex-row gap-2 items-center'>
                <img src={assets?.location_icon} alt="" />
                {jobData?.location}
              </span>
              <span className='flex flex-row gap-2 items-center'>
                <img src={assets?.person_icon} alt="" />
                {jobData?.level}
              </span>
              <span className='flex flex-row gap-1 items-center'>
                <img src={assets?.money_icon} alt="" />
                 CTC: {kconvert.convertTo(jobData?.salary)};
              </span>
              </div>
            </div>
          </div>
        <div className="flex flex-col justify-center align-middle text-end text-sm max-md:mx-auto max-mdtext-center">
          <button className='bg-blue-600 cursor-pointer p-2.5 px-6 text-white rounded'>Apply now</button>
          <p className='mt-1 text-gray-600 pl-4'>posted: {moment(jobData.date).fromNow()}</p>
        </div>
        </div>
        <div className="flex rich-text flex-col lg:flex-row justify-between items-start">
          <div className="w-full lg:w-2/3">
            <h2 className="font-bold text-2xl mb-4">Job Description</h2>
            <div className="rich-text" dangerouslySetInnerHTML={{ __html: jobData.description }}>
            </div>
            <button className='bg-blue-600 cursor-pointer mt-10 p-2.5 px-6 text-white rounded'>Apply now</button>
          </div>
        </div>
        </div>
      </div>
    </>
  ) : (
   <Loading/>
  );
};

export default ApplyJob;
