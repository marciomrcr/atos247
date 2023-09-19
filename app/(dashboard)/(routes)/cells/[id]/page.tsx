
import { prisma } from "@/libs/prisma";
import { AlertCircleIcon, View } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";


interface CellPageProps {
  params: {
    id: string;
  };
}

const getCellById = cache(async (id: string) => {
  const cell = await prisma.cell.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      networkId: true,
      network: {
        select: {
          name: true,
          Supervision: {
            select: {
              member: {
                select: {
                  name: true,
                }
              }
            }
          }
        }
      },
      Leadership: {
        select: {          
          member: {
            select: {
              name: true
            }
          }
        }
      },
      _count: {
        select: {
          members: true
        }
      },
      members: {
        select: {
          id: true,
          name: true,
          email: true
        },
        orderBy: {
          name: 'desc'
        }
      },
      
    },    
  }
  );
  if (!cell) notFound();
  return cell;
});

export async function generateMetadata({
  params: { id },
}: CellPageProps): Promise<Metadata> {
  const cell = await getCellById(id);
  return {
    title: cell.name + " - Atos 2.47",
  };
}

export default async function CellPage({
  params: { id },
}: CellPageProps) {
  const cell = await getCellById(id)
  

  return (
    <div>
<div className="">  
        <h1 className="mx-2 font-bold text-base md:text-2xl">Célula {cell.name}</h1>
        <h3 className="mx-2 font-normal text-base">
          Líder: {!cell.Leadership?.member.name ? "Líder não cadastrado" : cell.Leadership?.member.name }</h3>
        <h3 className="mx-2 font-normal text-base">
          Supervisor: {cell.network.Supervision?.member?.name}</h3>
        <h3 className="mx-2 font-normal text-base">
          Rede {cell.network.name}</h3>
</div>
      <div>
        {!cell ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon />
            <p className='text-red-600 text-xl text-center'>Nenhuma célula cadastrada. Cadastre a primeira rede 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>  
              <th className="hidden md:flex">#</th>
                <th>Nome</th>
                <th className="hidden md:table-cell">Email</th>                
                <th className="text-end md:text-center ">Ações</th>
              </tr>
            </thead>
            <tbody>
              { cell.members.map((item, index)=>(
                <tr key={item.id}>                 
                  <td className="hidden md:flex">{index + 1}</td>
                  <td className='w-auto'>{item.name}</td>
                  <td className='hidden md:table-cell'>{item.email}</td>
                 
                  <td className='flex justify-end md:justify-center space-x-1'><Link href={"/members/" + item.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
                    <View /></Link>
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

