import { prisma } from "@/libs/prisma";

import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { name} = body

  const funcaoExists = await prisma.responsibility.findUnique({
    where: {
      name: body.name
    },
    select: {
      id: true,
      name: true,  
    }
  })

  if (funcaoExists) {
    return NextResponse.json({
      message:  `A função ${funcaoExists.name} já foi cadastrada anteriormente com o id: ${funcaoExists.id} `,
      status: 409,
    });
  }
  
  const responsibility = await prisma.responsibility.create({
    data: {
      name
    },
  });
  return NextResponse.json(responsibility, { status: 201 });
};

export const GET = async () =>{
  const responsibilities = await prisma.responsibility.findMany({
    select: {
      id: true,
      name: true,     
    },

    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(responsibilities, { status: 200 });
}