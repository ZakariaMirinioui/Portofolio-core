export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20" aria-busy="true" aria-label="Loading page">
      <div className="animate-pulse">
        <div className="h-12 w-2/3 rounded-lg dark:bg-zinc-800 bg-zinc-200 mb-6" />
        <div className="h-4 w-full rounded dark:bg-zinc-800 bg-zinc-200 mb-2" />
        <div className="h-4 w-5/6 rounded dark:bg-zinc-800 bg-zinc-200 mb-12" />
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-4"
            >
              <div className="h-10 w-10 rounded-md dark:bg-zinc-800 bg-zinc-200 mb-3" />
              <div className="h-5 w-1/2 rounded dark:bg-zinc-800 bg-zinc-200 mb-2" />
              <div className="h-3 w-full rounded dark:bg-zinc-800 bg-zinc-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
