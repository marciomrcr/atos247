import { prisma } from "@/libs/prisma";
import type { Person } from "@prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const getPerson = await prisma.person.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getPerson) {
    return "Pessoa não encontrada";
  }

  const person = await prisma.person.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(person, { status: 200 });
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Person = await request.json();
 
  
  const getPerson = await prisma.person.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getPerson) {
    return "Pessoa não encontrada";
  }
 
  const person = await prisma.person.update({
    where: {
      id: params.id,
    },
    data: {
      name: body.name,
      email: body.email,
      
    },
  });
  return NextResponse.json(person, { status: 201 });
};

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const getPerson = await prisma.person.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!getPerson) {
    return "Pessoa não encontrada";
  }

  const person = await prisma.person.findUnique({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(person, { status: 200 });
};
