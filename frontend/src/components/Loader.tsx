import React from "react";

const Loader = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
      <div className="h-25 w-25 animate-spin rounded-full border-4 border-slate-900 border-t-red-800"></div>
      <p className="mt-4 text-2xl text-gray-300 font-extrabold">Loading...</p>
    </div>
  );
};

export default Loader;
