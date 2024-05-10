import BackButton from "@/components/BackButton";

export default function CreateJrnlPage() {
  return (
    <div className="bg-green-400 w-screen h-screen z-10 fixed grid place-content-center">
      <BackButton backFn={() => { }} />
      <h1 className="font-black uppercase text-3xl ">
        NAME THIS JRNL...!
      </h1>
      <form className="grid">
        <input className="caret-white text-4xl py-4 px-2 font-black md:text-7xl bg-black/10 text-white placeholder-white focus:placeholder-white/25 " placeholder="Pets.." defaultValue="" />
        <button className="font-black bg-white border-2 border-black rounded-md text-black uppercase text-3xl p-3">
          create
        </button>
      </form>
    </div>
  )
}
