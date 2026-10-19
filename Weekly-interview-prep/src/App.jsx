import React, { useContext, useState } from "react";
import AddForm from "./components/AddForm";
import Progress from "./components/Progress";
import SearchFilter from "./components/SearchFilter";
import TaskCard from "./components/TaskCard";
import { addDays, format } from "date-fns";
import { StickyNotePlus } from "lucide-react";
import EmptyState from "./components/EmptyState";
import { TaskContext } from "./context/TaskContext";

const defaultFilters = {
  search: "",
  Category: "All",
  Status: "All",
  Difficulty: "All",
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [today] = useState(() => new Date());
  const { questions } = useContext(TaskContext);
  const [filters, setFilters] = useState(defaultFilters);

  const query = filters.search.trim().toLowerCase();

  const filtered = questions.filter((question) => {
    const searched = !query || question.title.toLowerCase().includes(query);

    const categoryMatch =
      filters.Category === "All" ? true : question.category.includes(filters.Category);

    const statusMatch = filters.Status === "All" ? true : question.status.includes(filters.Status);

    const diffcultyMatch =
      filters.Difficulty === "All" ? true : question.difficulty.includes(filters.Difficulty);

    return searched && categoryMatch && statusMatch && diffcultyMatch;
  });

  return (
    <div className="min-h-screen cursor-hidden w-full flex flex-col md:items-center px-5 pt-5 pb-10 sm:py-12 bg-black text-zinc-200">
      <header className="md:w-180 lg:w-240">
        <div className="flex flex-col">
          <h1 className="w-full text-3xl sm:text-4xl font-bold tracking-tighter ">
            Interview Practice Tracker
          </h1>
          <div className="w-full flex flex-col sm:flex-row justify-between">
            <p className="tracking-tighter sm:tracking-normal text-zinc-500">
              Your weekly log of DSA, Git and technical questions.
            </p>
            <p className="text-zinc-500 ">
              Week of <span className="text-zinc-400">{format(today, "MMM d")}</span> -{" "}
              <span className="text-zinc-400">{format(addDays(today, 7), "MMM d")}</span>
            </p>
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-8 md:w-180 lg:w-240">
        <Progress />
        <div className="flex justify-between items-center text-2xl font-semibold tracking-tight">
          {/* add form button here */}
          <h1>
            Total Questions <span className="text-zinc-400">{filtered.length} </span>
          </h1>
          <div>
            <button
              className="flex text-lg gap-2 items-center px-3 py-2 bg-indigo-500/90 hover:bg-indigo-500 outline-none rounded-lg transition-all duration-150 active:scale-95 cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <StickyNotePlus size={16} className="text-white" />
              Add question
            </button>
          </div>
        </div>
        <SearchFilter setFilters={setFilters} filters={filters} />
        <div className="flex flex-col gap-3 -mt-2">
          {questions.length > 0 ? (
            filtered.map((item) => <TaskCard key={item.id} question={item} />)
          ) : (
            <EmptyState setIsOpen={() => setIsOpen(true)} />
          )}
        </div>
      </div>
      {isOpen && <AddForm setIsOpen={() => setIsOpen(false)} />}
    </div>
  );
};

export default App;
