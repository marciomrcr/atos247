import { prisma } from "@/lib/prisma";

export async function getRedes() {
  const res = await prisma.rede.findMany({

    select: {

      id: true,
      name: true,
      redeMae: {
        select: {
          id: true,
          name: true
        }
      },
      _count: {
        select: {
          celulas: true,
        },
      },

      celulas: {        
        select: {
          name: true,  
        },
        orderBy: {
          name: "asc",
        },
      },
    },

    orderBy: {
      name: "asc",
    },
  });

  return res;
}
