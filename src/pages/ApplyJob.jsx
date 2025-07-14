import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import moment from "moment";

const ApplyJob = () => {
  const { id } = useParams();
  const { backendUrl } = useContext(AppContext);
  const { user, isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);

  const fetchJob = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);
      if (data.success) {
        setJob(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const applyJob = async () => {
    if (!isLoaded) {
      toast.info("Please wait while we check your authentication...");
      return;
    }

    if (!isSignedIn || !user) {
      toast.error("Please login to apply for this job");
      return;
    }

    try {
      setIsApplying(true);
      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/apply-job`,
        { jobId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Applied Successfully");
        navigate("/applications");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Application error:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsApplying(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading job details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-600">Job not found</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Go Back to Jobs
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] flex flex-col lg:flex-row max-w-5xl mx-auto xl:px-0 px-6 py-6">
        <div className="lg:w-2/3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <img
              className="w-20 h-20 bg-blue-50 border border-gray-300 rounded-lg"
              src={job.companyId?.image || assets.company_icon}
              alt=""
            />
            <div className="text-gray-600">
              <p className="text-xl sm:text-2xl font-medium text-gray-800">
                {job.title}
              </p>
              <div className="flex items-center gap-y-2 gap-x-4 flex-wrap mt-1">
                <span className="flex items-center gap-1">
                  <img src={assets.suitcase_icon} alt="" />
                  {job.companyId?.name}
                </span>
                <span className="flex items-center gap-1">
                  <img src={assets.location_icon} alt="" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <img src={assets.person_icon} alt="" />
                  {job.level}
                </span>
                <span className="flex items-center gap-1">
                  <img src={assets.money_icon} alt="" />
                  {job.salary}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <button
              onClick={applyJob}
              disabled={isApplying}
              className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isApplying ? "Applying..." : "Apply Now"}
            </button>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-3">Job description</h4>
            <div
              className="text-gray-600 leading-relaxed text-sm"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>
        </div>

        <div className="lg:w-1/3 lg:ml-8 mt-8 lg:mt-0 space-y-5">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-medium mb-4">Application deadline</h4>
            <p className="text-gray-600">
              {moment(job.date).add(30, "days").format("DD MMM, YYYY")}
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-medium mb-4">Job location</h4>
            <div className="flex gap-2">
              <img src={assets.location_icon} alt="" />
              <p className="text-gray-600">{job.location}</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-medium mb-4">About the company</h4>
            <div className="flex items-center gap-2 mb-2">
              <img
                className="w-6"
                src={job.companyId?.image || assets.company_icon}
                alt=""
              />
              <p className="font-medium text-gray-800">{job.companyId?.name}</p>
            </div>
            <p className="text-gray-600 text-sm">
              {job.companyId?.description || "No description available"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplyJob;
