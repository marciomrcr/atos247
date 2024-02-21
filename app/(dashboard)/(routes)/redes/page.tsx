

import type { Metadata } from "next";

import { AlertCircleIcon } from "lucide-react";


import { getRedesGerais } from "@/actions/getRedesGerais";
import SearchForm from "@/components/shared/SearchForm";
import { prisma } from "@/lib/prisma";
import RedesForm from "./RedesForm";
import TableForm from "./TableForm";



export const metadata: Metadata = {
  title: "Redes de Células",
  description: "Redes de células"
};

async function getRedes() {
  const res = await prisma.rede.findMany({

    select: {

      id: true,
      name: true,
      redeMae: {
        select: {
          id: true,
          name: true
        }
      },
      _count: {
        select: {
          celulas: true,
        },
      },

      
    },

    orderBy: {
      name: "asc",
    },
  });

  return res;
}


async function RedesPage() {
  const [redes, redeMae] = await Promise.all( [ getRedes(), getRedesGerais()])
  return (
    <div className="mt-3">
     
      <div className="flex items-center mb-4">
      <h1 className=" mx-4 font-bold text-2xl">
          Redes de Células Cadastradas
        </h1>
       <RedesForm networksMothers={redeMae} />
        {/* <CellForm redes={redes}/> */}
      </div>

      <div className="bg-slate-400">
       
        <SearchForm />
      </div>
     
      
    
      <div>
        {redes?.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon/> 
          <p className='text-red-600 text-xl text-center'>Nenhuma rede cadastrada. Cadastre a primeira rede 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <>
          
          <TableForm redes={redes} />
          </>
        )}
      </div>
    </div>
  );
}

export default RedesPage;
