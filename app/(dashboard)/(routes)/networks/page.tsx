import type { Metadata } from "next";

import { getNetworks } from "@/actions/getNetworks";
import { AlertCircleIcon, View } from "lucide-react";
import Link from "next/link";
import NetworkForm from "./NetworkForm";
import NetworkUpdate from "./NetworkUpdate";
import NetworkDelete from "./NetworksDelete";


export const metadata: Metadata = {
  title: "Redes de Células - Jetro",
};

interface CellPageProps {
  params: {
    id: string;
  };
}

async function NetworkPage() {
  const networks = await getNetworks();


  return (
    <div className="mt-3">
     
      <div className="flex items-center mb-4">
      <h1 className=" mx-4 font-bold text-2xl">
          Redes de Células Cadastradas
        </h1>
        <NetworkForm />
        {/* <CellForm networks={networks}/> */}
      </div>
    
      <div>
        {networks.length === 0 ? (
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
                <th>Pr. rede</th>
                
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              
              {networks?.map((network, index) => {
                // Calcula o total de membros
                const totalMembers = network.cells.reduce(
                  (total, item) => total + item._count.Membresia,
                  0
                );
                return (
                  <tr key={network.id}>
                    <td className="hidden md:flex">{index + 1}</td>
                    <td className="w-auto">{network.name}</td>
                    <td className="w-auto flex items-center gap-1">  
                    <Link href={"/networks/" + network.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold w-auto flex items-center  gap-1'>
                    {network._count.cells} <View/> </Link>
                    </td>
                    <td className="w-1/6">{totalMembers}</td>
                    <td className="w-auto">{network.Membresia.map((item)=> item.person.name)}</td>
                    
                    <td className="flex justify-center space-x-1">  
                      <NetworkDelete id={network.id} />
                      <NetworkUpdate network={network} /> 
                      {/* <NetworkView network={network} /> */}
                     
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

export default NetworkPage;
