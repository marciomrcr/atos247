import { prisma } from "@/libs/prisma";

export const getCells = async () => {
  const res = await prisma.cell.findMany({
    select: {
      id: true,
      name: true,
      networkId: true,
      Network: true,
      _count: {
        select: {
          member: true,
        },
      },
      member: {
        select: {
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: { name: "asc" },
  });
  return res;
};
