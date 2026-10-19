import React from "react";

const ProgressBar = ({ question, activeStatus,color,item}) => {
  const total = question?.length || 1;
  const statuses = question.reduce((acc,item)=> item.status === activeStatus?acc+1:acc,0);
  
  const width = (statuses/total)*100;

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <p className={`w-3 h-3 mt-1 rounded-full`} style={{ backgroundColor: color[activeStatus], }} />
          <p className="text-md font-semibold">{item} : <span className="text-sm text-zinc-400"> {activeStatus} </span></p>
        </div>
        <p className="text-zinc-400 text-sm font-semibold capitalize">
          {statuses} out of {question.length} Task
        </p>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
        <div className={`h-full transition-[width] duration-1000 ease-out`} style={{ width: `${width}%` ,backgroundColor: color[activeStatus], }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
