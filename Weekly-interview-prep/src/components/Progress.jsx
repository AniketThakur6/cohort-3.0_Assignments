import ProgressChart from "./ProgressChart";
import ProgressBar from "./ProgressBar";
import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const categoriesColors = {
  DSA: {
    Pending: "#818CF8",
    "In Progress": "#8B5CF6",
    Completed: "#C026D3",
  },
  Git: {
    Pending: "#FF8A6C",
    "In Progress": "#FF5D3D",
    Completed: "#FFB020",
  },
  Technical: {
    Pending: "#2DD4BF",
    "In Progress": "#00D6B2",
    Completed: "#A3E635",
  },
};

const statusColors = {
  Pending: "bg-[#D99000] text-white",
  "In Progress": "bg-[#818CF8] text-white",
  Completed: "bg-[#2DD4BF] text-zinc-900",
};

const Progress = () => {
  const { questions } = useContext(TaskContext);

  const statuses = ["Pending", "In Progress", "Completed"];
  const [activeStatus, setActiveStatus] = useState("Pending");
  const total = questions?.length;
  const pendingQuest = questions.reduce(
    (acc, quest) => (quest.status === "Pending" ? acc + 1 : acc),
    0,
  );
  const progessQuest = questions.reduce(
    (acc, quest) => (quest.status === "In Progress" ? acc + 1 : acc),
    0,
  );
  const compltedQuest = questions.reduce(
    (acc, quest) => (quest.status === "Completed" ? acc + 1 : acc),
    0,
  );

  return (
    <div className="w-full mt-5 flex flex-col gap-5 ">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between px-5 items-center gap-5 w-full min-h-50 rounded-xl border border-zinc-700/50 bg-zinc-900">
        <div>
          <ProgressChart questions={questions} />
        </div>
        <div className="w-full flex flex-col gap-4 sm:mt-5">
          {["DSA", "Git", "Technical"].map((item) => {
            const color = categoriesColors[item]
            const question = questions.filter((quest) => quest.category === item);
            return (
              <ProgressBar
                key={item}
                item={item}
                question={question}
                activeStatus={activeStatus}
                color={color}
              />
            );
          })}
          <div className="flex flex-col gap-2">
            <p className="text-lg tracking-tighter">Machine coding round</p>
            <div className="bg-zinc-950/90 h-11 flex rounded-md mb-5 p-1">
              {statuses.map((status) => {
                return (
                  <button
                    onClick={() => setActiveStatus(status)}
                    key={status}
                    className={`flex outline-none cursor-pointer w-full items-center font-semibold justify-center text-sm rounded-md transition-colors duration-200 ${
                      activeStatus === status
                        ? statusColors[status]
                        : "text-[#9CA3C7] hover:text-white"
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 divide-x-2  divide-zinc-700/50 bg-zinc-900 rounded-lg border border-zinc-700/50">
        <div className="p-2 pl-4 sm:p-4">
          <p className="text-3xl font-bold">{pendingQuest}</p>
          <p className=" -mt-1">Pending</p>
          <p className=" -mt-1 text-zinc-400">Out of {total}</p>
        </div>
        <div className="p-2 pl-4 sm:p-4 ">
          <p className="text-3xl font-bold">{progessQuest}</p>
          <p className=" -mt-1">In Progress</p>
          <p className=" -mt-1 text-zinc-400">Out of {total}</p>
        </div>
        <div className="p-2 pl-4 sm:p-4 ">
          <p className="text-3xl font-bold">{compltedQuest}</p>
          <p className=" -mt-1">Completed</p>
          <p className=" -mt-1 text-zinc-400">Out of {total}</p>
        </div>
      </div>
    </div>
  );
};

export default Progress;
