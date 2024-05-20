import { useState } from "react"
import { Note as NoteType } from "@prisma/client";
import { BoolToStr, SizeFromLength } from "@/util/string";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SaveNote } from "@/server/note_actions";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoIosCheckmark } from "react-icons/io";
import debounce from "debounce"
import { dayOfYear } from "@/util/date";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

const emptyNote = { note: "", note_id: "", checkable: false, is_checked: false, }

export const CreateNote = ({ jrnlId, pageId, pageColor, fontColor, date }: { jrnlId: string, pageId: string, pageColor: string, fontColor: string, date: Date }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [{ note, note_id, checkable, is_checked }, setNote] = useState<NoteType>(emptyNote);
  const [saveable, setSaveable] = useState<boolean>(false)

  const { mutate, isError } = useMutation({
    mutationFn: () => SaveNote(jrnlId, pageId, note_id, note, checkable, is_checked),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`page__${dayOfYear(date)}`] });
      setNote(emptyNote)
    }
  })

  function toggleCheckable() { setNote((prev) => ({ ...prev, checkable: !checkable })) }
  function toggleIsChecked() { setNote((prev) => ({ ...prev, is_checked: !is_checked })) }
  function isShortNote() { return note.toString().length < 9 }

  return (
    <div className=" p-2 grid gap-2">
      <div className="relative">
        {isShortNote() ? (
          <Input
            autoFocus
            onFocus={(e) => e.currentTarget.value = e.currentTarget.value}
            name={`${pageId}-note`}
            value={note.toString()}
            onChange={(e) => {
              if (e.target.value.length < 1) setSaveable(false)
              else setSaveable(true)
              setNote((p) => ({ ...p, note: e.target.value }))
            }}
            placeholder="Eat"
            style={{ background: "white", color: fontColor, borderColor: fontColor }}
            className={`p-2 placeholder-[${fontColor}] text-black w-full h-min ${SizeFromLength(note.toString())} focus:outline-none border-2 border-b-4 border-x-4 rounded-lg resize-none transition-all duration-1000`}
          />
        ) : (

          <Textarea
            autoFocus
            onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
            name={`${pageId}-note`}
            value={note.toString()}
            onChange={(e) => {
              if (e.target.value.length < 1) setSaveable(false)
              else setSaveable(true)
              setNote((p) => ({ ...p, note: e.target.value }))
            }}
            placeholder=""
            style={{ background: "white", color: fontColor, borderColor: fontColor }}
            className={`p-2 text-6xl placeholder-[${fontColor}] text-black w-full h-full ${SizeFromLength(note.toString())} focus:outline-none border-2 border-b-4 border-x-4 rounded-lg resize-none transition-all duration-700`}
          />
        )
        }
        {
          checkable && note.toString().length < 50 && (
            <Checkbox
              className="absolute top-1/2 right-8 -translate-y-1/2"
              checked={false}
              id="note" />

          )
        }
      </div>

      <div className="flex justify-between gap-2  z-10">
        <Button
          onClick={(e) => {
            e.preventDefault();
            toggleCheckable()
          }}
          disabled={!isShortNote()}
          size={"icon"}
          className={`${checkable ? "bg-green-300 translate-x-[2px] border-r-2 border-b-2" : "bg-transparent"} hover:bg-green-300 text-4xl`}>
          <IoIosCheckmark />
        </Button>

        <Button size="lg" className={`${saveable ? "bg-green-200 hover:bg-green-300 text-black hover:text-green-800" : "bg-red-300 text-red-900 pointer-events-none"} `} variant={saveable ? "right" : "rightDisabled"}
          onClick={(e) => {
            e.preventDefault();
            if (saveable) mutate()
          }}> Save </Button>
      </div>
    </div>
  )
}
// className="border-black bg-blue-300 font-black border-2 border-b-4 border-r-4 text-black uppercase rounded-lg p-3"
// className="border-black bg-green-400 font-black border-2 border-b-4 border-r-4 text-black uppercase rounded-lg px-8 p-3"
