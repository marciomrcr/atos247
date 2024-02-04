import type { Metadata } from "next";

import { AlertCircleIcon } from "lucide-react";

import { getNetworkMother } from "@/actions/getNetworkMother";
import { getNetworks } from "@/actions/getNetworks";
import NetworkUpdate from "./NetworkUpdate";
import NetworkDelete from "./NetworksDelete";
import RedesForm from "./RedesForm";


export const metadata: Metadata = {
  title: "Redes de Células - Jetro",
};

interface CellPageProps {
  params: {
    id: string;
  };
}

async function RedesPage() {
  const [redes, redeMae] = await Promise.all( [getNetworks(), getNetworkMother()])



  return (
    <div className="mt-3">
     
      <div className="flex items-center mb-4">
      <h1 className=" mx-4 font-bold text-2xl">
          Redes de Células Cadastradas
        </h1>
       <RedesForm networksMothers={redeMae} />
        {/* <CellForm redes={redes}/> */}
      </div>
    
      <div>
        {redes.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon/> 
          <p className='text-red-600 text-xl text-center'>Nenhuma rede cadastrada. Cadastre a primeira rede 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>
                <th className="hidden md:flex">#</th>
                <th>Nome</th>
                <th>Células</th>
                <th>Membros</th>
                <th>Rede Mãe</th>  
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>              
              {redes?.map((rede, index) => {
                // Calcula o total de membros
                const totalMembros = rede.cells.reduce(
                  (total, item) => total + item._count.discipulos,
                  0
                );
                return (
                  <tr key={rede.id}>
                    <td className="hidden md:flex">{index + 1}</td>
                    <td className="w-auto">{rede.name}</td>
                    <td className="w-1/6">{rede._count.cells}</td>
                    <td className="w-1/6">{totalMembros}</td>                    
                    <td className="w-1/6">{rede.redeMae?.name}</td>  
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
        )}
      </div>
    </div>
  );
}

export default RedesPage;
