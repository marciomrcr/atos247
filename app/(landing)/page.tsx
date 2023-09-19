import { prisma } from "@/libs/prisma";
import { Cross } from 'lucide-react';
import Link from "next/link";

import { Metadata } from "next";

import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { MainNav } from "@/components/ui/main-nav";
import { Overview } from "@/components/ui/overview";
import { RecentSales } from "@/components/ui/recent-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";

export const metadata: Metadata = {
  title: "Overview Atos 2.47",
  description: "Visão geral da gestão de células.",
}

async function getNetworks() {
  const res = await prisma.network.count();
  return res;
}
async function getCells() {
  const res = await prisma.cell.count();
  return res;
}
async function getMembers() {
  const res = await prisma.member.count();
  return res;
}

const LandingPage = async () => {
  const [members, network, cells] = await Promise.all( [getMembers(), getNetworks(), getCells()])
  return (
    <div className="bg-[#111827]">      
           
  
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              {/* <UserNav /> */}
              <Link href="/dashboard">
          <button className="text-gray-100 mr-6 bg-cyan-950 text-sm  md:text-base rounded-md md:px-4 px-2 py-1 border border-gray-300">Login</button>
        </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between ">
            <h2 className="text-base md:text-3xl font-bold tracking-tight text-gray-100">Overview</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker className=''/>
              
            </div>
          </div>
          <Tabs defaultValue="overview"  className="space-y-4">
            <TabsList className="hidden md:flex">
              <TabsTrigger className='text-sm md:text-base px-[10px] md:px-auto' value="overview">Overview</TabsTrigger>
              <TabsTrigger className='text-sm md:text-base px-[10px] md:px-auto' value="analytics" disabled>
                Batismos
              </TabsTrigger>
              <TabsTrigger className='text-sm md:text-base px-[10px] md:px-auto' value="reports" disabled>
                Células
              </TabsTrigger>
              <TabsTrigger className='text-sm md:text-base px-[10px] md:px-auto' value="notifications" disabled>
                Redes
              </TabsTrigger>
              <TabsTrigger className='text-sm md:text-base px-[10px] md:px-auto' value="notifications" disabled>
                Membros
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">


              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-cyan-950 rounded-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-100 ">
                      Batismo 2023
                    </CardTitle>
                    <Cross className="h-8 w-8 text-yellow-500"                      
                    />  
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-100">489</div>
                    <p className="text-xs text-muted-foreground text-gray-100">
                      +20.1% em relação a 2022
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-cyan-950 rounded-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-100 ">
                      Células
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-8 w-8 text-gray-100"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                  <div className="text-2xl font-bold text-gray-100">{cells}</div>
                    <p className="text-xs text-muted-foreground text-gray-100">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-cyan-950 rounded-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-100">Redes</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-8 w-8 text-gray-100"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                  <div className="text-2xl font-bold text-gray-100">{network}</div>
                    <p className="text-xs text-muted-foreground text-gray-100">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-cyan-950 rounded-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-100">
                     Membros
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-8 w-8 text-gray-100"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                  <div className="text-2xl font-bold text-gray-100">{members}</div>
                    <p className="text-xs text-muted-foreground text-gray-100">
                      +201 since last year
                    </p>
                  </CardContent>
                </Card>
              </div>
       
              <div className="grid gap-4 md:grid-cols-2  ">
                <Card className=" bg-cyan-950  ">
                  <CardHeader>
                    <CardTitle className="text-gray-100">Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2 ">
                    <div className=''>
                    <Overview /></div>
                  </CardContent>
                </Card>
                <Card className=" bg-cyan-950">
                  <CardHeader>
                    <CardTitle className="text-gray-100">Batismo por rede</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      </div>


      






  );
};

export default LandingPage;
