import React from 'react';
import { createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = (props)=>{
  const value = {

  }

  return (<AppContext.Provider value={value}>
  {props.children}
  </AppContext.Provider>);
};
export const AppConsumer = AppContext.Consumer;