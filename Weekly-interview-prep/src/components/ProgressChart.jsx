import React from "react";

const ProgressChart = ({ questions }) => {
  const completed =
    questions.length === 0
      ? 0
      : questions.reduce((acc, ques) => {
          return ques.status === "Completed" ? acc + 1 : acc;
        }, 0);
  const total = questions.length || 1;
  const percentage = questions.length === 0 ? 0 : Math.round((completed / total) * 100);

  const radius = 83;
  const circumference = 2 * Math.PI * radius;

  const dsaPercent = (
    questions.reduce((acc, ques) => {
      return ques.status === "Completed" && ques.category === "DSA" ? acc + 1 : acc;
    }, 0) /
    (questions.reduce((acc, ques) => {
      return ques.category === "DSA" ? acc + 1 : acc;
    }, 0) || 1)
  ).toFixed(2);

  const dsaShare = (
    dsaPercent *
    (questions.reduce((acc, ques) => {
      return ques.category === "DSA" ? acc + 1 : acc;
    }, 0) /
      total)
  ).toFixed(2);

  const gitPercent = (
    questions.reduce((acc, ques) => {
      return ques.status === "Completed" && ques.category === "Git" ? acc + 1 : acc;
    }, 0) /
    (questions.reduce((acc, ques) => {
      return ques.category === "Git" ? acc + 1 : acc;
    }, 0) || 1)
  ).toFixed(2);

  const gitShare = (
    gitPercent *
    (questions.reduce((acc, ques) => {
      return ques.category === "Git" ? acc + 1 : acc;
    }, 0) /
      total)
  ).toFixed(2);

  const techPercent = (
    questions.reduce((acc, ques) => {
      return ques.status === "Completed" && ques.category === "Technical" ? acc + 1 : acc;
    }, 0) /
    (questions.reduce((acc, ques) => {
      return ques.category === "Technical" ? acc + 1 : acc;
    }, 0) || 1)
  ).toFixed(2);

  const techShare = (
    techPercent *
    (questions.reduce((acc, ques) => {
      return ques.category === "Technical" ? acc + 1 : acc;
    }, 0) /
      total)
  ).toFixed(2);

  const dsaLength = circumference * dsaShare;
  const gitLength = circumference * gitShare;
  const technicalLength = circumference * techShare;

  return (
    <div className="flex h-55 -mb-5 sm:h-60 sm:mb-0 transition-all duration-300 w-full items-center justify-center rounded-xl">
      <svg viewBox="0 0 220 220" className="h-55 w-55">
        {/* Background ring */}
        <circle cx="110" cy="110" r={radius} fill="none" stroke="#292f49" strokeWidth="22" />

        {/* Blue segment */}
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="#818cf8"
          strokeWidth="22"
          strokeDasharray={`${dsaLength} ${circumference}`}
          transform="rotate(-90 110 110)"
          className="transition-all duration-1200 ease-out"
        />

        {/* Orange segment */}
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="#ff886b"
          strokeWidth="22"
          strokeDasharray={`${gitLength} ${circumference}`}
          strokeDashoffset={-(2 + dsaLength)}
          transform="rotate(-90 110 110)"
          className="transition-all duration-1200 ease-out"
        />

        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="#2DD4BF"
          strokeWidth="22"
          strokeDasharray={`${technicalLength} ${circumference}`}
          strokeDashoffset={-(4 + dsaLength + gitLength)}
          transform="rotate(-90 110 110)"
          className="transition-all duration-1200 ease-out"
        />

        {/* Percentage */}
        <text x="110" y="108" textAnchor="middle" fill="#E4E4E7" fontSize="39" fontWeight="800">
          {percentage}%
        </text>

        {/* Completed tasks */}
        <text x="110" y="132" textAnchor="middle" fill="#9F9FA9" fontSize="15">
          {completed} of {questions.length} done
        </text>
      </svg>
    </div>
  );
};

export default ProgressChart;
