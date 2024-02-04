import { prisma } from "@/libs/prisma";

export async function getNetworkMother() {
  const res = await prisma.networkMother.findMany({
    select: {
      id: true,
      name: true,      
      _count: {
        select: {
          Network: true,          
        },
      },     

      Network: {        
        select: {
          id: true,
          name: true,
          cells: {           
              select: {
                id: true,
                name: true,
                _count: {
                  select: {
                    discipulos: true
                  }
                }  

            }
          },
          _count: {
            select: {
              cells: true
            }
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
