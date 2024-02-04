import { prisma } from "@/libs/prisma";
import { AlertCircleIcon, View } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";


interface RedePageProps {
  params: {
    id: string;
  };
}

const getRedes = async () =>{
  const redes = await prisma.network.findMany({
    select: {
      id: true,
      name: true,
      cells:{
        select: {
          _count: {
            select: {
              discipulos: true
            }
          }
        }
      },
      redeMae:{
        select: {
          id: true,
          name: true,
        }
      } ,
      // cells: {
      //   select: {
      //     id: true,
      //     name: true,

      //   }
      //},
      _count:{
        select: {
          cells: true
        }
      }
    }
  })
  if (!redes) notFound();
  return redes;
}

const getRedeById = cache(async (id: string) => {
  const rede = await prisma.networkMother.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,      
      Network: {
        select: {
          id: true,
          name: true,
          cells:{
            select:{
              _count:{
                select:{
                  discipulos: true
                }
              }
            }
          } ,
          _count: {
            select: {
              cells: true
            }
          }
        }
      },
            
  }}
  );
  if (!rede) notFound();
  return rede;
});

export async function generateMetadata({
  params: { id },
}: RedePageProps): Promise<Metadata> {
  const rede = await getRedeById(id);
  return {
    title: rede.name + " - Atos 2.47",
  };
}

export default async function CellPage({
  params: { id },
}: RedePageProps) {
  const rede = await getRedeById(id) 
  const redes = await getRedes() 

  

  return (
    <div>
<div className="">  
        <h1 className="mx-2 font-bold text-base md:text-2xl">Rede Geral: {rede.name}</h1>
        
        {/* <h3 className="mx-2  text-base">Rede: <span className="font-semibold ">{rede.name}</span>
          </h3> */}
        <h3 className="mx-2 font-normal text-base">
          Supervisor: <span className="font-semibold "></span></h3>
</div>
      <div>
        {rede.Network.length === 0? (
          <div>
          <div className="flex items-center justify-center " > 
          <div className="flex mt-6">
          <AlertCircleIcon className="" /> 
            <p className='text-red-600 ml-2 text-xl text-center'>Nenhuma rede cadastrada.</p> </div>
            
            </div><p className="text-center"> Cadastre a primeira rede 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>  
              <th className="hidden md:flex">#</th>
                <th>Sub-Redes</th>
                <th className="hidden md:table-cell text-center">Células</th>                
                               
                <th className="text-end md:text-center ">Ações</th>
              </tr>
            </thead>
            <tbody>
              { redes.map((item, index)=>{


return (
  <tr key={rede.id}>                 
    <td className="hidden md:flex">{index + 1}</td>              
       <td className='w-auto'>{item.name} </td>                                 
    <td className='fw-auto'><Link href={"/redes/" + item.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold flex items-center justify-center gap-1'>
     {item._count.cells} <View /></Link>
    </td>
    
  </tr>
)
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

