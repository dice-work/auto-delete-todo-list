import { NextAppLayoutProps } from "@app/types/next";
import MainLayoutClient from "./layout.client";

export default function MainLayout({ children }: NextAppLayoutProps) {
  return <MainLayoutClient>{children}</MainLayoutClient>;
}
