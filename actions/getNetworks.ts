import { prisma } from "@/libs/prisma";

export async function getNetworks() {
  const res = await prisma.network.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          cell: true,
        },
      },

      cell: {
        select: {
          name: true,
          _count: {
            select: {
              member: true,
            },
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
