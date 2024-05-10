import Link from "next/link";


const HEADING = "JRNL";
const SUBHEADING = "SIMPLE & SLEEK; online journaling"
const CTA_BUTTON = "GO!"
export default async function Home() {

  return (
    <div className="hero min-h-screen bg-base-300">
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md text-secondary">
          <h1 className="text-7xl font-bold tracking-widest">{HEADING}</h1>
          <p className="mb-5 font-thin lowercase">{SUBHEADING}</p>
          <Link href="/lib">
            <button className="text-primary border-primary border-[1px] rounded-full text-4xl font-thin p-3 hover:bg-primary hover:text-base-100  aspect-square transition-all">{CTA_BUTTON}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
