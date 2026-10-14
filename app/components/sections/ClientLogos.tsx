import { clientsQuery } from "@/lib/sanity.query";
import type { ClientType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import { Slide } from "../../animation/Slide";
import Image from "next/image";

export default async function ClientLogos({ featuredOnly = true, title = "Trusted by Leading Institutions" }: { featuredOnly?: boolean; title?: string }) {
  const clients: ClientType[] = await sanityFetch({
    query: clientsQuery,
    tags: ["client"],
  });

  if (!clients || clients.length === 0) return null;

  const displayClients = featuredOnly
    ? clients.filter(c => c.projects && c.projects.length > 0)
    : clients;

  if (displayClients.length === 0) return null;

  return (
    <section className="mb-16">
      <Slide delay={0.1}>
        <h2 className="text-sm font-incognito font-semibold uppercase tracking-wider dark:text-zinc-300 text-zinc-700 mb-8 text-center">
          {title}
        </h2>
        <div className="overflow-hidden">
          <div className="flex animate-scroll-x gap-8 md:gap-16 px-4">
            {displayClients.map((client) => (
              <div key={client._id} className="flex-shrink-0 flex items-center">
                {client.logo?.image ? (
                  <Image
                    src={client.logo.image}
                    width={120}
                    height={60}
                    alt={client.displayName}
                    className="object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <div className="px-6 py-3 dark:bg-zinc-800/50 bg-zinc-100/50 rounded-lg border dark:border-zinc-700 border-zinc-200 text-sm font-medium dark:text-zinc-400 text-zinc-600 min-w-[140px] text-center">
                    {client.displayName}
                  </div>
                )}
              </div>
            ))}
            {/* Duplicate for seamless infinite scroll */}
            {displayClients.map((client) => (
              <div key={`${client._id}-dup`} className="flex-shrink-0 flex items-center">
                {client.logo?.image ? (
                  <Image
                    src={client.logo.image}
                    width={120}
                    height={60}
                    alt={client.displayName}
                    className="object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <div className="px-6 py-3 dark:bg-zinc-800/50 bg-zinc-100/50 rounded-lg border dark:border-zinc-700 border-zinc-200 text-sm font-medium dark:text-zinc-400 text-zinc-600 min-w-[140px] text-center">
                    {client.displayName}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Slide>
    </section>
  );
}