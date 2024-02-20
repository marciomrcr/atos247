import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

import { NextResponse } from "next/server";

export const GET = async() =>{
  const redeExists = await prisma.rede.findMany({
   
    select: {
      id: true,
      name: true,
      redeMae: {
        select: {
          id: true,
          name: true
        }
      },
      _count: {
        select: {
          celulas: true
        }
      },
      celulas: {
        select: {
          id: true,
      name: true,

        }
      }
          }, 
          orderBy: {
            name: 'asc'
          }
  }) 
  revalidateTag('redes')
 
  return NextResponse.json(redeExists,{status: 201})
}