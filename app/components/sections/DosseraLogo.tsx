export default function DosseraLogo({ heightClassName = "h-8" }: { heightClassName?: string }) {
  return (
    <div className="flex items-center overflow-hidden">
      <img
        src="/dossera-lightmode.png"
        alt="Dossera JAMS"
        aria-hidden="true"
        className={`w-auto opacity-100 transition-opacity duration-300 dark:opacity-0 ${heightClassName}`}
      />
      <img
        src="/dossera-darkmode.png"
        alt="Dossera JAMS"
        aria-hidden="true"
        className={`w-auto opacity-0 transition-opacity duration-300 dark:opacity-100 ${heightClassName}`}
      />
    </div>
  );
}