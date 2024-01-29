import { prisma } from "@/libs/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";

const getNetworkId = cache(async (id: string) => {
  const network = await prisma.network.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      cells: {
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc'
        }
      }
    },

    
        
        
       
  
  });
  if (!network) notFound();
  return network;
});

export { getNetworkId };

