import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";


const HEADING = "JRNL";
const SUBHEADING = "SIMPLE & SLEEK online journaling"
export default async function Home() {

  return (
    <main className="w-screen h-screen grid place-content-center bg-gradient-to-br from-pink-600 via-blue-300 to-green-700">
      <Card className="w-fit text-center backdrop-blur-lg bg-black/40 h-96" style={{ aspectRatio: "8/11" }}>
        <CardHeader className="max-w-md text-white">
          <h1 className="text-7xl font-bold tracking-widest ">{HEADING}</h1>
          <p className="mb-5 font-thin lowercase ">{SUBHEADING}</p>
        </CardHeader>
        <CardFooter className="grid gap-2">
          <Link href="/sign-in" className="grid place-content-center">
            <button
              className="text-white w-40 border-white border-[1px] rounded-lg text-xl font-thin px-3 hover:bg-white hover:text-black transition-all"
            >
              Sign In
            </button>
          </Link>
          <Link href="/sign-up" className="grid place-content-center">
            <button
              className="text-white w-40 border-white border-[1px] rounded-lg text-xl font-thin px-3 hover:bg-white hover:text-black transition-all"
            >
              Register
            </button>
          </Link>

        </CardFooter>
      </Card>
    </main>
  );
}
