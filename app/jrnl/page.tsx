import { IoIosAdd, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {

  const user = await currentUser();
  if (!user) { console.log("LOG OUT THE USER MY FRIEND") }


  return (
    <main className="bg-base-100 w-screen h-screen overflow-hidden">
      <HeaderBar />
      <Content />
      <EventButton />
    </main>
  )
}


const HeaderBar = () => {
  return (
    <div className="grid grid-flow-col w-screen justify-between">
      <button type="button" className="btn text-secondary btn-square ">
        <IoIosArrowBack />
      </button>
      <input type="text" placeholder="title goes here" className="input-ghost text-center rounded-none input font-black placeholder-white text-white" />
      <button type="button" className="btn text-secondary btn-square ">
        <IoIosArrowForward />
      </button>
    </div>
  )
}

const Content = () => (
  <textarea
    placeholder="Type here"
    className="bg-white/80 p-2 placeholder-base-300 text-black w-full h-full focus:border-none focus:outline-none" />
)

const EventButton = () => (
  <button className="absolute bottom-4 right-4 btn btn-circle bg-ghost text-3xl text-base-content"> <IoIosAdd /> </button>
)

const EventPopup = () => {

}
