
import type { Metadata } from "next";
import Link from "next/link";

import { getCells } from "@/actions/getCells";
import { getNetworks } from "@/actions/getNetworks";
import { AlertCircleIcon, View } from "lucide-react";

import { getMembers } from "@/actions/getMembers";
import CellForm from "./CellForm";
import CellMemberForm from "./CellMemberForm";
import DeleteCellForm from "./DeleteCellForm";
import UpdateCellForm from "./UpdateCellForm";

export const metadata: Metadata = {
  title: "Células - Atos 2.47",
};

async function CellPage() {
  const [members, networks, cells] = await Promise.all( [getMembers(), getNetworks(), getCells()])


  return (
    <div className="mt-3">   
      <div className=" mb-4">

        <CellForm networks={networks} />
        <CellMemberForm members={members} networks={networks}/> 
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



                        <Link href={"/cells/" + cell.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold flex items-center gap-1'>
                          {cell._count.member}<View /> </Link></td>
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
