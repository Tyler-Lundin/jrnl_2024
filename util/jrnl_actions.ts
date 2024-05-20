"use server"
import { Jrnl } from "@prisma/client";
import prisma from "@/server/db";
import { dayOfYear, getDate } from "@/util/date";


export async function getJrnl(jrnlId: string) {
  const jrnl = await prisma.jrnl.findUnique({ where: { id: jrnlId.toString() } })
  if (jrnl == null) {
    return {
      id: "0",
      year: 2024,
      userId: "0",
      font_color: "rgb(24,24,80)",
      cover_color: "rgb(24,24,80)",
      page_color: "rgb(24,24,80)",
    } as Jrnl
  }
  return jrnl
}

export async function getPage(jrnlId: string, date: Date) {
  const currPage = await prisma.page.findFirst({
    where: {
      jrnlId: jrnlId.toString(),
      day: dayOfYear(date)
    },
  })
  if (currPage) return currPage
  const newPage = await prisma.page.create({
    data: {
      day: dayOfYear(date),
      title: getDate(),
      jrnlId: jrnlId.toString(),
    }
  })
  return newPage
}

export async function getNotes(pageId: string) {
  console.log("PAGE_ID::::", pageId)
  if (pageId === "0" || pageId === "") return []
  try {
    const page = await prisma.page.findFirst({ where: { id: pageId } })
    const notes = page?.note || []
    console.log("GETNOTES::", { page })
    return notes
  } catch (ERR) {
    console.log("ERR:", ERR)
  }
  return []
}

