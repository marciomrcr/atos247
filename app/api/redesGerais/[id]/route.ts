import { prisma } from "@/lib/prisma";
import type { Rede_Geral } from "@prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const getNetwork = await prisma.rede_Geral.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getNetwork) {
    return "Rede não encontrada";
  }

  const network = await prisma.rede_Geral.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(network, { status: 200 });
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Rede_Geral = await request.json();
  const getNetwork = await prisma.rede_Geral.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getNetwork) {
    return "Rede não encontrada";
  }

  const network = await prisma.rede_Geral.update({
    where: {
      id: params.id,
    },
    data: {
      name: body.name,
    },
  });
  return NextResponse.json(network, { status: 201 });
};

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const getNetwork = await prisma.rede_Geral.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getNetwork) {
    return "Rede não encontrada";
  }

  const network = await prisma.rede_Geral.findUnique({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(network, { status: 200 });
};
