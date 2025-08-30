import React from "react";

export const WelcomeSection: React.FC<{ name: string; subtitle: string }> = ({
  name,
  subtitle,
}) => (
  <div className="px-4 mt-2">
    <h2 className="text-2xl font-extrabold leading-tight text-gray-900 mb-1">{`Welcome, ${name} 👋`}</h2>
    <p className="text-gray-500 text-sm m-0 font-thin">{subtitle}</p>
  </div>
);
