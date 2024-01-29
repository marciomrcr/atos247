import { prisma } from "@/libs/prisma";

export async function getCargos() {
  const res = await prisma.cargo.findMany({
    
    select: {
      id: true,
      title: true,
      _count: {
        select: {
          Membro: true,
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
