import { useState } from "react";
import BackButton from "./BackButton";

// id?: string
// title: string
// userId: string
// cover_color: string
// font_color: string
// page_color: string
// logs?: LogUncheckedCreateNestedManyWithoutJrnlInput
//


export default function CreateJrnl({ backFn, userId, userEmail }: { backFn: () => void, userId: string | undefined, userEmail: string | undefined }) {
  const [colors, setColors] = useState({
    cover: "rgb(20,20,40)",
    font: "rgb(255,255,255)",
    page: "rgb(40,40,50)",
  });
  const [title, setTitle] = useState("Pets..");

  const handleSubmit = () => {
    const response = fetch(`/api/jrnl?title=${title}&userId=${userId}&userEmail=${userEmail}&cover=${colors.cover}&font=${colors.font}&page=${colors.page}`, {
      method: "POST",
    }).then((res) => res.json())

    console.log(response)
  }

  return (
    <div className="bg-green-400 w-screen h-screen overflow-hidden z-10 fixed grid place-content-center">
      <BackButton backFn={backFn} />
      <form name="create_form" className="grid w-screen p-1">
        <label htmlFor="title" className="font-black uppercase w-full">JRNL TITLE</label>
        <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} name="title" className="caret-white text-2xl py-4 px-2 w-full rounded-md mb-2 border-[1px] border-black/25 font-black md:text-7xl bg-black/10 text-white placeholder-white focus:placeholder-white/25 " />
        <div>

        </div>
        <button type="button" onClick={() => handleSubmit()} className="font-black bg-white border-[1px] border-black/25 rounded-md text-black uppercase text-3xl p-3">
          create
        </button>
      </form>
    </div>
  )
}

