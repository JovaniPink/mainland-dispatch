import { NotebookDraftSchema } from "./draft-schema";

const report = "notebook-source-anthropic-september";
const advisory = "notebook-source-cisa-distillation";
const response = "notebook-source-mfa-response";
const november = "notebook-source-anthropic-november";
const scrutiny = "notebook-source-november-scrutiny";
const controls = "notebook-source-model-access";
const evaluation = "notebook-source-weapons-evaluation";
const podcast = "notebook-source-hudson-description";

const paragraph = (
  text: string,
  sourceIds = [report],
  claimIds = ["audit-access"]
) => ({ text, sourceIds, claimIds });

const paragraphAt = (sectionId: string, paragraph: number) => ({
  kind: "paragraph" as const,
  sectionId,
  paragraph,
});

const caseAt = (
  caseId: string,
  field: "label" | "activity" | "attribution" | "outcome"
) => ({ kind: "case" as const, caseId, field });

export const whoControlsTheModel = NotebookDraftSchema.parse({
  ordinal: 11,
  slug: "who-controls-the-model",
  title: "Who Controls the Model?",
  subtitle:
    "A provider's allegations expose the contest over access, observation, and enforcement.",
  thesis:
    "Frontier-model access can be both a source of capability and a point of dependence. Anthropic's September report makes that tension visible, but does not by itself establish military deployment, independently verified attribution, or the effectiveness of a new control regime.",
  editorialStatus: "draft",
  reviewState: "editorial-review",
  draftUpdatedAt: "2026-09-15",
  evidenceCutoff: "2026-09-15",
  tags: ["China", "Artificial intelligence", "Chokepoints", "Evidence"],
  sections: [
    {
      id: "access-and-rerouting",
      eyebrow: "01 / The dependency",
      title: "Access comes with an observer",
      paragraphs: [
        paragraph(
          "A customer asks one company's AI a question. According to Anthropic, the request sometimes travels somewhere the customer did not expect: to Claude. The answer returns through the first company's service, while the underlying exchange becomes visible to a second provider. That is the most revealing allegation in Anthropic's September threat report. Access is not simply borrowed intelligence. It is a relationship with an operator that can observe activity, identify patterns, and withdraw service. The same connection that supplies capability can expose the customer using it."
        ),
        paragraph(
          "Anthropic alleges that Moonshot and DeepSeek relayed live customer requests to Claude and presented responses through their own products. It reports nearly 300,000 Moonshot customer requests in one ten-day period. This is an allegation grounded in the provider's account of its telemetry, not an independently audited reconstruction of either company's infrastructure. The distinction matters: a reader can examine what Anthropic says it observed without treating the provider's explanation of every intermediary, account, and customer relationship as settled fact."
        ),
        paragraph(
          "The alleged exposure creates two separate questions. First, did a product obtain answers from a service its users had not knowingly chosen? Second, did those requests contain material that users expected to remain within a different organizational or national boundary? Anthropic describes sensitive material among relayed requests. That description raises a privacy and governance question; it does not establish a legal violation in every jurisdiction. Resolving that would require the applicable notices, contracts, processing arrangements, and law, not simply the nationality of the firms involved."
        ),
        paragraph(
          "For Mainland Dispatch, the chokepoint is therefore narrower and more interesting than a claim that one country possesses intelligence and another does not. A chokepoint exists where an actor depends on a connection that someone else can condition or sever. Here the connection may carry prompts, answers, account signals, and enforcement decisions. Dependence could be temporary, selective, or replaceable. The report does not measure how readily an affected actor could substitute another model. Without that counterfactual, access leverage is a hypothesis about the relationship, not a demonstrated monopoly."
        ),
        paragraph(
          "The September 15 China Insider episode brought this story into our research queue. Its verified description identifies Chinese actors in Anthropic's report as a topic. We have not audited the audio, so no spoken argument or quotation is attributed to its hosts here. Our anchor is the September report itself, distinct from Anthropic's narrower November 2025 cyber-espionage disclosure. The question for this notebook is not whether a podcast's warning was dramatic enough. It is what the available records allow us to infer about who supplies capability, who sees its use, and who can interrupt it.",
          [report, podcast],
          ["audit-access", "audit-podcast"]
        ),
      ],
    },
    {
      id: "distillation-and-measurement",
      eyebrow: "02 / The denominator",
      title: "Count the exchanges, not an imagined capability gain",
      paragraphs: [
        paragraph(
          "Distillation is not inherently an illicit activity. It can describe training one model using another model's outputs, with or without authorization. Anthropic's allegation concerns unauthorized extraction and deceptive access, not the proposition that all learning from another system is prohibited. That distinction is also important when reading the September 8 joint NSA, CISA, and FBI advisory. A technical method, a contractual restriction, and a national-security claim occupy different categories. They may overlap in a particular case, but none automatically establishes the others.",
          [report, advisory],
          ["audit-counts", "audit-advisory"]
        ),
        paragraph(
          "The figures in the supplied research brief cannot responsibly be compressed into one comparable total. Anthropic gives Alibaba more than 151 million exchanges and Moonshot more than 23 million during May through July 2026. It gives DeepSeek more than 12.1 million over fourteen days in July, Zhipu more than 3.4 million over seventeen days in June and July, and Xiaomi more than 400,000 over twenty days in March and April. These are different windows, not a common measurement period for all seven laboratories discussed. The draft therefore omits the proposed aggregate and growth multiplier.",
          [report],
          ["audit-counts"]
        ),
        paragraph(
          "Even a reconciled count would answer a limited question. Exchanges are not unique users, tokens, training examples, or successful transfers of capability. A relayed customer request may produce an immediate answer and might also become training material; those are different uses of the same interaction. Summing categories without knowing their overlap risks counting one flow twice. A peak daily rate also cannot be substituted for a sustained average. These distinctions do not make large-scale extraction unimportant. They determine what its scale actually describes.",
          [report],
          ["audit-counts"]
        ),
        paragraph(
          "The government advisory describes a different population: campaigns involving six named China-based companies against US AI providers, extending back to at least late 2024. It discusses tokens and exchanges across that broader setting. It is an original government assessment, not a second public audit of each case in Anthropic's September report. Its list, time span, and evidentiary access differ. Counting the two publications as independent confirmation of every numerical claim would manufacture corroboration from proximity. The right comparison preserves their boundaries before asking where their findings genuinely converge.",
          [report, advisory],
          ["audit-advisory"]
        ),
        paragraph(
          "For the access argument, the decisive measurement would be what those exchanges enabled. Did they reduce training cost, improve performance on independently chosen tests, substitute for unavailable expertise, or sustain a commercial service that could not otherwise meet demand? The reviewed material does not supply an independent answer for each laboratory. Volume is evidence of the provider's assessed activity, not a direct measure of strategic advantage. A strong follow-up would publish consistent windows, explain account clustering and duplicate treatment, and connect inputs to evaluated outputs. Until then, large numbers should orient inquiry rather than close it.",
          [report, advisory],
          ["audit-counts"]
        ),
      ],
    },
    {
      id: "military-and-surveillance",
      eyebrow: "03 / The case boundary",
      title: "A proposal is not a deployed weapon",
      paragraphs: [
        paragraph(
          "The military cases require an evidentiary ladder. A requested document is not a finished system. Software that runs is not necessarily validated against hardware. A simulation is not an operational plan, and an operational plan is not deployment. Anthropic's report describes activity at several of these levels, but the supplied briefs sometimes collapse them. That compression produces a more alarming story and a less defensible one. The proper analytical question is where assistance entered an existing workflow and what outcome the record actually demonstrates.",
          [report],
          ["audit-weapons"]
        ),
        paragraph(
          "In GTG-17001, Anthropic assesses a connection to a Chinese defense-industry manufacturer seeking a PLA Navy contract. It describes assistance with an anti-torpedo proposal running beyond 200 pages. The company says it could not attribute the activity to a specific entity or actor. That supports an attributed account of proposal development, not a finding that the Navy procured, accepted, or deployed the proposed system. The institutional ambition of a customer and the institutional adoption of its product are not interchangeable.",
          [report],
          ["audit-weapons"]
        ),
        paragraph(
          "GTG-17002 concerns electronic-warfare and air-defense-suppression software. Anthropic describes roughly sixteen modules, repeated revisions, and a simulation incorporating twelve Taiwan targets. Its assessment connects account metadata and content to PRC research institutions, including the PLA Academy of Military Sciences. Those are meaningful attribution claims, but the reviewed record does not independently establish who commissioned the work or whether it became usable military capability. This notebook does not reproduce a target list or operational particulars. A named geography in a simulation does not demonstrate preparations for an invasion.",
          [report],
          ["audit-weapons"]
        ),
        paragraph(
          "A further China-linked case concerns research into directed-energy weapons and briefings intended for senior officials. The distinction between open-source collection and classified information is essential: producing a restricted-looking briefing does not establish access to classified weapons knowledge. Anthropic also says the weapons actors already possessed relevant expertise and access to the hardware they were discussing. Its companion capability evaluation addresses controlled tasks, not observed deployment by those actors. Together these records justify investigating acceleration, while leaving the size and operational significance of that acceleration unresolved.",
          [report, evaluation],
          ["audit-weapons"]
        ),
        paragraph(
          "Surveillance has a different harm pathway. A useful dossier or monitoring workflow may matter without becoming a weapon or satisfying a military performance test. Yet attribution still needs discipline. The Uyghur-Syria case carries a low-confidence assessment concerning a contractor for PRC security rather than a directly identified state organ. Separately, the report's statement about identifying activity at a pilot stage, with no evidence of later stages against real targets before a ban, belongs to the S2T surveillance chain. It must not be transferred to the Uyghur case. Nor should the Hunan cyber cluster become a state operation merely because its operators were Chinese-speaking and located in China.",
          [report],
          ["audit-surveillance", "audit-cyber"]
        ),
      ],
    },
    {
      id: "attribution-and-scrutiny",
      eyebrow: "04 / The observer's limits",
      title: "Visibility is evidence, not omniscience",
      paragraphs: [
        paragraph(
          "Anthropic has an unusually useful vantage point: the interactions passing through its service. It also has commercial, policy, and reputational interests in how those interactions are interpreted. Both facts belong in the analysis. An interested source can hold important evidence; important evidence does not eliminate the need to test an interested source's claims. Dismissing the report as marketing would evade the records. Treating it as an adjudicated finding would evade the source's limits. The task is to identify which conclusions its observation can support and which require evidence from elsewhere.",
          [report],
          ["audit-attribution"]
        ),
        paragraph(
          "Account metadata, language, network patterns, and requested content can support an assessment, but each has alternative explanations. A relationship to a research institution does not automatically identify a military command chain. A customer may misrepresent an affiliation or work for a contractor serving several clients. These possibilities are not findings that Anthropic is wrong. They explain why confidence language must remain attached to the specific inference it qualifies. The reader should not have to reconstruct that distinction from a caveat several pages after a declarative headline.",
          [report],
          ["audit-attribution"]
        ),
        paragraph(
          "The public Chinese government response is narrower than the detailed rebuttal an investigator would want. At the September 11 foreign-ministry briefing, Mao Ning said she was unfamiliar with the specifics, reiterated support for beneficial AI, and rejected smears and distortion. The question addressed surveillance allegations in the report. This is a verified official response, available in the ministry's English version; it neither concedes the conduct nor supplies a case-by-case technical rebuttal. No detailed company response has been established in this draft's reviewed source set. That is a research limitation, not proof that no response exists.",
          [response],
          ["audit-response"]
        ),
        paragraph(
          "Historical criticism also needs a date label. BleepingComputer's November 2025 reporting describes researchers questioning the earlier GTG-1002 disclosure, including its autonomy claims and lack of actionable indicators. Those objections belong to that disclosure. September's report includes downloadable indicators and a broader case presentation; it should be assessed on that record. Publishing indicators improves the opportunity for scrutiny, but does not independently validate every attribution or establish how much work a model performed without human judgment. Neither the old criticism nor the newer disclosure is a universal verdict.",
          [november, scrutiny, report],
          ["audit-scrutiny"]
        ),
        paragraph(
          "The most productive independent review would separate occurrence, identity, and contribution. Did the described interaction take place? Who was responsible for it? How much did the model change the result compared with available alternatives? These questions need different evidence, from redacted artifacts to attribution analysis to comparative testing. Anthropic reports banning accounts and disrupting activity. That is an attributed account of enforcement, not independent proof that the underlying project stopped or could not resume elsewhere. A ban closes a provider relationship. It does not necessarily close an operation.",
          [report],
          ["audit-attribution", "audit-enforcement"]
        ),
      ],
    },
    {
      id: "hardware-and-access",
      eyebrow: "05 / Different control surfaces",
      title: "Chips and access are not competing explanations",
      paragraphs: [
        paragraph(
          "Hardware controls and model-access controls act at different points. Restrictions on advanced chips concern resources used to train and run systems. Access restrictions concern who can use a service, which capabilities they can request, and under what conditions. Extracting answers through an interface does not move a physical chip across a border, but it still relies on computation. The supplied assertion that chip controls do nothing is therefore too categorical. The relevant policy question is how the mechanisms interact, not which one renders the other meaningless.",
          [report, advisory],
          ["audit-controls"]
        ),
        paragraph(
          "A service boundary can offer a faster intervention point than a hardware supply chain: an operator may identify an account and restrict it. But effectiveness depends on detection, attribution, substitute services, and the cost imposed on legitimate users. The government advisory recommends provider-side detection and response measures. It does not establish that those measures eliminate unauthorized extraction. An enforcement tool can be consequential while imperfect. Calling it a chokepoint should invite measurement of the dependency it exploits, rather than imply that a switch controls all relevant capability.",
          [advisory, report],
          ["audit-controls", "audit-enforcement"]
        ),
        paragraph(
          "There is already a provider account of a broader access intervention. Anthropic's June 30 announcement says the US government applied export controls to Fable 5 and Mythos 5 on June 12, followed by a lifting of controls on June 30; the page carries a July 1 restoration update. The company describes an initial service suspension because it could not reliably verify nationality in real time. This is useful evidence of Anthropic's reported experience, not a substitute for the underlying government directive. The draft does not claim to have reviewed that directive or adjudicated its legal scope.",
          [controls],
          ["audit-controls"]
        ),
        paragraph(
          "That episode illustrates a policy tradeoff more concrete than a general call for tighter restrictions. If access decisions depend on attributes a service cannot reliably determine, a targeted restriction may become a broad interruption. If screening is weak, prohibited activity may continue. If screening is expansive, legitimate activity may be affected. Those are analytical possibilities, not measured error rates in this report. The necessary evidence would include how many users were affected, why, how errors were corrected, and whether the intervention changed the activity it was intended to constrain.",
          [controls, advisory],
          ["audit-controls"]
        ),
        paragraph(
          "Nor is private enforcement equivalent to public export law. A provider can act under its service rules; a government must rely on its own legal authority and process. Congressional statements and proposed rules would add policy context only after their original records are checked. This draft therefore leaves the supplied testimony and quotation claims out. The durable insight does not require them: the intermediary relationship can concentrate information and enforcement capacity in a provider, while public authorities may seek to govern that capacity. Whether this produces security, dependency, overreach, or all three remains an empirical question.",
          [controls, advisory],
          ["audit-controls"]
        ),
      ],
    },
    {
      id: "what-would-change",
      eyebrow: "06 / The next evidence",
      title: "What would change this reading?",
      paragraphs: [
        paragraph(
          "First, independent corroboration could strengthen or narrow particular attributions. A credible review would explain what evidence connects an account cluster to an institution, what alternative explanations were considered, and which claims remain low confidence. It need not publish personal data or operationally sensitive material to be useful. A carefully bounded examination by qualified reviewers could test more than a press summary can. Conversely, a documented account compromise, mistaken organizational link, or misclassified request would require a visible correction to the relevant case, not a silent adjustment to the story.",
          [report],
          ["audit-attribution"]
        ),
        paragraph(
          "Second, outcome evidence could move a case up or down the ladder. A proposal accepted into procurement would establish something different from a proposal merely generated. Independent software validation would establish something different from plausible-looking code. Evidence of deployment would matter more than simulation geography. Negative findings matter too: abandoned work, unusable outputs, or extensive human repair could reduce an asserted contribution. The report's warnings should not be converted into irreversible capability gains before those intermediate steps are examined. A model's fluency is not the same measurement as a system's performance.",
          [report, evaluation],
          ["audit-weapons"]
        ),
        paragraph(
          "Third, a consistent distillation audit could clarify the economic stakes. The useful comparison would hold the measurement window and population steady, explain the overlap between relaying and extraction, and connect collected material to model performance or service delivery. It would also identify what cannot be inferred. An actor might seek outputs unsuccessfully, use them immediately without training, or combine them with other inputs. Those pathways have different implications for dependence. The amount of traffic alone cannot tell us whether access was a temporary convenience or an essential productive input.",
          [report, advisory],
          ["audit-counts"]
        ),
        paragraph(
          "Fourth, enforceable public records would sharpen the policy analysis. An original directive, a documented enforcement action, or a fully specified legislative proposal could establish authority, scope, dates, exceptions, and obligations. A provider's policy position cannot do that work by itself. We would also look for substantiated responses from the named companies and institutions, not only broad diplomatic language. This draft includes the available ministry response and keeps the remaining response search open. Later developments must enter as dated updates rather than being retroactively treated as evidence available on September 15.",
          [response, controls, advisory],
          ["audit-response", "audit-controls"]
        ),
        paragraph(
          "For now, the strongest conclusion is conditional but substantive. Anthropic describes actors seeking capability through a service whose operator could observe their requests and report taking action against them. That relationship joins access to exposure. It gives the chokepoint argument a concrete mechanism without proving that access controls are sufficient, that every institutional attribution is correct, or that AI assistance became deployed military power. Who controls the model is only the opening question. Who controls the route to it, what the route reveals, and what happens when access is withdrawn are the questions this evidence now makes worth pursuing.",
          [report],
          ["audit-access", "audit-enforcement"]
        ),
      ],
    },
  ],
  sourceTrail: [
    [
      report,
      "Primary provider disclosure",
      "Countering misuse of AI: September 2026",
      "Anthropic",
      "2026-09-10",
      "https://www.anthropic.com/threat-intelligence-report-september-2026",
      "Case descriptions, measurements, attribution language, and reported enforcement.",
      "Provider-selected cases and telemetry; no independent audit of every claim. HTML reviewed; downloadable PDF not fully audited.",
    ],
    [
      advisory,
      "Government assessment",
      "China-Based Artificial Intelligence Companies Conducting Industrial-Scale Distillation Campaigns Against U.S. AI Companies",
      "NSA / CISA / FBI",
      "2026-09-08",
      "https://www.cisa.gov/news-events/cybersecurity-advisories/aa26-251a",
      "Separate government assessment of distillation campaigns and provider responses.",
      "Different population and period from Anthropic's casebook; not case-by-case corroboration.",
    ],
    [
      response,
      "Official response",
      "Mao Ning's Regular Press Conference on September 11, 2026",
      "Ministry of Foreign Affairs of the PRC",
      "2026-09-11",
      "https://www.fmprc.gov.cn/mfa_eng/xw/fyrbt/202609/t20260911_12020880.html",
      "Official English version of the response to surveillance allegations.",
      "General response, not a technical rebuttal; Chinese-language counterpart not audited.",
    ],
    [
      november,
      "Earlier provider disclosure",
      "Disrupting the first reported AI-orchestrated cyber espionage campaign",
      "Anthropic",
      "2025-11-13",
      "https://www.anthropic.com/news/disrupting-AI-espionage",
      "Earlier GTG-1002 disclosure, distinct from September cases.",
      "Provider attribution and autonomy estimates, not independently established outcomes.",
    ],
    [
      scrutiny,
      "Historical reporting",
      "Anthropic claims of Claude AI automated cyberattacks met with doubt",
      "BleepingComputer",
      "2025-11-14",
      "https://www.bleepingcomputer.com/news/security/anthropic-claims-of-claude-ai-automated-cyberattacks-met-with-doubt/",
      "Records contemporary criticism of the November disclosure.",
      "Secondary reporting about earlier criticism; not an evaluation of September 2026.",
    ],
    [
      controls,
      "Provider account of restrictions",
      "Redeploying Fable 5",
      "Anthropic",
      "2026-06-30",
      "https://www.anthropic.com/news/redeploying-fable-5",
      "Company timeline, with July 1 update, of restriction and restoration.",
      "Underlying government directive not reviewed; do not infer legal scope solely from company account.",
    ],
    [
      evaluation,
      "Companion evaluation",
      "Measuring tactical intelligence targeting and conventional weapons capabilities of AI models",
      "Anthropic",
      "2026-09-10",
      "https://www.anthropic.com/research/intelligence-targeting-conventional-weapons-capabilities",
      "Controlled capability evaluations, separate from observed misuse cases.",
      "Provider evaluation is not evidence of deployment by a particular actor.",
    ],
    [
      podcast,
      "Discovery context",
      "Chinese Actors Cited in Anthropic's Threat Report",
      "Hudson Institute / China Insider",
      "2026-09-15",
      "https://www.hudson.org/foreign-policy/chinese-actors-cited-anthropics-threat-report-xi-jinping-brics-summit-chinese-miles-yu-colin-tessier-kay",
      "Episode description identifies the research lead.",
      "Audio not audited. No spoken arguments, quotations, or timecodes attributed.",
    ],
  ].map(
    ([id, role, title, publisher, publishedAt, url, context, limitation]) => ({
      id,
      role,
      title,
      publisher,
      publishedAt,
      retrievedAt: "2026-09-15",
      links: [{ label: "Publisher record", url }],
      context,
      limitation,
    })
  ),
  claimAudit: [
    [
      "audit-access",
      "Rerouting links access with provider observation",
      "qualify",
      "Rerouting is Anthropic's allegation; chokepoint implications are our conditional interpretation.",
      report,
    ],
    [
      "audit-counts",
      "Exchange counts establish comparable aggregate growth",
      "exclude",
      "Different lab populations and windows; no aggregate or twelvefold comparison retained.",
      report,
    ],
    [
      "audit-weapons",
      "Assistance demonstrates deployed military capability",
      "exclude",
      "Retain reported proposals and simulations, not deployment or invasion preparation.",
      report,
    ],
    [
      "audit-surveillance",
      "Surveillance cases share one attribution and outcome",
      "qualify",
      "Preserve low-confidence Uyghur contractor link; S2T pilot-stage caveat is case-specific.",
      report,
    ],
    [
      "audit-cyber",
      "The Hunan cluster is established as a state operation",
      "exclude",
      "Chinese location or language does not establish state sponsorship.",
      report,
    ],
    [
      "audit-attribution",
      "Institutional links and model contribution are independently established",
      "qualify",
      "Provider assessments; independent corroboration and counterfactual uplift remain open.",
      report,
    ],
    [
      "audit-enforcement",
      "Bans prove the operations ended",
      "qualify",
      "Anthropic reports bans; downstream cessation or substitution is not independently demonstrated.",
      report,
    ],
    [
      "audit-advisory",
      "The government advisory corroborates every September case",
      "qualify",
      "Original assessment with different cohort and period, not a public audit of all provider cases.",
      advisory,
    ],
    [
      "audit-response",
      "No Chinese government response is available",
      "exclude",
      "September 11 official English briefing supplies a general response; detailed company responses unresolved.",
      response,
      "officiallyAnnounced",
    ],
    [
      "audit-scrutiny",
      "November criticism settles September's evidentiary quality",
      "exclude",
      "Keep historical objections attached to November; assess September indicators separately.",
      scrutiny,
    ],
    [
      "audit-controls",
      "Model controls render chip controls irrelevant",
      "qualify",
      "Different mechanisms; June timeline is company-attributed, underlying directive and congressional claims unresolved.",
      controls,
    ],
    [
      "audit-podcast",
      "Podcast hosts made the supplied spoken arguments",
      "exclude",
      "Description-only discovery citation; audio has not been audited.",
      podcast,
    ],
  ].map(([id, claim, decision, assessment, source, status = "reported"]) => ({
    id,
    claim,
    status,
    decision,
    assessment,
    sourceIds: [source],
  })),
  accessSteps: [
    {
      label: "1. Customer request",
      detail: "Alleged path: a customer uses an intermediary's product.",
      sourceIds: [report],
    },
    {
      label: "2. Intermediary routing",
      detail: "Alleged path: the intermediary relays some requests to Claude.",
      sourceIds: [report],
    },
    {
      label: "3. Provider observation",
      detail:
        "Anthropic says relayed exchanges exposed activity to its systems.",
      sourceIds: [report],
    },
    {
      label: "4. Enforcement",
      detail:
        "Anthropic reports account bans. Cessation elsewhere is not established.",
      sourceIds: [report],
    },
  ],
  cases: [
    {
      id: "case-proposal",
      label: "GTG-17001",
      activity: "Anti-torpedo proposal development",
      attribution:
        "Assessed manufacturer connection; specific entity not attributed",
      outcome: "Proposal reported; procurement and deployment unproven",
      sourceIds: [report],
      claimIds: ["audit-weapons"],
    },
    {
      id: "case-simulation",
      label: "GTG-17002",
      activity: "EW software and Taiwan-target simulation",
      attribution:
        "Metadata/content links to research institutions including PLA AMS",
      outcome: "Development reported; operational use unproven",
      sourceIds: [report],
      claimIds: ["audit-weapons"],
    },
    {
      id: "case-briefing",
      label: "GTG-17003",
      activity: "Directed-energy research and briefings",
      attribution: "Provider assessment of defense-intelligence activity",
      outcome:
        "Research output; recipients and deployment not independently verified",
      sourceIds: [report],
      claimIds: ["audit-weapons"],
    },
    {
      id: "case-uyghur",
      label: "Uyghur-Syria case",
      activity: "Profiling and recruitment-related work",
      attribution:
        "Low confidence: PRC security contractor rather than direct state organ",
      outcome: "Reported workflow; do not import S2T's pilot-stage caveat",
      sourceIds: [report],
      claimIds: ["audit-surveillance"],
    },
    {
      id: "case-hunan",
      label: "GTG-10007",
      activity: "Cyber operations",
      attribution:
        "Chinese-speaking, Hunan-linked operators; not established state sponsorship",
      outcome:
        "Compromises reported by provider; model uplift not independently quantified",
      sourceIds: [report],
      claimIds: ["audit-cyber"],
    },
  ],
  limitations: [
    "Unpublished analytical draft. Jovani's editorial approval and claim-level corroboration remain pending.",
    "Full PDF and podcast audio audits remain open. No operational instructions or personal identifiers reproduced.",
    "Underlying export directive, congressional statements, and detailed named-company responses remain unresolved.",
    "No aggregate exchange count, growth multiplier, demonstrated invasion preparation, or irreversible capability claim retained.",
    "Details marked [unverified] have no support in the reviewed source records or story ledger and need a primary source before promotion.",
  ],
  unverified: [
    [
      "unverified-advisory-period",
      "late 2024",
      paragraphAt("distillation-and-measurement", 3),
      "The advisory's start of period is not recorded in the ledger's advisory review.",
    ],
    [
      "unverified-advisory-tokens",
      "tokens",
      paragraphAt("distillation-and-measurement", 3),
      "The ledger records exchanges and six named companies, not a token measure.",
    ],
    [
      "unverified-briefing-recipients",
      "senior officials",
      paragraphAt("military-and-surveillance", 3),
      "The ledger records restricted briefings and intended recipients, not their seniority.",
    ],
    [
      "unverified-hardware-access",
      "access to the hardware",
      paragraphAt("military-and-surveillance", 3),
      "The ledger records only that the actors already possessed hardware expertise.",
    ],
    [
      "unverified-hunan-language",
      "Chinese-speaking",
      paragraphAt("military-and-surveillance", 4),
      "The ledger mentions location and language generally; this exact descriptor is not recorded.",
    ],
    [
      "unverified-nationality-check",
      "could not reliably verify nationality",
      paragraphAt("hardware-and-access", 2),
      "The ledger records the June timeline, not this stated reason for the suspension.",
    ],
    [
      "unverified-briefing-designator",
      "GTG-17003",
      caseAt("case-briefing", "label"),
      "No reviewed record assigns this designator to the directed-energy case.",
    ],
    [
      "unverified-hunan-language-case",
      "Chinese-speaking",
      caseAt("case-hunan", "attribution"),
      "Same descriptor as the section 03 paragraph; not recorded in the ledger.",
    ],
    [
      "unverified-hunan-compromises",
      "Compromises reported by provider",
      caseAt("case-hunan", "outcome"),
      "The ledger records the cluster and its attribution limit, not reported compromises.",
    ],
  ].map(([id, phrase, location, note]) => ({
    id,
    phrase,
    location,
    status: "needs-primary-source",
    note,
  })),
});

export const whoControlsTheModelWordCount = whoControlsTheModel.sections
  .flatMap((section) => section.paragraphs)
  .reduce((total, paragraph) => total + paragraph.text.split(/\s+/).length, 0);
