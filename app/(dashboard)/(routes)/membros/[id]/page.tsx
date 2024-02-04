import { prisma } from "@/libs/prisma";
import { View } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

interface NetworkPageProps {
  params: {
    id: string;
  };
}



const getNetworkId = cache(async (id: string) => {
  const membro = await prisma.discipulo.findUnique({
    where: { id },
    
    select: {
      id: true,
      name: true,
      phone: true,
      birth: true,
      cell: {
        select: {
          id: true,
      name: true,
      network: {
        select: {
          id: true,
      name: true,
        }
      }
        }
      },
      cargo: {
        select: {
          id: true,
      title: true,
        }
      },


    }
  });
  if (!membro) notFound();
  return membro;
});

export async function generateMetadata({
  params: { id },
}: NetworkPageProps): Promise<Metadata> {
  const membro = await getNetworkId(id);
  return {
    title: membro.name + " - Atos 2.47",
  };
}

export default async function NetworkPage({
  params: { id },
}: NetworkPageProps) {
 
  const membro = await getNetworkId(id);

  return (
    <div >
      <h1 className="flex items-center mb-4 mx-4 font-bold text-2xl">Discipulo: {membro.name}</h1>
            <div>
        
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>
               
                <th>Nome</th>
                <th className="w-auto text-center">telefone</th>
                <th className="w-auto text-center">Função</th>                
                <th className="w-auto text-center">Célula</th>                
                <th className="w-auto text-center">Rede</th>                
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
             
                <tr key={membro.id}>                 
                  <td className='w-auto'>{membro.name}</td>               
                  <td className='w-auto text-center'>
                    {membro.phone}</td>
                  <td className='w-auto text-center'>
                    {membro.cargo.title}</td>
                  <td className='w-auto text-center'>
                  <Link href={"/cells/" + membro.cell.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
                  {membro.cell.name}<View /></Link>
                    </td>
                  <td className='w-auto text-center'>
                    {membro.cell.network.name}</td>
                  <td className='flex justify-center space-x-1'>
                    <Link href={"#"} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
                    Editar Excluir<View /></Link>
                  </td>
                </tr>
              

            </tbody>
          </table>
        
      </div>
    </div>
  )
}

