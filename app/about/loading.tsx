export default function Loading() {
  return (
    <main
      className="relative lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6 lg:mt-20 mt-12"
      aria-busy="true"
      aria-label="Loading about page"
    >
      <div className="animate-pulse relative grid gap-y-12 lg:gap-x-10 lg:grid-cols-[1.55fr_1fr]">
        <div className="space-y-8">
          <div className="h-10 w-3/4 rounded-lg dark:bg-zinc-800 bg-zinc-200 mb-4" />
          <div className="h-4 w-full rounded dark:bg-zinc-800 bg-zinc-200 mb-2" />
          <div className="h-4 w-1/2 rounded dark:bg-zinc-800 bg-zinc-200 mb-8" />
          <div className="h-4 w-full rounded dark:bg-zinc-800 bg-zinc-200 mb-2" />
          <div className="h-4 w-1/3 rounded dark:bg-zinc-800 bg-zinc-200 mb-8" />
          <div className="h-32 w-full rounded-xl dark:bg-zinc-800 bg-zinc-200 mb-6" />
          <div className="h-10 w-full rounded-md dark:bg-zinc-800 bg-zinc-200" />
        </div>
        <aside className="w-full max-w-[260px] mx-auto space-y-6">
          <div className="h-48 w-full rounded-xl dark:bg-zinc-800 bg-zinc-200 mb-4" />
          <div className="h-6 w-3/4 rounded dark:bg-zinc-800 bg-zinc-200 mb-2" />
          <div className="h-4 w-full rounded dark:bg-zinc-800 bg-zinc-200 mb-2" />
          <div className="h-4 w-1/2 rounded dark:bg-zinc-800 bg-zinc-200" />
        </aside>
      </div>
    </main>
  );
}
