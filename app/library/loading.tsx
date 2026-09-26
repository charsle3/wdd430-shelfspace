export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="h-12 w-64 animate-pulse rounded-xl bg-gray-200" />

      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-3xl bg-white shadow-sm"
          >
            <div className="h-64 animate-pulse bg-gray-200" />

            <div className="space-y-4 p-6">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}