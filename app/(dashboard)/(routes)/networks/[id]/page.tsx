
import { getNetworks } from "@/actions/getNetworks";
import { prisma } from "@/libs/prisma";
import { AlertCircleIcon, View } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import DeleteCellForm from "../../cells/DeleteCellForm";
import UpdateCellForm from "../../cells/UpdateCellForm";
import NetworkForm from "../NetworkForm";


interface NetworkPageProps {
  params: {
    id: string;
  };
}

const getCells = cache(async (id: string) => {
  const cell = await prisma.cell.findMany({
    where: {
      networkId: id
    },
    select: {
      id: true,
      name: true,
      networkId: true,
      Network: true,
      _count: {
        select: {
          member: true
        }
      }
      
    },
    orderBy: { name: "asc" },

  }
    
   );
  if (!cell) notFound();
  return cell;
});



const getNetworkId = cache(async (id: string) => {
  const network = await prisma.network.findUnique({ 
    where: { id },    
    include: {
      cell: {
        select: {
          id: true,
          name: true,          
        },
        orderBy: {
          name: 'desc'
        }
      }
    },
    

   });
  if (!network) notFound();
  return network;
});

export async function generateMetadata({
  params: { id },
}: NetworkPageProps): Promise<Metadata> {
  const network = await getNetworkId(id);
  return {
    title: network.name + " - Atos 2.47",
  };
}

export default async function NetworkPage({
  params: { id },
}: NetworkPageProps) {
  const cells = await getCells(id)
  const network = await getNetworkId(id);
  const networks = await getNetworks()

  return (
    <div>
     
      <div className=" mb-4">
        <NetworkForm />
        {/* <CellForm networks={networks}/> */}
      </div>
    
      <div>
        {!network ? (
          
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon/> 
          <p className='text-red-600 text-xl text-center'>Nenhuma rede cadastrada. Cadastre a primeira rede 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>
                <th className="hidden md:flex">#</th>               
                <th>Células</th>
                <th>Rede</th>
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
                        <Link href={"/cells/" + cell.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
                          {cell._count.member} <View /> </Link></td>
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
  )
}

