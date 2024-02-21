'use client'
import { AlertCircleIcon } from 'lucide-react';
import NetworkUpdate from './NetworkUpdate';
import NetworkDelete from './NetworksDelete';

type CountProps ={
  celulas: number; 
}

interface IRedeProps{ 
    id: string;
    name: string, 
    _count: CountProps,
    redeMae: RedeMaeProps
}

type RedeMaeProps ={  
    id: string;
        name: string;  
}

const TableForm = ({redes}: {redes: IRedeProps[]} ) =>{
  return (
    <div className='mb-3'>
      <div>
        {redes.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon/> 
          <p className='text-red-600 text-xl text-center'>Nenhuma rede cadastrada. Cadastre a primeira rede 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>
                <th className="hidden md:flex">#</th>
                <th>Nome</th>                
                <th>Células</th>
                <th>Rede Mãe</th>  
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>              
              {redes.map((rede, index) => {
                // Calcula o total de membros
                // const totalMembros = rede.redes.reduce(
                //   (total, item) => total + item._count.discipulos,
                //   0
                // );
                return (
                  <tr key={rede.id}>
                    <td className="hidden md:flex">{index + 1}</td>
                    <td className="w-auto">{rede.name}</td>
                    <td className="w-1/6">{rede._count.celulas}</td>                    
                    <td className="w-1/6">{rede.redeMae.name}</td>                     
                    <td className="flex justify-center space-x-1">  
                      <NetworkDelete id={rede.id} />
                      <NetworkUpdate network={rede} /> 
                      {/* <NetworkView rede={rede} /> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default TableForm