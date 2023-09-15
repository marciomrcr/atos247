import { prisma } from "@/libs/prisma";
import type { Cell } from '@prisma/client';
import { NextResponse } from "next/server";

export const DELETE = async(request: Request, {params}:{params: {id: string}}) =>{
  
  const getCell = await prisma.cell.findUnique({
    where: {
      id: params.id,      
    }
  })
  if(!getCell){
    return "Célula não encontrada"
  }

  const cell = await prisma.cell.delete({
    where: {
      id: params.id,      
    }    
  }) 
  return NextResponse.json(cell, {status: 200})
}

export const PATCH = async(request: Request, {params}:{params: {id: string}}) =>{
  const body: Cell = await request.json()
  const getCell = await prisma.cell.findUnique({
    where: {
      id: params.id,      
    }
  })
  if(!getCell){
    return "Célula não encontrada"
  }

  const cell = await prisma.cell.update({
    where: {
      id: params.id,      
    },
    data: {
      name: body.name,
      networkId: body.networkId
      
    }   
  }) 
  return NextResponse.json(cell, {status: 201})
}

export const GET = async(request: Request, {params}:{params: {id: string}}) =>{
  
  const getCell = await prisma.cell.findUnique({
    where: {
      id: params.id,
      
    }
  })
  if(!getCell){
    return "Célula não encontrada"
  }

  const cell = await prisma.cell.findUnique({
    where: {
      id: params.id,
      
    }
    
  }) 

  return NextResponse.json(cell, {status: 200})
}