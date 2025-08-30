import React from "react";

export type InfoCardProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  button?: { label: string; onClick?: () => void; className?: string };
  className?: string;
};

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  button,
  className,
}) => (
  <div
    className={
      "rounded-xl text-white px-5 py-4 mt-6 mx-4 shadow-lg " + (className ?? "")
    }
  >
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    {description && <p className="text-sm mb-3">{description}</p>}
    {button && (
      <button
        className={
          "mt-1 bg-white px-3 py-2 rounded-lg text-sm font-semibold " +
          (button.className ?? "")
        }
        onClick={button.onClick}
      >
        {button.label}
      </button>
    )}
  </div>
);
