import type { Metadata } from "next";
import Link from "next/link";

import { getNetworks } from "@/actions/getNetworks";
import NetworkForm from "./NetworkForm";
import NetworkUpdate from "./NetworkUpdate";
import NetworkDelete from "./NetworksDelete";


export const metadata: Metadata = {
  title: "Redes de Células - Jetro",
};

async function NetworkPage() {
  const networks = await getNetworks();
  //const members = await countMembers();

  return (
    <div>
     
      <div className="mx-4">
        <NetworkForm />
        {/* <CellForm networks={networks}/> */}
      </div>
    
      <div>
        {networks.length === 0 ? (
          "Nenhum dado Cadastrado"
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th className=" ">#</th>
                <th>Nome</th>
                <th>Células</th>
                <th>Membros</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              
              {networks?.map((network, index) => {
                // Calcula o total de membros
                const totalMembers = network.cell.reduce(
                  (total, item) => total + item._count.member,
                  0
                );

                return (
                  <tr key={network.id}>
                    <td className=" ">{index + 1}</td>
                    <td className="w-1/3">{network.name}</td>
                    <td className="w-1/3">
                      {" "}
                      <Link
                        href={"/networks/" + network.id}
                        className="cursor-pointer hover:text-blue-500 hover:font-semibold underline"
                      >
                        {network._count.cell} célula(s)
                      </Link>
                    </td>
                    <td className="w-1/3">{totalMembers}</td>
                    <td className="flex justify-center space-x-1">  
                      <NetworkDelete id={network.id} />
                      <NetworkUpdate network={network} /> 
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

export default NetworkPage;
