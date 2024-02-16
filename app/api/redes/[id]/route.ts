import { prisma } from "@/lib/prisma";
import type { Rede } from "@prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const getRede = await prisma.rede.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getRede) {
    return "Rede não encontrada";
  }

  const rede = await prisma.rede.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(rede, { status: 200 });
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Rede = await request.json();
  const getRede = await prisma.rede.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getRede) {
    return "Rede não encontrada";
  }

  const rede = await prisma.rede.update({
    where: {
      id: params.id,
    },
    data: {
      name: body.name,
      redeGeralId: body.redeGeralId
    },
  });
  return NextResponse.json(rede, { status: 201 });
};

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const getRede = await prisma.rede.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getRede) {
    return "Rede não encontrada";
  }

  // const rede = await prisma.rede.findUnique({
  //   where: {
  //     id: params.id,
  //   },
  // });

  return NextResponse.json(getRede, { status: 200 });
};
