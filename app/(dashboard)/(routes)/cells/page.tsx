
import type { Metadata } from "next";
import Link from "next/link";

import { getCells } from "@/actions/getCells";
import { getNetworks } from "@/actions/getNetworks";
import { AlertCircleIcon, View } from "lucide-react";

import { getNetworkId } from "@/actions/getNetworkId";
import CellForm from "./CellForm";
import CellMultiplicationForm from "./CellMultiplicationForm";
import DeleteCellForm from "./DeleteCellForm";
import UpdateCellForm from "./UpdateCellForm";

export const metadata: Metadata = {
  title: "Células - Atos 2.47",
};

async function CellPage() {
  const [networks, cells, networkId] = await Promise.all( [getNetworks(), getCells(), getNetworkId])
  


  return (
    <div className="mt-3">   
      <div className="flex justify-center mb-4">

        <CellForm networks={networks} />
        <CellMultiplicationForm networks={networks} />
        {/* <CellMemberForm members={members} networks={networks}/>  */}
      </div>
    
      <div>
        {cells.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon/> 
          <p className='text-red-600 text-xl text-center'>Nenhuma célula cadastrada. Cadastre a primeira célula 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full">
                 <thead>
                   <tr>
                     <th className='hidden md:table-cell'>#</th>
                     <th>Célula</th>
                     <th>Rede</th>
                     <th className="text-center">Membros</th>
                     <th>Celula Mãe</th>                     
                     <th className="text-center">Ações</th>
                   </tr>
                 </thead>
                 <tbody>
                   {cells?.map((cell, index) => (
                      <tr key={cell.id}>
                        <td className='hidden md:table-cell'>{index + 1}</td>
                        <td className='w-auto'>{cell.name}</td>                    
                        <td className='w-auto'>{cell.network.name}</td> 
                        <td className='w-auto'>
                        <Link href={"/cells/" + cell.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold flex items-center justify-center gap-1'>
                     <View /> </Link></td>
                     <td className='w-auto'>{cell?.celulaMae?.name}</td> 
                        <td className='flex items-center justify-center mx-1'><DeleteCellForm id={cell.id}/>
                          <UpdateCellForm cell={cell}  networks={networks}/> 
                        </td>
        
                      </tr>
                    ))}
        
                  </tbody>
                </table>
        )}
      </div>
    </div>
  );
}

export default CellPage;
