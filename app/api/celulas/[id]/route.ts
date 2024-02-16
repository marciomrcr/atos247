import { prisma } from "@/lib/prisma";
import type { Celula } from '@prisma/client';
import { NextResponse } from "next/server";

export const DELETE = async(request: Request, {params}:{params: {id: string}}) =>{
  
  const getCelula = await prisma.celula.findUnique({
    where: {
      id: params.id,      
    }
  })
  if(!getCelula){
    return "Célula não encontrada"
  }

  const celula = await prisma.celula.delete({
    where: {
      id: params.id,      
    }    
  }) 
  return NextResponse.json(celula, {status: 200})
}

export const PATCH = async(request: Request, {params}:{params: {id: string}}) =>{
  const body: Celula = await request.json()
  const getCelula = await prisma.celula.findUnique({
    where: {
      id: params.id,      
    }
  })
  if(!getCelula){
    return "Célula não encontrada"
  }

  const celula = await prisma.celula.update({
    where: {
      id: params.id,      
    },
    data: {
      name: body.name,
      redeId: body.redeId
      
    }   
  }) 
  return NextResponse.json(celula, {status: 201})
}

export const GET = async(request: Request, {params}:{params: {id: string}}) =>{
  
  const getCelula = await prisma.celula.findUnique({
    where: {
      id: params.id,
      
    }
  })
  if(!getCelula){
    return "Célula não encontrada"
  }

  // const celula = await prisma.celula.findUnique({
  //   where: {
  //     id: params.id,
      
  //   }
    
  // }) 

  return NextResponse.json(getCelula, {status: 200})
}