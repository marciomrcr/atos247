import { prisma } from "@/libs/prisma";

export const getMigrations = async () => {
  const res = await prisma.migrate.findMany({  
    orderBy: { 
        user: 'asc'      
     },
  });
  return res;
};
export const countMigrations = async () => {
  const totalHosts = await prisma.migrate.count();
  
  return totalHosts;
};
