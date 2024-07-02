import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { name, user } = await req.json();

    const maxPosition = await prisma.listItem.aggregate({
      _max: {
        position: true,
      },
    });

    const newPosition =
      maxPosition._max.position !== null ? maxPosition._max.position + 1 : 0;

    const newItem = await prisma.listItem.create({
      data: {
        name: name,
        position: newPosition,
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
      newItem,
    });
  } catch (error) {
    handlePrismaError(error);
    return NextResponse.json({
      status: 500,
      json: { message: "Internal server error" },
    });
  }
}
