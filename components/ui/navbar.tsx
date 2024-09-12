"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Advisor", href: "/advisor" },
  { name: "SignUp", href: "/signup" },
  { name: "Login", href: "/login" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex justify-between items-center">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="link">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
