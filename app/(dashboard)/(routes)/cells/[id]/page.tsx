
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
          Membresia: {
            where: {
              responsibilityId: "650f54a44231c8aff91620c5"
            }, select: {
              person: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      },
      Membresia: {
        select: {
          responsibility: {
            select: {
              name: true
            }
          },
          person: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        
        orderBy: {
          person: {
            name: 'desc'
          }
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
        
        <h3 className="mx-2  text-base">Rede: <span className="font-semibold ">{cell.network.name}</span>
          </h3>
        <h3 className="mx-2 font-normal text-base">
          Supervisor: <span className="font-semibold ">{cell.network.Membresia.map((item)=> item.person.name)}</span></h3>
</div>
      <div>
        {cell.Membresia.length === 0? (
          <div>
          <div className="flex items-center justify-center " > 
          <div className="flex mt-6">
          <AlertCircleIcon className="" /> 
            <p className='text-red-600 ml-2 text-xl text-center'>Nenhum membro cadastrado.</p> </div>
            
            </div><p className="text-center"> Cadastre os membros da célula 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>  
              <th className="hidden md:flex">#</th>
                <th>Nome</th>
                <th className="hidden md:table-cell">Email</th>                
                <th>Função</th>                
                <th className="text-end md:text-center ">Ações</th>
              </tr>
            </thead>
            <tbody>
              { cell.Membresia.map((item, index)=>(
                <tr key={item.person.id}>                 
                  <td className="hidden md:flex">{index + 1}</td>              
                     <td className='w-auto'>{item.person.name} </td>
                      <td className='hidden md:table-cell'>{item.person.email}</td> 
                      
                  <td >{item.responsibility.name}</td>                 
                  <td className='flex justify-end md:justify-center space-x-1'><Link href={"/members/" + item.person.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
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

