import { prisma } from "@/libs/prisma";

export const getMembroById = async (id: string) => {
  const res = await prisma.discipulo.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      phone: true,
    }

    
  });
  return res;
};
export const countMembros = async () => {
  const totalMembers = await prisma.person.count();
  console.log(totalMembers);
  return totalMembers;
};
