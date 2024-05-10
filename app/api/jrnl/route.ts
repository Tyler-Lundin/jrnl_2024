import prisma from "@/server/db"
import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('jrnlId') || ""
  const jrnl = await prisma.jrnl.findFirst({ where: { id: { equals: id } } })
  return Response.json({ jrnl })
}


// POST /api/jrnl/
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title")
  const userId = searchParams.get("userId")
  const userEmail = searchParams.get("userEmail")
  const colors = {
    cover: searchParams.get("cover"),
    font: searchParams.get("font"),
    page: searchParams.get("page"),
  }


  if (!title || !userId || !userEmail || !colors.cover || !colors.font || !colors.page) return NextResponse.json({ status: "error", message: "missing data, failed to create Jrnl" })

  const user = await prisma.user.upsert({
    where: {
      clerk_id: userId,
    },
    update: {},
    create: {
      clerk_id: userId,
      email: userEmail
    }
  })

  if (!user) return NextResponse.json({ status: "error", message: "Failed to get and or create user" })

  const jrnl = await prisma.jrnl.create({
    data: {
      title,
      userId: user.id,
      cover_color: colors.cover,
      font_color: colors.font,
      page_color: colors.page,
    }
  })

  return NextResponse.json({ jrnl })
}

