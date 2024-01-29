import { prisma } from "@/libs/prisma";

export async function getMembros() {
  const res = await prisma.discipulo.findMany({
    
    select: {
      id: true,
      name: true,
      
      },
      orderBy: {
        name: "asc",
      },

    },  
    
  );

  return res;
}
