import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function UserMenu() {
  const U = await currentUser();
  return (
    <div className="absolute top-2 right-2">
      <div className="dropdown">
        <div tabIndex={0} className="avatar rounded-full overflow-hidden" role="button">
          <Image width="40" height="40" src={U?.imageUrl || ""} alt="user url" />
        </div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Settings</a></li>
          <li><a>Log Out</a></li>
        </ul>
      </div>
    </div>
  )
}
