import { IoIosClose } from "react-icons/io";

export default function BackButton({ backFn }: { backFn: () => void }) {
  return (
    <button onClick={backFn} className="absolute top-2 left-2 text-black border-[1px] border-black/25 p-1  grid-flow-col align-middle grid  transition-all group rounded-lg bg-white">
      <IoIosClose className="text-2xl grid-cols-1" />
    </button>
  )
}
