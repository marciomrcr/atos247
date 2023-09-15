
import type { Metadata } from "next";
import Link from "next/link";

import { getCells } from "@/actions/getCells";
import { getNetworks } from "@/actions/getNetworks";
import { AlertCircleIcon } from "lucide-react";

import CellForm from "./CellForm";
import DeleteCellForm from "./DeleteCellForm";
import UpdateCellForm from "./UpdateCellForm";

export const metadata: Metadata = {
  title: "Células - Atos 2.47",
};

async function CellPage() {
  const [networks, cells] = await Promise.all( [getNetworks(), getCells()])


  return (
    <div>     
      <div className=" mb-4">

        <CellForm networks={networks} />
      </div>
    
      <div>
        {cells.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon/> 
          <p className='text-red-600 text-xl text-center'>Nenhuma célula cadastrada. Cadastre a primeira célula 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full">
                 <thead>
                   <tr>
                     <th className=' '>#</th>
                     <th>Célula</th>
                     <th>Rede</th>
                     <th>Membros</th>
                     <th className="text-center">Ações</th>
                   </tr>
                 </thead>
                 <tbody>
                   {cells?.map((cell, index) => (
                      <tr key={cell.id}>
                        <td className=' '>{index + 1}</td>
                        <td className='w-1/3'>{cell.name}</td>                    
                        <td className='w-1/3'>{cell.Network.name}</td> 
                        <td className='w-1/3'>
                        <Link href={"/cells/" + cell.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline'>
                          {cell._count.member} Membros</Link></td>
                        <td className='flex justify-center space-x-1'><DeleteCellForm id={cell.id}/>
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
