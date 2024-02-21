import { getRedesGerais } from "@/actions/getRedesGerais";
import { AlertCircleIcon, View } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";


import RedeGeralForm from "./RedeGeralForm";


export const metadata: Metadata = {
  title: "Redes Gerais",
  description: "Redes de células"
};



// const getRedes = async () =>{
//   const res = await fetch("https://atos247.vercel.app/api/get", {
//     cache: 'no-cache', next: { tags: ['redes']}
//   })
//   console.log(res)
//   return res.json()
// }



async function RedesGerais() {
  const networks = await getRedesGerais();
  
  
 
  return (
    <div className="mt-3">
     
      <div className="flex items-center mb-4">
      <h1 className=" mx-4 font-bold text-2xl">
          Redes Gerais Cadastradas
        </h1>
        <RedeGeralForm />
        {/* <CellForm networks={networks}/> */}
      </div>
    
      <div>
        {networks.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon/> 
          <p className='text-red-600 text-xl text-center'>Nenhuma rede cadastrada. Cadastre a primeira rede 👨‍👩‍👧‍👦🛜 </p></div>
        ) : (
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>
                <th className="hidden md:flex">#</th>
                <th>Rede</th>
                <th className="text-center">Qtde Redes</th>                
                <th className="text-center">Qtde Células</th>                
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>              
              {networks?.map((network, index) => {
                // Calcula o total de membros
                const totalCell = network.redes.reduce(
                  (total, item) => total + item._count.celulas,
                  0
                );
                return (
                  <tr key={network.id}>
                    <td className="hidden md:flex">{index + 1}</td>
                    <td className="w-auto">{network.name}</td>
                  <td className="w-auto ">  
                    <Link href={"/redesGerais/" + network.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold flex items-center justify-center gap-1'>
                    {network._count.redes} <View/> </Link>
                    </td>
                    <td className='w-auto'>
                    <p className='  flex items-center justify-center gap-1'>
                    {network.redes.map((item)=>item._count.celulas)}  </p>    
                      
                     </td> 
                    <td className='flex items-center justify-center mx-1'>
                      {/* <NetworkDelete id={network.id} />
                      <NetworkUpdate network={network} />  */}
                      {/* <NetworkView network={network} /> */}
                     
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

export default RedesGerais;
