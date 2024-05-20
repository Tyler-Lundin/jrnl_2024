import prisma from "@/server/db";
import { StrToBool } from "@/util/string";
import { Note } from "@prisma/client";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";


// localhost:3000/api/page
export const GET = () => null
export const POST = SaveNote
export const PUT = () => null
export const DELETE = () => null

async function SaveNote(req: NextRequest) {
  try {

    const formData = await req.formData()

    const jrnlId = formData.get("jrnlId")?.toString();
    const pageId = formData.get("pageId")?.toString();
    const note = formData.get("note")?.toString();
    const noteId = formData.get("noteId")?.toString();
    const checkable = formData.get("checkable")?.toString();
    const isChecked = formData.get("isChecked")?.toString();

    if (pageId && jrnlId && note && noteId && checkable && isChecked) {
      const save = await prisma.page.update({
        where: {
          id: pageId,
        },
        data: {
          note: {
            push: {
              note,
              note_id: noteId || randomUUID(),
              checkable: StrToBool(checkable),
              is_checked: StrToBool(isChecked) && StrToBool(checkable),
            }
          },
        }
      })
      console.log({ save })
      return NextResponse.json({ note: save })
    }
    return NextResponse.json({ error: `FAILED SAVE` })
  } catch (ERR) {
    return NextResponse.json({ error: `ERR ::: ${ERR}` })
  }
}



async function SaveExercise(req: NextRequest) {

}
