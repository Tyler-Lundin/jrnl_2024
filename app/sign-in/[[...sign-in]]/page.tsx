import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (<>
    <main className="w-screen h-screen grid place-content-center bg-gray-100">
      <SignIn path="/sign-in" fallbackRedirectUrl={"/lib"} />
    </main>
  </>)
}
