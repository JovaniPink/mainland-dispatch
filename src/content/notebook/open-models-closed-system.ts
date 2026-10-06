import {
  parseNotebookEntry,
  type EvidenceWatchNotebookEntry,
} from "@/content/notebook/schema";

const simplecastUrl =
  "https://china-insider.simplecast.com/episodes/china-insider-xi-jinpings-speech-at-the-world-artificial-intelligence-conference-typhoon-noul-makes-landfall-in-southern-china-2026-fields-medal-recipients-hong-wang-and-yu-deng-5kUxKgJM";

export const openModelsClosedSystem = parseNotebookEntry({
  variant: "evidence-watch",
  ordinal: 2,
  slug: "open-models-closed-system",
  title: "Open Models, Closed System?",
  subtitle:
    "China offers open AI models and international cooperation through a politically controlled system. Who benefits, what dependencies follow, and where does the openness end?",
  description:
    "A source-audited inquiry into the real goods, dependencies, governance, and political limits in China’s proposed international AI order.",
  thesis:
    "China's open-AI strategy offers real technical and institutional goods through a politically controlled system. Its openness has limits, and its benefits can bring dependencies. The question is how those offers work in practice: what has been delivered, what remains a promise, and who governs the resulting order.",
  frontPagePreview: {
    finding:
      "China's AI proposition combines real model access, training, and institution-building with binding domestic political controls and unresolved questions about cross-border access.",
    status: "contested",
    caveat:
      "An official speech establishes the offer, not implementation; benchmark convergence does not establish equal cost, safety, reliability, or governance.",
    sourceIds: [
      "notebook-source-xi-waic-address",
      "notebook-source-stanford-ai-index",
    ],
  },
  presentationUpdatedAt: "2026-09-07",
  publishedAt: "2026-07-28",
  updatedAt: "2026-08-08",
  readTime: "18 min",
  tags: [
    "AI governance",
    "Open models",
    "Global South",
    "State capacity",
    "Research mobility",
  ],
  editorialStatus: "published",
  reviewState: "source-reviewed",
  formats: [
    {
      id: "format-open-models-listen",
      label: "Listen",
      title:
        "Xi Jinping’s Speech at the World Artificial Intelligence Conference; Typhoon Noul; 2026 Fields Medal Recipients",
      publisher: "China Insider · Hudson Institute",
      duration: "36:58",
      url: simplecastUrl,
      retrievedAt: "2026-07-28",
      note: "The canonical episode page. No publisher transcript was available when reviewed on July 28, 2026.",
    },
    {
      id: "format-open-models-read",
      label: "Read",
      title:
        "Keynote Speech by President Xi Jinping at the World Artificial Intelligence Conference",
      publisher:
        "Ministry of Foreign Affairs of the People’s Republic of China",
      url: "https://www.fmprc.gov.cn/eng/xw/zyxw/202607/t20260717_11984766.html",
      retrievedAt: "2026-07-28",
      note: "The official English-language text is the controlling source for what Xi publicly proposed.",
    },
    {
      id: "format-open-models-watch",
      label: "Watch",
      title:
        "Full Address: Xi Jinping Delivers Keynote at World AI Conference in Shanghai",
      publisher: "DWS News · YouTube",
      url: "https://www.youtube.com/watch?v=epKAbjsveyE",
      retrievedAt: "2026-07-28",
      note: "Broadcast footage for evaluating delivery and framing; the official written address remains the factual reference.",
    },
  ],
  turningPoints: [
    {
      id: "turning-open-models-control",
      timecode: "02:14",
      endTimecode: "07:18",
      seconds: 134,
      title: "Openness abroad, control at home",
      status: "interpretation",
      argument:
        "Miles Yu argues that Xi’s open-source rhetoric cannot be separated from censorship, political supervision, protectionism, intelligence obligations, and military-civil fusion.",
      reading:
        "This is the episode’s strongest question, but not its complete answer. A state can supply technology that is genuinely useful while also using that supply to build standards, relationships, and influence.",
      sourceIds: [
        "notebook-source-china-insider-191",
        "notebook-source-xi-waic-address",
        "notebook-source-cac-generative-ai",
      ],
    },
    {
      id: "turning-open-models-noul",
      timecode: "16:23",
      endTimecode: "22:03",
      seconds: 983,
      title: "State capacity versus information control",
      status: "contested",
      argument:
        "The episode recognizes the scale of China’s disaster mobilization, then argues that political control degrades reporting and public accountability.",
      reading:
        "The tension is real. The stronger test is not whether one evacuation number proves success or one censorship claim proves failure, but what authorities disclosed, what independent evidence can corroborate, and what remained unknowable.",
      sourceIds: [
        "notebook-source-china-insider-191",
        "notebook-source-ap-noul",
        "notebook-source-xinhua-noul-record",
      ],
    },
    {
      id: "turning-open-models-talent",
      timecode: "27:54",
      endTimecode: "31:53",
      seconds: 1674,
      title: "Who gets credit for scientific achievement?",
      status: "interpretation",
      argument:
        "The episode treats the Fields Medals awarded to Hong Wang and Yu Deng as achievements realized in spite of China rather than through a cross-border system.",
      reading:
        "Their careers resist that binary. Chinese schooling and Peking University, followed by institutions and collaborators in France and the United States, formed one transnational research pipeline.",
      sourceIds: [
        "notebook-source-china-insider-191",
        "notebook-source-imu-fields-2026",
        "notebook-source-pku-fields",
        "notebook-source-university-fields",
      ],
    },
  ],
  audio: {
    sourceId: "notebook-source-china-insider-191",
    canonicalUrl: simplecastUrl,
    mediaUrl:
      "https://cdn.simplecast.com/media/audio/transcoded/8ba8b7ea-ada5-4d43-b4dd-cd106ac3d384/c74926bb-1945-46fc-a842-2ee2b1458a55/episodes/audio/group/e3039219-510f-4e98-917e-b39ba241836d/group-item/e359f4a4-1dd2-4ae2-af0e-ad8a94cc1e95/128_default_tc.mp3",
    publisher: "China Insider · Hudson Institute",
    duration: "36:58",
    reviewedAt: "2026-07-28",
    transcriptAvailable: false,
  },
  sections: {
    why: [
      "The phrase “open AI” sounds technical, almost neutral. In Xi Jinping’s July 2026 address, however, openness was also a proposal about international order. China would encourage open-source development, offer 5,000 training opportunities, deepen cooperation through six regional groupings, and make its MAZU meteorological system available to 30 countries. China’s Foreign Ministry reported that representatives of 29 countries signed the founding agreement for the World Artificial Intelligence Cooperation Organization, or WAICO; Reuters separately reported the signing. Taken together, these were not product announcements. They were the outlines of an institution-building strategy.",
      "That strategy stayed with me because it refuses the comfortable categories often used in American debate. China is neither simply giving technology away nor merely disguising coercion as generosity. Open models, training, standards work, and weather tools can be useful public goods. They can also create technical dependence, diplomatic goodwill, and agenda-setting power. Those outcomes are not mutually exclusive. A government can help other countries solve real problems while advancing its own position.",
      "Episode 191 of Hudson Institute’s China Insider sharpened the contradiction. Miles Yu asks how a politically controlled state can credibly promise an open technology order. His institutional vantage point matters: he directs Hudson’s China Center, which explicitly develops American responses to the “China challenge,” and he previously advised Secretary of State Mike Pompeo. That makes the episode informed strategic commentary, not a neutral transcript of events. The right use for it is to generate questions that can be checked against primary records. The inquiry is not whether a controlled system can produce useful technology. The descriptive answer is yes. The questions are which forms of openness it offers, who governs them, and where their limits appear.",
    ],
    proposal: [
      "The official address is more concrete, and in places more restrained, than the podcast’s paraphrase. Xi presented four principles: development should favor humanity; sovereignty and national choices should be respected; countries should pursue fairness and shared benefit; and governance should balance innovation with security. He criticized the overextension of national-security restrictions and argued for broader participation in AI governance. He also explicitly supported open source, collaboration, and sharing.",
      "The material offer matters more than the slogans. Xi promised 5,000 opportunities in training and seminar programs over five years, not 5,000 completed trainees. Cooperation centers with ASEAN, the Arab League, the African Union, CELAC, the Shanghai Cooperation Organisation, and BRICS establish six named institutional pathways. MAZU access for 30 countries links the AI proposal to an applied service whose value can eventually be evaluated in deployments, data arrangements, warning performance, and local capacity. China’s Foreign Ministry says representatives of 29 countries signed WAICO’s agreement and identifies Shanghai as headquarters; Reuters separately reported the signing. The reviewed record does not include the complete agreement, voting rules, funding structure, or enforcement arrangements.",
      "None of this proves that a just or equitable system will result. It does make “China wants global AI dominance” too blunt to be useful. The narrower claim is stronger: Beijing is trying to become a producer of technical institutions as well as models and hardware. For governments priced out of proprietary systems, training and downloadable models are rationally attractive. The burden of analysis is to identify the terms of participation, who controls standards and infrastructure, whether local institutions gain durable capacity, and what happens when a partner’s interests diverge from Beijing’s.",
    ],
    strongest: [
      "Yu is strongest when he asks whether the meaning of openness changes across borders. China’s binding rules for public generative-AI services require adherence to socialist core values and prohibit content authorities define as subversive, threatening to national security, or damaging to social stability. Those are not speculative future risks; they are part of the domestic operating environment. International developers may download capable weights while Chinese users encounter a politically bounded service layer.",
      "That asymmetry deserves scrutiny. Open weights do not automatically produce open institutions, transparent datasets, or contestable governance. The categories have to be separated: access to weights; an open-source or merely source-available license; permission for commercial use and modification; visibility into training data and methods; equal international model access; domestic political permissibility; participation in standards and governance; and dependence on another country’s infrastructure. China can be meaningfully open in one dimension and closed in another. A recipient can obtain a useful model without obtaining leverage over the institutions around it.",
      "The same test should be applied symmetrically. The United States restricts advanced chips, model infrastructure, and some forms of technical access in the name of national security; American laboratories usually keep frontier weights closed. Xi’s objection to overextended security restrictions is thus a stated principle that future Chinese policy can be measured against. Reports that Beijing is considering limits on overseas access to its most advanced models are important precisely because they remain proposals under consideration, not enacted policy. The tracker below preserves that distinction.",
    ],
    overreach: [
      "The episode loses explanatory power when criticism becomes totalizing. It collapses open research, licensed code, synthetic training data, alleged contract violations, espionage, distillation, and independent engineering into one accusation. Those mechanisms have different evidence requirements. A serious inquiry has to evaluate them case by case rather than turning nationality into proof.",
      "It is similarly untenable to assume permanent technological inferiority. Stanford’s 2026 AI Index estimated that the performance gap between the leading American and Chinese model had narrowed to 2.7 percent by March 2026. That statistic does not settle questions about robustness, cost, safety, hardware, or particular tasks. It does establish that the competitive position must be measured rather than presumed.",
      "Other flourishes should be discarded, not softened. An inflammatory historical analogy adds heat without analytical value. Treating satellite and terrestrial networks as substitutes confuses systems with different capacity and coverage roles. Treating all civilian technology as one seamless military system replaces a real but uneven military-civil integration strategy with an absolute claim. Mainland Dispatch’s job is not to make the episode sound balanced. It is to retain the questions that survive contact with evidence.",
    ],
    noul: [
      "Typhoon Noul is not a test of the promised foreign MAZU deployments: the storm arrived before those deployments could reasonably have existed. It is a compact test of China’s current forecasting and warning capacity, centralized mobilization, official information production, constraints on independent reporting, and post-disaster accountability. Associated Press reported that more than 801,000 Guangdong residents were relocated as the storm approached, while attributing that figure to Xinhua. The number demonstrates mobilization scale. It does not, by itself, establish forecast accuracy, equitable protection, recovery quality, or whether officials disclosed the storm’s full consequences.",
      "The podcast’s stronger point is that operational capacity and information quality can diverge. A centralized state may move large populations quickly while restricting the independent reporting needed to evaluate mistakes, unequal impacts, or local failures. But the episode overstates the evidence when it implies near silence or treats a pre-landfall enforcement notice as evidence about Noul. Authorities and state media did publish warnings, relocation counts, supplies, and response measures. The reviewed enforcement cases were announced before the storm’s landfall and concerned allegedly fabricated, recycled, or AI-generated disaster material.",
      "The responsible questions are narrower. Did the warning system improve the timing and reach of evacuation? Which forecasts and local outcomes can be reconstructed? Were unofficial reports correcting omissions, spreading false material, or both? What process distinguished harmful fabrication from legitimate criticism? And when MAZU reaches other countries, who controls the weather data, alert thresholds, evaluation, and public record? A promise about technology becomes meaningful only when its performance and governance can be observed.",
    ],
    talent: [
      "Hong Wang and Yu Deng became the first Chinese nationals to receive Fields Medals, according to contemporaneous reporting. The qualification matters: earlier medalists were Chinese-born or of Chinese descent. The International Mathematical Union is the controlling source for the awards themselves: it recognized Wang for work in harmonic analysis and geometric measure theory and Deng for work on partial differential equations. Their biographies do not support a simple national scorecard.",
      "Both began their higher education at Peking University. Wang completed her bachelor’s degree there, pursued doctoral work in France, and built a research career through institutions including NYU and IHES. Deng entered Peking University before transferring to MIT and later joined the University of Chicago. Their breakthroughs emerged through movement among Chinese, European, and American institutions, through mentors and collaborators, and through a mathematical community whose most important networks are international.",
      "Calling their success a triumph solely for China erases the environments in which their research matured. Calling it an achievement produced entirely “in spite of” China erases their early training and Peking University. The medals do not directly prove anything about AI-model governance; they test Yu’s broader suggestion that political control makes meaningful Chinese contribution impossible. The more useful lesson is that frontier knowledge travels. Security controls can address real risks, but indiscriminate decoupling can damage the same cross-border research system that countries later claim as evidence of national strength.",
    ],
    changed: [
      "I began with a question about hypocrisy: can a controlled political system credibly champion open AI? I now think credibility is too binary a frame. The practical question is which layers are open, to whom, on what terms, and for how long. China can release competitive models and build useful training programs without liberalizing domestic speech. It can provide genuine public goods while increasing strategic influence. It can support sharing until a capability becomes too valuable to share.",
      "The American response cannot rest on exposing contradiction. A country deciding between a downloadable Chinese model and an expensive Western API is making an infrastructure choice, not grading a civics exam. If US institutions want their preferred governance norms to travel, they need offers that are technically capable, economically accessible, and institutionally durable. Critique without a credible alternative leaves Beijing’s proposition unanswered.",
      "That is why this inquiry ends with a watchlist rather than a verdict. Its six records are deliberately heterogeneous: three future commitments, one established institution whose performance remains unknown, one observed technical condition, and one stated policy principle. Training can be documented or remain a headline. Centers can acquire charters, budgets, and programs, or stay ceremonial. MAZU can demonstrate measurable warning performance. WAICO can reveal who votes and who sets standards. Licenses can remain permissive or narrow. Future export restrictions can align with or contradict the principle Xi stated. An evidence notebook should remember what kind of claim each baseline is and revise its assessment when observable facts arrive.",
    ],
  },
  claimAudit: [
    {
      id: "audit-xi-concrete-offer",
      claim:
        "Xi announced open-source cooperation, 5,000 training opportunities, six cooperation-center relationships, and MAZU access for 30 countries.",
      status: "officiallyAnnounced",
      decision: "retain",
      assessment:
        "The published address states each commitment. Implementation and outcomes remain future evidence.",
      sourceIds: ["notebook-source-xi-waic-address"],
    },
    {
      id: "audit-global-order",
      claim: "China is trying to shape a new global AI order.",
      status: "reported",
      decision: "qualify",
      assessment:
        "Institution-building and capacity offers support a claim of sought leadership and influence. They do not establish eventual dominance.",
      sourceIds: [
        "notebook-source-xi-waic-address",
        "notebook-source-waico-founding",
        "notebook-source-sheehan-annotated",
      ],
    },
    {
      id: "audit-domestic-controls",
      claim:
        "Public generative-AI services in China operate under political content rules.",
      status: "implemented",
      decision: "retain",
      assessment:
        "The binding interim measures specify socialist-core-values and national-security content obligations.",
      sourceIds: ["notebook-source-cac-generative-ai"],
    },
    {
      id: "audit-universal-theft",
      claim: "Every Chinese AI product is built on stolen Western work.",
      status: "contested",
      decision: "exclude",
      assessment:
        "The universal allegation is unsupported and collapses distinct technical and legal mechanisms into a nationality-based conclusion.",
      sourceIds: ["notebook-source-china-insider-191"],
    },
    {
      id: "audit-model-obsolescence",
      claim: "Chinese models are always behind and DeepSeek is obsolete.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "Current benchmark evidence shows a narrow frontier gap. Performance remains task-dependent, but permanent inferiority is not an evidence-based premise.",
      sourceIds: [
        "notebook-source-china-insider-191",
        "notebook-source-stanford-ai-index",
      ],
    },
    {
      id: "audit-starlink-5g",
      claim:
        "Satellite connectivity has made Chinese terrestrial 5G unnecessary.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "The comparison treats systems with different density, capacity, latency, and indoor-coverage roles as substitutes.",
      sourceIds: ["notebook-source-china-insider-191"],
    },
    {
      id: "audit-noul-reporting",
      claim:
        "Official reporting about Noul existed but did not establish completeness.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "Official and wire reporting documented alerts, relocation, and response measures. Completeness and independent accountability remain open questions.",
      sourceIds: [
        "notebook-source-ap-noul",
        "notebook-source-xinhua-noul-record",
      ],
    },
    {
      id: "audit-noul-detentions",
      claim: "Bloggers were detained for exposing Typhoon Noul’s real damage.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "The reviewed enforcement notice predates Noul’s landfall and concerns alleged fabricated or recycled disaster content. It does not establish the episode’s account.",
      sourceIds: ["notebook-source-xinhua-noul-record"],
    },
    {
      id: "audit-first-fields",
      claim:
        "Wang and Deng were the first PRC nationals to receive Fields Medals.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "Use “first PRC nationals.” Earlier Fields Medalists were Chinese-born or of Chinese descent.",
      sourceIds: ["notebook-source-imu-fields-2026"],
    },
    {
      id: "audit-in-spite-of-china",
      claim: "Their achievements occurred entirely in spite of China.",
      status: "contested",
      decision: "exclude",
      assessment:
        "Their careers combine Chinese early education with European and American institutions and international collaboration.",
      sourceIds: [
        "notebook-source-pku-fields",
        "notebook-source-university-fields",
      ],
    },
  ],
  watchItems: [
    {
      id: "promise-training",
      claimType: "commitment",
      label: "5,000 AI training opportunities",
      baseline:
        "“In the next five years, China will provide developing countries with 5,000 opportunities in AI training and seminar programs.”",
      responsibleActor: "Government of the People’s Republic of China",
      baselineDate: "2026-07-17",
      deliveryWindow: "Five years from the July 2026 announcement",
      baselineStatus: "officiallyAnnounced",
      assessmentStatus: "officiallyAnnounced",
      whatHasHappened:
        "Xi announced a numerical opportunity target. This review found no participant, curriculum, host, completion, or outcome record and does not convert opportunities into people trained.",
      whatRemainsUnknown: [
        "How an opportunity is defined and counted",
        "Which countries, institutions, and participants will be included",
        "Whether participation produces durable local capability",
      ],
      sourceIds: ["notebook-source-xi-waic-address"],
      wouldStrengthen: [
        "Named programs, participants, curricula, and completion records",
        "Independent evidence of skills transfer and later participant outcomes",
      ],
      wouldWeaken: [
        "Repeated announcements without auditable delivery records",
        "Counting short invitations or duplicate attendance as completed training",
      ],
      updateState: {
        state: "no-verified-change",
        reviewedAt: "2026-08-08",
      },
    },
    {
      id: "promise-centers",
      claimType: "commitment",
      label: "Six cooperation-center relationships",
      baseline:
        "Xi said China would develop international AI application cooperation centers with ASEAN, the Arab League, the African Union, CELAC, the Shanghai Cooperation Organisation, and BRICS.",
      responsibleActor: "Government of the People’s Republic of China",
      baselineDate: "2026-07-17",
      deliveryWindow: "No completion date stated in the reviewed address",
      baselineStatus: "officiallyAnnounced",
      assessmentStatus: "officiallyAnnounced",
      whatHasHappened:
        "Six counterpart groupings were named, creating a trackable institutional baseline. The reviewed record did not establish executed agreements, hosts, staffing, budgets, or delivered programs.",
      whatRemainsUnknown: [
        "Whether each center is new, funded, staffed, and jointly governed",
        "What intellectual-property, data, procurement, and access terms apply",
        "Whether counterpart institutions gain durable decision-making power",
      ],
      sourceIds: ["notebook-source-xi-waic-address"],
      wouldStrengthen: [
        "Executed agreements, named hosts, budgets, staffing, and public programs",
        "Governance records showing meaningful counterpart participation",
      ],
      wouldWeaken: [
        "Centers that remain ceremonial or exist only in repeated speeches",
        "Opaque terms that reserve standards or infrastructure control to Beijing",
      ],
      updateState: {
        state: "no-verified-change",
        reviewedAt: "2026-08-08",
      },
    },
    {
      id: "promise-mazu",
      claimType: "commitment",
      label: "MAZU access in 30 countries",
      baseline:
        "Xi said China would “enable 30 countries to use” the AI-powered MAZU meteorological warning system.",
      responsibleActor: "Government of the People’s Republic of China",
      baselineDate: "2026-07-17",
      deliveryWindow: "No completion date stated in the reviewed address",
      baselineStatus: "officiallyAnnounced",
      assessmentStatus: "officiallyAnnounced",
      whatHasHappened:
        "A country-count target and named system were announced. Typhoon Noul occurred too early to test future foreign deployments and is used only to examine China’s current warning, mobilization, information, and accountability environment.",
      whatRemainsUnknown: [
        "Which 30 countries will participate and when deployments begin",
        "Who controls weather data, thresholds, maintenance, and public records",
        "How warning accuracy, reach, and local capacity will be evaluated",
      ],
      sourceIds: ["notebook-source-xi-waic-address", "notebook-source-ap-noul"],
      wouldStrengthen: [
        "A public deployment inventory with responsibilities and data terms",
        "Independent, country-level warning-performance and capacity evaluations",
      ],
      wouldWeaken: [
        "Access that consists only of demonstrations or inaccessible pilots",
        "No auditable performance record or unclear control of local weather data",
      ],
      updateState: {
        state: "no-verified-change",
        reviewedAt: "2026-08-08",
      },
    },
    {
      id: "promise-waico",
      claimType: "institutional_fact",
      label: "WAICO institution and governance output",
      baseline:
        "China’s Foreign Ministry reported that representatives of 29 countries signed WAICO’s founding agreement and that the organization would be headquartered in Shanghai; Reuters separately reported the signing.",
      responsibleActor:
        "WAICO founding governments; record published by China’s Foreign Ministry",
      baselineDate: "2026-07-16",
      deliveryWindow:
        "Established at signing; substantive operation is ongoing",
      baselineStatus: "implemented",
      assessmentStatus: "implemented",
      whatHasHappened:
        "The signing and declared headquarters establish WAICO as an institutional fact. The reviewed sources do not establish an operational secretariat, complete membership terms, funding, voting power, enforcement, or substantive governance output.",
      whatRemainsUnknown: [
        "The complete agreement, charter, membership, and voting rules",
        "Funding, secretariat structure, enforcement, and dispute mechanisms",
        "Which standards or programs WAICO will actually produce",
      ],
      sourceIds: ["notebook-source-waico-founding"],
      wouldStrengthen: [
        "Publication of the complete agreement, rules, budget, and member list",
        "Traceable decisions and programs with visible member participation",
      ],
      wouldWeaken: [
        "Persistent absence of basic governance documents",
        "Decision-making concentrated in a host state despite multilateral language",
      ],
      updateState: {
        state: "no-verified-change",
        reviewedAt: "2026-08-08",
      },
    },
    {
      id: "promise-open-models",
      claimType: "observed_condition",
      label: "Open-model capability and license evidence",
      baseline:
        "The leading US–China model-performance gap was 2.7% in March 2026, according to Stanford’s AI Index.",
      responsibleActor: "Chinese model developers and research institutions",
      baselineDate: "2026-03-31",
      deliveryWindow: "Continuously reassessed as models and licenses change",
      baselineStatus: "independentlyObserved",
      assessmentStatus: "independentlyObserved",
      whatHasHappened:
        "Stanford’s synthesis places Chinese models near the measured frontier. That is a performance observation, not proof that every model is open source: weights, code, training data, licenses, commercial rights, and overseas availability vary by release.",
      whatRemainsUnknown: [
        "How current models compare on particular tasks, reliability, and cost",
        "Which artifacts and training disclosures accompany each release",
        "Whether permissive overseas access remains available",
      ],
      sourceIds: [
        "notebook-source-stanford-ai-index",
        "notebook-source-reuters-model-access",
      ],
      wouldStrengthen: [
        "Downloadable artifacts, stable permissive licenses, and reproducible tests",
        "Continued international access without discriminatory restrictions",
      ],
      wouldWeaken: [
        "License tightening, incomplete artifacts, or non-reproducible performance",
        "Enacted controls that reserve leading models for domestic users",
      ],
      updateState: {
        state: "no-verified-change",
        reviewedAt: "2026-08-08",
      },
    },
    {
      id: "promise-security",
      claimType: "policy_principle",
      label: "Objection to overextended national-security restrictions",
      baseline:
        "Xi called for jointly opposing the overextension of national security in AI and placing one country’s security over another’s.",
      responsibleActor:
        "Xi Jinping and the government of the People’s Republic of China",
      baselineDate: "2026-07-17",
      deliveryWindow:
        "A continuing policy principle, not a dated delivery promise",
      baselineStatus: "officiallyAnnounced",
      assessmentStatus: "contested",
      whatHasHappened:
        "The speech establishes a stated principle. Reuters reported that Beijing was considering overseas limits for advanced future models; the reviewed report described consideration, not enacted policy.",
      whatRemainsUnknown: [
        "Whether any overseas model-access restriction will be adopted",
        "Its scope, rationale, review process, duration, and affected users",
        "How China distinguishes legitimate security from overextension",
      ],
      sourceIds: [
        "notebook-source-xi-waic-address",
        "notebook-source-reuters-model-access",
      ],
      wouldStrengthen: [
        "Transparent, narrow, reviewable policy consistent with the stated limit",
        "Continued access and reciprocal scientific exchange outside that scope",
      ],
      wouldWeaken: [
        "Broad or indefinite restrictions justified by undefined security claims",
        "A widening difference between official openness and implemented access",
      ],
      updateState: {
        state: "no-verified-change",
        reviewedAt: "2026-08-08",
      },
    },
  ],
  sourceTrail: [
    {
      id: "notebook-source-china-insider-191",
      role: "Canonical conversation · interpretive commentary",
      title:
        "China Insider: Xi’s WAIC Speech; Typhoon Noul; 2026 Fields Medal Recipients",
      publisher: "Hudson Institute · Simplecast",
      author: "Miles Yu and Wilson Beaver",
      publishedAt: "2026-07-28",
      retrievedAt: "2026-07-28",
      links: [{ label: "Episode 191", url: simplecastUrl }],
      context:
        "The initiating conversation. The public page and RSS establish episode number, date, and 36:58 runtime.",
      limitation:
        "No publisher transcript or chapter file was available when reviewed on July 28, 2026. Time ranges reflect the commissioned editorial review and are not presented as verbatim quotations.",
    },
    {
      id: "notebook-source-hudson-context",
      role: "Institutional context",
      title: "Miles Yu biography and Hudson China Center",
      publisher: "Hudson Institute",
      retrievedAt: "2026-07-28",
      links: [
        {
          label: "Miles Yu biography",
          url: "https://www.hudson.org/experts/1356-miles-yu",
        },
        {
          label: "China Center",
          url: "https://www.hudson.org/china-center",
        },
      ],
      context:
        "Establishes Yu’s policy background and the center’s stated mission of developing American responses to the China challenge.",
      limitation:
        "Organizational self-description supplies perspective, not independent validation of the episode’s claims.",
    },
    {
      id: "notebook-source-xi-waic-address",
      role: "Primary official record",
      title:
        "Keynote Speech by President Xi Jinping at the World Artificial Intelligence Conference",
      publisher:
        "Ministry of Foreign Affairs of the People’s Republic of China",
      author: "Xi Jinping",
      publishedAt: "2026-07-17",
      retrievedAt: "2026-07-28",
      links: [
        {
          label: "Official English text",
          url: "https://www.fmprc.gov.cn/eng/xw/zyxw/202607/t20260717_11984766.html",
        },
        {
          label: "Broadcast footage",
          url: "https://www.youtube.com/watch?v=epKAbjsveyE",
        },
      ],
      context:
        "Controls the account of Xi’s stated principles and the training, cooperation-center, and MAZU commitments.",
      limitation:
        "A speech establishes announced policy and rhetoric, not implementation or outcomes.",
    },
    {
      id: "notebook-source-waico-founding",
      role: "Primary institutional record",
      title:
        "Founding of the World Artificial Intelligence Cooperation Organization",
      publisher:
        "Ministry of Foreign Affairs of the People’s Republic of China",
      publishedAt: "2026-07-17",
      retrievedAt: "2026-07-28",
      links: [
        {
          label: "Official establishment record",
          url: "https://www.fmprc.gov.cn/eng/wjbzhd/202607/t20260717_11984747.html",
        },
        {
          label: "Reuters cooperation-body report",
          url: "https://www.reuters.com/world/china/twenty-nine-countries-sign-agreement-establish-global-ai-cooperation-body-2026-07-16/",
        },
      ],
      context:
        "China’s Foreign Ministry reports 29 founding signatories and Shanghai as headquarters; Reuters separately reported the signing.",
      limitation:
        "The reviewed sources do not provide the complete agreement, voting rules, funding structure, enforcement arrangements, operating capacity, or governance quality.",
    },
    {
      id: "notebook-source-cac-generative-ai",
      role: "Primary regulatory record",
      title: "Interim Measures for the Management of Generative AI Services",
      publisher: "Cyberspace Administration of China",
      publishedAt: "2023-07-13",
      retrievedAt: "2026-07-28",
      links: [
        {
          label: "Chinese-language regulation",
          url: "https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm",
        },
      ],
      context:
        "Supports the description of binding political-content obligations for public generative-AI services in China.",
      limitation:
        "The inquiry does not generalize these service rules to every research model, private deployment, or overseas use.",
    },
    {
      id: "notebook-source-sheehan-annotated",
      role: "Independent expert interpretation",
      title: "Xi Jinping’s Big AI Speech, Annotated",
      publisher: "Matt Sheehan",
      author: "Matt Sheehan",
      publishedAt: "2026-07",
      retrievedAt: "2026-07-28",
      links: [
        {
          label: "Annotated analysis",
          url: "https://mattsheehan.substack.com/p/xi-jinpings-big-ai-speech-annotated",
        },
      ],
      context:
        "Provides specialist context for reading the address as institution-building rather than a standalone technology announcement.",
      limitation:
        "Analysis is interpretive and is not substituted for the official text.",
    },
    {
      id: "notebook-source-stanford-ai-index",
      role: "Independent benchmark synthesis",
      title: "2026 AI Index Report",
      publisher:
        "Stanford Institute for Human-Centered Artificial Intelligence",
      publishedAt: "2026",
      retrievedAt: "2026-07-28",
      links: [
        {
          label: "AI Index report",
          url: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
        },
      ],
      context:
        "Supports the 2.7% March 2026 estimate for the leading US–China model-performance gap.",
      limitation:
        "A composite benchmark gap does not establish equal performance, cost, safety, or reliability on every task.",
    },
    {
      id: "notebook-source-reuters-model-access",
      role: "Reported policy consideration",
      title:
        "Beijing is looking at curbing overseas access to China’s top AI models",
      publisher: "Reuters",
      publishedAt: "2026-07-07",
      retrievedAt: "2026-07-28",
      links: [
        {
          label: "Reuters export-control report",
          url: "https://www.reuters.com/world/beijing-is-looking-curbing-overseas-access-chinas-top-ai-models-sources-say-2026-07-07/",
        },
      ],
      context:
        "Establishes that restrictions were reportedly under consideration and creates a future test of Xi’s openness language.",
      limitation:
        "This is sourced reporting about a possible policy, not evidence of enacted restrictions.",
    },
    {
      id: "notebook-source-ap-noul",
      role: "Independent event reporting",
      title: "Typhoon Noul makes landfall in southern China",
      publisher: "Associated Press",
      publishedAt: "2026-07-26",
      retrievedAt: "2026-07-28",
      links: [
        {
          label: "Associated Press report",
          url: "https://apnews.com/article/05f860066a9a75595c5bcc4df8356337",
        },
      ],
      context:
        "Supports the reported relocation of more than 801,000 Guangdong residents.",
      limitation:
        "The relocation count measures mobilization scale, not forecast quality, response effectiveness, or recovery outcomes.",
    },
    {
      id: "notebook-source-xinhua-noul-record",
      role: "Official-response and enforcement records",
      title:
        "Noul response reporting and pre-landfall disaster-content enforcement",
      publisher: "Xinhua",
      retrievedAt: "2026-07-28",
      links: [
        {
          label: "Noul response report",
          url: "https://english.news.cn/20260726/3ea301fcdb434e3e95670bbd2f43ff1c/c.html",
        },
        {
          label: "July 13 enforcement notice",
          url: "https://www.news.cn/20260713/23844422c45047d5a3f7a3db5ed1ca7d/c.html",
        },
      ],
      context:
        "Shows that authorities published response information and that the reviewed enforcement cases predated Noul’s landfall.",
      limitation:
        "State-media publication does not prove complete or independent reporting; the enforcement allegations were not independently adjudicated here.",
    },
    {
      id: "notebook-source-imu-fields-2026",
      role: "Primary award record",
      title: "Fields Medals 2026",
      publisher: "International Mathematical Union",
      publishedAt: "2026",
      retrievedAt: "2026-07-28",
      links: [
        {
          label: "Award citations",
          url: "https://www.mathunion.org/imu-awards/fields-medal/fields-medals-2026",
        },
      ],
      context:
        "Controls the award citations and supports the precise nationality framing.",
      limitation:
        "The award record does not by itself explain the institutional causes of either mathematician’s work.",
    },
    {
      id: "notebook-source-pku-fields",
      role: "Early-education and institutional record",
      title: "Peking University alumni awarded 2026 Fields Medals",
      publisher: "Peking University",
      publishedAt: "2026",
      retrievedAt: "2026-07-28",
      links: [
        {
          label: "Peking University account",
          url: "https://newsen.pku.edu.cn/news_events/news/focus/15623.html",
        },
      ],
      context:
        "Documents the mathematicians’ connections to Peking University and their early educational paths.",
      limitation:
        "An alumni account naturally emphasizes the university’s contribution and is read alongside international institutional records.",
    },
    {
      id: "notebook-source-university-fields",
      role: "International career records",
      title: "Hong Wang and Yu Deng: research careers across institutions",
      publisher: "University of Chicago · NYU · IHES",
      publishedAt: "2026",
      retrievedAt: "2026-07-28",
      links: [
        {
          label: "University of Chicago · Yu Deng",
          url: "https://news.uchicago.edu/story/uchicago-prof-yu-deng-receives-fields-medal-highest-honor-mathematics",
        },
        {
          label: "NYU · Hong Wang",
          url: "https://math.nyu.edu/dynamic/news/101/",
        },
        {
          label: "IHES · Hong Wang",
          url: "https://www.ihes.fr/hong-wang-fields-2026/",
        },
      ],
      context:
        "Documents the institutions in which the mathematicians’ research and careers developed outside China.",
      limitation:
        "Institutional biographies identify affiliations and milestones; they do not allocate causal credit among countries or universities.",
    },
  ],
  unresolvedQuestion:
    "Where will China’s technological openness stop when it conflicts with Party control or strategic advantage? Who will govern the dependencies created before that boundary is reached?",
  limitations: [
    "No publisher transcript or chapter file was available when reviewed on July 28, 2026. Runtime was verified against the public page, RSS record, and media metadata; the three time ranges come from the commissioned editorial review and are not quoted verbatim.",
    "The baseline review stopped with the 13 source-trail records shown here on July 28, 2026. A bounded review of authoritative records published or updated after that date found no verified change through August 8, 2026; it did not audit private deliberations, every WAICO signatory, or unpublished implementation.",
    "Noul relocation totals were still event reporting. They establish mobilization scale, not response effectiveness, climate causation, or supply-chain effects.",
    "Reported Chinese restrictions on overseas model access remained under consideration. The inquiry does not describe them as enacted policy.",
    "No sample Notebook content, Dispatch, or hidden motive was promoted to verified original reporting.",
  ],
}) as EvidenceWatchNotebookEntry;
