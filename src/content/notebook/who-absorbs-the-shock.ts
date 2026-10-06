import { parseTradeAdjustmentNotebookEntry } from "@/content/notebook/schema";

export const whoAbsorbsTheShock = parseTradeAdjustmentNotebookEntry({
  variant: "trade-adjustment",
  ordinal: 5,
  slug: "who-absorbs-the-shock",
  title: "Who Absorbs the Shock?",
  subtitle:
    "A renewed Chinese export surge moves through households, factories, foreign markets, and local labor systems. Who gains, who pays, and which problems can policy address?",
  description:
    "A source-audited inquiry into China Shock 2.0, the groups absorbing its benefits and costs, and the policy tools aimed at different parts of the adjustment.",
  thesis:
    "China Shock 2.0 describes a large and uneven adjustment. Benefits and costs reach different groups through five stages, from domestic demand and production to foreign markets and local workers. A useful policy claim identifies the problem it targets, who bears the cost, and what the evidence can establish.",
  frontPagePreview: {
    finding:
      "China's export expansion now begins from a much larger base, while its consumer, producer, worker, and policy effects remain sharply uneven across products and places.",
    status: "interpretation",
    caveat:
      "The first-shock literature identifies plausible adjustment mechanisms, not a forecast that today's sectors and countries will repeat the same outcomes.",
    sourceIds: [
      "notebook-source-adjustment-fed",
      "notebook-source-adjustment-nber",
      "notebook-source-adjustment-ecb",
    ],
  },
  presentationUpdatedAt: "2026-09-07",
  publishedAt: "2026-08-26",
  updatedAt: "2026-08-26",
  readTime: "22 min",
  tags: [
    "China Shock 2.0",
    "Trade adjustment",
    "Manufacturing",
    "Distribution",
    "Industrial policy",
  ],
  editorialStatus: "published",
  reviewState: "source-reviewed",
  formats: [
    {
      id: "format-adjustment-ezra-klein",
      label: "Listen",
      title: "The China Shock 2.0",
      publisher: "The Ezra Klein Show - New York Times Opinion",
      duration: "1:05:30",
      url: "https://the-ezra-klein-show.simplecast.com/episodes/brad-setser",
      retrievedAt: "2026-08-26",
      note: "The initiating episode was audited against the publisher audio. The publisher-designated transcript remained inaccessible, so this Notebook uses attributed paraphrase rather than quotation.",
    },
  ],
  audio: {
    sourceId: "notebook-source-adjustment-episode",
    canonicalUrl:
      "https://the-ezra-klein-show.simplecast.com/episodes/brad-setser",
    mediaUrl:
      "https://nyt.simplecastaudio.com/3026b665-46df-4d18-98e9-d1ce16bbb1df/episodes/7fd71a4d-0c28-424a-8eb3-0b4675fdeb9e/audio/128/default.mp3",
    publisher: "New York Times Opinion via Simplecast",
    duration: "1:05:30",
    reviewedAt: "2026-08-26",
    transcriptAvailable: false,
  },
  turningPoints: [
    {
      id: "turning-adjustment-first-shock",
      timecode: "02:09",
      endTimecode: "03:55",
      seconds: 129,
      title: "The first shock was national trade change with local effects",
      status: "interpretation",
      argument:
        "Brad Setser dates the first shock to the early-2000s acceleration of Chinese exports in lower-end manufactured goods and stresses that national forecasts missed how slowly particular labor markets adjusted.",
      reading:
        "The episode supplies the framing. Autor, Dorn, and Hanson supply historical labor-market evidence; neither source forecasts the present episode by itself.",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-nber",
      ],
    },
    {
      id: "turning-adjustment-second-shock",
      timecode: "12:56",
      endTimecode: "15:20",
      seconds: 776,
      title: "Property weakness redirects adjustment toward manufacturing",
      status: "interpretation",
      argument:
        "Setser links the 2021 property rupture, policy-guided manufacturing investment, advanced-sector expansion, weak import growth, and exports rising faster than world trade.",
      reading:
        "This is a multichannel account, not proof that one subsidy, exchange-rate choice, or demand measure caused the entire surplus.",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-fed",
      ],
    },
    {
      id: "turning-adjustment-distribution",
      timecode: "26:10",
      endTimecode: "28:02",
      seconds: 1570,
      title: "Cheap goods and lost capacity can coexist",
      status: "interpretation",
      argument:
        "The discussion gives consumers' short-run gains from cheaper electric vehicles and solar equipment equal visibility with risks to traded-goods capacity, communities, wages, and the research base.",
      reading:
        "The passage identifies distributional channels. It does not calculate net welfare or establish that current labor effects match the first shock.",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-iea-ev",
        "notebook-source-adjustment-ecb",
      ],
    },
    {
      id: "turning-adjustment-policy",
      timecode: "40:50",
      endTimecode: "44:28",
      seconds: 2450,
      title: "An intervention also creates costs",
      status: "contested",
      argument:
        "Setser distinguishes targeted trade defense, industrial policy, and coordination from broad tariffs, which he argues impose consumer and input costs and weaken coalition building.",
      reading:
        "The guest's preference is not proof. Each tool below retains a target problem, mechanism, payer, horizon, and unresolved tradeoff.",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-usitc",
        "notebook-source-adjustment-imf-imbalances",
      ],
    },
    {
      id: "turning-adjustment-ai",
      timecode: "54:33",
      endTimecode: "57:43",
      seconds: 3273,
      title: "A third shock remains a scenario",
      status: "scenario",
      argument:
        "Ezra Klein raises a possible AI and software shock; Setser calls the path possible while emphasizing uncertainty about competition, profits, and who captures the gains.",
      reading:
        "Benchmark proximity does not establish ecosystem parity, trade displacement, or an observed software labor-market shock.",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-ai-index",
      ],
    },
  ],
  passageAudit: [
    {
      id: "passage-adjustment-first-shock",
      requirement: "first-shock",
      speaker: "Brad Setser",
      spans: [
        {
          start: "02:09",
          end: "03:55",
          startSeconds: 128.94,
          endSeconds: 235.08,
        },
      ],
      paraphrase:
        "Setser dates the first shock to the early-2000s jump in Chinese exports of lower-end manufactured goods and says national assumptions missed the persistence of local labor-market and community effects.",
      boundary:
        "This is the guest's framing; the historical estimates and their methods belong to the named labor-economics sources, not to the episode alone.",
      auditState: "audited",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-nber",
      ],
    },
    {
      id: "passage-adjustment-second-shock",
      requirement: "second-shock",
      speaker: "Brad Setser",
      spans: [
        {
          start: "12:56",
          end: "15:20",
          startSeconds: 776.4,
          endSeconds: 920.46,
        },
      ],
      paraphrase:
        "Setser dates the renewed adjustment to the 2021 property collapse and describes policy-guided manufacturing investment, advanced-sector expansion, weak import growth, and exports rising faster than world trade.",
      boundary:
        "Property, demand, credit, industrial policy, import substitution, export growth, and currency are separate channels; the passage does not identify one sufficient cause.",
      auditState: "audited",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-fed",
      ],
    },
    {
      id: "passage-adjustment-distribution",
      requirement: "distribution",
      speaker: "Ezra Klein and Brad Setser",
      spans: [
        {
          start: "26:10",
          end: "28:02",
          startSeconds: 1570.08,
          endSeconds: 1682.28,
        },
      ],
      paraphrase:
        "The speakers distinguish short-run consumer gains from cheap electric vehicles and solar equipment from losses that can follow when traded-goods capacity, local employment, and an industrial research base contract.",
      boundary:
        "The exchange maps possible beneficiaries and cost bearers; it neither calculates net welfare nor forecasts an exact repetition of first-shock effects.",
      auditState: "audited",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-ecb",
        "notebook-source-adjustment-iea-ev",
      ],
    },
    {
      id: "passage-adjustment-germany",
      requirement: "germany",
      speaker: "Brad Setser",
      spans: [
        {
          start: "16:09",
          end: "17:51",
          startSeconds: 968.7,
          endSeconds: 1071.48,
        },
      ],
      paraphrase:
        "Setser argues that Germany first benefited from Chinese demand for industrial goods, then faced pressure as Chinese electric-vehicle and industrial capability advanced and German exports declined.",
      boundary:
        "This is an attributed argument rather than a settled causal decomposition; IMF and Bundesbank assessments identify several additional contributors to Germany's weakness.",
      auditState: "audited",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-cer",
        "notebook-source-adjustment-imf-germany",
        "notebook-source-adjustment-bundesbank",
      ],
    },
    {
      id: "passage-adjustment-policy",
      requirement: "policy",
      speaker: "Brad Setser",
      spans: [
        {
          start: "35:17",
          end: "38:16",
          startSeconds: 2116.8,
          endSeconds: 2296.2,
        },
        {
          start: "40:50",
          end: "44:28",
          startSeconds: 2450.4,
          endSeconds: 2667.54,
        },
        { start: "51:26", end: "53:23", startSeconds: 3086, endSeconds: 3203 },
      ],
      paraphrase:
        "Setser describes a shift from targeted tariffs toward a mix of tariffs, export controls, and industrial policy, then argues that broad high tariffs impose consumer and input costs while making allied coordination harder.",
      boundary:
        "The guest's policy preference is not outcome evidence. Every instrument must name its target problem, incidence, tradeoff, time horizon, and uncertainty.",
      auditState: "audited",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-usitc",
        "notebook-source-adjustment-imf-imbalances",
        "notebook-source-adjustment-greer",
      ],
    },
    {
      id: "passage-adjustment-ai-software",
      requirement: "ai-software",
      speaker: "Ezra Klein and Brad Setser",
      spans: [
        {
          start: "54:33",
          end: "57:43",
          startSeconds: 3272.82,
          endSeconds: 3463.38,
        },
      ],
      paraphrase:
        "Klein raises a possible third shock in AI and software; Setser treats it as plausible but unresolved and emphasizes uncertainty about competition, profits, and how gains would be divided.",
      boundary:
        "This supports a scenario question only. A benchmark gap does not prove ecosystem parity, export displacement, or an observed labor-market shock.",
      auditState: "audited",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-ai-index",
      ],
    },
  ],
  mechanismSteps: [
    {
      id: "mechanism-domestic-demand",
      order: 1,
      label: "Domestic demand",
      definition:
        "Property losses, precautionary saving, household income, and social protection shape how much Chinese households consume.",
      measuredHere:
        "IMF assessments of weak consumption, property adjustment, saving, and recommended social-policy reform.",
      notEstablished:
        "No single household experience or complete causal estimate for each component of saving.",
      status: "observed",
      sourceIds: [
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-imf-external",
      ],
    },
    {
      id: "mechanism-industrial-capacity",
      order: 2,
      label: "Industrial capacity",
      definition:
        "Productivity, learning, investment, credit, industrial policy, and scale shape the volume and composition of supply.",
      measuredHere:
        "Sector evidence on electric vehicles and institutional assessments of support, innovation, and excess supply in some tradable sectors.",
      notEstablished:
        "An economy-wide verdict that every sector is subsidized, innovative, profitable, or operating above demand.",
      status: "contested",
      sourceIds: [
        "notebook-source-adjustment-iea-ev",
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-mofcom",
      ],
    },
    {
      id: "mechanism-trade-balance",
      order: 3,
      label: "Trade balance",
      definition:
        "Import substitution, import demand, export growth, prices, and exchange rates shape the external balance.",
      measuredHere:
        "A 2025 goods surplus of $1.2 trillion, a 16.3% 2024 export share, and a goods surplus above 1% of rest-of-world GDP.",
      notEstablished:
        "That these unlike denominators are interchangeable or that one bilateral tariff can correct the aggregate current account.",
      status: "observed",
      sourceIds: [
        "notebook-source-adjustment-fed",
        "notebook-source-adjustment-imf-external",
        "notebook-source-adjustment-imf-imbalances",
      ],
    },
    {
      id: "mechanism-external-absorption",
      order: 4,
      label: "External absorption",
      definition:
        "Foreign consumers, firms, and governments receive final goods, inputs, equipment, or locally assembled products and respond through prices, investment, and policy.",
      measuredHere:
        "Product-specific evidence on electric-vehicle destinations, EU input and final-goods exposure, tariffs, and localization.",
      notEstablished:
        "That every import is a final Chinese-branded good or that diversion, ownership, and local production are the same event.",
      status: "observed",
      sourceIds: [
        "notebook-source-adjustment-ecb",
        "notebook-source-adjustment-iea-ev",
        "notebook-source-adjustment-eu-bev",
      ],
    },
    {
      id: "mechanism-local-outcome",
      order: 5,
      label: "Local outcome",
      definition:
        "Employment, wages, hours, output, prices, investment, and fiscal costs vary by worker, firm, sector, and place.",
      measuredHere:
        "Historical local-labor effects, current manufacturing output and hours, and modeled euro-area exposure channels.",
      notEstablished:
        "A universal outcome or a forecast that the present product mix and policy environment reproduce the early-2000s United States.",
      status: "interpretation",
      sourceIds: [
        "notebook-source-adjustment-nber",
        "notebook-source-adjustment-bls",
        "notebook-source-adjustment-ecb",
      ],
    },
  ],
  shockComparisons: [
    {
      id: "comparison-period",
      dimension: "Period and trigger",
      firstShock:
        "Early 2000s, around China's 2001 WTO accession and the rapid expansion of lower-end manufactured exports.",
      secondShock:
        "A renewed export expansion from the late 2010s, with the episode emphasizing the property rupture beginning in 2021.",
      boundary:
        "A period label does not prove one trigger or make the two episodes directly comparable.",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-fed",
      ],
    },
    {
      id: "comparison-starting-scale",
      dimension: "Starting scale",
      firstShock:
        "China entered the early episode from a much smaller share of global manufactured trade.",
      secondShock:
        "The Fed reports China's global export share at 13.1% in 2018 before it rose to 16.3% in 2024.",
      boundary:
        "The two statements describe scale; they are not a converted common-base estimate.",
      sourceIds: ["notebook-source-adjustment-fed"],
    },
    {
      id: "comparison-product-mix",
      dimension: "Product mix",
      firstShock:
        "The historical framing emphasizes labor-intensive and lower-end manufactured goods.",
      secondShock:
        "Electric vehicles, batteries, solar, machinery, and other advanced manufacturing have greater visibility.",
      boundary:
        "A changing mix does not make all Chinese exports advanced or all destination industries directly exposed.",
      sourceIds: [
        "notebook-source-adjustment-fed",
        "notebook-source-adjustment-iea-ev",
        "notebook-source-adjustment-iea-etp",
      ],
    },
    {
      id: "comparison-import-linkage",
      dimension: "Import linkage",
      firstShock:
        "The episode is commonly analyzed through rising import exposure in destination labor markets.",
      secondShock:
        "Fed and IMF evidence adds weak Chinese import growth, import substitution, and a wider external surplus.",
      boundary:
        "Gross exports, imports, value added, and current accounts answer different questions.",
      sourceIds: [
        "notebook-source-adjustment-fed",
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-nber",
      ],
    },
    {
      id: "comparison-destinations",
      dimension: "Destinations",
      firstShock:
        "The most cited labor evidence concerns concentrated US local-market exposure.",
      secondShock:
        "Direct US penetration is a regional exception while exports have expanded in Europe and emerging markets, including electric vehicles.",
      boundary:
        "Destination, transshipment, firm headquarters, and local assembly must remain separate.",
      sourceIds: [
        "notebook-source-adjustment-fed",
        "notebook-source-adjustment-iea-ev",
        "notebook-source-adjustment-nber",
      ],
    },
    {
      id: "comparison-policy-environment",
      dimension: "Policy environment",
      firstShock:
        "The adjustment unfolded during an era of deeper trade integration and comparatively limited destination-country industrial policy.",
      secondShock:
        "Tariffs, countervailing duties, export controls, localization, subsidies, and allied coordination now shape the routes.",
      boundary:
        "Policy activity does not establish policy effectiveness or a shared diagnosis among governments.",
      sourceIds: [
        "notebook-source-adjustment-usitc",
        "notebook-source-adjustment-eu-bev",
        "notebook-source-adjustment-wto",
      ],
    },
  ],
  distributionCases: [
    {
      id: "distribution-chinese-households",
      group: "Chinese households",
      benefit:
        "Employment, cheaper domestic manufactures, and possible long-run productivity gains.",
      cost: "A low consumption share, precautionary saving, property losses, and financial risk from investment-heavy growth.",
      scope: "China's macro adjustment through 2025-26.",
      caveat:
        "Outcomes vary by income, region, age, household registration, and asset ownership.",
      sourceIds: [
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-imf-imbalances",
      ],
    },
    {
      id: "distribution-chinese-producers",
      group: "Chinese manufacturers and workers",
      benefit:
        "Scale, learning, capacity use, export revenue, and global market access.",
      cost: "Thin margins, price wars, consolidation, debt, trade barriers, and retaliation.",
      scope:
        "Electric vehicles and other tradable sectors, especially 2025-26.",
      caveat:
        "Firm ownership, subsidy exposure, profitability, and technical capability differ.",
      sourceIds: [
        "notebook-source-adjustment-iea-ev",
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-mofcom",
      ],
    },
    {
      id: "distribution-foreign-consumers",
      group: "Foreign consumers",
      benefit: "Lower prices and faster clean-technology adoption.",
      cost: "Tariff incidence, dependence, reduced choice after market exit, and transition risk.",
      scope: "Product- and destination-specific effects.",
      caveat:
        "A low import price is not a full lifecycle, resilience, labor, or security assessment.",
      sourceIds: [
        "notebook-source-adjustment-ecb",
        "notebook-source-adjustment-iea-ev",
        "notebook-source-adjustment-iea-etp",
      ],
    },
    {
      id: "distribution-input-users",
      group: "Foreign firms using Chinese inputs",
      benefit: "Lower component costs and possible production growth.",
      cost: "Supplier concentration, geopolitical exposure, and competition in the same product market.",
      scope: "EU sector evidence from 2000-22 with later trade context.",
      caveat: "Intermediate and final use can coexist in one sector.",
      sourceIds: [
        "notebook-source-adjustment-ecb",
        "notebook-source-adjustment-iea-etp",
      ],
    },
    {
      id: "distribution-exposed-workers",
      group: "Import-competing workers and regions",
      benefit:
        "Possible productivity spillovers and demand outside the exposed sector.",
      cost: "Persistent wage, participation, employment, lifetime-income, and community losses.",
      scope:
        "Historical US first-shock evidence; current effects are not assumed identical.",
      caveat:
        "National averages conceal local concentration, and historical estimates do not forecast Europe or today's sectors.",
      sourceIds: [
        "notebook-source-adjustment-nber",
        "notebook-source-adjustment-annual-review",
        "notebook-source-adjustment-ecb",
      ],
    },
    {
      id: "distribution-germany",
      group: "German and euro-area manufacturers",
      benefit:
        "Cheaper inputs and access to a larger global clean-technology market.",
      cost: "Lost market share in China, third markets, and at home.",
      scope: "Mixed periods through 2025-26.",
      caveat:
        "Germany's slowdown also reflects energy, demand, prices, product mix, localized production, and domestic structural conditions.",
      sourceIds: [
        "notebook-source-adjustment-cer",
        "notebook-source-adjustment-imf-germany",
        "notebook-source-adjustment-bundesbank",
        "notebook-source-adjustment-ecb",
      ],
    },
    {
      id: "distribution-emerging-markets",
      group: "Emerging-market consumers and governments",
      benefit: "Affordable electric vehicles and options to localize assembly.",
      cost: "Import dependence, pressure on local producers, inventory risk, and policy bargaining.",
      scope: "Electric-vehicle trade in 2025-26.",
      caveat:
        "Adoption benefits depend on electricity, charging, finance, product standards, and local policy.",
      sourceIds: [
        "notebook-source-adjustment-iea-ev",
        "notebook-source-adjustment-iea-etp",
      ],
    },
    {
      id: "distribution-taxpayers",
      group: "Foreign taxpayers and downstream firms",
      benefit:
        "Protected capacity, resilience, and learning if an intervention succeeds.",
      cost: "Subsidy expense, higher input prices, misallocation, rent seeking, and retaliation.",
      scope: "Instrument-specific evidence rather than an aggregate verdict.",
      caveat:
        "Production effects do not establish net welfare or current-account correction.",
      sourceIds: [
        "notebook-source-adjustment-usitc",
        "notebook-source-adjustment-imf-imbalances",
        "notebook-source-adjustment-imf-us",
        "notebook-source-adjustment-greer",
      ],
    },
  ],
  policyOptions: [
    {
      id: "policy-consumption-reform",
      label: "Chinese consumption and social-policy reform",
      targetProblem: "Excess saving and weak household demand.",
      mechanism:
        "Reduce precautionary saving and raise household purchasing power, domestic absorption, and imports.",
      payer:
        "Fiscal authorities, incumbent beneficiaries of investment-heavy growth, and reform losers.",
      tradeoff:
        "A stronger macro case does not resolve implementation, distribution, or political economy.",
      timeHorizon: "Medium to long",
      status: "interpretation",
      uncertainty:
        "The size and timing of household response to each reform component remain uncertain.",
      sourceIds: [
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-imf-external",
      ],
    },
    {
      id: "policy-exchange-rate",
      label: "Exchange-rate adjustment",
      targetProblem: "The relative-price contribution to the surplus.",
      mechanism: "Appreciation makes exports dearer and imports cheaper.",
      payer:
        "Exporters and holders of affected assets bear costs; consumers may gain.",
      tradeoff:
        "A real-rate channel is supported, while the scale and policy-intent claims remain contested.",
      timeHorizon: "Short to medium",
      status: "contested",
      uncertainty:
        "IMF and stronger outside undervaluation estimates use different methods and cannot be merged.",
      sourceIds: [
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-cer",
      ],
    },
    {
      id: "policy-targeted-defense",
      label: "Targeted trade defense",
      targetProblem: "Injury in a defined product and market.",
      mechanism:
        "A tariff, duty, quota, or price undertaking creates space for local production or bargaining.",
      payer:
        "Importers, consumers, downstream firms, administrators, and retaliated-against exporters.",
      tradeoff:
        "Sector production can rise alongside higher prices without correcting the aggregate balance.",
      timeHorizon: "Short to medium",
      status: "observed",
      uncertainty:
        "Effects outside the investigated products and periods require separate evidence.",
      sourceIds: [
        "notebook-source-adjustment-usitc",
        "notebook-source-adjustment-eu-bev",
      ],
    },
    {
      id: "policy-industrial-policy",
      label: "Domestic industrial policy",
      targetProblem:
        "Capacity, learning, resilience, and technology externalities.",
      mechanism:
        "Finance production, infrastructure, research, procurement, and workforce development.",
      payer:
        "Taxpayers, competing sectors, consumers if costs rise, and firms exposed to policy reversal.",
      tradeoff:
        "Learning and resilience must be weighed against rent seeking, misallocation, and opportunity cost.",
      timeHorizon: "Medium to long",
      status: "contested",
      uncertainty:
        "Results depend on the target failure, performance discipline, spillovers, and exit rules.",
      sourceIds: [
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-mofcom",
        "notebook-source-adjustment-wto",
      ],
    },
    {
      id: "policy-allied-coordination",
      label: "Allied-market coordination",
      targetProblem:
        "Leakage, transshipment, subsidy races, and fragmented bargaining.",
      mechanism:
        "Align standards, remedies, procurement, and market access across destinations.",
      payer:
        "Partners surrender some discretion and may face retaliation or uneven burdens.",
      tradeoff:
        "Coordination can expand leverage while making agreement and burden sharing harder.",
      timeHorizon: "Medium",
      status: "interpretation",
      uncertainty:
        "Partners do not necessarily share one diagnosis, sector priority, or willingness to pay.",
      sourceIds: [
        "notebook-source-adjustment-imf-external",
        "notebook-source-adjustment-wto",
      ],
    },
    {
      id: "policy-localization",
      label: "Localization and investment-linked access",
      targetProblem: "Import displacement without abandoning the technology.",
      mechanism:
        "Tie market access to local assembly, supplier development, employment, or investment.",
      payer:
        "Firms bear capital and compliance costs; governments may subsidize; consumers may pay more.",
      tradeoff:
        "Local assembly can add capacity without transferring ownership, technology, or resilient inputs.",
      timeHorizon: "Medium to long",
      status: "observed",
      uncertainty:
        "The local share of value, jobs, know-how, and supply security varies by project.",
      sourceIds: [
        "notebook-source-adjustment-iea-ev",
        "notebook-source-adjustment-eu-bev",
      ],
    },
    {
      id: "policy-diversification",
      label: "Diversification",
      targetProblem: "Concentration and coercion risk.",
      mechanism:
        "Add suppliers, inventories, substitutes, and route options rather than eliminate trade.",
      payer:
        "Buyers accept duplication, working capital, compliance expense, and possibly higher prices.",
      tradeoff:
        "Redundancy can improve resilience while reducing efficiency and scale.",
      timeHorizon: "Medium to long",
      status: "interpretation",
      uncertainty: "The efficient amount of redundancy is sector-specific.",
      sourceIds: [
        "notebook-source-adjustment-iea-etp",
        "notebook-source-adjustment-wto",
      ],
    },
    {
      id: "policy-broad-tariffs",
      label: "Broad tariffs",
      targetProblem:
        "Bilateral deficits, bargaining pressure, or general protection.",
      mechanism:
        "Compress targeted imports and possibly induce production relocation.",
      payer:
        "Importers, consumers, downstream firms, exporters facing retaliation, and affected allies.",
      tradeoff:
        "Production effects can coexist with price increases, retaliation, diversion, and weak aggregate-balance correction.",
      timeHorizon: "Short to medium",
      status: "contested",
      uncertainty:
        "Greer's policy argument and IMF macro assessment disagree about central mechanisms and weights.",
      sourceIds: [
        "notebook-source-adjustment-greer",
        "notebook-source-adjustment-usitc",
        "notebook-source-adjustment-imf-imbalances",
        "notebook-source-adjustment-imf-us",
      ],
    },
    {
      id: "policy-worker-adjustment",
      label: "Worker and place adjustment policy",
      targetProblem: "Concentrated local losses.",
      mechanism:
        "Combine income support, mobility, training, health, place investment, and transition assistance.",
      payer: "General revenues and program participants.",
      tradeoff:
        "Support can spread adjustment costs while program design can miss people, places, or durable demand loss.",
      timeHorizon: "Immediate to long",
      status: "interpretation",
      uncertainty:
        "The first-shock record establishes need; program effectiveness needs separate evidence.",
      sourceIds: [
        "notebook-source-adjustment-nber",
        "notebook-source-adjustment-annual-review",
      ],
    },
  ],
  claimAudit: [
    {
      id: "audit-adjustment-renewed-surge",
      claim:
        "A renewed Chinese export surge is occurring from a much larger base.",
      status: "independentlyObserved",
      decision: "retain",
      assessment:
        "Fed measures support the direction and scale, with export share, surplus dollars, and rest-of-world GDP kept as separate denominators.",
      sourceIds: ["notebook-source-adjustment-fed"],
    },
    {
      id: "audit-adjustment-one-cause",
      claim: "China Shock 2.0 has one cause: state subsidies.",
      status: "contested",
      decision: "exclude",
      assessment:
        "Productivity, innovation, demand, finance, industrial policy, import substitution, and currency channels remain distinct and disputed.",
      sourceIds: [
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-mofcom",
        "notebook-source-adjustment-wto",
      ],
    },
    {
      id: "audit-adjustment-households",
      claim: "Chinese households are among those absorbing the adjustment.",
      status: "reported",
      decision: "retain",
      assessment:
        "Weak consumption, property exposure, precautionary saving, and social-policy evidence support a bounded distributional claim.",
      sourceIds: [
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-imf-imbalances",
      ],
    },
    {
      id: "audit-adjustment-no-safety-net",
      claim: "China has no social safety net.",
      status: "contested",
      decision: "exclude",
      assessment:
        "The absolute erases existing programs and differences in coverage; component-specific comparative evidence is required.",
      sourceIds: ["notebook-source-adjustment-imf-china"],
    },
    {
      id: "audit-adjustment-excess-capacity",
      claim: "China has economy-wide excess capacity.",
      status: "contested",
      decision: "qualify",
      assessment:
        "The evidence can identify excess supply in some tradable sectors, while capacity, utilization, demand, prices, profits, and exports must remain distinct.",
      sourceIds: [
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-mofcom",
        "notebook-source-adjustment-wto",
      ],
    },
    {
      id: "audit-adjustment-currency",
      claim: "China's currency is deliberately held 16%-30% undervalued.",
      status: "contested",
      decision: "qualify",
      assessment:
        "The IMF real-rate channel and stronger outside intervention estimates use different methods and authority and cannot be combined into one fact.",
      sourceIds: [
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-cer",
      ],
    },
    {
      id: "audit-adjustment-germany-cause",
      claim: "Germany's net-export loss since 2023 was caused by China.",
      status: "contested",
      decision: "qualify",
      assessment:
        "The CER makes a strong China-centered argument; IMF and Bundesbank assessments retain energy, demand, price, product, and domestic factors.",
      sourceIds: [
        "notebook-source-adjustment-cer",
        "notebook-source-adjustment-imf-germany",
        "notebook-source-adjustment-bundesbank",
      ],
    },
    {
      id: "audit-adjustment-clean-tech-threat",
      claim: "Cheap Chinese clean technology only threatens foreign economies.",
      status: "contested",
      decision: "exclude",
      assessment:
        "Prices, inputs, adoption, climate, displacement, concentration, and security create different benefits and costs.",
      sourceIds: [
        "notebook-source-adjustment-ecb",
        "notebook-source-adjustment-iea-ev",
        "notebook-source-adjustment-iea-etp",
      ],
    },
    {
      id: "audit-adjustment-output-workers",
      claim:
        "Manufacturing output proves manufacturing workers were not harmed.",
      status: "contested",
      decision: "exclude",
      assessment:
        "Output, productivity, hours, employment, wages, and local exposure move differently and cannot substitute for one another.",
      sourceIds: [
        "notebook-source-adjustment-bls",
        "notebook-source-adjustment-nber",
      ],
    },
    {
      id: "audit-adjustment-repeat",
      claim:
        "The first China shock proves the second will repeat its exact labor effects.",
      status: "contested",
      decision: "exclude",
      assessment:
        "Historical research establishes plausible mechanisms and questions, not a forecast for a different product mix, geography, and policy setting.",
      sourceIds: [
        "notebook-source-adjustment-nber",
        "notebook-source-adjustment-annual-review",
        "notebook-source-adjustment-fed",
      ],
    },
    {
      id: "audit-adjustment-targeted-tariffs",
      claim:
        "Targeted tariffs can raise domestic production in affected sectors.",
      status: "independentlyObserved",
      decision: "retain",
      assessment:
        "USITC found a 0.4% production increase in directly affected sectors during 2018-21 alongside a 0.2% price increase and lower imports.",
      sourceIds: ["notebook-source-adjustment-usitc"],
    },
    {
      id: "audit-adjustment-current-account",
      claim: "Tariffs reliably eliminate aggregate current-account deficits.",
      status: "contested",
      decision: "exclude",
      assessment:
        "IMF analysis finds tariff effects modest and uncertain, with saving, investment, fiscal, and consumption policies central to aggregate balances.",
      sourceIds: [
        "notebook-source-adjustment-imf-imbalances",
        "notebook-source-adjustment-imf-us",
        "notebook-source-adjustment-greer",
      ],
    },
    {
      id: "audit-adjustment-industrial-policy",
      claim: "Industrial policy is either always necessary or always wasteful.",
      status: "contested",
      decision: "exclude",
      assessment:
        "Judgment depends on the target failure, discipline, spillovers, opportunity cost, incidence, and evidence for each instrument.",
      sourceIds: [
        "notebook-source-adjustment-imf-china",
        "notebook-source-adjustment-mofcom",
        "notebook-source-adjustment-wto",
      ],
    },
    {
      id: "audit-adjustment-ai-observed",
      claim: "AI and software constitute China Shock 3.0 today.",
      status: "contested",
      decision: "exclude",
      assessment:
        "The episode raises a scenario and Stanford supplies capability indicators; neither establishes an observed trade or labor-market shock.",
      sourceIds: [
        "notebook-source-adjustment-episode",
        "notebook-source-adjustment-ai-index",
      ],
    },
  ],
  sections: {
    why: [
      "The phrase China Shock compresses several different events into one dramatic label. The first task is to unpack the chain: domestic demand and industrial capacity shape a trade balance; foreign markets absorb goods, inputs, and investment; local labor and production systems then register different outcomes.",
      "The scale is real. Federal Reserve staff report that China's share of global exports rose from 13.1% in 2018 to 16.3% in 2024, while its 2025 goods surplus reached $1.2 trillion and exceeded 1% of rest-of-world GDP. Those are three different measures, retained with their periods and denominators.",
    ],
    verdict: [
      "Shock is fair when it means a rapid, large, and uneven adjustment in trade exposure and production. It is misleading when it becomes a moral verdict on Chinese competitiveness, a claim that every recipient loses, or a shortcut from one diagnosis to one policy.",
      "The second episode differs from the first in starting scale, product mix, destinations, import linkage, and policy environment. The historical record makes local adjustment risk credible; it does not predetermine today's result.",
    ],
    mechanism: [
      "A factory system has a balance of payments. When households consume less relative to production and investment, more output must be absorbed elsewhere or not produced. Yet the path is not mechanical: productivity, finance, prices, exchange rates, imports, and policy all change the route.",
      "Arrows in the five-stage figure mean transmission, not single-cause proof. Each stage shows what the reviewed record measures and what it leaves unresolved.",
    ],
    distribution: [
      "A cheap imported electric vehicle can raise a household's purchasing power, accelerate clean-technology adoption, lower a firm's input cost, displace an exposed producer, weaken a local tax base, and prompt a tariff that raises prices again. These outcomes can coexist.",
      "The useful question is therefore not whether trade is good or bad in the abstract. It is who receives what, over which period, through which product and institution, and with which ability to adjust.",
    ],
    policy: [
      "Policy arguments become legible only after naming the target. Household reform addresses domestic absorption; exchange-rate adjustment changes relative prices; targeted duties address defined injury; industrial policy addresses learning or resilience; worker policy addresses concentrated loss.",
      "No instrument is free. The policy matrix names who pays, the expected horizon, the strongest evidence status, and an uncertainty that survives the intervention.",
    ],
    scenario: [
      "The episode's AI and software discussion is a scenario, not an observed third shock. A March 2026 Stanford benchmark placed the leading US model 2.7% ahead of the leading Chinese model, while measured US private AI investment exceeded China's by more than 23 times. Those indicators describe only parts of capability.",
      "Evidence of a software shock would require observed cross-border substitution, price or margin changes, firm and worker exposure, adoption pathways, and durable local effects. Benchmark convergence alone is not that evidence.",
    ],
    changed: [
      "The research began with a broad claim about export pressure. Source review replaced it with a five-stage adjustment model and separated aggregate balances from product injury, industrial capability, and local outcomes.",
      "The publisher audio audit added six exact passage maps. It also excluded a single-cause subsidy claim, an automatic Germany attribution, a universal tariff verdict, and an observed AI shock.",
    ],
  },
  sourceTrail: [
    {
      id: "notebook-source-adjustment-episode",
      role: "Initiating publisher record",
      title: "The China Shock 2.0",
      publisher: "The Ezra Klein Show - New York Times Opinion",
      author: "Ezra Klein with Brad Setser",
      publishedAt: "2026-08-21",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Episode",
          url: "https://the-ezra-klein-show.simplecast.com/episodes/brad-setser",
        },
        { label: "Official RSS", url: "https://feeds.simplecast.com/82FI35Px" },
      ],
      context:
        "Publisher record for the guest, release date, 1:05:30 runtime, show framing, and manually audited audio passages.",
      limitation:
        "The show initiates the inquiry but does not independently establish its economic claims.",
    },
    {
      id: "notebook-source-adjustment-transcript",
      role: "Access-limited publisher record",
      title: "The China Shock 2.0 transcript destination",
      publisher: "New York Times Opinion",
      publishedAt: "2026-08-21",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Publisher page",
          url: "https://www.nytimes.com/2026/08/21/opinion/ezra-klein-podcast-brad-setser.html",
        },
      ],
      context:
        "The publisher-designated transcript destination was rechecked on the publication date.",
      limitation:
        "The page remained inaccessible in review; no transcript-only claim or quotation is used.",
    },
    {
      id: "notebook-source-adjustment-fed",
      role: "Primary economic analysis",
      title:
        "China Shock 2.0: How China's Ongoing Export Surge Differs from the Early 2000s",
      publisher: "Board of Governors of the Federal Reserve System",
      publishedAt: "2026-05-29",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "FEDS Note",
          url: "https://www.federalreserve.gov/econres/notes/feds-notes/china-shock-2-0-how-china-ongoing-export-surge-differs-from-the-early-2000s-20260529.html",
        },
      ],
      context:
        "Documents the higher-base export expansion, record goods surplus, product composition, and changing destinations.",
      limitation:
        "Export share, surplus dollars, and surplus as a share of rest-of-world GDP use different denominators.",
    },
    {
      id: "notebook-source-adjustment-cer",
      role: "Policy argument",
      title: "China shock 2.0",
      publisher: "Centre for European Reform",
      author: "Sander Tordoir and Brad Setser",
      publishedAt: "2026-05",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Policy brief",
          url: "https://www.cer.eu/sites/default/files/pb_BS_ST_china_shock_2.0_18.5.26.pdf",
        },
      ],
      context:
        "Connects weak demand, property, industrial support, import substitution, currency, exports, and German exposure.",
      limitation:
        "A strong Germany-focused policy argument, not a settled causal decomposition.",
    },
    {
      id: "notebook-source-adjustment-cfr",
      role: "Customs-data interpretation",
      title: "Is China's Surplus Really Shrinking?",
      publisher: "Council on Foreign Relations",
      author: "Brad Setser",
      publishedAt: "2026-07-27",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Analysis",
          url: "https://www.cfr.org/articles/is-chinas-surplus-really-shrinking",
        },
      ],
      context:
        "Decomposes early-2026 customs data and argues that exceptional gold imports and chip prices obscure a rising manufacturing surplus.",
      limitation:
        "An author's decomposition, not an official national-accounts revision.",
    },
    {
      id: "notebook-source-adjustment-imf-china",
      role: "Institutional assessment",
      title: "People's Republic of China: 2025 Article IV Consultation",
      publisher: "International Monetary Fund",
      publishedAt: "2026-02-18",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "China Article IV country report",
          url: "https://www.imf.org/en/publications/cr/issues/2026/02/17/peoples-republic-of-china-2025-article-iv-consultation-press-release-staff-report-and-574028",
        },
      ],
      context:
        "Assesses property adjustment, weak demand, exchange rates, exports, excess supply in some sectors, and social-policy reform.",
      limitation:
        "IMF staff and Board assessment includes a Chinese Executive Director statement and areas of disagreement.",
    },
    {
      id: "notebook-source-adjustment-imf-external",
      role: "Institutional macro assessment",
      title: "2026 External Sector Report",
      publisher: "International Monetary Fund",
      publishedAt: "2026-07",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "External Sector Report",
          url: "https://www.imf.org/en/publications/esr/issues/2026/07/30/external-sector-report-2026",
        },
      ],
      context:
        "Finds wider 2025 current-account imbalances and identifies Chinese and US domestic imbalances among principal drivers.",
      limitation:
        "A current account is saving minus investment across the economy, not a bilateral goods balance.",
    },
    {
      id: "notebook-source-adjustment-imf-imbalances",
      role: "Institutional policy analysis",
      title: "Global Imbalances: Old Questions, New Answers?",
      publisher: "International Monetary Fund",
      publishedAt: "2026-04-06",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "IMF Blog",
          url: "https://www.imf.org/en/blogs/articles/2026/04/06/global-imbalances-old-questions-new-answers",
        },
      ],
      context:
        "Finds modest and uncertain aggregate current-account effects from tariffs relative to saving, investment, fiscal, and consumption policies.",
      limitation:
        "The macro finding does not deny sector-specific tariff effects.",
    },
    {
      id: "notebook-source-adjustment-ecb",
      role: "Econometric and model evidence",
      title: "The impact of China's industrial rise on the euro area",
      publisher: "European Central Bank",
      publishedAt: "2026",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Economic Bulletin",
          url: "https://www.ecb.europa.eu/press/economic-bulletin/focus/2026/html/ecb.ebbox202603_02~7df7facd9a.de.html",
        },
      ],
      context:
        "Separates cheaper Chinese inputs from final-goods competition and models aggregate gains alongside longer-run scarring.",
      limitation:
        "Econometrics use 2000-22 exposure; later results are simulations with explicit shock scaling.",
    },
    {
      id: "notebook-source-adjustment-mofcom",
      role: "Official Chinese position",
      title: "China's Position on the So-called Excess Capacity Issue",
      publisher: "Ministry of Commerce of the People's Republic of China",
      publishedAt: "2026-07-28",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Official statement",
          url: "https://english.mofcom.gov.cn/News/SignificantNews/art/2026/art_1cc81037c291427ba64e696b6fbc0ad6.html",
        },
      ],
      context:
        "Rejects a simple equation among exports, surplus, and excess capacity and emphasizes productivity, innovation, scale, and green demand.",
      limitation:
        "Authoritative for the government's position, not independent adjudication of every sector or support measure.",
    },
    {
      id: "notebook-source-adjustment-iea-ev",
      role: "Sector evidence",
      title: "Global EV Outlook 2026: Manufacturing and trade",
      publisher: "International Energy Agency",
      publishedAt: "2026",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Report chapter",
          url: "https://www.iea.org/reports/global-ev-outlook-2026/manufacturing-and-trade",
        },
      ],
      context:
        "Reports Chinese electric-vehicle production, domestic demand, exports, destinations, and localization.",
      limitation:
        "Production, capacity, demand, exports, overseas sales, brands, and headquarters are distinct scopes.",
    },
    {
      id: "notebook-source-adjustment-iea-etp",
      role: "Technology supply-chain assessment",
      title: "Energy Technology Perspectives 2026",
      publisher: "International Energy Agency",
      publishedAt: "2026",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Energy Technology Perspectives executive summary",
          url: "https://www.iea.org/reports/energy-technology-perspectives-2026/executive-summary",
        },
      ],
      context:
        "Assesses how scale manufacturing lowers clean-technology costs while concentrating supply and prompting localization.",
      limitation:
        "Historical observations and 2035 scenarios must remain separate.",
    },
    {
      id: "notebook-source-adjustment-ai-index",
      role: "Scenario input",
      title: "2026 AI Index Report",
      publisher:
        "Stanford Institute for Human-Centered Artificial Intelligence",
      publishedAt: "2026",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "AI Index",
          url: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
        },
      ],
      context:
        "Supplies selected benchmark and private-investment indicators for an AI competition scenario.",
      limitation:
        "A benchmark and private-investment measure do not establish ecosystem parity or a labor shock.",
    },
    {
      id: "notebook-source-adjustment-nber",
      role: "Historical labor research",
      title:
        "The China Shock: Learning from Labor Market Adjustment to Large Changes in Trade",
      publisher: "National Bureau of Economic Research",
      author: "David Autor, David Dorn, and Gordon Hanson",
      publishedAt: "2016-01",
      retrievedAt: "2026-08-26",
      links: [
        { label: "Working paper", url: "https://www.nber.org/papers/w21906" },
      ],
      context:
        "Documents slow, concentrated local adjustment, wages, participation, unemployment, job churn, and lifetime-income effects.",
      limitation:
        "Historical US evidence does not mechanically forecast today's sectors or countries.",
    },
    {
      id: "notebook-source-adjustment-annual-review",
      role: "Historical literature review",
      title: "Lessons from US-China Trade Relations",
      publisher: "Annual Review of Economics",
      author: "Lorenzo Caliendo and Fernando Parro",
      publishedAt: "2023-09",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Review",
          url: "https://www.annualreviews.org/content/journals/10.1146/annurev-economics-082222-082019",
        },
      ],
      context:
        "Reviews aggregate gains, winners and losers, manufacturing-employment attribution, and trade-war welfare and employment findings.",
      limitation:
        "Later policy and technology conditions differ from the reviewed episodes.",
    },
    {
      id: "notebook-source-adjustment-usitc",
      role: "Official tariff-effects investigation",
      title:
        "Economic Impact of Section 232 and 301 Tariffs on U.S. Industries",
      publisher: "United States International Trade Commission",
      publishedAt: "2023-03-15",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "News release and report",
          url: "https://www.usitc.gov/press_room/news_release/2023/er0315_63679.htm",
        },
      ],
      context:
        "Finds lower affected imports, higher affected US production, higher prices, and tariff costs borne primarily by importers in 2018-21.",
      limitation:
        "Directly affected sectors only, not a complete welfare or current-account assessment.",
    },
    {
      id: "notebook-source-adjustment-imf-germany",
      role: "Country assessment",
      title: "Germany: 2025 Article IV Consultation",
      publisher: "International Monetary Fund",
      publishedAt: "2026",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Germany Article IV country report",
          url: "https://www.elibrary.imf.org/view/journals/002/2026/036/article-A001-en.xml",
        },
      ],
      context:
        "Decomposes Germany's China trade deterioration across Chinese demand and productivity, property, energy, exchange rates, products, and localization.",
      limitation:
        "The IMF found limited 2025 evidence of a large US-tariff diversion surge into Germany.",
    },
    {
      id: "notebook-source-adjustment-bundesbank",
      role: "National central-bank analysis",
      title:
        "What contribution has diminished price competitiveness made to the recent weakness in German exports?",
      publisher: "Deutsche Bundesbank",
      publishedAt: "2026-07-27",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Monthly Report",
          url: "https://publikationen.bundesbank.de/publikationen-en/reports-studies/monthly-reports/monthly-report-july-2026-1003480?article=what-contribution-has-diminished-price-competitiveness-made-to-the-recent-weakness-in-german-exports--1003536",
        },
      ],
      context:
        "Estimates price competitiveness and foreign demand contributions to Germany's 2022-25 export-growth gap.",
      limitation:
        "Counterfactual panel estimates exclude structural product mix and some sector costs.",
    },
    {
      id: "notebook-source-adjustment-bls",
      role: "Official labor and output data",
      title: "Trends in manufacturing output and hours worked, 2007-2026",
      publisher: "US Bureau of Labor Statistics",
      publishedAt: "2026-06",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Output and hours",
          url: "https://www.bls.gov/opub/ted/2026/trends-in-manufacturing-output-and-hours-worked-2007-2026.htm",
        },
        {
          label: "Industry highlights",
          url: "https://www.bls.gov/productivity/highlights/manufacturing-mining-labor-productivity.htm",
        },
      ],
      context:
        "Shows that manufacturing output, labor hours, productivity, employment, and GDP share are different measures.",
      limitation:
        "Aggregate indexes do not answer every question about physical volume, quality, value added, or regional jobs.",
    },
    {
      id: "notebook-source-adjustment-wto",
      role: "Multilateral review context",
      title: "China Trade Policy Review: Chairperson's concluding remarks",
      publisher: "World Trade Organization",
      publishedAt: "2024-07",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Review summary",
          url: "https://www.wto.org/english/tratop_e/tpr_e/tp558_crc_e.htm",
        },
      ],
      context:
        "Summarizes member praise and concerns about transparency, overcapacity, state-owned firms, procurement, and import substitution.",
      limitation:
        "Member views are not WTO adjudication that every concern is proved.",
    },
    {
      id: "notebook-source-adjustment-eu-bev",
      role: "Product-specific policy record",
      title: "Guidance on price undertakings for battery electric vehicles",
      publisher: "European Commission",
      publishedAt: "2026-01-12",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Guidance",
          url: "https://policy.trade.ec.europa.eu/news/commission-issues-guidance-document-submission-price-undertaking-offers-battery-electric-vehicles-2026-01-12_en",
        },
      ],
      context:
        "Records definitive countervailing duties of 7.8%-35.3% and criteria for price undertakings.",
      limitation:
        "A product-specific EU finding is not proof that all Chinese exports or support are equivalent.",
    },
    {
      id: "notebook-source-adjustment-imf-us",
      role: "Institutional US assessment",
      title: "United States: 2026 Article IV mission concluding statement",
      publisher: "International Monetary Fund",
      publishedAt: "2026-02-25",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Staff statement",
          url: "https://www.imf.org/en/news/articles/2026/02/25/cs-02252026-united-states-of-america-staff-concluding-statement-of-the-2026-article-iv-mission",
        },
      ],
      context:
        "Expects tariffs to raise US prices and lower output while the current-account deficit remains large.",
      limitation:
        "A preliminary IMF staff view rather than a final Executive Board report.",
    },
    {
      id: "notebook-source-adjustment-greer",
      role: "Official US policy counterargument",
      title: "Economics for the Real Economy",
      publisher: "IMF Finance & Development",
      author: "Jamieson Greer",
      publishedAt: "2026-05-29",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Argument",
          url: "https://www.imf.org/en/publications/fandd/issues/2026/06/straight-talk-economics-for-the-real-economy",
        },
      ],
      context:
        "Argues that conventional models omit tariff-induced relocation and that tariffs are a practical source-targeted tool.",
      limitation: "The author's policy argument is explicitly not IMF policy.",
    },
    {
      id: "notebook-source-adjustment-reddit",
      role: "Question generator only",
      title: "Reader discussion of The China Shock 2.0",
      publisher: "Reddit",
      publishedAt: "2026-08-21",
      retrievedAt: "2026-08-26",
      links: [
        {
          label: "Discussion",
          url: "https://www.reddit.com/r/ezraklein/comments/1vueio5/china_shock_20_brad_sester/",
        },
      ],
      context:
        "Supplied questions about output versus jobs, social protection, threat rhetoric, and disciplined industrial policy.",
      limitation:
        "Anonymous discussion context, not evidence; no username, score, or quotation appears in public copy.",
    },
  ],
  unresolvedQuestion:
    "Which product-and-place combinations now show both rapid Chinese trade exposure and persistent local adjustment after separating final goods, intermediate inputs, local assembly, prices, output, employment, and policy response?",
  limitations: [
    "The publisher transcript remained inaccessible, so episode claims are attributed paraphrases checked against the official audio rather than quotations.",
    "The twenty-four source stops use different periods, geographies, methods, units, and denominators; the page does not combine them into one score.",
    "Historical first-shock evidence establishes mechanisms and risks, not a forecast that current products, places, or policies will produce identical outcomes.",
    "The policy matrix compares target problems and incidence; it does not rank instruments with different objectives.",
    "The AI and software section is a scenario test, not evidence of an observed third shock.",
  ],
});
