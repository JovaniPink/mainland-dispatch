import { pageMetadata } from "@/lib/seo";
import { correctionUrl } from "@/lib/corrections";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Mainland Dispatch's editor, purpose, source practice, and correction process.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-serif text-4xl">About Mainland Dispatch</h1>
      <div className="mt-6 max-w-[70ch] space-y-6 font-serif text-lg leading-[1.65]">
        <p>
          Jovani Pink edits Mainland Dispatch, a public research notebook on
          contemporary China and the U.S.–China relationship.
        </p>
        <p>
          The notebook helps curious readers examine consequential arguments
          through sources, competing interpretations, and unresolved questions.
          It publishes at an irregular cadence as inquiries become ready.
        </p>
        <p>
          These inquiries are editorial interpretations of existing public
          records and reporting. External reporting remains attributed to its
          original publishers and authors; editing a notebook does not make that
          reporting our own.
        </p>
        <h2 className="font-serif text-2xl">How sources are reviewed</h2>
        <p>
          Each inquiry identifies the records it uses, their dates, the claims
          they support, and their limits. Official statements, reported
          observations, analysis, forecasts, and unresolved claims are
          distinguished. Publication and evidence-review dates stay separate
          from later copy or layout updates. Source review does not remove
          uncertainty or guarantee that a record remains current.
        </p>
        <h2 className="font-serif text-2xl">Corrections</h2>
        <p>
          Point to the article URL and disputed passage, propose a correction,
          and include supporting sources. The editor reviews the evidence
          against the publication&apos;s stated boundary. Accepted substantive
          corrections are explained in the article&apos;s revision record; a
          submission does not itself change the article.
        </p>
        <p>
          <a
            className="text-signal underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
            href={correctionUrl()}
          >
            Suggest a correction on GitHub
          </a>
          . Submissions are public and require a GitHub account. The link opens
          a form for you to review and submit.
        </p>
      </div>
    </article>
  );
}
