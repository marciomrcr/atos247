import { prisma } from "@/libs/prisma";
import type { Member } from "@prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const getMember = await prisma.member.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getMember) {
    return "Discípulo não encontrado";
  }

  const membro = await prisma.member.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(membro, { status: 200 });
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Member = await request.json();
  const getMember = await prisma.member.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getMember) {
    return "Discípulo não encontrado";
  }

  const member = await prisma.member.update({
    where: {
      id: params.id,
    },
    data: {
      name: body.name,
      email: body.email,
      cellId: body.cellId,
    },
  });
  return NextResponse.json(member, { status: 201 });
};

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const getMember = await prisma.member.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getMember) {
    return "Discípulo não encontrado";
  }

  const membro = await prisma.member.findUnique({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(membro, { status: 200 });
};
