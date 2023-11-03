import { prisma } from "@/libs/prisma";

export const getMemberById = async (id: string) => {
  const res = await prisma.person.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true,
    }

    
  });
  return res;
};
export const countMembers = async () => {
  const totalMembers = await prisma.person.count();
  console.log(totalMembers);
  return totalMembers;
};
