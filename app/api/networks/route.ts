import { prisma } from "@/libs/prisma";
import type { Network } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body: Network = await request.json();
  const network = await prisma.network.create({
    data: {
      name: body.name,
    },
  });
  return NextResponse.json(network, { status: 201 });
};

export const GET = async (request: Request) =>{
  const networks = await prisma.network.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          cell: true,
        },
      },

      cell: {
        select: {
          name: true,
          _count: {
            select: {
              member: true,
            },
          },
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

  return NextResponse.json(networks, { status: 200 });
}