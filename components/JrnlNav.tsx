import { fn } from "@/util/helpful_types"
import { GiAppleCore, GiPencil, GiWeightLiftingUp } from "react-icons/gi"

export default function JrnlNav({ openExercise, openNotes, openFood, currentIndex }: { openExercise: fn, openNotes: fn, openFood: fn, currentIndex: number }) {
  return (
    <div className="absolute bottom-0 left-0 p-2 grid grid-cols-3 gap-1 w-screen bg-black z-50 h-12">
      <button style={{ color: currentIndex === 0 ? "white" : "grey" }} className="w-full grid place-content-center"
        onClick={openExercise}>
        <GiWeightLiftingUp className="text-2xl" />
      </button>

      <button style={{ color: currentIndex === 1 ? "lightgreen" : "grey" }} className={` w-full grid place-content-center`}
        onClick={openNotes}>
        <GiPencil className="text-2xl" />
      </button>

      <button style={{ color: currentIndex === 2 ? "white" : "grey" }} className="w-full grid place-content-center"
        onClick={openFood}>
        <GiAppleCore className="text-2xl" />
      </button>
    </div>

  )
}
