import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex justify-between items-center rounded-full">
        <li>
          <Link href="/" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" href="/advisor">
            Advisor
          </Link>
        </li>
        <li>
          <Link href="/signup" className="link">
            Sign up
          </Link>
        </li>
        <li>
          <Link href="/login" className="link">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
