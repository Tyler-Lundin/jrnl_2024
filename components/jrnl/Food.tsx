
export default function Food({ coverColor, pageColor, fontColor }: { coverColor: string, pageColor: string, fontColor: string }) {
  return (<>
    <div className="w-screen h-screen absolute top-0 left-0 bg-red-500">
      <h2 style={{ background: coverColor }} className="font-black text-white px-3 py-1"> FOOD </h2>
    </div>
  </>)
}
