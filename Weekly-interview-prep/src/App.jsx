import React, { useState } from "react";
import AddForm from "./components/AddForm";
import Progress from "./components/Progress";
import SearchFilter from "./components/SearchFilter";
import TaskCard from "./components/TaskCard";
import { addDays, format } from "date-fns";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [today] = useState(()=> new Date());

  return (
    <div className="min-h-screen w-full flex flex-col md:items-center px-5 py-12 bg-black text-zinc-200">
      <header className="md:w-190 lg:w-200">
        <div className="flex flex-col">
          <h1 className="w-full text-3xl sm:text-4xl font-bold tracking-tighter ">Interview Practice Tracker</h1>
          <div className="w-full flex flex-col sm:flex-row justify-between">
            <p className="tracking-tighter sm:tracking-normal text-zinc-500">Your weekly log of DSA, Git and technical questions.</p>
            <p className="text-zinc-500 ">Week of <span className="text-zinc-400">{format(today,"MMM d")}</span> - <span className="text-zinc-400">{format(addDays(today,7),"MMM d")}</span></p>
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-8">
        <Progress />
        <div>
          {/* add form button here */}
        </div>
          <SearchFilter />
          <TaskCard />
      </div>
      {isOpen && <AddForm />}
    </div>
  );
};

export default App;
