import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import { jobsData } from '../assets/assets';

export const AppContext = createContext();

export const AppProvider = (props) => {

  const [searchFilter, setSearchFilter] = useState(
    {
      title: "",
      location: ""
    }
  );

  const [isSearched, setIsSearched] = useState(false);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [open,setOpen] = useState(false);
  //function to fetch jobs
  const fetchJobs = async () => {
    setJobs(jobsData)
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    setSearchFilter, searchFilter, isSearched, setIsSearched,
    jobs, setJobs,
    showRecruiterLogin, setShowRecruiterLogin,
  }

  return (<AppContext.Provider value={value}>
    {props.children}
  </AppContext.Provider>);
};
export const AppConsumer = AppContext.Consumer;