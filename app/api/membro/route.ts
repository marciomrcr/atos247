import { prisma } from "@/libs/prisma";

import { NextResponse } from "next/server";

export const POST = async(request: Request) =>{
  const body = await request.json()
  const { name } = body;

  const discipuloExists = await prisma.discipulo.findFirst({
    where: {
      name,
      
    },
    select: {
      id: true,
      name: true
    }
  })

  if (discipuloExists) {
    return NextResponse.json({
      message: `${discipuloExists.name} já foi cadastrado anteriormente`,
      status: 409,
    });
  }



  const discipulo = await prisma.discipulo.create({
    data: {
      name: body.name,
      birth: body.birth,
      phone: body.phone,
      cellId: body.cellId,
      cargoId: body.cargoId,
    }
  })
  return NextResponse.json(discipulo,{status: 201})
}