// components/Spinner.jsx
import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-10 h-10 border-4 border-[#1C9B7A] border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;
