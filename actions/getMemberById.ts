import { prisma } from "@/libs/prisma";

export const getMemberById = async (id: string) => {
  const res = await prisma.member.findUnique({
    where: {
      id
    },
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

    
  });
  return res;
};
export const countMembers = async () => {
  const totalMembers = await prisma.member.count();
  console.log(totalMembers);
  return totalMembers;
};
