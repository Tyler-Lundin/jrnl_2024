import { fn } from "@/util/helpful_types"
import { PiHamburgerThin, PiPersonSimpleRunLight, PiNoteBlankThin } from "react-icons/pi";



export default function JrnlNav({ openExercise, openNotes, openFood, currentIndex }: { openExercise: fn, openNotes: fn, openFood: fn, currentIndex: number }) {

  const BUTTONS = [
    { label: "Exercise", icon: PiPersonSimpleRunLight, fn: openExercise },
    { label: "Notes", icon: PiNoteBlankThin, fn: openNotes },
    { label: "Food", icon: PiHamburgerThin, fn: openFood },
  ]
  return (<>
    <div className="absolute bottom-0 left-0 p-2 grid grid-cols-3 gap-1 w-screen bg-black z-50 h-12">
      {BUTTONS.map((B, i) => (<>
        <button className={`${currentIndex === i ? "text-white border-white" : "text-white/50 border-white/50"} w-full grid grid-flow-col content-center justify-between px-2 border-[1px] rounded-lg`}
          onClick={B.fn}>
          <h3 className="uppercase font-black"> {B.label} </h3>
          <B.icon className={"text-2xl"} />
        </button>
      </>))}

    </div>

  </>)
}
// (
//     <div className="absolute bottom-0 left-0 p-2 grid grid-cols-3 gap-1 w-screen bg-black z-50 h-12">
//       <button className={`${currentIndex === 0 ? "text-white border-white" : "text-white/50 border-white/50"} w-full grid grid-flow-col content-center justify-between px-2 border-[1px] rounded-lg`}
//         onClick={openExercise}>
//         <h3 className="uppercase font-black"> Exercise </h3>
//         <GiWeightLiftingUp className="text-2xl" />
//       </button>
//
//       <button className={`${currentIndex === 1 ? "text-white border-white" : "text-white/50 border-white/50"} w-full grid grid-flow-col content-center justify-between px-2 border-[1px] rounded-lg`}
//         onClick={openNotes}>
//         <h3 className="uppercase font-black"> Exercise </h3>
//         <GiPencil className="text-2xl" />
//       </button>
//
//       <button className={`${currentIndex === 2 ? "text-white border-white" : "text-white/50 border-white/50"} w-full grid grid-flow-col content-center justify-between px-2 border-[1px] rounded-lg`}
//         onClick={openFood}>
//         <h3 className="uppercase font-black"> Exercise </h3>
//         <GiAppleCore className="text-2xl" />
//       </button>
//     </div>
//
//   )
