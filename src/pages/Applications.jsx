import React, { useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { assets } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications,
  } = useContext(AppContext);

  const updateResume = async () => {
    try {
      if (!resume) {
        toast.error("Please select a resume file");
        return;
      }

      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Resume updated successfully");
        await fetchUserData();
        setIsEdit(false);
        setResume(null);
      } else {
        toast.error(data.message || "Failed to update resume");
      }
    } catch (error) {
      console.error("Resume update error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit || (userData && userData.resume === "") ? (
            <>
              <label
                className="flex items-center cursor-pointer"
                htmlFor="resumeUpload"
              >
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf,.doc,.docx"
                  type="file"
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button
                onClick={updateResume}
                disabled={!resume}
                className="bg-green-100 border border-green-400 rounded-lg px-4 py-2 disabled:opacity-50"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              {userData?.resume ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={userData.resume}
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                >
                  View Resume
                </a>
              ) : (
                <span className="text-gray-400">No resume uploaded</span>
              )}
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                {userData?.resume ? "Update" : "Upload"} Resume
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        {userApplications.length === 0 ? (
          <p className="text-gray-500">No job applications yet.</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b text-left">Company</th>
                <th className="py-3 px-4 border-b text-left">Job Title</th>
                <th className="py-3 px-4 border-b text-left max-sm:hidden">
                  Location
                </th>
                <th className="py-3 px-4 border-b text-left max-sm:hidden">
                  Date Applied
                </th>
                <th className="py-3 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications.map((application, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 flex items-center gap-2 border-b">
                    <img
                      className="w-8 h-8"
                      src={
                        application.jobId?.companyId?.image || assets.company_icon
                      }
                      alt=""
                    />
                    {application.jobId?.companyId?.name || "Unknown Company"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {application.jobId?.title || "Unknown Job"}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {application.jobId?.location || "Unknown Location"}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {moment(application.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`${
                        application.status === "Accepted"
                          ? "bg-green-100 text-green-600"
                          : application.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      } px-4 py-1.5 rounded`}
                    >
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Applications;
