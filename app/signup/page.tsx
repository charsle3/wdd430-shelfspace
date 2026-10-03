import Link from "next/link";

export default function SignupPage() {
  return (
    <section className="flex min-h-[700px] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm md:p-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#A2674A]">
            Join ShelfSpace
          </p>

          <h1 className="mt-3 text-4xl text-[#24452A]">
            Start your library
          </h1>

          <p className="mt-3 text-gray-500">
            Create an account and start tracking your reading.
          </p>
        </div>

        <form className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold">
              Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#355E3B]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#355E3B]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#355E3B]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#355E3B] py-3 font-semibold text-white hover:bg-[#24452A]"
          >
            Create Account
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#355E3B] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}