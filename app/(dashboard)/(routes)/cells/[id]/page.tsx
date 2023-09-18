
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
      Network: true,
      _count: {
        select: {
          member: true
        }
      },
      member: {
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
// const getMembers = cache(async () => {
//   const cell = await prisma.cell.findMany({
//     where: {
//       id
//     },
//     select: {
//       id: true,
//       name: true,
//       networkId: true,
//       Network: true,
//       _count: {
//         select: {
//           member: true
//         }
//       }
//     },    
//   }
//   );
//   if (!cell) notFound();
//   return cell;
// });



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
        <h1 className="flex items-end mx-4 font-bold text-2xl">Célula {cell.name}<span className="mx-2 font-normal text-base"> - Rede {cell.Network.name}</span></h1>
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
                <th>Email</th>
                
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              { cell.member.map((item, index)=>(
                <tr key={item.id}>                 
                  <td className="hidden md:flex">{index + 1}</td>
                  <td className='w-1/3'>{item.name}</td>
                  <td className='w-1/3'>{item.email}</td>
                 
                  <td className='flex justify-center space-x-1'><Link href={"/members/" + item.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
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

