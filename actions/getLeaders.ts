import { prisma } from "@/libs/prisma";

export const getBrands = async () => {
  const res = await prisma.member
    .findMany
    // {select: {
    //   id: true,
    //   member: {
    //     select: {
    //       name: true
    //     }
    //   },
    //   memberId: true,

    // },
    //   orderBy: { member: {
    //     name: 'asc'
    //   } }},
    ();
  return res;
};
