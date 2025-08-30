import React from "react";
import { Tabbar } from "@telegram-apps/telegram-ui";

interface Tab {
  id: string;
  label: string;
  active: boolean;
  icon?: React.ReactNode;
}

interface TabBarProps {
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
}

export const NavBar: React.FC<TabBarProps> = ({ tabs, onTabChange }) => {
  return (
    <Tabbar>
      {tabs.map(({ id, label, active, icon }) => (
        <Tabbar.Item
          key={id}
          text={label}
          selected={active}
          onClick={() => onTabChange(id)}
          children={icon}
        ></Tabbar.Item>
      ))}
    </Tabbar>
  );
};
