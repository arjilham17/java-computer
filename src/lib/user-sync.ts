import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  const user = await currentUser();

  if (!user) return null;

  const email = user.emailAddresses[0]?.emailAddress;
  const isAdminEmail = email === "arjilham17@gmail.com";

  const internalUser = await db.user.upsert({
    where: { clerk_id: user.id },
    update: {
      full_name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: email,
      role: isAdminEmail ? "SUPER_ADMIN" : undefined, // Keep existing role if not admin email
    },
    create: {
      clerk_id: user.id,
      full_name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: email,
      role: isAdminEmail ? "SUPER_ADMIN" : "USER"
    }
  });

  return internalUser;
}
