import BarLoader from "react-spinners/BarLoader"
export default function Loading() {

  // You can add any UI inside Loading, including a Skeleton.
  return (<main className="absolute top-0 left-0 w-screen h-screen grid place-content-center"> <BarLoader color="#000000" /> </main>)
}
