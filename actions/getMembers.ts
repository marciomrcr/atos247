import { prisma } from "@/libs/prisma";

export const getMembers = async () => {
  const res = await prisma.member.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      cellId: true,
      Cell: {
        select: {
          name: true,
          id: true,
          Network: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },

    orderBy: { name: "asc" },
  });
  return res;
};
export const countMembers = async () => {
  const totalMembers = await prisma.member.count();
  console.log(totalMembers);
  return totalMembers;
};
