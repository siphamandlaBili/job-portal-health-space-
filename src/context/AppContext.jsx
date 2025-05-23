import React, { use, useEffect } from 'react';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';

export const AppContext = createContext();

export const AppProvider = (props) => {

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

  // const [open,setOpen] = useState(false);

  const [companyToken, setCompanyToken] = useState(null);

  const [companyData, setCompanyData] = useState(null);

  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  //function to fetch jobs
  const fetchJobs = async () => {
    try {
      
      const {data} = await axios.get(`${backendUrl}/api/jobs`)
      
      if (data.success) {
        setJobs(data.jobs)
        console.log(data.jobs)
      }else{
        toast.error(data)
      }

    } catch (error) {
      toast.error(error.message)
    }
    
  }

  //function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setCompanyData(data.company);
        console.log("Fetched Company Data:", data.company);
      } else {
        toast.error(data.message || "Failed to fetch company data");
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      toast.error("Error fetching company data. Please try again.");
    }
  }


//function to fetch user data
const fetchUserData = async () => {
  try {

    const token = await getToken();

      const {data} = await axios.get(`${backendUrl}/api/users/user`,
        {headers:{Authorization:`Bearer ${token}`}})

    if (data.success) {
      setUserData(data.user);      
    } else {
      toast.error(data.message);
    }
    
  } catch (error) {
    toast.error(error.message)
  }
}

  useEffect(() => {
  fetchJobs(); // Fetch jobs on app load
  const storedCompanyToken = localStorage.getItem('companyToken');
  if (storedCompanyToken) {
    setCompanyToken(storedCompanyToken);
  }
}, []);

  useEffect(() => {
  if (companyToken) {
    fetchCompanyData();
  }
}, [companyToken]);

useEffect(() => {
  if (user) {
    fetchUserData();
  }
},[user])

  const value = {
    setSearchFilter, searchFilter,
    isSearched, setIsSearched,
    jobs, setJobs,
    showRecruiterLogin, setShowRecruiterLogin,
    companyToken,setCompanyToken,
    companyData,setCompanyData,
    backendUrl
  }

  return (<AppContext.Provider value={value}>
    {props.children}
  </AppContext.Provider>);
};
export const AppConsumer = AppContext.Consumer;