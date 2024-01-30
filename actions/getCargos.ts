import { prisma } from "@/libs/prisma";

export async function getCargos() {
  const res = await prisma.cargo.findMany({
    
    select: {
      id: true,
      title: true,      
      Discipulo: {
        select: {
          id: true,
          name: true
      }
    },
      _count: {
        select: {
          Discipulo: true,
        },
      },
      },
      orderBy: {
        title: "asc",
      },

    },  
    
  );

  return res;
}
