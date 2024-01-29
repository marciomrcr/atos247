
import type { Metadata } from "next";
import Link from "next/link";


import { getMigrations } from "@/actions/getMigrations";
import { AlertCircleIcon, View } from "lucide-react";

import MigrateForm from './MigrateForm';

export const metadata: Metadata = {
  title: "Next Generation - Albras",
};

async function MemberPage() {
  const [migrate] = await Promise.all([getMigrations()])

  
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

  return (
    <div className="mt-3">
      <div className=" mb-4 px-3">
      
        <MigrateForm />
      </div>

      <div>
        {migrate.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon />
            <p className='text-red-600 text-xl text-center'>Nenhuma máquina migrada. Cadastre a primeiro máquina 💻🖥️ </p></div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th className='hidden md:table-cell'>#</th>
               
                <th className="hidden md:table-cell">Usuário</th>
                <th className="hidden md:table-cell">Serie</th>
                <th className="hidden md:table-cell">Chassi</th>
                <th className="hidden md:table-cell">Refresh</th>
                <th className="hidden md:table-cell">Shared?</th>
                <th className="hidden md:table-cell">observation</th>
                <th className="hidden md:table-cell">model</th>
                <th className="hidden md:table-cell">analyst</th>
                <th className="hidden md:table-cell">Data</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {migrate?.map((host, index) => (
                
                <tr key={host.id}>
                  <td className='hidden md:table-cell'>{index + 1}</td>
                  <td className='w-auto'>{host.user}</td>
                  <td className=''>{host.serie}</td> 
                  <td className=''>{host.chassi}</td> 
                  <td className=''>{host.refresh}</td> 
                  <td className=''>{host.share}</td> 
                  <td className='hidden md:table-cell'>{host.observation}</td> 
                    <td className='hidden md:table-cell'>{host.analyst}</td>                  
                    <td className='hidden md:table-cell'>{host.model}</td>
                  <td className='hidden md:table-cell'>{converterData(host.migrateDate)}</td>                 
                  <td className='flex justify-center items-center space-x-1'>
                    {/* <DeleteMemberForm id={host.id} name={host.name} email={host.email}  />
                    <UpdateMemberForm  person={host} /> */}
                    <Link href={"/batismo/" + host.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
                      <View /></Link>                     
                      
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

export default MemberPage;