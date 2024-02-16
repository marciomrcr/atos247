import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getRedeById = cache(async (id: string) => {
  const network = await prisma.rede.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      celulas: {
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



