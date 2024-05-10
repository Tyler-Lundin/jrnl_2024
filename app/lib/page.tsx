import UserMenu from "@/components/UserMenu";
import Library from "@/components/library/Library";
import prisma from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";

async function GetJrnls(userId: string) {
  return await prisma.jrnl.findMany({
    where: { userId }
  }) || []
}

export default async function Page() {
  const clerk_user = await currentUser();
  const db_user = await prisma.user.findFirst({ where: { clerk_id: clerk_user?.id }, })
  const jrnls = await GetJrnls(db_user?.id || "");
  console.log("JRNLS:::::::::::::::", jrnls)

  return (
    <main className="w-screen h-screen bg-base-300">
      <UserMenu />
      <Library jrnls={jrnls} userId={clerk_user?.id} userEmail={clerk_user?.primaryEmailAddress?.emailAddress} />
    </main>
  )
}


