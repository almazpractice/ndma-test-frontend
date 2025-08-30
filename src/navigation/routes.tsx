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

export const masters: Master[] = [
  {
    name: "Almaz",
    role: "Relax & Spa",
    avatarUrl: "https://avatars.githubusercontent.com/u/79905215?v=4&size=64",
  },
  {
    name: "Anna",
    role: "Sport Massage",
    avatarUrl: "https://avatars.githubusercontent.com/u/79905215?v=4&size=64",
  },
  {
    name: "Marko",
    role: "Deep Tissue",
    avatarUrl: "https://avatars.githubusercontent.com/u/79905215?v=4&size=64",
  },
];

export const routes: Route[] = [
  //   { path: "/", Component: IndexPage },
  { path: "/", Component: HomePage, masters: masters, title: "Home" },
  {
    path: "/booking",
    Component: BookingPage,
    masters: masters,
    title: "Booking",
  },
  {
    path: "/profile",
    Component: ThemeParamsPage,
    masters: masters,
    title: "Theme Params",
  },
];
