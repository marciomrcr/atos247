import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
  const body = await request.json();
  const { user, serie, model, chassi, migrateDate, refresh, observation, share, analyst  } = body;

  const serieExists = await prisma.migrate.findFirst({
    where: {
      serie,
     
    },
    orderBy: {
      user: 'asc'
    }
  });

  if (serieExists) {
    return NextResponse.json({
      message: `${serieExists.serie} Esse host já foi migrado! ${serieExists.serie} `,
      status: 409,
    });
  }

  const migrate = await prisma.migrate.create({
    data: {      
           user,
           serie,
           chassi,
           migrateDate,
           refresh,
           observation,
           model,
           share,
           analyst,
    },
  });

  return NextResponse.json(migrate);
};

export const GET = async () => {
  const migrate = await prisma.migrate.findMany({
    
    orderBy:  {
      user: 'asc'
    } 
  });
  return NextResponse.json(migrate,{status: 201})
}