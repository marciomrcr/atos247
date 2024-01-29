import type { Metadata } from "next";

import { getCargos } from "@/actions/getCargos";
import { AlertCircleIcon } from "lucide-react";
import CargoDelete from "./CargoDelete";
import NetworkForm from "./CargoForm";
import CargoUpdate from "./CargoUpdate";
import CargoView from "./CargoView";


export const metadata: Metadata = {
  title: "Athos 2-47",
};

interface CellPageProps {
  params: {
    id: string;
  };
}

async function CargoPage() {
  const cargo = await getCargos();


  return (
    <div className="mt-3">
     
      <div className="flex items-center mb-4">
      <h1 className=" mx-4 font-bold text-2xl">
          Cargos Cadastrados
        </h1>
        <NetworkForm />
        {/* <CellForm cargos={cargos}/> */}
      </div>
    
      <div>
        {cargo.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon/> 
          <p className='text-red-600 text-xl text-center'>Nenhum cargo cadastrado. Cadastre o primeiro cargo 👨‍👩‍👧‍👦 </p></div>
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
              
              {cargo?.map((cargo, index) => {
                // Calcula o total de membros
                
                return (
                  <tr key={cargo.id}>
                    <td className="hidden md:flex">{index + 1}</td>
                    <td className="w-auto">{cargo.title}</td>
                    <td className="flex justify-center space-x-1">  
                      <CargoDelete id={cargo.id} />
                      <CargoUpdate cargo={cargo}  /> 
                      <CargoView cargo={cargo} />
                     
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

export default CargoPage;
