import { prisma } from "@/libs/prisma";

export const getCells = async () => {
  const res = await prisma.cell.findMany({
    select: {
      id: true,
      name: true,
      networkId: true,
      network: true,
      celulaMaeId: true,
      celulasGeradas: {
        select: {
          name: true
        }
      },
      celulaMae: {
        select: {
          id: true,
          name: true
        }
      },

      multiplicacao: true,
      
    },
    orderBy: { name: "asc" },
  });
  return res;
};
