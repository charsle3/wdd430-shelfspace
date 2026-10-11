'use client';
import Link from "next/link";
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
  
export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <section className="flex min-h-[700px] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm md:p-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#A2674A]">
            Welcome back
          </p>

          <h1 className="mt-3 text-4xl text-[#24452A]">
            Continue your story
          </h1>

          <p className="mt-3 text-gray-500">
            Sign in to access your personal library.
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="userName"
              className="mb-2 block text-sm font-semibold text-[#2B2B2B]"
            >
              Username
            </label>

            <input
              id="userName"
              type="text"
              placeholder="Your username"
              name="name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#355E3B] focus:ring-2 focus:ring-[#355E3B]/10"
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
              placeholder="••••••••"
              name="password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#355E3B] focus:ring-2 focus:ring-[#355E3B]/10"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#355E3B] py-3 font-semibold text-white hover:bg-[#24452A]"
          >
            Sign In
          </button>
          {errorMessage && <p role="alert">{errorMessage}</p>}
        </form>

        <p className="mt-7 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#355E3B] hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}