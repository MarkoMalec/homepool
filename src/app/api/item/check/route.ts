// This should be in your /api/item/remove route.ts file
import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { itemId, userId, price } = await req.json();

    // Start a transaction to ensure both operations complete successfully
    const result = await prisma.$transaction(async (prisma) => {
      // Fetch the name of the item to be deleted for history record
      const item = await prisma.listItem.findUnique({
        where: {
          id: itemId,
        },
      });

      if (!item) {
        throw new Error("Item not found");
      }

      // Create a deletion history record
      const checkedItems = await prisma.checkedItem.create({
        data: {
          name: item.name,
          userId: userId,
          price: price
        },
      });

      // Now delete the item
      await prisma.listItem.delete({
        where: { id: itemId },
      });

      // Return the deletion history record
      return checkedItems;
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
