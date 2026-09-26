import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="hidden items-center gap-7 md:flex">
      <Link
        href="/library"
        className="text-sm font-medium text-[#2B2B2B] hover:text-[#355E3B]"
      >
        My Library
      </Link>

      <Link
        href="/books/add"
        className="text-sm font-medium text-[#2B2B2B] hover:text-[#355E3B]"
      >
        Add Book
      </Link>

      <Link
        href="/profile"
        className="text-sm font-medium text-[#2B2B2B] hover:text-[#355E3B]"
      >
        Profile
      </Link>
    </nav>
  );
}