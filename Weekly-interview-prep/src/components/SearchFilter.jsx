import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const Defaultfilters = [
  {
    label: "Category",
    options: ["All", "DSA", "Git", "Technical"],
  },
  {
    label: "Status",
    options: ["All", "Pending", "In Progress", "Completed"],
  },
  {
    label: "Difficulty",
    options: ["All", "Easy", "Medium", "Hard"],
  },
];

const defaultFilters = {
  search: "",
  Category: "All",
  Status: "All",
  Difficulty: "All",
};

const SearchFilter = ({ setFilters, filters }) => {
  const clear =
    filters.search !== "" ||
    filters.Category !== "All" ||
    filters.Status !== "All" ||
    filters.Difficulty !== "All";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFilters(defaultFilters);
  };

  return (
    <form onChange={handleChange} className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-55">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500z" />

        <input
          name="search"
          type="text"
          value={filters.search}
          placeholder="Search questions"
          className="w-full cursor-allow rounded-xl border border-zinc-700/60 bg-zinc-900 py-2.5 pl-10 pr-10 text-sm text-white
        placeholder:text-zinc-500 outline-none
        focus:border-zinc-600 focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      {/* Filters */}
      {Defaultfilters.map((filter) => (
        <select
          name={filter.label}
          key={filter.label}
          defaultValue={filters[filter.label]}
          className="min-w-35 rounded-xl border border-zinc-700/60
        bg-zinc-900 px-1 py-2.5 text-sm text-zinc-300 outline-none
        focus:border-zinc-600 focus:ring-1 focus:ring-zinc-400"
        >
          {filter.options.map((option) => (
            <option key={option} value={option}>
              {filter.label}: {option}
            </option>
          ))}
        </select>
      ))}

      {clear && (
        <button
          type="button"
          onClick={handleClear}
          className="min-w-30 rounded-xl border border-zinc-700/60
        bg-zinc-900 px-2 py-2.5 text-sm text-zinc-300 outline-none
        hover:border-zinc-600 hover:ring-1 hover:ring-zinc-500 transition-all duration-200"
        >
          Clear filters
        </button>
      )}
    </form>
  );
};

export default SearchFilter;
