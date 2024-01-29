import { prisma } from "@/libs/prisma";

export const getBatismo = async () => {
  const res = await prisma.batismo.findMany({
    select: {      
          id: true,
          name: true,
          email: true,
          phone: true,
          batismo: true,
          birthDay: true,
          sexo: true,
          anjo: true,
          cellId: true,  
          cell: {
            select: {
              name: true,
              id: true,
              network: {
                select: {
                  name: true,
                  id: true,
                }
              }
            }
          }        
         
    },

    orderBy: { 
        name: 'asc'      
     },
  });
  return res;
};
export const countMembers = async () => {
  const totalMembers = await prisma.membresia.count();
  
  return totalMembers;
};
