import React from "react";

export const PageHeader: React.FC<{
  title: string;
  right?: React.ReactNode;
}> = ({ title, right }) => (
  <div className="flex items-center justify-between p-4">
    <h1 className="text-[20px] font-thin text-gray-900 m-0">{title}</h1>
    {right}
  </div>
);
