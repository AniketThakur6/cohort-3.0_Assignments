import React, { createContext, useState } from "react";

export const TaskContext = createContext();

const defaultQuestions = [
  {
    id: 1,
    title: "Two Sum",
    category: "DSA",
    difficulty: "Easy",
    status: "Completed",
  },
  {
    id: 2,
    title: "Merge Intervals",
    category: "DSA",
    difficulty: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Trapping Rain Water",
    category: "DSA",
    difficulty: "Hard",
    status: "Pending",
  },
  {
    id: 4,
    title: "Difference between git rebase and git merge",
    category: "Git",
    difficulty: "Medium",
    status: "Completed",
  },
  {
    id: 5,
    title: "How do you undo a pushed commit?",
    category: "Git",
    difficulty: "Easy",
    status: "Pending",
  },
  {
    id: 6,
    title: "Explain the JavaScript event loop",
    category: "Technical",
    difficulty: "Medium",
    status: "In Progress",
  },
  {
    id: 7,
    title: "When does useEffect cleanup run?",
    category: "Technical",
    difficulty: "Easy",
    status: "Completed",
  },
];

const hello = JSON.parse(localStorage.getItem("questions")) ?? [];

const TaskContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState(hello);

  const saveLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addQuestions = (data) => {
    data = { ...data, id: Date.now() };
    console.log(data);
    const newdata = [data, ...questions];
    setQuestions(newdata);
    saveLocal("questions", newdata);
  };

  const deleteQuestions = (id) => {
    const newData = questions.filter((item) => item.id !== id);
    setQuestions(newData);
    saveLocal("questions", newData);
  };

  const loadExamples = () => {
    setQuestions(defaultQuestions);
    saveLocal("questions", defaultQuestions);
  };

  const updateStatus = (id,status) => {
    const newData = questions.map((item) => item.id === id ? {...item,status} : item);
    setQuestions(newData);
    saveLocal("questions", newData);
  };

  return (
    <TaskContext
      value={{
        questions,
        addQuestions,
        deleteQuestions,
        loadExamples,
        updateStatus,
      }}
    >
      {children}
    </TaskContext>
  );
};

export default TaskContextProvider;
