import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export const POST = async(request: Request) =>{
  const body = await request.json()
  const { name } = body;

  const redeExists = await prisma.rede_Geral.findFirst({
    where: {
      name,   
    },
    select: {
      id: true,
      name: true,
          }
  })

  if (redeExists) {
    return NextResponse.json({
      message: `A rede ${redeExists.name} já existe: ${redeExists.id}`,
      status: 409,
    });
  }
  const rede = await prisma.rede_Geral.create({
    data: {
      name: body.name,     

    }
  })
  
  return NextResponse.json(rede,{status: 201})
}

export const GET = async() =>{
  const redeExists = await prisma.rede_Geral.findMany({
   
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          redes: true
        }
      },
      redes: {
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

  if (!redeExists) {
    return NextResponse.json({
      message: "Nenhuma Rede Cadastrada",
      status: 401,
    });
  }
 
  return NextResponse.json(redeExists,{status: 201})
}