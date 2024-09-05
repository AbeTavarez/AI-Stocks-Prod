import Link from "next/link";
import { PropsWithChildren } from "react";
import Navbar from "./navbar";

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className="flex items-center justify-around p-5">
      <Link href="/">
        <h1 className="text-3xl font-sans">AI Stocks 🚀</h1>
      </Link>
     <Navbar />
    </header>
  );
}
