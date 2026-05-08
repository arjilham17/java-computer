"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getUserOrders() {
  const { userId } = await auth();
  if (!userId) return [];

  // Find our internal user ID first
  const user = await db.user.findUnique({
    where: { clerk_id: userId }
  });

  if (!user) return [];

  const orders = await db.order.findMany({
    where: { user_id: user.id },
    include: {
      items: { include: { product: { select: { name: true, slug: true } } } }
    },
    orderBy: { created_at: "desc" }
  });

  return orders.map(o => ({ ...o, total_price: Number(o.total_price) }));
}
