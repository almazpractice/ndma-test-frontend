import type { ComponentType, JSX } from "react";

import { ThemeParamsPage } from "@/pages/ThemeParamsPage.tsx";
import { HomePage } from "@/pages/HomePage/HomePage.tsx";
import { BookingPage } from "@/pages/BookingPage/BookingPage.tsx";
import { Master } from "@/components/common/Master";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
  masters?: Master[];
}

export const routes: Route[] = [
  { path: "/", Component: HomePage, title: "Home" },
  {
    path: "/booking",
    Component: BookingPage,
    title: "Booking",
  },
  {
    path: "/profile",
    Component: ThemeParamsPage,
    title: "Theme Params",
  },
];
