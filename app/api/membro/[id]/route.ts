import { prisma } from "@/libs/prisma";
import type { Cell } from '@prisma/client';
import { NextResponse } from "next/server";

export const DELETE = async(request: Request, {params}:{params: {id: string}}) =>{
  
  const getCell = await prisma.discipulo.findUnique({
    where: {
      id: params.id,      
    }
  })
  if(!getCell){
    return "Membro não encontrado"
  }

  const discipulo = await prisma.discipulo.delete({
    where: {
      id: params.id,      
    }    
  }) 
  return NextResponse.json(discipulo, {status: 200})
}

export const PATCH = async(request: Request, {params}:{params: {id: string}}) =>{
  const body: Cell = await request.json()
  const getCell = await prisma.discipulo.findUnique({
    where: {
      id: params.id,      
    }
  })
  if(!getCell){
    return "Membro não encontrado"
  }

  const discipulo = await prisma.discipulo.update({
    where: {
      id: params.id,      
    },
    data: {
      name: body.name,
      
      
    }   
  }) 
  return NextResponse.json(discipulo, {status: 201})
}

export const GET = async(request: Request, {params}:{params: {id: string}}) =>{
  
  const getCell = await prisma.discipulo.findUnique({
    where: {
      id: params.id,
      
    }
  })
  if(!getCell){
    return "Membro não encontrado"
  }

  const discipulo = await prisma.discipulo.findUnique({
    where: {
      id: params.id,
      
    }
    
  }) 

  return NextResponse.json(discipulo, {status: 200})
}