import { prisma } from "@/lib/prisma";
import type { Rede } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body: Rede = await request.json();
  const rede = await prisma.rede.create({
    data: {
      name: body.name,
      redeGeralId: body.redeGeralId,
    },
  });
  return NextResponse.json(rede, { status: 201 });
};

export const GET = async (request: Request) =>{
  const redes = await prisma.rede.findMany({
    select: {
      id: true,
      name: true,
      redeMae: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          celulas: true,
        },
      },

      celulas: {
        select: {
          name: true,
          id: true,         
        },

        orderBy: {
          name: "asc",
        },
      },
    },

    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(redes, { status: 200 });
}