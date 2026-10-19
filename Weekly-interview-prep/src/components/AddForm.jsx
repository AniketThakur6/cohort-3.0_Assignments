import { useContext, useState } from "react";
import { X, Plus } from "lucide-react";
import { TaskContext } from "../context/TaskContext";

const AddForm = ({ setIsOpen }) => {
  const [form, setForm] = useState({
    title: "",
    category: "DSA",
    difficulty: "Easy",
    status: "Pending",
  });

  const { addQuestions } = useContext(TaskContext);

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    addQuestions(form);
    setIsOpen(false);
  };

  const inputClass =
    "w-full cursor-allow rounded-xl border border-zinc-800 bg-[#171719] px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";

  const labelClass = "mb-2 block text-sm font-medium text-zinc-400";

  return (
    <div
      onClick={setIsOpen}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#111114] p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-100">Add a question</h2>

          <button
            type="button"
            onClick={setIsOpen}
            className="rounded-lg p-1 text-zinc-500 transition cursor-pointer hover:bg-zinc-800 hover:text-white"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Question */}
        <div className="mb-4">
          <label className={labelClass}>Question</label>
          <input
            autoFocus
            name="title"
            value={form.title}
            onChange={updateField}
            placeholder="e.g. Longest substring without repeating characters"
            className={inputClass}
            required
          />
        </div>

        {/* Category and Difficulty */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={updateField}
              className={inputClass}
            >
              <option>DSA</option>
              <option>Git</option>
              <option>Technical</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Difficulty</label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={updateField}
              className={inputClass}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className={labelClass}>Status</label>
          <select name="status" value={form.status} onChange={updateField} className={inputClass}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={setIsOpen}
            className="flex-1 rounded-xl border cursor-pointer border-zinc-800 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex flex-1 items-center justify-center cursor-pointer gap-2 rounded-xl bg-indigo-500/90 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500/90 active:scale-[0.98]"
          >
            <Plus size={17} />
            Add question
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
