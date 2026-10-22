export default function DosseraLogo({ heightClassName = "h-8" }: { heightClassName?: string }) {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded-lg border border-zinc-200 bg-white px-3 py-2">
      <img
        src="/dossera-lightmode.png"
        alt="Dossera JAMS"
        aria-hidden="true"
        className={`w-auto ${heightClassName}`}
      />
    </div>
  );
}