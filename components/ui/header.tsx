import { PropsWithChildren } from "react";

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className="flex items-center justify-around p-5">
         <h1 className="text-3xl font-sans">AI Stocks 🚀</h1>
        {children}</header>
  );
}
