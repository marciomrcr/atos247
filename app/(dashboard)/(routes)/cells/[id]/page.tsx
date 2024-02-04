
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
          id: true,
          name: true
        }
      },
      discipulos: {
        select: {
          id: true,
          name: true,
          birth: true,
          phone: true,
          cargo: {
            select: {
              title: true
            }
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

function converterData(date: Date) {
  // Converte a data para um objeto Date
  const dataObj = new Date(date);

  // Obtém os valores do dia, mês e ano
  const dia = dataObj.getUTCDate();
  const mes = dataObj.getMonth() + 1;
  const ano = dataObj.getFullYear();

  // Formata a data no formato dd/mm/aa
  const dataFormatada = `${dia}/${mes}/${ano}`;

  // Retorna a data formatada
  return dataFormatada;
}

export default async function CellPage({
  params: { id },
}: CellPageProps) {
  const cell = await getCellById(id) 

  return (
    <div>
<div className="">  
        <h3 className="mx-2 font-bold text-base md:text-2xl">Célula {cell.name}</h3>
        
        <h3 className="mx-2  text-base">Rede: <span className="font-semibold ">{cell.network.name}</span>
          </h3>
        <h3 className="mx-2 font-normal text-base">
          Supervisor: <span className="font-semibold "></span></h3>
</div>
      <div>
        {cell.discipulos.length === 0? (
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
                <th>Função</th>                
                <th className="hidden md:table-cell">Telefone</th>                
                <th className="hidden md:table-cell">Nascimento</th>                
                <th className="text-end md:text-center ">Ações</th>
              </tr>
            </thead>
            <tbody>
              { cell.discipulos.map((item, index)=>(
                <tr key={item.id}>                 
                  <td className="hidden md:flex">{index + 1}</td>              
                     <td className='w-auto'>{item.name} </td>
                      <td className='hidden md:table-cell'>{item.cargo.title}</td> 
                      
                  <td >{item.phone}</td>                 
                  <td >{converterData(item.birth)}</td>                 
                  <td className='flex justify-end md:justify-center space-x-1'><Link href={"/membros/" + item.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
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

