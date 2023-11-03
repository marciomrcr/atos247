import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
  const body = await request.json();
  const { name, email, phone, origem, birthDay  } = body;

  const personExists = await prisma.person.findFirst({
    where: {
      email,
     
    },
    select: { 
           id: true,
           name: true,
           email: true,
           phone: true,
           origem: true,
           birthDay: true
    },
  });

  if (personExists) {
    return NextResponse.json({
      message: `${personExists.name} já foi cadastrado anteriormente com o email ${personExists.email} `,
      status: 409,
    });
  }

  const person = await prisma.person.create({
    data: {
      name,
      email,
      phone,
      birthDay,
      origem
    },
  });

  return NextResponse.json(person);
};

export const GET = async () => {
  const persons = await prisma.person.findMany({
    
    orderBy:  {
      name: 'asc'
    } 
  });
  return NextResponse.json(persons,{status: 201})
}