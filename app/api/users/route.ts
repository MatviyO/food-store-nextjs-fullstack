import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ result: users })
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const user = await prisma.user.create({
    data: {
      fullName: body.fullName,
      email: body.email,
      password: body.password
    }
  })
  return NextResponse.json({ result: user })
}
