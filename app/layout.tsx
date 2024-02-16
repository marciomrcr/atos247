import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";



// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rede IDE 3",
  description: "Gestão de Células",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <html lang="en">
        <body className="p-0 m-0 box-border bg-[#B4E8CB] w-min-[360px]  ">
        <div className="flex gap-4 overflow-y-auto">
          <Sidebar />
          <main className="flex-1 pr-4">{children}</main>
        </div>
      </body>
      </html>
   
  );
}
