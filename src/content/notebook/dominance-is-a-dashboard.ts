import {
  parseNotebookEntry,
  type PowerBalanceNotebookEntry,
} from "@/content/notebook/schema";

const nprUrl =
  "https://www.npr.org/2026/08/12/nx-s1-5928224/has-the-u-s-lost-its-dominance-to-china";

export const dominanceIsADashboard = parseNotebookEntry({
  variant: "power-balance",
  ordinal: 3,
  slug: "dominance-is-a-dashboard",
  title: "Dominance Is a Dashboard, Not a Crown",
  subtitle:
    "China leads in industrial scale and several strategic supply chains. How do those advantages compare with American financial, military, and technological strengths?",
  description:
    "A source-audited field guide to the dimensions of US–China power: manufacturing, technology, science, finance, military capacity, history, and demography.",
  thesis:
    "There has been no single handoff of global dominance. China now holds extraordinary advantages in manufacturing scale, clean-technology supply chains, and parts of the scientific pipeline; the United States retains much larger nominal capital, military spending, reserve-currency reach, and private AI investment. The balance is a moving, non-additive dashboard whose consequences depend on institutions, alliances, bottlenecks, and political choices.",
  frontPagePreview: {
    finding:
      "China's manufacturing scale is an observed strategic advantage, while finance, military spending, research impact, alliances, and private AI investment remain separate dimensions with different leaders.",
    status: "observed",
    caveat:
      "The measures use different units, dates, and denominators; they cannot be added into one national-power score or a single date of succession.",
    sourceIds: [
      "notebook-source-unido-yearbook-2025",
      "notebook-source-stanford-ai-2026",
    ],
  },
  presentationUpdatedAt: "2026-09-07",
  publishedAt: "2026-08-14",
  updatedAt: "2026-08-14",
  readTime: "24 min",
  tags: [
    "US–China relations",
    "Industrial power",
    "Science and technology",
    "Demography",
    "Economic history",
  ],
  editorialStatus: "published",
  reviewState: "source-reviewed",
  formats: [
    {
      id: "format-dominance-listen",
      label: "Listen",
      title: "Has the U.S. lost its dominance to China?",
      publisher: "Fresh Air · NPR",
      duration: "44:29",
      url: nprUrl,
      retrievedAt: "2026-08-14",
      note: "Terry Gross’s August 12 interview with Evan Osnos supplies the initiating question. The audio, not the machine-assisted transcript, is the controlling episode record.",
    },
    {
      id: "format-dominance-transcript",
      label: "Read",
      title: "Transcript: Has the U.S. lost its dominance to China?",
      publisher: "Fresh Air · NPR",
      url: "https://www.npr.org/transcripts/nx-s1-5928224",
      retrievedAt: "2026-08-14",
      note: "A publisher transcript makes the argument inspectable, but NPR warns that its transcript may be revised and may vary from the audio.",
    },
    {
      id: "format-dominance-feature",
      label: "Read",
      title: "The Future Made in China",
      publisher: "The New Yorker",
      url: "https://www.newyorker.com/magazine/2026/08/10/the-future-made-in-china",
      retrievedAt: "2026-08-14",
      note: "Evan Osnos’s reported feature is the interview’s narrative foundation. Its examples prompt questions; the numerical dashboard below is checked against primary or specialist records.",
    },
  ],
  turningPoints: [
    {
      id: "turning-dominance-industrial",
      timecode: "Transcript · opening",
      title: "The factory system is the strongest case",
      status: "interpretation",
      argument:
        "The interview begins from China’s command of drones, electric vehicles, batteries, solar manufacturing, and increasingly capable factories, presenting production capacity as the material base of national power.",
      reading:
        "The direction is well supported, but the sectors cannot be rolled into one percentage. UNIDO, the IEA, and the International Federation of Robotics each measure a different layer: value added, product output, supply-chain capacity, or annual installation.",
      sourceIds: [
        "notebook-source-npr-dominance",
        "notebook-source-unido-yearbook-2025",
        "notebook-source-iea-ev-2026",
        "notebook-source-ifr-robotics-2025",
      ],
    },
    {
      id: "turning-dominance-science",
      timecode: "Transcript · science section",
      title: "The frontier is becoming plural",
      status: "observed",
      argument:
        "The conversation points to the movement of Chinese-origin scientists and China’s fast rise in clinical research as evidence that the United States can no longer assume a permanent monopoly on frontier knowledge.",
      reading:
        "That warning survives, with narrower language. China led 2024 publication volume and approached the United States in PPP-comparable R&D and early-stage drug programs; the United States still led several impact, collaboration, model, patent-quality, and private-investment measures.",
      sourceIds: [
        "notebook-source-npr-dominance",
        "notebook-source-ncses-2026",
        "notebook-source-jama-biopharma-2026",
        "notebook-source-stanford-ai-2026",
        "notebook-source-pnas-scientists",
      ],
    },
    {
      id: "turning-dominance-demography",
      timecode: "Transcript · demography section",
      title: "A shrinking population is a constraint, not a timer",
      status: "interpretation",
      argument:
        "Osnos treats rapid aging and very low birth totals as a serious Chinese liability while emphasizing automation as Beijing’s answer to a smaller workforce.",
      reading:
        "China’s population fell in 2025 and its 60-plus share reached 23 percent. Yet the United States also has a large older population, and migration changes its arithmetic. Demography alters fiscal burdens, labor supply, consumption, and innovation; it does not announce a date when power expires.",
      sourceIds: [
        "notebook-source-npr-dominance",
        "notebook-source-china-nbs-2025",
        "notebook-source-census-2025",
      ],
    },
    {
      id: "turning-dominance-power",
      timecode: "Transcript · closing",
      title: "Capability is not the same as freedom of action",
      status: "interpretation",
      argument:
        "The closing exchange distinguishes China’s growing technological leverage from America’s still-enormous military power and asks whether either country can convert capacity into durable global influence.",
      reading:
        "That distinction is the inquiry’s organizing rule. Spending, reserve currencies, industrial chokepoints, scientific networks, alliances, and political legitimacy are different forms of power. They interact, but no responsible conversion rate turns them into a single winner.",
      sourceIds: [
        "notebook-source-npr-dominance",
        "notebook-source-sipri-2026",
        "notebook-source-imf-cofer-2026q1",
        "notebook-source-iea-minerals-2026",
      ],
    },
  ],
  audio: {
    sourceId: "notebook-source-npr-dominance",
    canonicalUrl: nprUrl,
    mediaUrl:
      "https://ondemand.npr.org/anon.npr-mp3/npr/specials/2026/08/20260812_specials_has_the_u.s._lost_its_dominance_to_china.mp3?t=fullprog&e=g-s1-138410&p=13&seg=0&d=2669&size=42710040&sc=siteplayer&aw_0_1st.playerid=siteplayer",
    publisher: "NPR",
    duration: "44:29",
    reviewedAt: "2026-08-14",
    transcriptAvailable: true,
  },
  claimAudit: [
    {
      id: "audit-dominance-sector-lead",
      claim:
        "China leads in electric vehicles, battery cells, solar supply chains, and industrial robot installations.",
      status: "independentlyObserved",
      decision: "retain",
      assessment:
        "Specialist 2025 and 2026 records support the direction: China produced nearly three quarters of electric cars in 2025, made more than four fifths of battery cells, held about 85 percent of solar supply-chain capacity, and accounted for 54 percent of new industrial-robot installations in 2024. Each percentage describes a different denominator and year.",
      sourceIds: [
        "notebook-source-iea-ev-2026",
        "notebook-source-iea-etp-2026",
        "notebook-source-ifr-robotics-2025",
      ],
    },
    {
      id: "audit-dominance-seventy-percent",
      claim:
        "China controls more than 70 percent of the world total across electric vehicles, batteries, and solar.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "A single blended share would hide unlike units. The IEA reports nearly 75 percent of electric-car production, more than 80 percent of battery-cell production, and about 85 percent of solar supply-chain capacity. This Notebook displays those series separately and does not average them.",
      sourceIds: [
        "notebook-source-npr-dominance",
        "notebook-source-iea-ev-2026",
        "notebook-source-iea-etp-2026",
      ],
    },
    {
      id: "audit-dominance-scientists",
      claim:
        "Nearly 20,000 scientists of Chinese descent left the United States between 2010 and 2021.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "The underlying PNAS study supports nearly 20,000 departures to all destination countries, not 20,000 moves to China. It found that China’s share of those destinations rose substantially and that fear, research climate, and family ties were associated with decisions to leave.",
      sourceIds: [
        "notebook-source-npr-dominance",
        "notebook-source-pnas-scientists",
      ],
    },
    {
      id: "audit-dominance-biopharma",
      claim:
        "China now originates almost one third of promising pharmaceutical compounds.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "The JAMA study found China-originated early-stage development programs rose to 32.3 percent of the global total in 2024, near the US share of 37.4 percent. It did not grade quality, measure approvals, or establish the eventual clinical value of every program.",
      sourceIds: [
        "notebook-source-npr-dominance",
        "notebook-source-jama-biopharma-2026",
      ],
    },
    {
      id: "audit-dominance-hyperfactory",
      claim:
        "Xiaomi’s Hyperfactory uses roughly 200 robots and can complete a car every 76 seconds.",
      status: "reported",
      decision: "qualify",
      assessment:
        "The figures are a useful factory vignette but originate with the company and a guided visit. They are not independently standardized productivity data, do not include supplier labor or downtime, and therefore do not enter the comparative dashboard.",
      sourceIds: [
        "notebook-source-npr-dominance",
        "notebook-source-new-yorker-china-future",
      ],
    },
    {
      id: "audit-dominance-agriculture",
      claim:
        "China moved from more than three quarters agricultural to less than one quarter agricultural since the late 1970s.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "The wording shifts between population, employment, and residence. Rather than publish an unstable comparison, the inquiry uses the World Bank’s documented reform chronology and China’s official 2025 urban and age structure. Historical transformation is real; this exact before-and-after formulation is not needed.",
      sourceIds: [
        "notebook-source-npr-dominance",
        "notebook-source-world-bank-reform",
        "notebook-source-china-nbs-2025",
      ],
    },
    {
      id: "audit-dominance-demographic-doom",
      claim: "Aging guarantees that China’s rise will soon reverse.",
      status: "contested",
      decision: "exclude",
      assessment:
        "The official data establish population decline and aging, not a deterministic geopolitical outcome. Productivity, retirement policy, health, migration, automation, capital allocation, and the scale of the remaining workforce mediate the effect. The US profile also requires age and migration context.",
      sourceIds: [
        "notebook-source-china-nbs-2025",
        "notebook-source-census-2025",
        "notebook-source-ifr-robotics-2025",
      ],
    },
    {
      id: "audit-dominance-handoff",
      claim:
        "The United States has already transferred overall global dominance to China.",
      status: "contested",
      decision: "exclude",
      assessment:
        "No reviewed authority defines or measures an overall handoff. China’s manufacturing value added is more than twice the US share, while the United States has the larger nominal economy, far greater measured private AI investment, nearly three times the military spending, and a currency with vastly greater reserve use. The result depends on the domain and on what a state can mobilize with it.",
      sourceIds: [
        "notebook-source-unido-yearbook-2025",
        "notebook-source-world-bank-us-china",
        "notebook-source-stanford-ai-2026",
        "notebook-source-sipri-2026",
        "notebook-source-imf-cofer-2026q1",
      ],
    },
  ],
  comparisons: [
    {
      id: "metric-manufacturing-value-added",
      label: "Manufacturing value added",
      asOf: "2024",
      unit: "share of world total",
      china: { display: "32.0%", value: 32 },
      unitedStates: { display: "15.0%", value: 15 },
      reading:
        "China’s industrial base is not merely large; by this UNIDO estimate its global share exceeds those of the United States, Japan, Germany, and South Korea combined.",
      caveat:
        "Manufacturing value added measures economic value, not physical output, resilience, technology content, or ownership of the underlying tools.",
      sourceIds: ["notebook-source-unido-yearbook-2025"],
    },
    {
      id: "metric-nominal-gdp",
      label: "Nominal gross domestic product",
      asOf: "2025",
      unit: "current US dollars",
      china: { display: "$19.5T", value: 19.5 },
      unitedStates: { display: "$30.8T", value: 30.8 },
      reading:
        "At market exchange rates, the United States remains the much larger economy and has far higher GDP per person.",
      caveat:
        "Nominal GDP is sensitive to exchange rates and does not describe the domestic purchasing power used in the R&D comparison below.",
      sourceIds: ["notebook-source-world-bank-us-china"],
    },
    {
      id: "metric-research-development",
      label: "Research and development",
      asOf: "2024",
      unit: "billions of PPP-adjusted dollars",
      china: { display: "$1,028B", value: 1028 },
      unitedStates: { display: "$1,009B", value: 1009 },
      reading:
        "NSF’s preliminary internationally comparable estimate puts the two systems near parity and China slightly ahead in total R&D purchasing power.",
      caveat:
        "The figures are preliminary and revisable. PPP totals do not measure research quality, field mix, basic-research share, or international influence.",
      sourceIds: ["notebook-source-ncses-2026"],
    },
    {
      id: "metric-science-publications",
      label: "Science and engineering articles",
      asOf: "2024",
      unit: "share of world output",
      china: { display: "31%", value: 31 },
      unitedStates: { display: "12%", value: 12 },
      reading:
        "China leads the quantity measure, while the United States retains disproportionate shares of highly cited and internationally coauthored work.",
      caveat:
        "Article counts are not a quality score; database coverage, field practices, citations, and collaboration patterns all change the interpretation.",
      sourceIds: ["notebook-source-ncses-2026"],
    },
    {
      id: "metric-biopharma-programs",
      label: "Early-stage biopharma programs",
      asOf: "2024",
      unit: "share of programs originated worldwide",
      china: { display: "32.3%", value: 32.3 },
      unitedStates: { display: "37.4%", value: 37.4 },
      reading:
        "China’s rise from 8.0 percent in 2015 to near US parity in 2024 is a genuine pipeline shift, especially in biologics and cancer.",
      caveat:
        "The proprietary database is organized by originator headquarters and covers discovery through phase 2; the study did not assess program quality or eventual approval.",
      sourceIds: ["notebook-source-jama-biopharma-2026"],
    },
    {
      id: "metric-private-ai-investment",
      label: "Private AI investment",
      asOf: "2025",
      unit: "billions of US dollars",
      china: { display: "$12.4B", value: 12.4 },
      unitedStates: { display: "$285.9B", value: 285.9 },
      reading:
        "US capital formation remains an enormous advantage in the private-investment series even as Chinese model performance has approached the frontier.",
      caveat:
        "Stanford cautions that the private series does not capture the large role of Chinese government guidance funds, so it is not total AI financing.",
      sourceIds: ["notebook-source-stanford-ai-2026"],
    },
    {
      id: "metric-military-spending",
      label: "Military expenditure",
      asOf: "2025",
      unit: "billions of US dollars",
      china: { display: "$336B", value: 336 },
      unitedStates: { display: "$954B", value: 954 },
      reading:
        "SIPRI estimates the United States accounted for 33 percent of world military spending and China 12 percent, while China recorded a thirty-first consecutive annual increase.",
      caveat:
        "China’s figure is an SIPRI estimate. Spending is an input, not a direct measure of readiness, geography, alliances, stockpiles, or combat effectiveness.",
      sourceIds: ["notebook-source-sipri-2026"],
    },
    {
      id: "metric-reserve-currency",
      label: "Allocated foreign-exchange reserves",
      asOf: "2026-03",
      unit: "share by currency",
      china: { display: "RMB 1.99%", value: 1.99 },
      unitedStates: { display: "USD 57.13%", value: 57.13 },
      reading:
        "The dollar’s reserve role gives the United States a form of financial reach that China’s industrial scale has not displaced.",
      caveat:
        "COFER records disclosed reserve composition; exchange-rate valuation changes the shares, and reserve use is only one dimension of currency power.",
      sourceIds: ["notebook-source-imf-cofer-2026q1"],
    },
  ],
  concentrations: [
    {
      id: "concentration-ev-production",
      label: "Electric-car production",
      display: "Nearly 75% in China",
      value: 75,
      asOf: "2025",
      reading:
        "China produced almost 16 million electric cars and exported more than 2.5 million as domestic capacity exceeded demand.",
      caveat:
        "Share of global vehicle production, not sales, company ownership, component value, or the installed fleet.",
      sourceIds: ["notebook-source-iea-ev-2026"],
    },
    {
      id: "concentration-battery-cells",
      label: "Electric-vehicle battery cells",
      display: "More than 80% in China",
      value: 80,
      asOf: "2025",
      reading:
        "Chinese plants dominate cell production and the manufacturing capacity behind it, reinforced by upstream material-processing depth.",
      caveat:
        "The plotted floor is 80 because the source says more than 80; it should not be read as an exact point estimate.",
      sourceIds: ["notebook-source-iea-ev-2026"],
    },
    {
      id: "concentration-solar-capacity",
      label: "Solar-PV supply-chain capacity",
      display: "About 85% in China",
      value: 85,
      asOf: "2025",
      reading:
        "The national share becomes even higher at particular stages, including about 95 percent for wafers.",
      caveat:
        "Supply-chain manufacturing capacity is not electricity generation, installed panels, utilization, or profit.",
      sourceIds: ["notebook-source-iea-etp-2026"],
    },
    {
      id: "concentration-robot-installations",
      label: "Industrial-robot installations",
      display: "54% installed in China",
      value: 54,
      asOf: "2024",
      reading:
        "China installed 295,000 industrial robots in one year and operated a stock exceeding two million, a scale central to its automation response.",
      caveat:
        "Annual installations are not the same as robot production, density per worker, productivity, or autonomy.",
      sourceIds: ["notebook-source-ifr-robotics-2025"],
    },
    {
      id: "concentration-critical-minerals",
      label: "Selected critical-mineral refining",
      display: "More than 90% in China",
      value: 90,
      asOf: "2025",
      reading:
        "China was the top refiner with shares above 90 percent for gallium, graphite, manganese, and rare earth elements in the IEA’s review.",
      caveat:
        "This is not a 90 percent share of every critical mineral. Mining, refining, magnet making, and product assembly are distinct stages.",
      sourceIds: ["notebook-source-iea-minerals-2026"],
    },
  ],
  demographicProfiles: [
    {
      country: "China",
      asOf: "2025",
      totalDisplay: "1.405 billion",
      annualChangeDisplay: "−3.39 million",
      ageBands: [
        { label: "Age 0–15", display: "16.4%", value: 16.4 },
        { label: "Age 16–59", display: "60.6%", value: 60.6 },
        { label: "Age 60+", display: "23.0%", value: 23 },
      ],
      sourceIds: ["notebook-source-china-nbs-2025"],
      note: "China’s official communiqué reports 7.92 million births and 11.31 million deaths. Its age bands cover the national population under NBS definitions.",
    },
    {
      country: "United States",
      asOf: "2025",
      totalDisplay: "341.8 million",
      annualChangeDisplay: "+1.8 million",
      migrationDisplay: "+1.3 million net international migration",
      ageBands: [
        { label: "Age 0–15", display: "18.5%", value: 18.5 },
        { label: "Age 16–59", display: "56.4%", value: 56.4 },
        { label: "Age 60+", display: "25.1%", value: 25.1 },
      ],
      sourceIds: ["notebook-source-census-2025"],
      note: "Mainland Dispatch sums Census single-year age estimates into the same three display bands. Growth and migration are July 2024–July 2025 estimates.",
    },
  ],
  timeline: [
    {
      date: "1971-10-25",
      label: "Beijing takes China’s United Nations seat",
      status: "official-position",
      explanation:
        "UN General Assembly Resolution 2758 recognized representatives of the People’s Republic of China as China’s only lawful representatives at the United Nations and expelled Chiang Kai-shek’s representatives. It changed institutional representation; it did not settle every later dispute over Taiwan’s international status.",
      sourceIds: ["notebook-source-un-resolution-2758"],
    },
    {
      date: "1978",
      label: "Reform and opening reorganize the development model",
      status: "observed",
      explanation:
        "The reform era gradually introduced market incentives, external trade and investment, rural reform, and experimentation without replacing one-party rule. The World Bank’s retrospective treats the transformation as iterative rather than a single overnight liberalization.",
      sourceIds: ["notebook-source-world-bank-reform"],
    },
    {
      date: "1979-01-01",
      label: "The United States and PRC normalize relations",
      status: "official-position",
      explanation:
        "Formal diplomatic recognition placed economic and strategic engagement on a new footing. It opened a long period in which integration and rivalry developed together rather than as cleanly separated eras.",
      sourceIds: ["notebook-source-state-normalization"],
    },
    {
      date: "2001-12-11",
      label: "China joins the World Trade Organization",
      status: "observed",
      explanation:
        "WTO membership embedded China more deeply in global production and trade rules. The accession is a hinge in the manufacturing story, but it does not by itself explain infrastructure, exchange-rate policy, education, firm strategy, foreign investment, or domestic industrial policy.",
      sourceIds: ["notebook-source-wto-accession"],
    },
    {
      date: "2015-05-08",
      label: "Made in China 2025 names the upgrading project",
      status: "official-position",
      explanation:
        "The State Council plan made advanced manufacturing, innovation, quality, green production, and integration of information technology explicit national priorities. A plan documents intention and coordination; it is not proof that every target was met because of the plan.",
      sourceIds: ["notebook-source-made-in-china-2025"],
    },
    {
      date: "2018-06-15",
      label: "Section 301 tariffs harden economic competition",
      status: "official-position",
      explanation:
        "The United States announced tariffs after its technology-transfer and intellectual-property investigation. The dispute made strategic dependence a central policy problem and accelerated scrutiny of supply chains on both sides.",
      sourceIds: ["notebook-source-ustr-301"],
    },
    {
      date: "2022-08-09",
      label: "The CHIPS and Science Act commits US industrial policy",
      status: "official-position",
      explanation:
        "The US response moved beyond tariffs toward subsidies, research funding, and domestic semiconductor capacity. The law records a strategic turn; later appropriations, awards, construction, workforce, and output determine delivery.",
      sourceIds: ["notebook-source-chips-act"],
    },
    {
      date: "2024",
      label:
        "Industrial lead and research near-parity become measurable together",
      status: "observed",
      explanation:
        "UNIDO estimates China at 32 percent of world manufacturing value added against 15 percent for the United States. NSF’s preliminary PPP comparison puts China and the United States at 30 and 29 percent of world R&D. JAMA finds China at 32.3 percent of early-stage biopharma programs against 37.4 percent for the United States.",
      sourceIds: [
        "notebook-source-unido-yearbook-2025",
        "notebook-source-ncses-2026",
        "notebook-source-jama-biopharma-2026",
      ],
    },
    {
      date: "2025",
      label: "Scale meets chokepoint power",
      status: "observed",
      explanation:
        "China produced nearly three quarters of the world’s electric cars and retained commanding shares of battery, solar, and selected mineral-processing chains. Export controls showed how concentrated production can become bargaining power, while the durability and costs of that leverage remained unsettled.",
      sourceIds: [
        "notebook-source-iea-ev-2026",
        "notebook-source-iea-etp-2026",
        "notebook-source-iea-minerals-2026",
      ],
    },
    {
      date: "2026-08-12",
      label: "The dominance question reaches a mainstream interview",
      status: "interpretation",
      explanation:
        "NPR’s question is evidence of a changed American conversation, not evidence that a handoff occurred on this date. The useful response is to preserve the alarm’s material basis while refusing an all-purpose ranking that the sources cannot support.",
      sourceIds: [
        "notebook-source-npr-dominance",
        "notebook-source-new-yorker-china-future",
      ],
    },
  ],
  sections: {
    why: [
      "The title of the Fresh Air interview is almost irresistible: Has the United States lost its dominance to China? It promises one event, one possession, one answer. Evan Osnos’s reporting supplies vivid material for the concern: an electric-vehicle factory that feels almost unpeopled, a research system gaining mass, and a country that can coordinate investment at a scale the United States often struggles to match. The strongest version of his warning is not that China has won everything. It is that American confidence was built on advantages that no longer look permanent.",
      "I wanted to know what happens when the noun dominance is forced to declare its unit. Is it a share of factory value added, a supply-chain bottleneck, the ability to finance discovery, publication volume, highly cited science, currency use, military spending, standards, alliances, or the freedom to absorb criticism? Each has a source and a denominator. They do not share a conversion rate. A factory cannot be divided by a reserve currency; a publication count cannot be added to a carrier group.",
      "This Notebook therefore treats NPR and The New Yorker as initiating reported interpretation, not as the final numerical authority. Every dashboard value comes from an official statistical body, an intergovernmental or specialist institution, or peer-reviewed research with a disclosed method. The purpose is not to drain the reporting of urgency. It is to find exactly where the urgency is earned.",
    ],
    verdict: [
      "The shortest defensible answer is no: the reviewed evidence does not establish a singular transfer of global dominance. It establishes a much more consequential change. China has become the central manufacturing system for the energy transition and a peer-scale research power. In some production chains, the question is no longer whether China leads but whether the rest of the world can function through a disruption in Chinese processing or manufacturing.",
      "The United States, meanwhile, is not a former power waiting for a verdict. Its economy remains much larger at current exchange rates. The dollar accounted for 57.13 percent of disclosed allocated reserves in the first quarter of 2026, compared with 1.99 percent for the renminbi. SIPRI estimates US military spending at $954 billion in 2025, against $336 billion for China. Stanford records $285.9 billion in US private AI investment in 2025, although its China figure misses important public-guidance capital. Those are not decorative legacies. They finance capabilities, alliances, research organizations, and policy options.",
      "But the old American model (lead the invention, outsource much of the production, and assume high-value control will remain at home) looks less secure when learning, supplier density, engineering, standards, and iteration accumulate around the factory. The dashboard does not crown China. It removes the excuse to treat production as a lower-order activity that follows innovation rather than shaping it.",
    ],
    industry: [
      "UNIDO’s 2025 yearbook supplies the cleanest wide-angle measure. China’s share of global manufacturing value added rose from 2.8 percent in 1990 to an estimated 32.0 percent in 2024. The United States stood at 15.0 percent. Japan, Germany, and South Korea added another 14.2 percent; even those four economies together remained below China. That is an extraordinary structural fact, but value added still does not reveal who owns equipment, controls software, earns profits, or can replace a missing component under pressure.",
      "The IEA makes the concentration concrete. China produced nearly three quarters of electric cars in 2025, more than four fifths of battery cells, and about 85 percent of solar-PV supply-chain capacity. Its share reaches roughly 95 percent at the wafer stage. The same pattern appears upstream: China is the top refiner with more than 90 percent shares for gallium, graphite, manganese, and rare earth elements in the IEA’s review. These are different denominators, so the page refuses the tempting but meaningless act of averaging them into one clean-China percentage.",
      "Concentration becomes geopolitical power when a buyer cannot switch quickly. The IEA estimates that a full implementation of expanded rare-earth export measures could put $6.5 trillion of downstream production outside China at risk. That is a modeled exposure scenario, not a realized loss, and the expanded measures were suspended for a year through November 2026. The distinction matters: a scenario measures vulnerability; it does not prove that Beijing can impose costs without also accelerating substitution or damaging its own suppliers.",
      "Automation complicates the demographic story. The International Federation of Robotics counted 295,000 industrial-robot installations in China in 2024, or 54 percent of the world total, and an operational stock above two million. The United States installed 34,200 and operated roughly 393,700. Robot counts do not equal productivity, but the scale shows why a smaller future labor force does not translate mechanically into proportionally lower output.",
    ],
    science: [
      "The frontier is not one race either. NSF’s 2026 state-of-science report estimates China spent $1.028 trillion in purchasing-power-comparable R&D in 2024 and the United States $1.009 trillion, or 30 and 29 percent of the world total. The values are preliminary. China produced 31 percent of global science and engineering articles against 12 percent for the United States. Yet the United States retained disproportionate representation among highly cited work and accounted for 31 percent of internationally coauthored articles. Scale and network position are both real advantages.",
      "Biopharma offers a particularly sharp transition. A March 2026 JAMA study using Clarivate’s Cortellis database found China-originated early-stage programs grew from 829 in 2015 to 6,145 in 2024, while US programs rose from 5,024 to 7,107. China’s share moved from 8.0 to 32.3 percent; the US share fell from 48.2 to 37.4 percent. In biologics, the 2024 shares were 35.1 and 35.7 percent. In cancer, China was slightly ahead. But the unit is an early-stage program attributed by originator headquarters, not a successful medicine. The study did not assess quality or approvals.",
      "AI again splits the verdict. Stanford reports that the aggregate performance gap between the top US and Chinese models narrowed to 2.7 percent by March 2026. China led publication, citation, patent-output, and industrial-robot measures, while the United States led top-tier model production, higher-impact patents, and private AI investment. The private-capital gap is spectacular in the recorded series, but Stanford explicitly warns that Chinese government guidance funds are not captured. A good dashboard carries that caveat next to the number, not in a footnote designed to be forgotten.",
      "The scientist-migration claim needs similar care. The PNAS study found nearly 20,000 scientists of Chinese descent left the United States for other countries between 2010 and 2021, with annual departures rising from about 900 to 2,621. China became a more common destination, but the nearly-20,000 total includes moves elsewhere. The paper connects departures to fear about US research conditions as well as family and opportunity. Talent security is therefore not only a visa or counterintelligence problem. It is also the daily institutional question of whether scientists believe they can work, collaborate, and belong.",
    ],
    leverage: [
      "Industrial concentration, military capacity, and monetary reach impose different kinds of consequences. A mineral-processing bottleneck can interrupt a factory. A navy can deter or coerce in a particular geography. A reserve currency can lower financing costs, extend sanctions reach, and make global institutions responsive to domestic financial conditions. None reliably substitutes for the others.",
      "SIPRI’s estimates keep the military scale visible: $954 billion for the United States in 2025 and $336 billion for China. The US total was 33 percent of global expenditure; China’s was 12 percent after thirty-one consecutive increases. Spending is still an input. Geography means China can concentrate forces near its coast while the United States funds a global posture; alliances and operating experience further complicate direct comparisons. The right claim is that the United States retains enormous military resource superiority, not that every contingency therefore has a predetermined result.",
      "The dollar-renminbi comparison is more lopsided. IMF COFER data put the dollar at 57.13 percent of allocated official reserves in 2026’s first quarter and the renminbi at 1.99 percent. Valuation changes moved the shares, and reserve disclosure is incomplete, but there is no evidence here of a near-term monetary handoff. China’s trade and production network can grow faster than use of its currency because convertibility, institutions, market depth, trust, and policy control are part of monetary power.",
      "The practical lesson is to ask not only who has more, but who can turn a stock into collective action without destroying the conditions that made it valuable. A chokepoint loses value as others redesign around it. Financial sanctions invite alternatives. Military threats change alliance behavior. Power is exercised inside feedback loops.",
    ],
    demography: [
      "China’s demographic constraint is concrete. The National Bureau of Statistics reported a 2025 population of 1.40489 billion, down 3.39 million in a year, with 7.92 million births and 11.31 million deaths. People aged sixty or older made up 23.0 percent; ages sixteen through fifty-nine, 60.6 percent. That means fewer new workers, heavier pension and health burdens, and pressure on a growth model accustomed to abundant labor and housing demand.",
      "The comparison guards against a common visual error. The United States is smaller and still grew by about 1.8 million from July 2024 to July 2025, with net international migration contributing about 1.3 million. Yet when Census single-year estimates are summed into the same display bands, 25.1 percent of the US population is sixty or older, higher than China’s official 23.0 percent. The systems are not identical: Census and NBS definitions, reference dates, citizenship and resident coverage, and migration regimes differ. The point is not that the United States has the worse problem. It is that age share, total scale, movement, fertility, and policy have to be read together.",
      "China still has roughly 851 million people in the official sixteen-to-fifty-nine band. The challenge is the direction and the dependency ratio, not sudden labor disappearance. Automation can raise output per worker but may concentrate returns, demand expensive capital, and leave care work unresolved. Migration can extend US growth but depends on a political and institutional capacity to attract and integrate people. Demography sets constraints; governance determines much of the response.",
    ],
    history: [
      "The timeline begins before the factories because today’s dashboard was built through institutional choices. The PRC’s 1971 UN representation, reform and opening from 1978, US normalization in 1979, and WTO accession in 2001 progressively changed China’s access to markets, capital, technology, and diplomatic arenas. None was a straight line toward convergence. Political control persisted while economic methods changed.",
      "Made in China 2025 formalized the next ambition: move from high-volume production toward advanced equipment, quality, integration, and domestic innovation. The 2018 Section 301 tariffs marked a US turn toward explicit technology and supply-chain rivalry. The 2022 CHIPS and Science Act marked another turn, from diagnosing dependence to subsidizing capacity and research at home. Plans and statutes are only beginnings; delivered factories, workers, research, costs, and spillovers determine whether they change the balance.",
      "By 2024, the industrial lead and science near-parity could be seen in the same frame. By 2025, export controls showed how concentration could be deployed as leverage. By August 2026, a mainstream American interview could reasonably ask whether dominance had been lost. The question’s arrival is historically meaningful. Its binary form is still analytically inadequate.",
    ],
    changed: [
      "I began with an image of competition between two national stacks: factories on one side, finance and frontier invention on the other. The sources replaced that image with overlapping systems. Chinese industry contains foreign equipment, overseas demand, and knowledge accumulated through global integration. American labs, firms, and markets depend on Chinese-origin talent, processing, components, and manufacturing feedback. The competition is real, but interdependence is not a footnote to it; interdependence is the terrain on which it is fought.",
      "I also understand the manufacturing argument more strongly after auditing it. The hype does not come from inventing the direction. It comes from compressing several already-extraordinary facts into one totalizing percentage. Disaggregated, the record is more useful: 32 percent of manufacturing value added, nearly 75 percent of electric-car production, more than 80 percent of battery cells, about 85 percent of solar capacity, and more than 90 percent in specified refining chains. Each can be monitored and challenged.",
      "What I reject is the crown. A crown makes power singular, stable, and transferable. The dashboard shows a plural, conditional balance: China’s production ecosystem can set costs and pace; American capital, currency, military resources, research institutions, and alliances can still shape choices; both face demographic, political, and feedback constraints. The strategic task is not to declare a winner. It is to identify which capacity matters for which outcome, then build resilience without pretending dependence can disappear by slogan.",
    ],
  },
  sourceTrail: [
    {
      id: "notebook-source-npr-dominance",
      role: "Initiating interview and audio record",
      title: "Has the U.S. lost its dominance to China?",
      publisher: "Fresh Air · NPR",
      author: "Terry Gross and Evan Osnos",
      publishedAt: "2026-08-12",
      retrievedAt: "2026-08-14",
      links: [
        { label: "Episode", url: nprUrl },
        {
          label: "Transcript",
          url: "https://www.npr.org/transcripts/nx-s1-5928224",
        },
      ],
      context:
        "Supplies the question, interview framing, sector claims, demography argument, and the distinction between technological and military power. The displayed audio duration is 44:29.",
      limitation:
        "NPR says transcripts may be updated and can vary from the audio. The audio is controlling; this Notebook paraphrases rather than reproducing the interview.",
    },
    {
      id: "notebook-source-new-yorker-china-future",
      role: "Reported narrative foundation",
      title: "The Future Made in China",
      publisher: "The New Yorker",
      author: "Evan Osnos",
      publishedAt: "2026-08-10",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Feature",
          url: "https://www.newyorker.com/magazine/2026/08/10/the-future-made-in-china",
        },
      ],
      context:
        "Provides reported factory scenes and the broader argument that industrial learning and technological power are accumulating together in China.",
      limitation:
        "Reported examples, including company figures from a guided factory visit, are not treated as standardized national statistics. Numerical claims are checked elsewhere.",
    },
    {
      id: "notebook-source-unido-yearbook-2025",
      role: "International manufacturing benchmark",
      title: "International Yearbook of Industrial Statistics 2025",
      publisher: "United Nations Industrial Development Organization",
      publishedAt: "2025-11-20",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Yearbook PDF",
          url: "https://stat.unido.org/portal/storage/file/publications/yb/2025/UNIDO_IndustrialStatistics_Yearbook_2025.pdf",
        },
      ],
      context:
        "Estimates China at 32.0 percent and the United States at 15.0 percent of global manufacturing value added in 2024; China was 2.8 percent in 1990.",
      limitation:
        "Value added is a modeled economic series and does not by itself measure physical output, ownership, resilience, productivity, or technology content.",
    },
    {
      id: "notebook-source-world-bank-us-china",
      role: "Comparable macroeconomic series",
      title: "World Development Indicators: China and United States",
      publisher: "World Bank",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Country comparison",
          url: "https://data.worldbank.org/?locations=CN-US",
        },
      ],
      context:
        "Reports 2025 nominal GDP of approximately $19.5 trillion for China and $30.8 trillion for the United States, with respective growth rates of 5.0 and 2.2 percent.",
      limitation:
        "Current-dollar GDP moves with exchange rates and is not interchangeable with the PPP-adjusted R&D series.",
    },
    {
      id: "notebook-source-iea-ev-2026",
      role: "Electric-vehicle and battery benchmark",
      title: "Global EV Outlook 2026: Manufacturing and trade",
      publisher: "International Energy Agency",
      publishedAt: "2026",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Manufacturing and trade",
          url: "https://www.iea.org/reports/global-ev-outlook-2026/manufacturing-and-trade",
        },
        {
          label: "EV batteries",
          url: "https://www.iea.org/reports/global-ev-outlook-2026/electric-vehicle-batteries",
        },
      ],
      context:
        "Reports nearly 22 million electric cars produced in 2025, with China making nearly three quarters and more than four fifths of battery cells.",
      limitation:
        "Production, capacity, sales, trade, ownership, and deployment are distinct measures and are kept separate.",
    },
    {
      id: "notebook-source-iea-etp-2026",
      role: "Clean-technology supply-chain benchmark",
      title:
        "Energy Technology Perspectives 2026: Supply-chain risks and industrial competitiveness",
      publisher: "International Energy Agency",
      publishedAt: "2026",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Supply-chain chapter",
          url: "https://www.iea.org/reports/energy-technology-perspectives-2026/supply-chain-risks-and-industrial-competitiveness",
        },
      ],
      context:
        "Places about 85 percent of solar-PV supply-chain production capacity and 80 percent of lithium-ion battery capacity in China, with still higher shares at selected stages.",
      limitation:
        "Capacity is not actual production, utilization, installed generation, profitability, or control of every upstream technology.",
    },
    {
      id: "notebook-source-ifr-robotics-2025",
      role: "Industrial automation benchmark",
      title: "World Robotics 2025",
      publisher: "International Federation of Robotics",
      publishedAt: "2025-09-25",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Report release",
          url: "https://ifr.org/worldrobotics/report-2025",
        },
      ],
      context:
        "Reports China installed 295,000 industrial robots in 2024, 54 percent of the global total, and operated more than two million; the US installed 34,200 and operated about 393,700.",
      limitation:
        "Installation counts do not measure utilization, productivity, robot quality, or output per worker.",
    },
    {
      id: "notebook-source-ncses-2026",
      role: "Science and engineering benchmark",
      title: "The State of U.S. Science and Engineering 2026",
      publisher:
        "National Center for Science and Engineering Statistics · National Science Board",
      publishedAt: "2026",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Science indicators executive summary",
          url: "https://ncses.nsf.gov/pubs/nsbsep20261/executive-summary",
        },
        {
          label: "R&D figure",
          url: "https://ncses.nsf.gov/pubs/nsbsep20261/figure/29",
        },
      ],
      context:
        "Estimates China at $1.028 trillion and the US at $1.009 trillion in PPP-comparable 2024 R&D, and documents China’s publication-volume lead alongside continuing US citation and collaboration advantages.",
      limitation:
        "The 2024 R&D estimates are preliminary and revisable. Quantity, impact, collaboration, and field mix are separate dimensions.",
    },
    {
      id: "notebook-source-jama-biopharma-2026",
      role: "Peer-reviewed biopharma analysis",
      title: "Geographic Shifts in Early-Stage Biopharmaceutical Innovation",
      publisher: "JAMA",
      author: "Kang and Ji",
      publishedAt: "2026-03-26",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Original investigation",
          url: "https://jamanetwork.com/journals/jama/fullarticle/2846875?resultClick=1",
        },
      ],
      context:
        "Finds China’s share of global early-stage biopharma programs rose from 8.0 percent in 2015 to 32.3 percent in 2024, near the US share of 37.4 percent.",
      limitation:
        "Uses proprietary Cortellis data, attributes origin by company headquarters, covers discovery through phase 2, and does not evaluate program quality or approval.",
    },
    {
      id: "notebook-source-stanford-ai-2026",
      role: "Independent AI benchmark synthesis",
      title: "2026 AI Index Report",
      publisher:
        "Stanford Institute for Human-Centered Artificial Intelligence",
      publishedAt: "2026",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "AI Index report",
          url: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
        },
        {
          label: "Technical performance",
          url: "https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance",
        },
        {
          label: "Economy",
          url: "https://hai.stanford.edu/ai-index/2026-ai-index-report/economy",
        },
      ],
      context:
        "Reports a 2.7 percent aggregate gap between leading US and Chinese models in March 2026 and $285.9 billion versus $12.4 billion in measured 2025 private AI investment.",
      limitation:
        "Composite benchmark results vary by task. The private-investment series understates Chinese public guidance capital and is not total national financing.",
    },
    {
      id: "notebook-source-sipri-2026",
      role: "Military expenditure benchmark",
      title:
        "Global military spending rise continues as European and Asian expenditures surge",
      publisher: "Stockholm International Peace Research Institute",
      publishedAt: "2026-04-27",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Release",
          url: "https://www.sipri.org/media/press-release/2026/global-military-spending-rise-continues-as-european-and-asian-expenditures-surge",
        },
      ],
      context:
        "Estimates 2025 military expenditure at $954 billion for the United States and $336 billion for China, respectively 33 and 12 percent of the world total.",
      limitation:
        "China’s value is estimated. Spending is not a direct measure of readiness, alliance capacity, force location, or combat effectiveness.",
    },
    {
      id: "notebook-source-imf-cofer-2026q1",
      role: "Official reserve-currency series",
      title:
        "Currency Composition of Official Foreign Exchange Reserves, 2026 Q1",
      publisher: "International Monetary Fund",
      publishedAt: "2026-07-01",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "IMF Data Brief",
          url: "https://data.imf.org/en/news/imf%20data%20brief%20july%201",
        },
      ],
      context:
        "Reports the US dollar at 57.13 percent and the renminbi at 1.99 percent of allocated official foreign-exchange reserves in 2026’s first quarter.",
      limitation:
        "Exchange-rate valuation affects quarterly shares, some reserves are unallocated, and reserve composition is only one measure of currency use.",
    },
    {
      id: "notebook-source-iea-minerals-2026",
      role: "Critical-minerals concentration and scenario",
      title: "Global Critical Minerals Outlook 2026",
      publisher: "International Energy Agency",
      publishedAt: "2026-07-16",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Outlook",
          url: "https://www.iea.org/reports/global-critical-minerals-outlook-2026/outlook",
        },
        {
          label: "Critical minerals executive summary",
          url: "https://www.iea.org/reports/global-critical-minerals-outlook-2026/executive-summary",
        },
      ],
      context:
        "Finds China’s refining shares above 90 percent for gallium, graphite, manganese, and rare earths, and models large downstream exposure to fully implemented controls.",
      limitation:
        "The $6.5 trillion figure is a risk scenario, not observed damage. Expanded rare-earth measures were suspended for a year through November 2026.",
    },
    {
      id: "notebook-source-china-nbs-2025",
      role: "Official China demographic and industrial record",
      title:
        "Statistical Communiqué of the People’s Republic of China on the 2025 National Economic and Social Development",
      publisher: "National Bureau of Statistics of China",
      publishedAt: "2026-02-28",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Communiqué",
          url: "https://www.stats.gov.cn/english/PressRelease/202602/t20260228_1962661.html",
        },
      ],
      context:
        "Reports a 2025 population of 1.40489 billion, a 3.39 million annual decline, 7.92 million births, 11.31 million deaths, and official age-band shares.",
      limitation:
        "This is an official PRC statistical release under national definitions. Its series interests and coverage should not be assumed identical to Census measures.",
    },
    {
      id: "notebook-source-census-2025",
      role: "Official US demographic estimates",
      title: "National Population by Characteristics: 2020–2025",
      publisher: "United States Census Bureau",
      publishedAt: "2026-06-17",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Dataset page",
          url: "https://www.census.gov/data/datasets/time-series/demo/popest/2020s-national-detail.html",
        },
        {
          label: "Single-year age CSV",
          url: "https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/national/asrh/nc-est2025-agesex-res.csv",
        },
        {
          label: "Population growth release",
          url: "https://www.census.gov/newsroom/press-releases/2026/population-growth-slows.html",
        },
      ],
      context:
        "Reports a July 2025 US population of about 341.8 million and roughly 1.8 million annual growth, including 1.3 million net international migration. This Notebook sums official single-year ages into three comparable display bands.",
      limitation:
        "The three displayed age shares are Mainland Dispatch calculations from Census estimates; NBS and Census definitions and reference periods are not identical.",
    },
    {
      id: "notebook-source-pnas-scientists",
      role: "Peer-reviewed research-mobility study",
      title: "Caught in the crossfire: Fears of Chinese-American scientists",
      publisher: "Proceedings of the National Academy of Sciences",
      publishedAt: "2023-06-27",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "PubMed record",
          url: "https://pubmed.ncbi.nlm.nih.gov/37368928/",
        },
      ],
      context:
        "Finds nearly 20,000 scientists of Chinese descent left the United States for all destinations between 2010 and 2021, with departures rising sharply and China becoming a more common destination.",
      limitation:
        "Bibliometric affiliation changes are not perfect measures of citizenship, motivation, or permanent migration; the study does not say all 20,000 moved to China.",
    },
    {
      id: "notebook-source-un-resolution-2758",
      role: "Primary multilateral record",
      title: "United Nations General Assembly Resolution 2758",
      publisher: "United Nations",
      publishedAt: "1971-10-25",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Official record",
          url: "https://digitallibrary.un.org/record/498905/files/S_10378-EN.pdf",
        },
      ],
      context:
        "Establishes the 1971 decision on China’s representation at the United Nations.",
      limitation:
        "The text is used only for the institutional representation decision, not to resolve later legal or political disputes about Taiwan.",
    },
    {
      id: "notebook-source-state-normalization",
      role: "Primary US diplomatic record",
      title:
        "Address to the Nation Announcing United States Recognition of the People’s Republic of China",
      publisher: "Office of the Historian, US Department of State",
      publishedAt: "1978-12-15",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Historical document",
          url: "https://history.state.gov/historicaldocuments/frus1977-80v01/d104",
        },
      ],
      context:
        "Records the US announcement that formal diplomatic relations with the PRC would begin January 1, 1979.",
      limitation:
        "A US primary record establishes the American position and timing, not the entire bilateral history.",
    },
    {
      id: "notebook-source-world-bank-reform",
      role: "Historical economic synthesis",
      title: "Four Decades of Poverty Reduction in China",
      publisher:
        "World Bank and Development Research Center of China’s State Council",
      publishedAt: "2022",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Report PDF",
          url: "https://openknowledge.worldbank.org/bitstream/handle/10986/37727/9781464818776.pdf",
        },
      ],
      context:
        "Provides a documented retrospective on reform and opening from 1978 and the iterative institutional changes behind China’s economic transformation.",
      limitation:
        "A retrospective co-produced with a Chinese state research body has an institutional perspective and does not attribute every outcome to one reform.",
    },
    {
      id: "notebook-source-wto-accession",
      role: "Primary trade-institution record",
      title: "China and the WTO",
      publisher: "World Trade Organization",
      publishedAt: "2001-12-11",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Accession record",
          url: "https://www.wto.org/english/thewto_e/acc_e/a1_chine_e.htm",
        },
      ],
      context:
        "Establishes China’s December 11, 2001 WTO membership and links the accession documentation.",
      limitation:
        "Membership is a historical hinge, not a complete causal account of China’s manufacturing expansion or later trade conflict.",
    },
    {
      id: "notebook-source-made-in-china-2025",
      role: "Primary Chinese industrial-policy record",
      title: "Made in China 2025",
      publisher: "State Council of the People’s Republic of China",
      publishedAt: "2015-05-08",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "State Council record",
          url: "https://english.www.gov.cn/archive/state_council_gazette/2015/06/10/content_281475124447124.htm",
        },
      ],
      context:
        "Records the national plan to upgrade advanced manufacturing, innovation, quality, digital integration, and green production.",
      limitation:
        "A policy plan establishes aims and mechanisms, not independent evidence of delivery or sole causation.",
    },
    {
      id: "notebook-source-ustr-301",
      role: "Primary US trade-policy record",
      title:
        "USTR Issues Tariffs on Chinese Products in Response to Unfair Trade Practices",
      publisher: "Office of the United States Trade Representative",
      publishedAt: "2018-06-15",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "USTR release",
          url: "https://ustr.gov/about-us/policy-offices/press-office/press-releases/2018/june/ustr-issues-tariffs-chinese-products",
        },
      ],
      context:
        "Documents the US tariff decision following the Section 301 technology-transfer and intellectual-property investigation.",
      limitation:
        "This is the US government’s legal and policy framing; it is not an independent adjudication of every allegation or tariff effect.",
    },
    {
      id: "notebook-source-chips-act",
      role: "Primary US industrial-policy record",
      title: "Statement on the Signing of the CHIPS and Science Act",
      publisher: "US Department of Commerce",
      publishedAt: "2022-08-09",
      retrievedAt: "2026-08-14",
      links: [
        {
          label: "Commerce release",
          url: "https://www.commerce.gov/news/press-releases/2022/08/statement-us-secretary-commerce-gina-raimondo-signing-chips-and-science",
        },
      ],
      context:
        "Records the signing and stated industrial, research, workforce, and national-security purposes of the CHIPS and Science Act.",
      limitation:
        "Signing establishes authority and intent. Awards, construction, workforce development, and output require separate implementation evidence.",
    },
  ],
  unresolvedQuestion:
    "Which advantages remain national assets when the two systems are so interdependent, and which become liabilities the moment each government tries to weaponize them?",
  limitations: [
    "This is a public-source desk review completed August 14, 2026, not original reporting, interviews, site inspection, intelligence assessment, or a forecast model.",
    "The dashboard is deliberately non-additive. It does not assign weights, normalize unlike units, or generate an overall US–China power score.",
    "Years and definitions differ across series. Every graphic displays its as-of date and carries the relevant denominator or methodological warning.",
    "Official Chinese and US records establish what governments report or announce; they are not automatically independent proof of performance, causation, or completeness.",
    "The Census age bands are calculations from official single-year estimates. Cross-country demographic systems are comparable only within the explicit definitional boundary shown.",
    "The review does not resolve Taiwan contingencies, alliance reliability, classified capability, subnational inequality, ecological costs, political legitimacy, or the quality of every research output.",
  ],
}) as PowerBalanceNotebookEntry;
