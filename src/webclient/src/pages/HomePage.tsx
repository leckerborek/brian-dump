import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center flex-1">
      <input
        className="w-full p-4 text-2xl font-semibold text-gray-800 rounded md:w-2/3 hover:shadow-md focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Search for anything..."
      />
    </div>
  );
};

export default HomePage;
