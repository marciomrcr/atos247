import { prisma } from "@/libs/prisma";

import { NextResponse } from "next/server";

export const POST = async(request: Request) =>{
  const body = await request.json()
  const { name, networkId } = body;

  const cellExists = await prisma.cell.findFirst({
    where: {
      name,
      networkId,
      

    },
    select: {
      id: true,
      name: true,
      networkId: true
    }
  })

  if (cellExists) {
    return NextResponse.json({
      message: `A ${cellExists.name} já exite: ${cellExists.id}`,
      status: 409,
    });
  }



  const cell = await prisma.cell.create({
    data: {
      name: body.name,
      networkId: body.networkId,
      multiplicacao: body.multiplicacao,
      celulaMaeId: body.celulaMaeId

    }
  })
  return NextResponse.json(cell,{status: 201})
}