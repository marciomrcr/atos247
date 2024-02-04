import type { Metadata } from "next";

import { getCargos } from "@/actions/getCargos";
import { getCells } from "@/actions/getCells";
import { getMembros } from "@/actions/getMembros";
import { AlertCircleIcon } from "lucide-react";
import MembroDelete from "./MembroDelete";
import NetworkForm from "./MembroForm";
import MembroUpdate from "./MembroUpdate";
import MembroView from "./MembroView";


export const metadata: Metadata = {
  title: "Athos 2-47",
};

function converterDate(date: Date) {
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


async function MembrosPage() {
  const [cells, cargos, membros] = await Promise.all( [getCells(), getCargos(), getMembros()])
  


  return (
    <div className="mt-3">
     
      <div className="flex items-center mb-4">
      <h1 className=" mx-4 font-bold text-2xl">
          Cargos Cadastrados
        </h1>
        <NetworkForm cells={cells} cargos={cargos}/>
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
                <th>Nome</th> 
                <th>Célula</th> 
                <th>Cargo</th> 
                <th>Telefone</th> 
                <th>Nascimento</th> 
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
                    <td className="w-auto">{membro.cell.name}</td>
                    <td className="w-auto">{membro.cargo?.title}</td>
                    <td className="w-auto">{membro.phone}</td>
                    <td className="w-auto">{converterDate(membro.birth)}</td>
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
