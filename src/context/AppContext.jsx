import React from 'react';
import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = (props) => {

  const [searchFilter, setSearchFilter] = useState(
    {
      title: "",
      location: ""
    }
  );

  const [isSearched, setIsSearched] = useState(false);
  const value = {
    setSearchFilter, searchFilter,isSearched, setIsSearched
  }

  return (<AppContext.Provider value={value}>
    {props.children}
  </AppContext.Provider>);
};
export const AppConsumer = AppContext.Consumer;