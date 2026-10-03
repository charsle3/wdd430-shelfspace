export default function ProfilePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="rounded-3xl bg-[#355E3B] p-8 text-white md:p-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#D8C7A3] text-3xl font-semibold text-[#24452A]">
            A
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-[#D8C7A3]">
              Reader profile
            </p>

            <h1 className="mt-2 text-4xl">Andrea Ramos</h1>

            <p className="mt-2 text-white/70">
              Building a library one story at a time.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <StatCard label="Books Read" value="12" />
        <StatCard label="Currently Reading" value="3" />
        <StatCard label="Reviews Written" value="9" />
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl bg-white p-8">
          <h2 className="text-3xl text-[#24452A]">Reading activity</h2>

          <div className="mt-8 space-y-6">
            <ActivityRow
              title="The Midnight Library"
              text="64% completed"
            />
            <ActivityRow title="1984" text="Finished reading" />
            <ActivityRow title="Circe" text="Started reading" />
          </div>
        </div>

        <div className="rounded-3xl bg-[#D8C7A3]/30 p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#A2674A]">
            2026 Goal
          </p>

          <p className="mt-5 text-5xl font-semibold text-[#24452A]">
            12 / 24
          </p>

          <p className="mt-2 text-gray-500">books completed</p>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white">
            <div className="h-full w-1/2 rounded-full bg-[#355E3B]" />
          </div>
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-7 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-4xl font-semibold text-[#24452A]">{value}</p>
    </div>
  );
}

interface ActivityRowProps {
  title: string;
  text: string;
}

function ActivityRow({ title, text }: ActivityRowProps) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
      <div className="h-14 w-10 rounded bg-[#355E3B]" />

      <div>
        <p className="font-semibold text-[#24452A]">{title}</p>
        <p className="text-sm text-gray-500">{text}</p>
      </div>
    </div>
  );
}