"use client"
import { Jrnl } from "@prisma/client";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import CreateJrnl from "../CreateJrnl";
import prisma from "@/server/db";
import Link from "next/link";

export default function Library({ userId, userEmail, jrnls }: { userId: string | undefined, userEmail: string | undefined, jrnls: Jrnl[] }) {
  const [isOpen, setIsOpen] = useState(false);
  function openCreate() { setIsOpen(true) };
  function closeCreate() { setIsOpen(false) };

  return (
    <div className=" align-top flex flex-wrap bg-base-300 h-full w-full  place-content-center overflow-y-auto overflow-x-hidden">

      {isOpen && (
        <CreateJrnl userId={userId} userEmail={userEmail} backFn={closeCreate} />
      )}

      {jrnls.map((jrnl, ind) => (
        <Link href={`/jrnl/${jrnl.id}`} style={{ background: jrnl.cover_color, color: jrnl.font_color, borderColor: "white" }} className={`border hover:scale-105 w-40 h-60 rounded-md p-2 py-8 text-center font-black `} key={`${jrnl.id}-${ind}`}>
          {jrnl.title}
        </Link>
      ))}
      {jrnls.length === 0 && (
        <>
          <button onClick={() => openCreate()} className="btn bg-green-400 transition-all group duration-1000 hover:w-60 hover:h-30 hover:bg-green-400  group btn-accent rounded-full size-20">
            <IoIosAdd className="group-hover:opacity-0 opacity-100 text-3xl transition-all duration-500" />
            <span className="group opacity-0 absolute group-hover:opacity-100 transition-all duration-1000 text-xl font-light whitespace-break-spaces"> create a new JRNL? </span>
          </button>
        </>
      )
      }
    </div >
  )
}
