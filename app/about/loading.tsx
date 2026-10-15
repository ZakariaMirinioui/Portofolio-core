export default function Loading() {
  return (
    <main className="relative lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6" aria-busy="true" aria-label="Loading about page">
      <div className="animate-pulse relative grid lg:grid-cols-custom grid-cols-1 gap-x-6 justify-items-center">
        <div className="order-2 lg:order-none w-full">
          <div className="h-12 w-3/4 rounded-lg dark:bg-zinc-800 bg-zinc-200 mb-8" />
          <div className="h-4 w-full rounded dark:bg-zinc-800 bg-zinc-200 mb-2" />
          <div className="h-4 w-full rounded dark:bg-zinc-800 bg-zinc-200 mb-2" />
          <div className="h-4 w-2/3 rounded dark:bg-zinc-800 bg-zinc-200" />
        </div>
        <div className="w-full max-w-[400px]">
          <div className="h-96 w-full rounded-2xl dark:bg-zinc-800 bg-zinc-200 mb-4" />
          <div className="h-10 w-full rounded-md dark:bg-zinc-800 bg-zinc-200" />
        </div>
      </div>
    </main>
  );
}
