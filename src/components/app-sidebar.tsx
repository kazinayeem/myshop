"use client";
import { Store, CopyPlus, CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  { title: "Home", url: "/admin", icon: Store },
  { title: "All Products", url: "/admin/products", icon: CopyPlus },
  { title: "Add Product", url: "/admin/products/add", icon: CopyPlus },
  { title: "All Categories", url: "/admin/categories", icon: CirclePlus },
  { title: "Show Categories", url: "/admin/categories/add", icon: CirclePlus },
  { title: "All Orders", url: "/admin/orders", icon: CirclePlus },
  { title: "Add Order", url: "/admin/orders/add", icon: CirclePlus },
  { title: "All Users", url: "/admin/users", icon: CirclePlus },
  { title: "Add User", url: "/admin/users/add", icon: CirclePlus },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  // Toggle sidebar visibility on small screens
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Check window size and auto-hide the sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false); // Automatically hide sidebar on small screens
      } else {
        setIsOpen(true); // Always show sidebar on larger screens
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount to set the correct state
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sidebar
      className={`transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-0"
      }`}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <button
        className="lg:hidden absolute top-4 left-4 z-10 p-2 bg-indigo-600 text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close" : "Open"}
      </button>
    </Sidebar>
  );
}
