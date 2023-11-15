import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
  const body = await request.json();
  const { name, email, phone, birthDay, sexo, batismo, anjo, cellId, cep, logradouro, numero, complemento, bairro, cidade  } = body;

  const personExists = await prisma.batismo.findFirst({
    where: {
      email,
     
    },
    select: { 
           id: true,
           name: true,
           email: true,
           phone: true,
           birthDay: true,
           sexo: true,
           batismo: true,
           anjo: true,
           cellId: true,
           cep: true,
    },
  });

  if (personExists) {
    return NextResponse.json({
      message: `${personExists.name} já foi cadastrado anteriormente com o email ${personExists.email} `,
      status: 409,
    });
  }

  const person = await prisma.batismo.create({
    data: {
      name,
      email,
      phone,
      birthDay,
      batismo,
      sexo,
      anjo,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      cellId
    },
  });

  return NextResponse.json(person);
};

export const GET = async () => {
  const batismo = await prisma.batismo.findMany({
    
    orderBy:  {
      name: 'asc'
    } 
  });
  return NextResponse.json(batismo,{status: 201})
}