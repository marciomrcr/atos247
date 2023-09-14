"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Network, User, UserPlus, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const tolls = [
  {
    label: "Cadastrar Discípulo",
    href: "/members",
    icon: UserPlus,
    // color: "text-violet-500",
    // bgColor: "text-violet-500/10",
  },
  {
    label: "Cadastrar Célula",
    href: "/cells",
    icon: Users,
    color: "text-violet-500",
    // bgColor: "text-violet-500/10",
  },
  {
    label: "Cadastrar Rede",
    href: "/networks",
    icon: Network,
     color: "text-violet-500",
    // bgColor: "text-violet-500/10",
  },
  {
    label: "Cadastrar Usuário",
    href: "/users",
    icon: User,
     color: "text-violet-500",
    // bgColor: "text-violet-500/10",
  },
];
const Dashboard = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Dashboard Geral
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Visão geral de sua gestão de células
        </p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tolls.map((tool) => (
          
          <Card
            key={tool.href}
            onClick={() => router.push(tool.href)}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
            <tool.icon className={cn("w-8 h-8", tool.color)} />
              {/* <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div> */}
              <div className="font-semibold">{tool.label}</div>
            </div>
            
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
