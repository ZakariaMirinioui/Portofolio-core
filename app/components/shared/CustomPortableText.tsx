import { BiLinkExternal, BiSolidQuoteRight } from "react-icons/bi";
import PortableImage from "./PortableImage";
import CodeBlock from "./CodeBlock";
import HashScroll from "./HashScroll";
import getYoutubeId from "@/app/utils/get-youtubeId";
import YoutubeIframe from "./YoutubeIframe";
import RefLink from "./RefLink";

type PortableTextBlock = {
  _type: string;
  _key?: string;
  children?: PortableTextBlock[];
  [key: string]: unknown;
};

export const CustomPortableText = {
  types: {
    image: PortableImage,
    code: CodeBlock,
    youtube: ({ value }: { value: { url: string } }) => {
      const id = getYoutubeId(value.url);
      return <YoutubeIframe videoId={id} />;
    },
  },

  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mt-2 mb-6">{children}</p>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2
        id={String(children)
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="font-incognito before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl block before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400 relative font-bold tracking-tight dark:text-zinc-100 lg:text-4xl text-3xl text-zinc-700 my-8"
      >
        <HashScroll text={children} />
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3
        id={String(children)
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="font-incognito before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400 relative block lg:font-bold font-semibold tracking-tight lg:text-3xl text-2xl dark:text-zinc-100 text-zinc-700 my-6"
      >
        <HashScroll text={children} />
      </h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4
        id={String(children)
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="font-incognito before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-6 before:-left-4 lg:before:text-2xl before:text-xl before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400 relative inline-block font-semibold tracking-tight text-xl dark:text-zinc-100 text-zinc-700 mb-2 mt-4"
      >
        <HashScroll text={children} />
      </h4>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="relative overflow-hidden tracking-tight text-lg my-8 lg:py-6 lg:pl-6 pr-12 p-4 border dark:border-zinc-800 border-zinc-200 rounded-md">
        <BiSolidQuoteRight
          className="text-7xl absolute -top-7 -right-5 -rotate-12 dark:text-zinc-800 text-zinc-200"
          aria-hidden="true"
        />
        {children}
      </blockquote>
    ),
  },
  marks: {
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="font-incognito font-medium italic">{children}</em>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold dark:text-zinc-300 text-zinc-700">
        {children}
      </strong>
    ),
    link: ({ children, value }: { children: React.ReactNode; value?: { href: string } }) => {
      return (
        <RefLink
          href={value?.href ?? ""}
          className="dark:text-blue-400 text-blue-500 hover:underline"
        >
          {children} <BiLinkExternal className="inline" aria-hidden="true" />
        </RefLink>
      );
    },
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="font-incognito py-[0.15rem] px-1 rounded-sm font-medium dark:bg-primary-bg bg-secondary-bg dark:text-zinc-200 text-pink-500">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-[square] mt-5 ml-5">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal mt-5 ml-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => <li className="mb-4">{children}</li>,
    number: ({ children }: { children: React.ReactNode }) => <li className="mb-4">{children}</li>,
  },
};

export type { PortableTextBlock };