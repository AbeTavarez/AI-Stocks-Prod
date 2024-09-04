import { PropsWithChildren } from "react";
import Link from "next/link";
export default function Navbar({ children }: PropsWithChildren) {
  return (
    <nav className="flex justify-between items-center w-96 rounded-full">
      <Link href="/home" className="hover:border hover:border-green-400 p-1">
        Home
      </Link>
      <Link className="flex items-center justify-around p-5" href="/agent">
        Agent
      </Link>
    </nav>
  );
}
