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
      items: { include: { product: { select: { name: true, slug: true, image: true } } } }
    },
    orderBy: { created_at: "desc" }
  });

  return orders.map(o => ({ ...o, total_price: Number(o.total_price) }));
}

export async function getUserProfile() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { clerk_id: userId }
  });

  return user;
}

export async function updateUserProfile(data: { 
  full_name?: string; 
  phone?: string; 
  whatsapp?: string; 
  address?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.update({
    where: { clerk_id: userId },
    data
  });

  return user;
}

export async function getOrderById(id: string) {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { clerk_id: userId }
  });

  if (!user) return null;

  const order = await db.order.findUnique({
    where: { id, user_id: user.id },
    include: {
      items: { 
        include: { 
          product: { 
            select: { name: true, slug: true, image: true, price: true } 
          } 
        } 
      }
    }
  });

  if (!order) return null;

  return {
    ...order,
    total_price: Number(order.total_price),
    shipping_cost: Number(order.shipping_cost),
    items: order.items.map(item => ({
      ...item,
      subtotal: Number(item.subtotal),
      product: {
        ...item.product,
        price: Number(item.product.price)
      }
    }))
  };
}
