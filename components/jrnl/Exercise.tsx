import { useState } from "react"

export default function Exercise({ coverColor, pageColor, fontColor }: { coverColor: string, pageColor: string, fontColor: string }) {
  return (<>
    <div className="w-screen h-screen absolute top-0 left-0 bg-blue-500">
      <h2 style={{ background: coverColor }} className="font-black text-white px-3 py-1"> EXERCISE </h2>
    </div>
  </>)
}



const InitialState = {}
function ExerciseDashboard() {
  const [{ }, setState] = useState(InitialState)

  return (<>
    <CreateExercise />
    <ExerciseLogs />
  </>)
}



const InitialState_ = {}
function CreateExercise() {
  const [{ }, setState] = useState(InitialState_)
  return (<>
  </>)
}

const InitialState__ = {}
function ExerciseLogs() {
  const [{ }, setState] = useState(InitialState__)
  return (<>
  </>)
}
