import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export const POST = async(request: Request) =>{
  const body = await request.json()
  const { name, redeId } = body;

  const celulaExists = await prisma.celula.findFirst({
    where: {
      name,
      redeId,
      

    },
    select: {
      id: true,
      name: true,
      redeId: true
    }
  })

  if (celulaExists) {
    return NextResponse.json({
      message: `A ${celulaExists.name} já exite`  
    },{ status: 409});
  }



  const celula = await prisma.celula.create({
    data: {
      name: body.name,
      redeId: body.redeId,     

    }
  })
  return NextResponse.json(celula,{status: 201})
}