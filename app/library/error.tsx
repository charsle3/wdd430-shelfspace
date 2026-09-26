"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[600px] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#B44C4C]/10 text-2xl text-[#B44C4C]">
          !
        </div>

        <h2 className="mt-6 text-3xl text-[#24452A]">
          We couldn&apos;t load your library
        </h2>

        <p className="mt-3 text-gray-500">
          Something went wrong while retrieving your books.
        </p>

        <button
          onClick={() => reset()}
          className="mt-7 rounded-full bg-[#355E3B] px-6 py-3 font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </section>
  );
}