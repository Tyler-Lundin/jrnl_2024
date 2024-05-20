import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { IoIosLogOut, IoIosSettings } from "react-icons/io";
import { buttonVariants } from "./ui/button";

export default async function UserMenu() {
  const U = await currentUser();
  return (
    <div
      className="absolute top-2 right-2 grid border-2 border-b-4  border-l-4 rounded-lg overflow-hidden border-black bg-white/50 h-fit p-4 content-start gap-4 scale-75 translate-x-4 -translate-y-8 lg:translate-x-0 lg:translate-y-0 lg:scale-100"
    >
      <Link
        href="/profile"
        className="relative  border-2 border-b-4  border-l-4 rounded-lg overflow-hidden aspect-square border-black w-16 h-16"
      >
        <Image width="80" height="80" src={U?.imageUrl || ""} alt="user url" />
      </Link>

      <Link
        href="/settings"
        className="relative border-b-4  border-l-4 hover:border-2 border-t-[1px] border-r-[1px]  transition-all rounded-lg overflow-hidden aspect-square border-black w-16 h-16 text-4xl grid justify-center bg-orange-400"
      >
        <IoIosSettings />
        <small className="text-xs absolute bottom-2 left-1/2 -translate-x-1/2">settings</small>
      </Link>

      <div
        className="relative border-b-4  border-l-4 hover:border-2 border-t-[1px] border-r-[1px]  transition-all rounded-lg overflow-hidden aspect-square border-black w-16 h-16 text-xl grid justify-center bg-red-400"
      >
        <IoIosLogOut className="text-4xl" />
        <small className="text-xs absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap"><SignOutButton redirectUrl="/" /></small>
      </div>
    </div>
  )
}
