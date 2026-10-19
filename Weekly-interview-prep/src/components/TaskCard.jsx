import { Check, Trash2 } from "lucide-react";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const difficultyColors = {
  Easy: {
    text: "#34D399",
    bg: "#064E3B60",
  },
  Medium: {
    text: "#FBBF24",
    bg: "#78350F60",
  },
  Hard: {
    text: "#f5354b",
    bg: "#4C1D2B90",
  },
};

const statusColor = {
  Pending: "#f5354b",
  "In Progress": "#FBBF24",
  Completed: "#34D399",
};

const taskcolor = {
  DSA: "#818CF8",
  Git: "#FF8A6C",
  Technical: "#2DD4BF",
};

const TaskCard = ({ question }) => {
  const { deleteQuestions, updateStatus } = useContext(TaskContext);

  return (
    <div
      className="flex sm:items-center sm:justify-between gap-2 sm:gap-4 bg-zinc-900 px-2 py-3 sm:px-4 sm:py-4 border-y border-y-zinc-700/50 hover:border-y-zinc-500/60 rounded-xl"
      style={{
        borderLeft: `4px solid ${taskcolor[question.category]}`,
        borderRight: `2px dashed ${statusColor[question.status]} `,
      }}
    >
      {/* Task details */}
      <div className="flex flex-1 items-center gap-2 sm:gap-4">
        <div
          onClick={() =>
            updateStatus(question.id, question.status === "Pending" ? "Completed" : "Pending")
          }
          className="w-fit h-fit flex items-center justify-center rounded-full"
        >
          {question.status === "Completed" ? (
            <button className="w-6 h-6 flex items-center bg-green-400/80 justify-center rounded-full cursor-pointer">
              <Check size={15} strokeWidth={3} />
            </button>
          ) : (
            <button className="w-6 h-6 border border-zinc-600/70 hover:border-zinc-400/70 rounded-full cursor-pointer" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className={`text-sm sm:text-base font-medium  ${question.status === "Completed" ? "line-through text-zinc-500" : "text-zinc-200"} `}
          >
            {question.title}
          </h3>

          <div className="mt-2 flex gap-2">
            <span
              className="rounded-full bg-[#2f2f30fe] px-2.5 py-0.5 text-xs sm:text-sm"
              style={{ color: taskcolor[question.category] }}
            >
              {question.category}
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs sm:text-sm"
              style={{
                color: difficultyColors[question.difficulty].text,
                backgroundColor: difficultyColors[question.difficulty].bg,
              }}
            >
              {question.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Status + Delete */}
      <div className="flex shrink-0 items-center gap-3 md:gap-6">
        <select
          style={{ color: statusColor[question.status] }}
          onChange={(e) => updateStatus(question.id, e.target.value)}
          className="min-w-20 text-sm sm:text-base rounded-xl border border-zinc-700/60
        bg-zinc-950/90 px-2 py-2 outline-none
        focus:border-zinc-800 focus:ring-1 focus:ring-zinc-400"
          defaultValue={question.status}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          type="button"
          onClick={() => deleteQuestions(question.id)}
          className="text-zinc-500 transition-colors
        hover:text-red-400 active:scale-90"
          aria-label="Delete task"
        >
          {/* Lucide React */}
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
