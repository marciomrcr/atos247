import { prisma } from "@/libs/prisma";
import type { Cell } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body: Cell = await request.json();
  const cell = await prisma.cell.create({
    data: {
      name: body.name,
      networkId: body.networkId,
    },
  });
  return NextResponse.json(cell, { status: 201 });
};
