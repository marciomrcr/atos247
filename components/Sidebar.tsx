"use client";

import { cn } from "@/lib/utils";
import { GaugeCircle, Network, User, UserPlus, Users } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// ... (código existente)

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});
 

const routes = [
  {
    label: "Dashboard",
    icon: GaugeCircle,
    href: "/dashboard",
    color: "text-sky-500",
    
  },
  {
    label: "Batismo",
    icon: UserPlus,
    href: "/batismo",
    color: "text-sky-500",
  },  
  {
    label: "Discípulos",
    icon: UserPlus,
    href: "/members",
    color: "text-sky-500",
  },
  {
    label: "Células",
    icon: Users,
    href: "/cells",
    color: "text-sky-500",
  },
  {
    label: "Redes",
    icon: Network,
    href: "/networks",
    color: "text-sky-500",
  },
  {
    label: "Discípulos",
    icon: User,
    href: "/membros",
    color: "text-sky-500",
  }
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative w-14 h-12 mr-4"
          
          >
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-xl font-bold", montserrat.className)}>
            Rede IDE🚶‍♀️🚶‍♀️
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
          
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
