import { prisma } from "@/libs/prisma";

import { NextResponse } from "next/server";

export const POST = async(request: Request) =>{
  const body = await request.json()
  const { title } = body;

  const cargoExists = await prisma.cargo.findFirst({
    where: {
      title,
      
    },
    select: {
      id: true,
      title: true
    }
  })

  if (cargoExists) {
    return NextResponse.json({
      message: `${cargoExists.title} já foi cadastrado anteriormente`,
      status: 409,
    });
  }



  const cargo = await prisma.cargo.create({
    data: {
      title: body.title,
     
    }
  })
  return NextResponse.json(cargo,{status: 201})
}

export const GET = async () => {  

  const cargo = await prisma.cargo.findMany();

  return NextResponse.json(cargo, { status: 200 });
};
