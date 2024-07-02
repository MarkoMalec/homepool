import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const { itemId, position } = await req.json();

  try {
    const updatePosition = await prisma.listItem.update({
      where: {
        id: itemId,
      },
      data: {
        position: position,
      },
    });

    return NextResponse.json({
      status: 200,
      json: {
        message: `Item updated successfully! ${updatePosition}`,
      },
      updatePosition
    });
  } catch (error) {
    handlePrismaError(error);
    return NextResponse.json({
      status: 500,
      json: { message: "Internal server error" },
    });
  }
}
