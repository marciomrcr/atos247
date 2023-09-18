import { prisma } from "@/libs/prisma";
import { AlertCircleIcon, Edit, Trash2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

interface NetworkPageProps {
  params: {
    id: string;
  };
}

const getMemberById = cache(async (id: string) => {
  const member = await prisma.member.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      isLeader: true,
      Cell: {
        select: {          
          name: true,
          id: true,
          Network: {
            select: {
              id: true,
              name: true
            }
          }
        }
      },      
    }   
    
  });
  if (!member) notFound();
  return member;
});

export async function generateMetadata({
  params: { id },
}: NetworkPageProps): Promise<Metadata> {
  const member = await getMemberById(id);
  return {
    title: member.name + " - Atos 2.47",
  };
}

export default async function NetworkPage({
  params: { id },
}: NetworkPageProps) {
  
  const member = await getMemberById(id);

  return (
    <div >
      <h1 className="flex items-center mb-4 mx-4 font-bold text-2xl"> {member.name}</h1>
            <div>
        {!member ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon />
            <p className='text-red-600 text-xl text-center'>Nenhuma membro encontrado🤷‍♂️</p></div>
        ) : (
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>                
                <th>Nome</th>
                <th>Célula</th>
                <th>Rede</th>
                <th>Email</th>                
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
             
                <tr key={member.id}>                  
                  <td className='w-1/3'>{member.name}</td>               
                  <td className='w-1/3'>{member.Cell.name}</td>               
                  <td className='w-1/3'>{member.Cell.Network.name}</td>               
                  <td className='w-1/3'>{member.email}</td>
                  <td className='flex justify-center space-x-1'>
                    <Link href={"/members/" + member.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
                    <Edit /></Link>
                    <Link href={"/members/" + member.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
                    <Trash2 /></Link>
                  </td>
                </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

