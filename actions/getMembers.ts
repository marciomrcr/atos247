import { prisma } from "@/libs/prisma";

export const getMembers = async () => {
  const res = await prisma.person.findMany({
    select: {      
          id: true,
          name: true,
          email: true,
          phone: true,
          batismo: true,
          birthDay: true,
          origem: true,          
          
          Membresia: {
            include: {

              cell: {
                select: {
                  id: true,
                  name: true,
                  network: {
                    select: {
                      id: true,
                      name: true
                    }
                  }
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
