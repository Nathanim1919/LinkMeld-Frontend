import React, { useState } from "react";
import {
  FiActivity,
  FiSearch,
  FiFolder,
  FiSettings,
  FiBarChart2,
  FiMenu,
} from "react-icons/fi";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  route: string;
}

const sidebarItems: NavItem[] = [
  { name: "My Brain", icon: <FiActivity />, route: "/" },
  { name: "Search", icon: <FiSearch />, route: "/search" },
  { name: "Collections", icon: <FiFolder />, route: "/collections" },
  { name: "Insights", icon: <FiBarChart2 />, route: "/insights" },
  { name: "Settings", icon: <FiSettings />, route: "/settings" },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const renderNavItems = (items: NavItem[]) => (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.name}>
          <button
            className="flex cursor-pointer items-center w-full gap-1 p-2 text-gray-700 hover:bg-emerald-100 hover:text-emerald-600 rounded-md transition-colors"
            onClick={() => {
              // Handle navigation if using react-router
              console.log(`Navigate to ${item.route}`);
            }}
          >
            <span className="w-7 h-7 rounded-full bg-green-200 grid place-items-center">
              {item.icon}
            </span>
            <span className="text-[15px]">{item.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Sidebar */}
      <section className="">
        <aside
          className={`fixed lg:static top-0 left-0 h-full bg-white border-r transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-200 z-40 p-4 shadow-md`}
        >
          <nav>
            <div className="">{renderNavItems(sidebarItems)}</div>
          </nav>
        </aside>

        {/* Overlay for Mobile */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </section>
    </>
  );
};

export default Sidebar;
