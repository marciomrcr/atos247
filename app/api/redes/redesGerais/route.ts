import { prisma } from "@/libs/prisma";

import { NextResponse } from "next/server";

export const POST = async(request: Request) =>{
  const body = await request.json()
  const { name, networkId } = body;

  const redeExists = await prisma.networkMother.findFirst({
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
      message: `A rede ${redeExists.name} já exite: ${redeExists.id}`,
      status: 409,
    });
  }
  const rede = await prisma.networkMother.create({
    data: {
      name: body.name,
     

    }
  })
  return NextResponse.json(rede,{status: 201})
}

export const GET = async() =>{
  const redeExists = await prisma.networkMother.findMany({
   
    select: {
      id: true,
      name: true,
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