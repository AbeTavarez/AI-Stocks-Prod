import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
    <h1 className="text-5xl font-sans bg-gradient-to-r from-green-300 to-green-700 p-5 rounded">AI Stocks Predictions</h1>
      <div>
        <Link href='/advisor'>Get started</Link>
      </div>
    </main>
  );
}
