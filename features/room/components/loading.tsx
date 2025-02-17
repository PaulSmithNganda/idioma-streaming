"use client";

import React, { useEffect, useState } from "react";

const Loading = ({ title }: { title: string }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 overflow-hidden">
      <div className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>
        <p className="text-center mb-8 text-lg">
          {"Please wait while we set up something amazing for you!"}
        </p>

        <div className="relative pt-1 mb-6">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 transition-all duration-500 ease-out"></div>
          </div>
          <div className="text-right mt-1 text-sm">{progress}%</div>
        </div>

        <div className="flex justify-center items-center space-x-2 mb-4">
          <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
          <div
            className="w-4 h-4 bg-white rounded-full animate-ping"
            style={{ animationDelay: "0.2s" }}></div>
          <div
            className="w-4 h-4 bg-white rounded-full animate-ping"
            style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
