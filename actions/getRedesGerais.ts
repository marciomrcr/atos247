import { prisma } from "@/lib/prisma";

export async function getRedesGerais() {
  const res = await prisma.rede_Geral.findMany({
    select: {
      id: true,
      name: true,      
      _count: {
        select: {
          redes: true,          
        },
      },     

      redes: {        
        select: {
          id: true,
          name: true,
          celulas: {           
              select: {
                id: true,
                name: true,
                

            }
          },
          _count: {
            select: {
              celulas: true
            }
          },

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
