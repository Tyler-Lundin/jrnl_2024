import UserMenu from "@/components/UserMenu";
import prisma from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

async function GetJrnlByYear(userId: string, year: number) {
  const thisYearsJrnl = await prisma.jrnl.findFirst({
    where: { userId, year }
  })

  if (thisYearsJrnl) return thisYearsJrnl

  const newJrnl = await prisma.jrnl.create({
    data: {
      year,
      userId,
      cover_color: "rgb(10,20,30)",
      font_color: "rgb(255,255,255)",
      page_color: "rgb(40,50,60)",
    }
  })
  return newJrnl
}


async function GetUser(authId: string, email: string) {
  return await prisma.user.upsert({ where: { authId, }, update: {}, create: { email, authId } })
}

export default async function Page() {
  const auth = await currentUser();
  const authEmail = auth?.primaryEmailAddress?.emailAddress || ""
  const authId = auth?.id || ""
  const year = new Date().getFullYear()
  if (auth == null) redirect("/sign-in")
  const user = await GetUser(authId, authEmail)
  const jrnl = await GetJrnlByYear(user.id, year);
  console.log({ user: user.email })


  return (
    <main className="w-screen h-screen bg-slate-400">
      <UserMenu />
      <div className="JRNLS grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 gap-2 w-full h-full px-8 pt-16">
        <Link
          href={`/jrnl/${jrnl.id}`}
          style={{ background: jrnl.cover_color, color: jrnl.font_color, borderColor: "white", aspectRatio: "8/11" }}
          className={`border hover:scale-105 w-fit h-36 md:h-72 lg:h-80 rounded-md p-2 py-8 text-center`}
        >
          <div className="bg-neutral-200">
            <h1 className="font-white text-black text-3xl tracking-widest"> {jrnl.year} </h1>
          </div>
        </Link>
      </div>
    </main>
  )
}


