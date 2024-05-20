import { getDate } from "@/util/date";
import { Dispatch, SetStateAction, useState } from "react";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DateSelector({
  coverColor,
  pageColor,
  fontColor,
  date,
  setDate,
  refetchPage,
}: {
  coverColor: string,
  pageColor: string,
  fontColor: string,
  date: Date,
  setDate: Dispatch<SetStateAction<Date>>,
  refetchPage: () => void
}) {
  const formattedDate = getDate(date);
  const [isOpen, setIsOpen] = useState(false)

  function handleSelect(day: Date | undefined) { if (day) setDate(day) }

  function handleClose() {
    setIsOpen(false);
    refetchPage()
  }

  return (<>
    {isOpen && (<>
      <div style={{ background: pageColor }} className="w-screen h-screen absolute top-0 left-0 z-40 grid place-content-center">
        <button onClick={handleClose} className="top-2 left-2 absolute bg-red-400">
          CLOSE
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              required={true}
              onSelect={handleSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>

      </div>
    </>)}

    <button onClick={() => setIsOpen(true)} style={{ color: fontColor, background: pageColor }} className="font-black text-white px-3 py-1">
      {formattedDate}
    </button>

  </>)
}

