"use client";

import Link from "next/link";

import { useState } from "react";
import {
  MdKeyboardArrowLeft,
  MdOutlineConnectWithoutContact,
} from "react-icons/md";

import { usePathname } from "next/navigation";
import { FaChalkboardTeacher } from "react-icons/fa";
import {
  FaBaby,
  FaPeopleRoof,
  FaPersonWalkingDashedLineArrowRight,
  FaUsers,
} from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { LuLayoutPanelLeft } from "react-icons/lu";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LuLayoutPanelLeft,
  },

  {
    name: "Células",
    href: "/celulas",
    icon: FaPeopleRoof,
  },
  {
    name: "Membros",    
    href: "/membros",
    icon: FaUsers,
  },
  {
    name: "Redes",
    href: "/redesGerais",
    icon: MdOutlineConnectWithoutContact,
  },

  {
    name: "Funções",
    href: "/funcoes",
    icon: GrUserWorker,
  },
  {
    name: "Batismo",
    href: "/batismos",
    icon: FaBaby,
  },
  {
    name: "Treinamentos",
    href: "/treinamentos",
    icon: FaChalkboardTeacher,
  },
];

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleIsCollapsedSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const pathname = usePathname();
  return (
    <div className="bg-[#7f0000]  relative h-[100vh]">
      <button className="btn_arrow" onClick={toggleIsCollapsedSidebar}>
        <MdKeyboardArrowLeft />
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar_top">
          {/* <Image
            src="./vercel.svg"
            width={80}
            height={60}
            alt="logo"
            className="sidebar_logo"
          /> */}
          <Link href='/'>
          <FaPersonWalkingDashedLineArrowRight className="sidebar_logo text-green-300" /></Link>
          <p className="text-3xl font-semibold text-gray-300">Rede IDE</p>
        </div>
        <ul className="sidebar_list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li
                className="sidebar_item"
                key={name}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <Link
                  className={`sidebar_link ${
                    pathname === href ? "sidebar_link_active" : ""
                  }`}
                  href={href}
                >
                  <span className="sidebar_icon">
                    <Icon />
                  </span>

                  <span className="sidebar_name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
