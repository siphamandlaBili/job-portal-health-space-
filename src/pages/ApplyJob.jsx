import React from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

const ApplyJob = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const applyHandler = async () => {
    try {

      if (!userData) {
       return toast.error("Login to apply for jobs"); 
      }

      if (!userData.resume) {
        navigate('/applications')
        return toast.error("Upload your resume to apply");
      }

      const token = await getToken()

      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        { jobId: jobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
        
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(items => items.jobId._id === jobData._id);
    setIsAlreadyApplied(hasApplied)

  }

  useEffect(() => {
    if (jobs.length > 0) {
      findJob();
    } else {
      fetchJob();
    }
  }, [id, jobs]);

  useEffect(() => {
    if (userApplications.length > 0 && jobData) {
      checkAlreadyApplied();
    }
  },[jobData,userApplications, id])

  const findJob = () => {
    const job = jobs.find((job) => job._id === id);
    setTimeout(() => {
      setJobData(job);
    }, 2000);
  };

  return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-10 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 w-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4"
                src={jobData?.companyId?.image}
                alt=""
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">
                  {jobData?.title}
                </h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                  <span className="flex flex-row gap-2 items-center">
                    <img src={assets?.suitcase_icon} alt="" />
                    {jobData?.companyId?.name}
                  </span>
                  <span className="flex flex-row gap-2 items-center">
                    <img src={assets?.location_icon} alt="" />
                    {jobData?.location}
                  </span>
                  <span className="flex flex-row gap-2 items-center">
                    <img src={assets?.person_icon} alt="" />
                    {jobData?.level}
                  </span>
                  <span className="flex flex-row gap-1 items-center">
                    <img src={assets?.money_icon} alt="" />
                    CTC: {kconvert.convertTo(jobData?.salary)};
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center align-middle text-end text-sm max-md:mx-auto max-mdtext-center">
              <button onClick={applyHandler} className="bg-blue-600 cursor-pointer p-2.5 px-6 text-white rounded">
                {isAlreadyApplied? "Already Applied" : "Apply Now"}
              </button>
              <p className="mt-1 text-gray-600 pl-4">
                posted: {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>
          <div className="flex rich-text flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job Description</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              ></div>
              <button onClick={applyHandler} className="bg-blue-600 cursor-pointer mt-10 p-2.5 px-6 text-white rounded">
               {isAlreadyApplied? "Already Applied" : "Apply Now"}
              </button>
            </div>
            {/* right section more jobs */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2>More jobs from {jobData.companyId.name}</h2>
              {jobs.filter(
                  (job) => job._id !== jobData._id && job.companyId._id === jobData.companyId._id
                )
                .filter((jobs) => {
                  // set of applied jobIds
                  const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
                  // Return true if the user has not applied for this job
                  return !appliedJobsIds.has(jobs._id)  
                }).slice(0, 4)
                .map((job, index) => ( <JobCard key={index} job={job} />))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
