
import type { Metadata } from "next";
import Link from "next/link";


import { getCells } from "@/actions/getCells";
import { AlertCircleIcon, View } from "lucide-react";

import { getBatismo } from "@/actions/getBatismo";
import BatismoFormCompleto from './BatismoFormCompleto';
import DeleteMemberForm from "./DeleteMemberForm";
import UpdateMemberForm from "./UpdateMemberForm";


export const metadata: Metadata = {
  title: "Ficha de Batismo - Rede IDE",
};

async function MemberPage() {
  const [batismo, cells] = await Promise.all([getBatismo(), getCells()])

  

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
      
        <BatismoFormCompleto cells={cells} />
      </div>

      <div>
        {batismo.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon />
            <p className='text-red-600 text-xl text-center'>Nenhum membro cadastrado. Cadastre o primeiro membro 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th className='hidden md:table-cell'>#</th>
                <th>Nome</th>
                <th>Célula</th>
                <th className="hidden md:table-cell">Rede</th>
                <th className="hidden md:table-cell">Batismo</th>
                <th className="hidden md:table-cell">Anjo</th>
                <th className="hidden md:table-cell">Fone</th>
                <th className="hidden md:table-cell">Sexo</th>
                <th className="hidden md:table-cell">Nascimento</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {batismo?.map((membro, index) => (
                
                <tr key={membro.id}>
                  <td className='hidden md:table-cell'>{index + 1}</td>
                  <td className='w-auto'>{membro.name}</td>
                  <td className=''>
                    <Link href={"/cells/" + membro.cell.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline'>
                    {membro.cell.name}</Link></td> 

                  <td className='hidden md:table-cell'>
                    <Link href={"/networks/" + membro.cell.network.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline'>
                    {membro.cell.network.name}</Link></td> 
                    <td className='hidden md:table-cell'>{converterData(membro.batismo)}</td>
                  {/* <td className='hidden md:table-cell'>{membro.anjo}</td> */}
                    <td className='hidden md:table-cell'>{membro.anjo}</td>
                    <td className='hidden md:table-cell'>{membro.phone}</td>
                  <td className='hidden md:table-cell'>{membro.sexo}</td>                 
                  <td className='hidden md:table-cell'>{converterData(membro.birthDay)}</td>                 
                  <td className='flex justify-center items-center space-x-1'>
                    <DeleteMemberForm id={membro.id} name={membro.name} email={membro.email}  />
                    <UpdateMemberForm  person={membro} />
                    <Link href={"/batismo/" + membro.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
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