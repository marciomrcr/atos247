import { prisma } from "@/lib/prisma";
import { AlertCircleIcon } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";


interface CellPageProps {
  params: {
    id: string;
  };
}

const getCellById = cache(async (id: string) => {
  const cell = await prisma.celula.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      redeId: true,
      redes: {
        select: {
          id: true,
          name: true
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
    title: cell.name,
    description: "Celula - Rede IDE 3"
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
        
        <h3 className="mx-2  text-base">Rede: <span className="font-semibold ">{cell.redes.name}</span>
          </h3>
        <h3 className="mx-2 font-normal text-base">
          Supervisor: <span className="font-semibold "></span></h3>
</div>
      <div>
        {cell.name.length === 0? (
          <div>
          <div className="flex items-center justify-center " > 
          <div className="flex mt-6">
          <AlertCircleIcon className="" /> 
            <p className='text-red-600 ml-2 text-xl text-center'>Nenhum célula cadastrada.</p> </div>
            
            </div><p className="text-center"> Cadastre sua célula 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>  
              <th className="hidden md:flex">#</th>
                <th>Nome</th>
                <th>Rede</th>                
                <th className="hidden md:table-cell">Discipulos</th>               
                
              </tr>
            </thead>
            <tbody>
             
                <tr key={cell.id}>                 
                              
                     <td className='w-auto'>{cell.name} </td>
                      <td className='hidden md:table-cell'>{cell.redes.name}</td>                    
                             
                  <td className='flex justify-end md:justify-center space-x-1'>
                  </td>
                </tr>
        
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

