import { prisma } from "@/libs/prisma";
import type { Cargo } from "@prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

  const getCargo = await prisma.cargo.findUnique({
    where: {
      id: params.id,
    }
  })
  if (!getCargo) {
    return "Cargo não encontrado"
  }

  const cargo = await prisma.cargo.delete({
    where: {
      id: params.id,
    }
  })
  return NextResponse.json(cargo, { status: 200 })
}

export const PATCH = async (
  request: Request, { params }: { params: { id: string } }) => {
  const body: Cargo = await request.json();
  const getCargo = await prisma.cargo.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getCargo) {
    return "Cargo não encontrado";
  }

  const cargo = await prisma.cargo.update({
    where: {
      id: params.id,
    },
    data: {
      title: body.title,
    },
  });
  return NextResponse.json(cargo, { status: 201 });
};

export const GET = async (
  { params }: { params: { id: string } }) => {
  const cargo = await prisma.cargo.findUnique({
    where: {
      id: params.id,
    },

  });
  if (!cargo) {
    return "Cargo não encontrado";
  }



  return NextResponse.json(cargo, { status: 200 });
};
