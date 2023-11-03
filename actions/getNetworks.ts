import { prisma } from "@/libs/prisma";

export async function getNetworks() {
  const res = await prisma.network.findMany({
    
    select: {
      id: true,
      name: true,
      Membresia: {
        where: {
          responsibilityId: "650f54b34231c8aff91620c6",
          
        }, select: {
          person: {
            select: {
              name: true
            }
          }
        },              
      },

      _count: {
        select: {
          cells: true,
        },
      },
      cells: {
        select: {   
          name: true,
          _count: {
            select: {
              Membresia: true,
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
