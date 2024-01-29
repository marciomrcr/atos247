import { prisma } from "@/libs/prisma";
import { AlertCircleIcon, View } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

interface NetworkPageProps {
  params: {
    id: string;
  };
}

const getCells = cache(async (id: string) => {
  const cell = await prisma.cell.findMany({
    where: {
      networkId: id
    },
    select: {
      id: true,
      name: true,
      networkId: true,
      network: true,
      _count: {
        select: {
          Membresia: true
        }
      }
    },
    orderBy: { name: "asc" },
  }
  );
  if (!cell) notFound();
  return cell;
});

const getNetworkId = cache(async (id: string) => {
  const network = await prisma.network.findUnique({
    where: { id },
    include: {
      cells: {
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              Membresia: true
            }
          },
          Membresia: {
            select: {
              responsibility: {
                select: {
                  name: true,
                  
                }
              }
            }
          }
        },
        orderBy: {
          name: 'desc'
        }
      }
    },
  });
  if (!network) notFound();
  return network;
});

export async function generateMetadata({
  params: { id },
}: NetworkPageProps): Promise<Metadata> {
  const network = await getNetworkId(id);
  return {
    title: network.name + " - Atos 2.47",
  };
}

export default async function NetworkPage({
  params: { id },
}: NetworkPageProps) {
  const cells = await getCells(id)
  const network = await getNetworkId(id);

  return (
    <div >
      <h1 className="flex items-center mb-4 mx-4 font-bold text-2xl">Rede de células {network.name}</h1>
            <div>
        {network.cells.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon />
            <p className='text-red-600 text-xl text-center'>Nenhuma célula cadastrada. Cadastre a primeira célula 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full bg-slate-100">
            <thead>
              <tr>
                <th className="hidden md:flex">#</th>
                <th>Células</th>
                <th className="w-auto text-center">Membros</th>
                
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {network.cells?.map((cell, index) => (
                <tr key={cell.id}>
                  <td className='hidden md:flex '>{index + 1}</td>
                  <td className='w-1/3'>{cell.name}</td>               
                  <td className='w-auto text-center'>
                    {cell._count.Membresia}</td>
                  <td className='flex justify-center space-x-1'>
                    <Link href={"/cells/" + cell.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
                    <View /></Link>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

