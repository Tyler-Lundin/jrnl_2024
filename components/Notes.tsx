"use client"
import { Note as NoteType, Page } from "@prisma/client"
import { CreateNote } from "./CreateNote"
import useLongPress from "@/hooks/useLongPress";
import { useState } from "react";
import { DeleteNote, ToggleNoteChecked } from "@/server/note_actions";
import { useQueryClient } from "@tanstack/react-query";
import { dayOfYear } from "@/util/date";
import { Checkbox } from "./ui/checkbox";
import { SizeFromLength } from "@/util/string";
import { IoIosTrash } from "react-icons/io";

const initialState = { hovered: [], deleted: [] }

export default function Notes({ jrnlId, page, pageId, pageColor, fontColor, date }: { jrnlId: string, page: Page | undefined, pageId: string, pageColor: string, fontColor: string, date: Date }) {
  const queryClient = useQueryClient();
  const [showOptions, setShowOptions] = useState(false)
  const [{ hovered, deleted }, setState] = useState<{ hovered: number[], deleted: number[] }>(initialState)

  const onLongPress = () => {
    setShowOptions((p) => {
      if (p) setState(initialState)
      return !p
    })
  };

  const onClick = () => { console.log('click is triggered') }

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const handleCheck = (N: NoteType, i: number) => {
    ToggleNoteChecked(pageId, N.note_id, i)
    queryClient.invalidateQueries({ queryKey: [`page__${dayOfYear(date)}`] })
  }

  const handleDelete = (N: NoteType, i: number) => {
    DeleteNote(pageId, N.note_id, i)
    queryClient.invalidateQueries({ queryKey: [`page__${dayOfYear(date)}`] })
      .then(() => {
        setState((prev) => ({ ...prev, deleted: [] }))
      })

  }

  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  function getShakeAnimation(I: number, cancelShake: boolean = false) {
    if (!showOptions) return "animate-none"
    if (hovered.includes(I)) return cancelShake ? "animate-cancel-shake-fast" : "animate-shake-fast"
    if (hovered.includes(-1)) return cancelShake ? "animate-cancel-shake-slow" : "animate-shake-slow"
    return cancelShake ? "animate-cancel-shake" : "animate-shake"
  }

  return (<>
    {showOptions && (<div
      onMouseOver={() => { setState((prev) => ({ ...prev, hovered: [...prev.hovered, -1] })) }}
      onMouseOut={() => { setState((prev) => ({ ...prev, hovered: [...prev.hovered].filter((HOVERED, index) => HOVERED !== -1) })) }}
      onClick={() => setShowOptions(false)}
      className={`${hovered.length > 0 && !hovered.includes(-1) ? "bg-black" : "bg-black/90 hover:bg-black/60"} fixed top-0 left-0 w-screen h-screen transition-all hover:backdrop-blur-none backdrop-blur-[1px] z-20 `}
    />)}
    <div className={`flex flex-col h-[calc(100%_-_6.5rem)]`}>
      <CreateNote jrnlId={jrnlId} pageId={pageId} pageColor={pageColor} fontColor={fontColor} date={date} />
      <ul className="grid content-start gap-2 h-screen overflow-y-auto overflow-x-hidden" key={pageId}>
        {page && Array.isArray(page?.note) && [...page?.note].map((NOTE, NOTE_INDEX) => (
          <div {...longPressEvent} key={`${NOTE.note_id}__${NOTE_INDEX}__${pageId}`}
            className={`${getShakeAnimation(NOTE_INDEX)} ${deleted.includes(NOTE_INDEX) ? "opacity-0" : `opacity-100`} relative w-screen transition-all z-40 h-min ${NOTE_INDEX === page.note.length}`}
          >

            <div className={`p-2 flex relative transition-all duration-500  left-0 ${hovered.includes(NOTE_INDEX) ? "bg-red-400 " : "bg-white"} mx-2 border-black border-4 border-t rounded-lg px-8`} style={{ color: fontColor }}>
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                {NOTE.checkable && (
                  <Checkbox
                    onClick={(e) => { e.preventDefault(); handleCheck(NOTE, NOTE_INDEX); }}
                    checked={NOTE.is_checked}
                    id="note" className="self-center" />
                )}
              </div>
              <p className={`${SizeFromLength(NOTE.note.toString())}`}>{NOTE.note}</p>
            </div>

            {showOptions && (
              <button
                onMouseOut={() => setState((prev) => ({ ...prev, hovered: [...prev.hovered].filter((arrayIndex) => arrayIndex !== NOTE_INDEX) }))}
                onMouseOver={() => setState((prev) => ({ ...prev, hovered: [...prev.hovered, NOTE_INDEX] }))} onClick={(e) => {
                  e.preventDefault();
                  setState((prev) => ({ ...prev, deleted: [...prev.deleted, NOTE_INDEX] }))
                  handleDelete(NOTE, NOTE_INDEX);
                }} className={` ${getShakeAnimation(NOTE_INDEX, true)} absolute  top-1/2 -translate-y-1/2 right-8 grid place-content-center p-2 rounded-lg border border-b-2 border-l-2  border-black w-10 h-10 bg-red-400/70 backdrop-blur-[2px] z-0 `}>
                <IoIosTrash />
              </button>

            )}
          </div>
        )
        )}

      </ul>
    </div>
  </>)
}


