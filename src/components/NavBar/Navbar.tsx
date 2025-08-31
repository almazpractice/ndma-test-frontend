import React, { useEffect, useRef } from "react";
import { FixedLayout, InlineButtons } from "@telegram-apps/telegram-ui";

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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setVar = () => {
      const h = el.offsetHeight || 0;
      document.documentElement.style.setProperty("--navbar-h", `${h}px`);
    };

    setVar();

    const ro = new ResizeObserver(() => setVar());
    ro.observe(el);

    const onResize = () => setVar();
    window.addEventListener("resize", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <React.Fragment>
      <div>
        <FixedLayout vertical="bottom">
          <InlineButtons
            ref={ref}
            className="w-full bg-white border-t border-gray-200"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom)" }}
          >
            {tabs.map(({ id, label, active, icon }) => (
              <InlineButtons.Item
                key={id}
                mode={active ? "bezeled" : "plain"}
                onClick={() => onTabChange(id)}
                className="bg-white"
              >
                {icon}
                <span className="text-xs mt-1">{label}</span>
              </InlineButtons.Item>
            ))}
          </InlineButtons>
        </FixedLayout>
      </div>
    </React.Fragment>
  );
};
