"use server"

import { Note } from "@prisma/client";
import prisma from "./db";
import { randomUUID } from "crypto";
import { nanoid } from "nanoid";

interface Payload {
  message?: string,
  error?: string
  data?: any,
}

export async function SaveNote(
  jrnlId: string,
  pageId: string,
  noteId: string,
  note: string,
  checkable: boolean,
  isChecked: boolean,
): Promise<Payload> {
  try {


    const newNote: Note = {
      note,
      note_id: noteId.length > 0 ? noteId : nanoid(),
      is_checked: checkable && isChecked,
      checkable,
    }

    console.log("NEW_NOTE", { newNote })

    const save = await prisma.page.update({
      where: {
        jrnlId,
        id: pageId,
      },
      data: {
        note: {
          push: newNote
        }
      }
    })

    if (save) return {
      message: "Save Successful",
      data: save
    }

    return {
      message: "Save Failed!",
      error: "Unsure :("
    }
  } catch (ERROR) {
    return {
      message: "Save Failed!",
      error: "Error Message in 'data'!",
      data: ERROR
    }
  }
}

export async function ToggleNoteChecked(pageId: string, noteId: string, index: number) {

  const page = await prisma.page.findFirst({ where: { id: pageId } })
  if (page) {
    const updatedNotes = [...page?.note]
    if (updatedNotes[index].note_id === noteId) {
      updatedNotes[index].is_checked = !updatedNotes[index].is_checked
      await prisma.page.update({
        where: {
          id: pageId,
        },
        data: {
          note: updatedNotes
        }
      })
    }
  }
  console.log({ page })
}


export async function DeleteNote(pageId: string, noteId: string, index: number) {
  const page = await prisma.page.findFirst({ where: { id: pageId } })
  if (page) {
    const updatedNotes = [...page?.note]
    if (updatedNotes[index].note_id === noteId) {
      updatedNotes.splice(index, 1)
      await prisma.page.update({
        where: {
          id: pageId,
        },
        data: {
          note: updatedNotes
        }
      })
    }
  }
}

export async function UpdateNote() { }

