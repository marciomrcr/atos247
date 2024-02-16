import { getCelulas } from "@/actions/getCelulas";

import { prisma } from "@/lib/prisma";
import { AlertCircleIcon, View } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";


interface NetworkPageProps {
  params: {
    id: string;
  };
}

const getNetworks = cache(async () => {
  const rede = await prisma.rede.findMany({
    
    select: {
      id: true,
      name: true,
      _count:{
        select: {
          celulas: true
        }
      },
      celulas: {
        select: {
          id: true,
          name: true,
         
        }
      },
      
    },
    orderBy: { name: "desc" },
  }
  );
  if (!rede) notFound();
  return rede;
});

const getNetworkId = cache(async (id: string) => {
  const network = await prisma.rede.findUnique({
    where: { id },
        select: {
          id: true,
          name: true,          
          celulas:{
            select: {
              id: true,
              name: true,

            },
            orderBy: {
              name: 'asc'
            }
          },
          _count: {
            select: {
              celulas: true
            }
          }, 
        }
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
  const redes = await getCelulas()
  const network = await getNetworkId(id);
  const networks = await getNetworks();

  return (
    <div >
      
      <h1 className="flex items-center mb-4 mx-4 font-bold text-2xl">Rede de células {network.name}</h1>
            <div>
        {network.celulas.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon />
            <p className='text-red-600 text-xl text-center'>Nenhuma célula cadastrada. Cadastre a primeira célula 👨‍👩‍👧‍👦 </p>
            <div className=" mb-4">
{/* <CellForm networks={networks} /> */}
{/* <CellMemberForm members={members} networks={networks}/>  */}
</div>
            </div>
        ) : (
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>
                <th className="hidden md:flex">#</th>
                <th>Células</th>
                
                <th className="w-auto text-center">Membros</th>                
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {network.celulas?.map((rede, index) => (
                <tr key={rede.id}>
                  <td className='hidden md:flex '>{index + 1}</td>
                  <td className='w-1/3'>{rede.name}</td>               
                  
                    <td className='fw-auto'><Link href={"/celulas/" + rede.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold flex items-center justify-center gap-1'>
    100<View /></Link>
    </td>
                  <td className='w-auto text-center'>
                    Edit
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

