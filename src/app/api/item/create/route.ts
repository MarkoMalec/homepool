import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { name, user } = await req.json();

    const newItem = await prisma.listItem.create({
      data: {
        name: name,
        createdBy: {
          connect: { id: user.id },
        },
      },
    });
    return NextResponse.json({
      status: 200,
      json: {
        message: `Item created successfully! ${newItem}`,
      },
    });
  } catch (error) {
    handlePrismaError(error);
    return NextResponse.json({
      status: 500,
      json: { message: "Internal server error" },
    });
  }
}
