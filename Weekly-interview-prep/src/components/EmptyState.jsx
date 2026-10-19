import { Plus } from "lucide-react";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const EmptyState = ({ setIsOpen}) => {
  const { loadExamples } = useContext(TaskContext);

  return (
    <div className="flex min-h-68.75 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-500/50 bg-zinc-900 px-5 py-10 text-center">
      <h3 className="text-lg font-semibold text-zinc-100">Nothing tracked yet</h3>

      <p className="mt-2 max-w-sm text-sm leading-5 text-slate-400">
        Add the first question you plan to practise this week, or load a few examples to see how the
        tracker works.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={setIsOpen}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-500/90 px-4 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-indigo-500 active:scale-[0.98]"
        >
          <Plus size={17} />
          Add question
        </button>

        <button
          onClick={loadExamples}
          className="rounded-xl border border-[#252941] bg-[#171a2b] px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-[#20243a] active:scale-[0.98]"
        >
          Load examples
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
