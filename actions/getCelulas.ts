import { prisma } from "@/lib/prisma";

export const getCelulas = async () => {
  try {
    const res = await prisma.celula.findMany({
      select: {
        id: true,
        name: true,
        redeId: true,
        redes:  {
          select: {
            id: true,
            name: true
          }
        },
       
      },
      orderBy: { name: "asc" },
    });
    return res;
    
  } catch (error) {
    return ( "Algo deu errado na consulta")
    
  }
  
};
