import { currentUser } from "@clerk/nextjs/server";
import Jrnl from "@/components/jrnl/Jrnl";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {

  const user = await currentUser();
  if (user == null) redirect("/sign-in")

  return (
    <main className="bg-base-100 w-screen h-screen overflow-hidden">
      <Link href="/profile" style={{ borderColor: "black" }} className="absolute top-2 right-2 z-30 border-2 border-b-4  border-l-4 rounded-lg overflow-hidden">
        <Image width="40" height="40" src={user.imageUrl || ""} alt="user url" />
      </Link>
      <Jrnl />
    </main>
  )
}


