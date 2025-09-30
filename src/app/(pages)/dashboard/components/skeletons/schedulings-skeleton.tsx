import React from "react";

export function SchedulingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 rounded mb-4 h-[116px] w-full"></div>
      <div className="bg-gray-300 rounded mb-4 h-[116px] w-full"></div>
      <div className="bg-gray-300 rounded mb-4 h-[116px] w-full"></div>
      <div className="bg-gray-300 rounded mb-4 h-[116px] w-full"></div>
    </div>
  );
}