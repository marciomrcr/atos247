import { prisma } from "@/libs/prisma";
import type { Network } from "@prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const getNetwork = await prisma.network.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getNetwork) {
    return "Rede não encontrada";
  }

  const network = await prisma.network.delete({
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
  const body: Network = await request.json();
  const getNetwork = await prisma.network.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getNetwork) {
    return "Rede não encontrada";
  }

  const network = await prisma.network.update({
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
  const getNetwork = await prisma.network.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getNetwork) {
    return "Rede não encontrada";
  }

  const network = await prisma.network.findUnique({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(network, { status: 200 });
};
