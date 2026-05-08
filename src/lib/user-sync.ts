import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  const user = await currentUser();

  if (!user) return null;

  const internalUser = await db.user.upsert({
    where: { clerk_id: user.id },
    update: {
      full_name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: user.emailAddresses[0]?.emailAddress,
    },
    create: {
      clerk_id: user.id,
      full_name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: user.emailAddresses[0]?.emailAddress,
      role: "USER"
    }
  });

  return internalUser;
}
