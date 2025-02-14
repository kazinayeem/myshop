"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return null; // Hide Navbar for admin routes
  }

  return <Navbar />; // Show Navbar for other routes
}
