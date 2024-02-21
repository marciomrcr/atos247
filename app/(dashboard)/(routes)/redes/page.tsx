

import type { Metadata } from "next";

import { AlertCircleIcon } from "lucide-react";


import { getRedesGerais } from "@/actions/getRedesGerais";
import SearchForm from "@/components/shared/SearchForm";
import { prisma } from "@/lib/prisma";
import NetworkUpdate from "./NetworkUpdate";
import NetworkDelete from "./NetworksDelete";
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
      {/* <TableForm redes={redesTest} countCelulas={countCelulas} redeGeral={redeGeral} /> */}
      <h1>Teste com cache</h1>
      <TableForm redes={redes} />
    
      <div>
        {redes?.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon/> 
          <p className='text-red-600 text-xl text-center'>Nenhuma rede cadastrada. Cadastre a primeira rede 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <>
          <h1>Teste sem cache</h1>
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>
                <th className="hidden md:flex">#</th>
                <th>Nome</th>                
                <th>Células</th>
                <th>Rede Mãe</th>  
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>              
              {redes.map((rede, index) => {
                // Calcula o total de membros
                // const totalMembros = rede.redes.reduce(
                //   (total, item) => total + item._count.discipulos,
                //   0
                // );
                return (
                  <tr key={rede.id}>
                    <td className="hidden md:flex">{index + 1}</td>
                    <td className="w-auto">{rede.name}</td>
                    <td className="w-1/6">{rede._count.celulas}</td>                    
                    <td className="w-1/6">{rede.redeMae.name}</td>                     
                    <td className="flex justify-center space-x-1">  
                      <NetworkDelete id={rede.id} />
                      <NetworkUpdate network={rede} /> 
                      {/* <NetworkView rede={rede} /> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </>
        )}
      </div>
    </div>
  );
}

export default RedesPage;
