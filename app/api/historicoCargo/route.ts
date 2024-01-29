import { prisma } from "@/libs/prisma";

import { NextResponse } from "next/server";

export const POST = async(request: Request) =>{
  const body = await request.json()
  const { cargoId, membroId, endDate, startDate  } = body;

  



  const membro = await prisma.historicoCargo.create({
    data: {
      cargoId: body.cargoId,
      membroId: body.membroId,
      startDate: body.startDate,
      endDate: body.endDate,     
    }
  })
  return NextResponse.json(membro,{status: 201})
}