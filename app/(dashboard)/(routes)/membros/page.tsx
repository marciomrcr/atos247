import type { Metadata } from "next";

import { getMembros } from "@/actions/getMembros";
import { AlertCircleIcon } from "lucide-react";
import MembroDelete from "./MembroDelete";
import NetworkForm from "./MembroForm";
import MembroUpdate from "./MembroUpdate";
import MembroView from "./MembroView";


export const metadata: Metadata = {
  title: "Athos 2-47",
};


async function MembrosPage() {
  const membros = await getMembros();
  console.log(membros)


  return (
    <div className="mt-3">
     
      <div className="flex items-center mb-4">
      <h1 className=" mx-4 font-bold text-2xl">
          Cargos Cadastrados
        </h1>
        <NetworkForm />
        {/* <CellForm membros={membros}/> */}
      </div>
    
      <div>
        {membros.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon/> 
          <p className='text-red-600 text-xl text-center'>Nenhum membro cadastrado. Cadastre o primeiro membro 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>
                <th className="hidden md:flex">#</th>
                <th>Cargo</th> 
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              
              {membros?.map((membro, index) => {
                // Calcula o total de membros
                
                return (
                  <tr key={membro.id}>
                    <td className="hidden md:flex">{index + 1}</td>
                    <td className="w-auto">{membro.name}</td>
                    <td className="flex justify-center space-x-1">  
                      <MembroDelete id={membro.id} />
                      <MembroUpdate membro={membro}  /> 
                      <MembroView membro={membro} />
                     
                    </td>
                  </tr>
                  
                );
               
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MembrosPage;
