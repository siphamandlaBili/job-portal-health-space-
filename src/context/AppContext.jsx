import React, { useState, useEffect, createContext, useContext } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {user} = useUser()
    const {getToken} = useAuth()

  const [searchFilter, setSearchFilter] = useState(
    {
      title: "",
      location: ""
    }
  );

  const [isSearched, setIsSearched] = useState(false);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [companyToken, setCompanyToken] = useState(null);

  const [companyData, setCompanyData] = useState(null);

  const [userData, setUserData] = useState(null);

  const [userApplications, setUserApplications] = useState([]); // <-- Add this line

  const fetchUserData = async () => {
    try {
      const token = await getToken(); // If using Clerk
      const { data } = await axios.get(`${backendUrl}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });
      if (data.success) setUserData(data.user);
    } catch (error) {
      setUserData(null);
    }
  };

  //function to fetch users applied applications
  const fetchUserApplications = async () => {
    try {

      const token = await getToken()

      const { data } = await axios.get(`${backendUrl}/api/users/applications`, 
        {headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        setUserApplications(data.applications)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchJobs = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/jobs`);
    if (data.success) {
      setJobs(data.jobs);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
  const storedCompanyToken = localStorage.getItem('companyToken');
  // Only set if token is a non-empty string and looks like a JWT
  if (
    storedCompanyToken &&
    storedCompanyToken !== "undefined" &&
    storedCompanyToken !== "null" &&
    storedCompanyToken.length > 10 // JWTs are always longer than 10 chars
  ) {
    setCompanyToken(storedCompanyToken);
  } else {
    localStorage.removeItem('companyToken');
    setCompanyToken(null);
  }
  fetchJobs();
}, []);

  useEffect(() => {
  if (companyToken) {
    fetchCompanyData();
  }
}, [companyToken]);

const fetchCompanyData = async () => {
  // Check for valid token first
  if (!companyToken) {
    return;
  }
  
  try {
    const { data } = await axios.get(`${backendUrl}/api/company/profile`, {
      headers: { token: companyToken }
    });
    if (data.success) {
      setCompanyData(data.company);
    } else {
      // If token is bad, clear it
      if (data.message && data.message.toLowerCase().includes("jwt")) {
        localStorage.removeItem('companyToken');
        setCompanyToken(null);
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    if (error.response?.data?.message?.toLowerCase().includes("jwt")) {
      localStorage.removeItem('companyToken');
      setCompanyToken(null);
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error(error.message);
    }
  }
};

useEffect(() => {
  if (user) {
    fetchUserData()
    fetchUserApplications()
  }
},[user])

  const value = {
    setSearchFilter, searchFilter,
    isSearched, setIsSearched,
    jobs, setJobs,
    showRecruiterLogin, setShowRecruiterLogin,
    companyData, setCompanyData,
    backendUrl,
    userData, setUserData,
    userApplications, setUserApplications,
    fetchUserData,
    fetchUserApplications,
    companyToken, setCompanyToken,
  }

  return (<AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>);
};
export const AppConsumer = AppContext.Consumer;