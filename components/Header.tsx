import Link from "next/link";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="border-b border-[#D8C7A3]/50 bg-[#F7F4ED]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#355E3B] text-lg text-white">
            S
          </div>

          <span className="font-[var(--font-playfair)] text-2xl font-semibold text-[#24452A]">
            ShelfSpace
          </span>
        </Link>

        <NavBar />

        <Link
          href="/login"
          className="rounded-full border border-[#355E3B] px-5 py-2 text-sm font-semibold text-[#355E3B] hover:bg-[#355E3B] hover:text-white"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}