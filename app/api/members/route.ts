import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
  const body = await request.json();
  const { personId, responsibilityId } = body;

  const membresiaExists = await prisma.membresia.findFirst({
    where: {
      personId,
      responsibilityId,
    },
    select: {
     
      person: {
        select: {
          name: true
        }
      },
      responsibility: {
        select: {
          name: true
        }
      },
    },
  });

  if (membresiaExists) {
    return NextResponse.json({
      message: `${membresiaExists.person.name} já foi cadastrado anteriormente como ${membresiaExists.responsibility.name} `,
      status: 409,
    });
  }

  const membresia = await prisma.membresia.create({
    data: {
      personId,
      responsibilityId,
    },
  });

  return NextResponse.json(membresia);
};

export const GET = async () => {
  const Membresias = await prisma.membresia.findMany({
    
    orderBy: { responsibility: {
      name: 'asc'
    } },
  });
  return NextResponse.json(Membresias,{status: 201})
}