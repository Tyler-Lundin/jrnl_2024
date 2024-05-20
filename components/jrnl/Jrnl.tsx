"use client"
import DateSelector from "./DateSelector"
import { useEffect, useState } from "react"
import Exercise from "./Exercise"
import Food from "./Food"
import Notes from "../Notes"
import { useQuery } from "@tanstack/react-query"
import { getJrnl, getPage } from "@/util/jrnl_actions"
import { useParams } from "next/navigation"
import { dayOfYear } from "@/util/date"
import JrnlNav from "../JrnlNav"

export default function Jrnl() {
  const { jrnlId: jrnls } = useParams<{ jrnlId: string }>()
  const jrnlId = jrnls[0]
  const [date, setDate] = useState<Date>(new Date())
  const [pageId, setPageId] = useState("")

  const [{ font: fontColor, cover: coverColor, page: pageColor }, setColors] = useState({
    font: "rgb(0,0,0)",
    cover: "rgb(0,0,0)",
    page: "rgb(222,222,222)"
  })

  const { data: jrnl, } = useQuery({ queryFn: () => getJrnl(jrnlId), queryKey: [`jrnl-${jrnlId}`], })
  const { data: page, isSuccess, isRefetching, refetch: refetchPage, } = useQuery({ queryFn: () => getPage(jrnlId, date), queryKey: [`page__${dayOfYear(date)}`], })

  const [cur, setCur] = useState({ i: 1, element: <Notes {...{ jrnlId, pageColor, fontColor, page, pageId, date }} /> })

  function openExercise() { setCur({ i: 0, element: <Exercise {...{ coverColor, pageColor, fontColor }} /> }) }
  function openNotes() { setCur({ i: 1, element: <Notes {...{ jrnlId, pageColor, fontColor, page, pageId, date }} /> }) }
  function openFood() { setCur({ i: 2, element: <Food {...{ coverColor, pageColor, fontColor }} /> }) }

  useEffect(() => {
    if (page?.id && page?.id !== pageId) setPageId(page?.id)
  }, [page?.id, pageId])

  useEffect(() => {
    setCur((prev) => ({ ...prev, element: <Notes {...{ jrnlId, pageColor, fontColor, page, pageId, date }} /> }))
  }, [pageId, fontColor, jrnlId, page, pageColor, date])

  return (
    <div key={page?.id} style={{ background: pageColor }} className="w-screen h-screen relative overflow-hidden" >

      <div className="w-screen h-14 top-0 left-0 relative grid place-content-center">
        <DateSelector {...{ coverColor, pageColor, fontColor, date, setDate, refetchPage }} />
      </div>
      {cur.element}

      <JrnlNav {...{ openExercise, openNotes, openFood, currentIndex: cur.i }} />
    </div>
  )
}


