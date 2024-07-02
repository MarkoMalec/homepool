import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { itemId, userId, price } = await req.json();

    // This transaction is to ensure both operations complete successfully
    const result = await prisma.$transaction(async (prisma) => {
      const item = await prisma.listItem.findUnique({
        where: {
          id: itemId,
        },
      });

      if (!item) {
        throw new Error("Item not found");
      }

      const checkedItems = await prisma.checkedItem.create({
        data: {
          name: item.name,
          userId: userId,
          price: price,
        },
      });

      await prisma.listItem.delete({
        where: { id: itemId },
      });

      return {
        ...checkedItems,
        price: checkedItems.price.toNumber(),
      }
    });

    return NextResponse.json({
      status: 200,
      json: {
        message: `Item checked successfully! ${result}`,
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
