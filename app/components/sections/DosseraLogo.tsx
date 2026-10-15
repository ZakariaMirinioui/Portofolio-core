export default function DosseraLogo({ heightClassName = "h-8" }: { heightClassName?: string }) {
  return (
    <span
      className="grid shrink-0 items-center overflow-hidden rounded-md"
      role="img"
      aria-label="Dossera JAMS logo"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dossera-lightmode.png"
        alt=""
        aria-hidden="true"
        className={`col-start-1 row-start-1 w-auto opacity-100 transition-opacity duration-300 dark:opacity-0 ${heightClassName}`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dossera-darkmode.png"
        alt=""
        aria-hidden="true"
        className={`col-start-1 row-start-1 w-auto opacity-0 transition-opacity duration-300 dark:opacity-100 ${heightClassName}`}
      />
    </span>
  );
}
