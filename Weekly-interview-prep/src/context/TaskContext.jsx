import React, { createContext } from 'react'

export const TaskContext = createContext();

const TaskContextProvider = ({children}) => {
  
  
  return (<TaskContext
    value={"hello"}
  >
    {children}
  </TaskContext>)
}

export default TaskContextProvider