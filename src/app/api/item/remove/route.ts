import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { itemId, userId } = await req.json();

    // This transaction is to ensure both operations complete successfully
    const result = await prisma.$transaction(async (prisma) => {
      const item = await prisma.listItem.findUnique({
        where: {
          id: itemId,
        }
      });

      if (!item) {
        throw new Error("Item not found");
      }

      if (item.userId !== userId) {
        throw new Error("Unauthorized to delete this item");
      }

      const deletionHistory = await prisma.deletionHistory.create({
        data: {
          itemName: item.name,
          userId: userId,
        },
      });

      await prisma.listItem.delete({
        where: { id: itemId },
      });

      return deletionHistory;
    });

    return NextResponse.json({
      status: 200,
      json: {
        message: `Item removed successfully and history recorded! ${result}`,
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
