import { prisma } from "@/libs/prisma";
import type { Member } from '@prisma/client';
import { NextResponse } from "next/server";


export const POST = async(request: Request) =>{
  const body: Member = await request.json()
     
    const getMember = await prisma.member.findUnique({
      where: {
        email: body.email,        
      }, select: {
        name: true,
        email: true
      }
    })
    if(getMember){
      return NextResponse.json(`Membro já cadastrado! - ${getMember.name} | ${getMember.email} `)
    }
  
  const member = await prisma.member.create({
    data: {
      name: body.name,
      email: body.email,
      cellId: body.cellId

    }
  })
  return NextResponse.json(member,{status: 201})
}