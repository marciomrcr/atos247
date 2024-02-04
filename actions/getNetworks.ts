import { prisma } from "@/libs/prisma";

export async function getNetworks() {
  const res = await prisma.network.findMany({

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
          cells: true,
        },
      },

      cells: {        
        select: {
          name: true,
          discipulos: {
            where: {
              cargo: {
                title: "Pastor"
              }
            }
          },
          _count: {
            select: {
              discipulos: true
            }
          }
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
