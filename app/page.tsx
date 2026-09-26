import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <span className="mb-5 inline-block rounded-full bg-[#D8C7A3]/50 px-4 py-2 text-sm font-medium text-[#24452A]">
            Your personal reading companion
          </span>

          <h1 className="max-w-xl text-5xl leading-tight font-semibold text-[#24452A] md:text-6xl">
            Make space for the books you love.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            Organize your personal library, track your reading progress, and
            remember every story that mattered.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-[#355E3B] px-7 py-3 font-semibold text-white hover:bg-[#24452A]"
            >
              Start your library
            </Link>

            <Link
              href="/library"
              className="rounded-full border border-[#355E3B] px-7 py-3 font-semibold text-[#355E3B] hover:bg-[#355E3B]/5"
            >
              Explore library
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="h-[440px] w-[320px] rotate-3 rounded-[2rem] bg-[#355E3B] p-7 shadow-2xl">
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/30 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#D8C7A3]">
                  Currently reading
                </p>

                <h2 className="mt-8 text-4xl leading-tight text-white">
                  The Midnight Library
                </h2>

                <p className="mt-3 text-white/70">Matt Haig</p>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm text-white/80">
                  <span>Progress</span>
                  <span>64%</span>
                </div>

                <div className="h-2 rounded-full bg-white/20">
                  <div className="h-2 w-[64%] rounded-full bg-[#D8C7A3]" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-3 hidden rounded-2xl bg-white p-5 shadow-xl md:block">
            <p className="text-3xl font-semibold text-[#355E3B]">12</p>
            <p className="text-sm text-gray-500">Books completed</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="font-semibold text-[#A2674A]">
              Everything in one place
            </p>

            <h2 className="mt-2 text-4xl text-[#24452A]">
              Your reading life, organized
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Build your library",
                description:
                  "Save books you want to read and keep your collection organized.",
              },
              {
                title: "Track your progress",
                description:
                  "Record how far you are into each book and continue exactly where you left off.",
              },
              {
                title: "Remember your thoughts",
                description:
                  "Rate completed books and keep your personal reviews together.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-[#D8C7A3]/40 bg-[#F7F4ED] p-8"
              >
                <div className="mb-6 h-11 w-11 rounded-xl bg-[#355E3B]" />

                <h3 className="text-2xl text-[#24452A]">{feature.title}</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}