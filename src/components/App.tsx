import { useMemo, useState, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  HashRouter,
  useLocation,
} from "react-router-dom";
import {
  retrieveLaunchParams,
  //   useSignal,
  //   isMiniAppDark,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { routes } from "@/navigation/routes.tsx";
import { NavBar } from "@/components/NavBar/NavBar.tsx";
import { VscHome, VscCalendar, VscAccount } from "react-icons/vsc";

type Page = "home" | "profile" | "booking";

export function AppContent() {
  const location_obj = useLocation();
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const tabs = [
    {
      id: "home",
      label: "Home",
      active: currentPage === "home",
      icon: <VscHome size={28} />,
    },
    {
      id: "booking",
      label: "Booking",
      active: currentPage === "booking",
      icon: <VscCalendar size={28} />,
    },
    {
      id: "profile",
      label: "Profile",
      active: currentPage === "profile",
      icon: <VscAccount size={28} />,
    },
  ];

  const onTabChange = (tabId: string) => {
    setCurrentPage(tabId as Page);
    switch (tabId) {
      case "home":
        window.location.hash = "/";
        break;
      case "booking":
        window.location.hash = "/booking";
        break;
      case "profile":
        window.location.hash = "/profile";
        break;
      default:
        console.warn(`Unknown tab: ${tabId}`);
    }
    window.scrollTo(0, 0); // Scroll to top on tab change
  };

  const handleNavigate = (path: string) => {
    switch (path) {
      case "/":
        setCurrentPage("home");
        break;
      case "/booking":
        setCurrentPage("booking");
        break;
      case "/profile":
        setCurrentPage("profile");
        break;
    }
  };

  //   Sync tab state when route changes
  useEffect(() => {
    handleNavigate(location_obj.pathname);
  }, [location_obj.pathname]);

  return (
    <div>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <NavBar tabs={tabs} onTabChange={onTabChange} />
    </div>
  );
}

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  //   const isDark = useSignal(isMiniAppDark);

  return (
    <AppRoot
      //   appearance={isDark ? "dark" : "light"}
      appearance={"light"}
      platform={["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"}
    >
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppRoot>
  );
}
