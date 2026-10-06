import { parseEconomicSignalsNotebookEntry } from "@/content/notebook/schema";

export const julyIsNotOneNumber = parseEconomicSignalsNotebookEntry({
  variant: "economic-signals",
  ordinal: 7,
  slug: "july-is-not-one-number",
  title: "July Is Not One Number",
  subtitle:
    "July's economic releases point in different directions. What do six indicators reveal when their observation periods, populations, and comparison bases stay attached?",
  description:
    "A bounded reading of China's July 2026 industrial output, profits, retail sales, investment, property, and manufacturing survey data.",
  thesis:
    "July's releases show industrial resilience alongside property contraction and soft household demand. Each indicator measures a different population, period, or comparison, so their movements cannot be added into one verdict. Reading them separately preserves the distinction between an observed change, the government's characterization, and an analyst's explanation.",
  frontPagePreview: {
    finding:
      "Industrial output and profits grew while retail sales, investment, property, and the manufacturing survey exposed a narrower and more uneven expansion.",
    status: "interpretation",
    caveat:
      "The six measures cover different populations and periods; several are cumulative, retail sales are nominal, and PMI is a diffusion index rather than an output-growth rate.",
    sourceIds: [
      "notebook-source-july-output",
      "notebook-source-july-property",
      "notebook-source-july-profits",
    ],
  },
  presentationUpdatedAt: "2026-09-07",
  publishedAt: "2026-08-29",
  updatedAt: "2026-08-29",
  readTime: "14 min",
  tags: [
    "China economy",
    "industrial production",
    "household demand",
    "property",
    "investment",
    "statistics",
  ],
  editorialStatus: "published",
  reviewState: "source-reviewed",
  formats: [
    {
      id: "format-july-nbs-summary",
      label: "Official summary",
      title:
        "National Economy Maintained Steady Momentum with Innovation-driven and High-quality Development in the First Seven Months",
      publisher: "National Bureau of Statistics of China",
      url: "https://www.stats.gov.cn/english/PressRelease/202608/t20260817_1965057.html",
      retrievedAt: "2026-08-29",
      note: "A government synthesis of the first seven months. Its characterization is an official position; the linked indicator releases supply the definitions and tables used here.",
    },
    {
      id: "format-july-world-bank",
      label: "Independent frame",
      title: "Rebalancing Growth: China Economic Update",
      publisher: "World Bank",
      url: "https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099713507162625724",
      retrievedAt: "2026-08-29",
      note: "An institutional analysis that contrasts high-tech and export resilience with cautious consumers and property weakness. Its 2026 growth figure is a forecast, not a July observation.",
    },
    {
      id: "format-july-oecd",
      label: "Alternative outlook",
      title: "China: OECD Economic Outlook, Volume 2026 Issue 1",
      publisher: "OECD",
      url: "https://www.oecd.org/en/publications/oecd-economic-outlook-volume-2026-issue-1_2d1956f0-en/full-report/china_6526c66b.html",
      retrievedAt: "2026-08-29",
      note: "A June outlook on property adjustment, precautionary saving, investment, and policy support. Its projections depend on assumptions that the July releases cannot validate.",
    },
  ],
  turningPoints: [
    {
      id: "turning-july-production",
      timecode: "JULY",
      title: "Output kept growing",
      status: "observed",
      argument:
        "Real value added at industrial enterprises above the designated size rose 4.5 percent year over year in July.",
      reading:
        "The gain establishes industrial growth in the covered firms, not economy-wide acceleration or equal growth across sectors and products.",
      sourceIds: ["notebook-source-july-output"],
    },
    {
      id: "turning-july-demand-investment",
      timecode: "JAN-JUL",
      title: "Demand and investment separated",
      status: "observed",
      argument:
        "July retail sales grew slowly while cumulative fixed investment and property investment fell, even as selected technology-related investment rose.",
      reading:
        "The releases show divergence across spending channels. They do not turn retail sales into total consumption or one investment category into the national total.",
      sourceIds: [
        "notebook-source-july-retail",
        "notebook-source-july-investment",
        "notebook-source-july-property",
      ],
    },
    {
      id: "turning-july-profit-release",
      timecode: "27 AUG",
      title: "Profit growth arrived last",
      status: "observed",
      argument:
        "The August 27 release reported 17.6 percent profit growth for January through July among covered industrial enterprises.",
      reading:
        "The aggregate was divided sharply by industry and accompanied by longer receivables and larger finished-goods inventories.",
      sourceIds: ["notebook-source-july-profits"],
    },
  ],
  indicators: [
    {
      id: "indicator-july-industrial-output",
      dimension: "industrial-output",
      label: "Industrial output",
      period: "July 2026",
      observedAt: "2026-07",
      display: "+4.5%",
      value: 4.5,
      unit: "percent change",
      comparison: "year over year",
      basis: "real",
      coverage:
        "Value added at industrial enterprises above the designated size, generally firms with annual main business revenue of at least 20 million yuan.",
      reading:
        "Covered industrial production continued to grow, with manufacturing up 5.5 percent and high-technology manufacturing up 16.9 percent.",
      counterReading:
        "Only 25 of 41 major industries and 279 of 626 listed products recorded year-over-year growth, so the headline did not describe uniform expansion.",
      caveat:
        "Value added is a real output measure for a defined enterprise population. It is not profit, sales, employment, or total GDP, and the coverage changes annually.",
      status: "observed",
      contrasts: [
        {
          label: "Manufacturing value added",
          display: "+5.5%",
          value: 5.5,
          unit: "percent change",
          comparison: "July, year over year",
        },
        {
          label: "High-technology manufacturing",
          display: "+16.9%",
          value: 16.9,
          unit: "percent change",
          comparison: "July, year over year",
        },
      ],
      sourceIds: ["notebook-source-july-output"],
    },
    {
      id: "indicator-july-industrial-profits",
      dimension: "industrial-profits",
      label: "Industrial profits",
      period: "January-July 2026",
      observedAt: "2026-07-31",
      display: "+17.6%",
      value: 17.6,
      unit: "percent change",
      comparison: "year over year",
      basis: "comparable",
      coverage:
        "Total profits of industrial enterprises above the designated size, calculated against a comparable prior-year enterprise population.",
      reading:
        "The covered industrial firms reported faster revenue than cost growth and a higher aggregate profit margin over the seven-month period.",
      counterReading:
        "The aggregate gain was concentrated: electronics profits rose sharply while automotive, nonmetallic-mineral, ferrous-metal, and power-sector profits fell.",
      caveat:
        "Profit is cumulative and sector-composition sensitive. It can rise while receivables and inventories also rise, so it does not by itself establish stronger final demand or cash collection.",
      status: "observed",
      contrasts: [
        {
          label: "Electronics profits",
          display: "+110%",
          value: 110,
          unit: "percent change",
          comparison: "January-July, year over year",
        },
        {
          label: "Automotive profits",
          display: "-20.4%",
          value: -20.4,
          unit: "percent change",
          comparison: "January-July, year over year",
        },
        {
          label: "Receivables",
          display: "+8.5%",
          value: 8.5,
          unit: "percent change",
          comparison: "July 31, year over year",
        },
        {
          label: "Finished-goods inventories",
          display: "+10.8%",
          value: 10.8,
          unit: "percent change",
          comparison: "July 31, year over year",
        },
      ],
      sourceIds: ["notebook-source-july-profits"],
    },
    {
      id: "indicator-july-retail-sales",
      dimension: "retail-sales",
      label: "Retail sales",
      period: "July 2026",
      observedAt: "2026-07",
      display: "+0.6%",
      value: 0.6,
      unit: "percent change",
      comparison: "year over year",
      basis: "nominal",
      coverage:
        "Sales of non-production physical goods to individuals and social groups plus catering revenue across covered firms and sampled smaller sellers.",
      reading:
        "The headline remained positive, and July sales excluding automobiles grew faster than the total as motor-vehicle sales fell.",
      counterReading:
        "The gain was slight, retail units above the designated size declined, and the release excludes many household services that belong in a broader consumption measure.",
      caveat:
        "The published growth rates are not adjusted for price factors. Online goods-and-services coverage changed in 2026 and is not comparable with the earlier online-retail series.",
      status: "observed",
      contrasts: [
        {
          label: "January-July retail sales",
          display: "+1.2%",
          value: 1.2,
          unit: "percent change",
          comparison: "January-July, year over year",
        },
        {
          label: "July excluding automobiles",
          display: "+2.5%",
          value: 2.5,
          unit: "percent change",
          comparison: "July, year over year",
        },
        {
          label: "Online goods and services",
          display: "+4.8%",
          value: 4.8,
          unit: "percent change",
          comparison: "January-July, year over year",
        },
      ],
      sourceIds: ["notebook-source-july-retail"],
    },
    {
      id: "indicator-july-fixed-investment",
      dimension: "fixed-investment",
      label: "Fixed investment",
      period: "January-July 2026",
      observedAt: "2026-07-31",
      display: "-6.7%",
      value: -6.7,
      unit: "percent change",
      comparison: "year over year",
      basis: "not price adjusted",
      coverage:
        "Fixed-asset projects with planned investment of at least 5 million yuan plus all real-estate development projects, excluding rural households.",
      reading:
        "The national total fell on the comparable year-over-year basis, with declines in infrastructure, manufacturing, and real-estate development.",
      counterReading:
        "The total concealed growth in intellectual-property products, information transmission, aerospace equipment, and selected transport infrastructure.",
      caveat:
        "The release is not price adjusted, includes property, and uses revised prior-year data for comparability. A growing subcategory can coexist with a falling weighted total.",
      status: "observed",
      contrasts: [
        {
          label: "Intellectual-property products",
          display: "+9.1%",
          value: 9.1,
          unit: "percent change",
          comparison: "January-July, year over year",
        },
        {
          label: "Non-governmental investment",
          display: "-9.4%",
          value: -9.4,
          unit: "percent change",
          comparison: "January-July, year over year",
        },
        {
          label: "Information transmission",
          display: "+26.0%",
          value: 26,
          unit: "percent change",
          comparison: "January-July, year over year",
        },
        {
          label: "Aerospace equipment",
          display: "+18.7%",
          value: 18.7,
          unit: "percent change",
          comparison: "January-July, year over year",
        },
      ],
      sourceIds: ["notebook-source-july-investment"],
    },
    {
      id: "indicator-july-property",
      dimension: "property",
      label: "Property investment",
      period: "January-July 2026",
      observedAt: "2026-07-31",
      display: "-19.2%",
      value: -19.2,
      unit: "percent change",
      comparison: "year over year",
      basis: "comparable",
      coverage:
        "Investment completed by legal entities engaged in real-estate development and operation, including housing, land development, and related projects.",
      reading:
        "Investment, new starts, sales area, sales value, and funds available to developers all declined over the seven-month period.",
      counterReading:
        "The measures are cumulative flows with different units; they establish contraction in the covered property system, not the size of every local price change or household balance-sheet effect.",
      caveat:
        "NBS revised the prior-year comparison base under its statistical and inspection rules. Sales area is square meters, sales value and investment are yuan, and funds are financing flows.",
      status: "observed",
      contrasts: [
        {
          label: "New starts by floor area",
          display: "-24.0%",
          value: -24,
          unit: "percent change",
          comparison: "January-July, year over year",
        },
        {
          label: "Sales area",
          display: "-11.8%",
          value: -11.8,
          unit: "percent change",
          comparison: "January-July, year over year",
        },
        {
          label: "Sales value",
          display: "-13.1%",
          value: -13.1,
          unit: "percent change",
          comparison: "January-July, year over year",
        },
        {
          label: "Developer funds",
          display: "-20.3%",
          value: -20.3,
          unit: "percent change",
          comparison: "January-July, year over year",
        },
      ],
      sourceIds: ["notebook-source-july-property"],
    },
    {
      id: "indicator-july-manufacturing-pmi",
      dimension: "manufacturing-pmi",
      label: "Manufacturing PMI",
      period: "July 2026",
      observedAt: "2026-07",
      display: "49.2",
      value: 49.2,
      unit: "diffusion index points",
      comparison: "50-point threshold",
      basis: "seasonally adjusted survey",
      coverage:
        "A monthly purchasing-manager survey summarized as a diffusion index across production, orders, inventories, employment, and supplier delivery time.",
      reading:
        "The headline, production, and new-order indexes were below 50, meaning more weighted responses pointed toward deterioration than improvement from June.",
      counterReading:
        "A reading of 49.2 is not a 0.8 percent fall in manufacturing output. The separate output series still recorded positive year-over-year growth in July.",
      caveat:
        "PMI is a direction-of-change survey relative to the prior month. It does not report the magnitude of output, sales, profits, or GDP change.",
      status: "observed",
      contrasts: [
        {
          label: "Large enterprises",
          display: "49.5",
          value: 49.5,
          unit: "diffusion index points",
          comparison: "July, against 50",
        },
        {
          label: "Medium enterprises",
          display: "49.7",
          value: 49.7,
          unit: "diffusion index points",
          comparison: "July, against 50",
        },
        {
          label: "Small enterprises",
          display: "47.4",
          value: 47.4,
          unit: "diffusion index points",
          comparison: "July, against 50",
        },
        {
          label: "New orders",
          display: "48.5",
          value: 48.5,
          unit: "diffusion index points",
          comparison: "July, against 50",
        },
      ],
      sourceIds: ["notebook-source-july-pmi"],
    },
  ],
  alternativeReadings: [
    {
      id: "reading-july-industrial-resilience",
      label: "Industrial resilience is real",
      status: "interpretation",
      reading:
        "Real industrial value added grew, total industrial profits rose on a comparable basis, and selected high-technology measures expanded faster than the covered industrial total.",
      boundary:
        "That reading applies to the defined industrial population. It does not erase sector declines or establish equally strong household demand.",
      sourceIds: [
        "notebook-source-july-output",
        "notebook-source-july-profits",
        "notebook-source-july-world-bank",
      ],
    },
    {
      id: "reading-july-profit-concentration",
      label: "Profit growth was concentrated",
      status: "interpretation",
      reading:
        "The aggregate profit gain coexisted with a 110 percent electronics increase, a 20.4 percent automotive decline, and rising receivables and finished-goods inventories.",
      boundary:
        "Sector composition complicates the aggregate. It does not prove that the reported total is false or that every covered firm faced weak cash flow.",
      sourceIds: ["notebook-source-july-profits"],
    },
    {
      id: "reading-july-property-drag",
      label: "Property remained a broad drag",
      status: "interpretation",
      reading:
        "Investment, new starts, sales area, sales value, and developer funds all fell, while IMF and BIS research describes plausible property-to-consumption and property-to-inflation channels.",
      boundary:
        "The NBS release observes property activity. The IMF and BIS mechanisms are empirical analyses with earlier data, model choices, and heterogeneous city or provincial effects.",
      sourceIds: [
        "notebook-source-july-property",
        "notebook-source-july-imf",
        "notebook-source-july-bis",
      ],
    },
    {
      id: "reading-july-uneven-investment",
      label: "A falling total contained expanding categories",
      status: "interpretation",
      reading:
        "Fixed investment fell overall, yet intellectual-property products, information transmission, aerospace equipment, and selected transport categories grew.",
      boundary:
        "Fast growth in named categories does not reveal their weight in the total and cannot be added directly to differently defined high-technology series.",
      sourceIds: [
        "notebook-source-july-investment",
        "notebook-source-july-nbs-summary",
      ],
    },
    {
      id: "reading-july-outlooks",
      label: "Forecasts frame the tension; they do not settle it",
      status: "scenario",
      reading:
        "The World Bank and OECD project continued growth while emphasizing cautious consumers, property adjustment, policy support, and selected industrial or export strengths. The IMF identifies similar structural channels from an earlier cutoff.",
      boundary:
        "The 4.4 and 4.5 percent figures are forecasts for full-year 2026. They are not measurements of July and cannot be averaged into a more authoritative number.",
      sourceIds: [
        "notebook-source-july-world-bank",
        "notebook-source-july-oecd",
        "notebook-source-july-imf",
      ],
    },
  ],
  sections: {
    frame: [
      "A monthly data release invites a scoreboard. July resists one. Industrial output and the manufacturing survey describe production from different angles. Profits describe covered firms over seven months. Retail sales describe nominal goods and catering transactions. Fixed investment and property track cumulative spending, floor area, sales, and financing. They overlap, but they are not the same object.",
      "The first rule is therefore grammatical: keep every subject attached to its verb. Industrial value added grew. Industrial profits grew in aggregate. Retail sales edged higher. Fixed investment fell. Property measures contracted. Purchasing managers reported a deterioration from June. Removing the subjects would turn six bounded observations into one unearned claim.",
      "This is a source-audited data interpretation, not verified Mainland Dispatch reporting. NBS is the primary authority for what it measured, published, and defined. The World Bank, OECD, IMF, and BIS add institutional analysis, forecasts, and empirical mechanisms; they do not independently reproduce the July tables.",
    ],
    production: [
      "The cleanest positive observation is real industrial value added: 4.5 percent above July 2025 for enterprises above the designated size and 0.11 percent above June on the seasonally adjusted series. Manufacturing rose 5.5 percent, while mining fell 4.2 percent. High-technology manufacturing grew 16.9 percent. Those are output measures, not financial results.",
      "The breadth was narrower than the headline. NBS reported year-over-year growth in 25 of 41 major industries and 279 of 626 listed products. Computers, communications, and other electronic equipment rose 19.1 percent in value-added terms, while some materials categories fell. Industrial resilience is defensible when it names this population and these differences.",
      "The PMI supplies a different comparison. Its 49.2 reading asks purchasing managers whether conditions improved or deteriorated from the previous month and weights the responses into a diffusion index. The 50 threshold divides reported expansion from contraction; it does not translate into percentage output growth. July can therefore have a below-50 PMI and positive year-over-year industrial output without contradiction.",
      "The two clocks matter. PMI moved from 50.3 in June to 49.2 in July, while industrial value added compared July 2026 with July 2025. One suggests month-to-month loss of breadth or momentum; the other says the covered output level remained above a year earlier.",
    ],
    demand: [
      "July retail sales reached 3.9022 trillion yuan and rose 0.6 percent year over year. Excluding automobiles, they rose 2.5 percent. The difference matters because motor-vehicle retail sales at units above the designated size fell 17.0 percent. Food, telecommunications equipment, cosmetics, furniture, and building materials also moved at different rates.",
      "The January-July total was 28.7744 trillion yuan, up 1.2 percent. Online sales of goods and services rose 4.8 percent over that period, but the release says its platform coverage was expanded and the measure is not comparable with the earlier online-retail series. A faster subseries cannot be treated as the whole consumer market.",
      "Retail sales are not total household consumption. They cover physical goods sold to individuals and social groups plus catering revenue. Many services enter other statistical series, and the published retail growth rates are not adjusted for prices. Calling 0.6 percent nominal retail growth a real household-consumption rate would change both the population and the unit.",
      "The World Bank and OECD interpret cautious consumption partly through saving behavior, social protection, and property adjustment. That is an analytical frame around the release, not a causal finding produced by the July retail table.",
    ],
    investment: [
      "Fixed-asset investment excluding rural households totaled 26.0328 trillion yuan from January through July, down 6.7 percent year over year. The release covers projects with planned investment of at least 5 million yuan plus all real-estate development. It is cumulative, not price adjusted, and calculated against revised prior-year data on a comparable basis.",
      "The components were uneven. Infrastructure investment fell 3.6 percent, manufacturing investment fell 1.7 percent, and property development investment fell 19.2 percent. Non-governmental investment fell 9.4 percent. Those declines explain why selected expanding categories did not lift the total.",
      "Intellectual-property-product investment rose 9.1 percent. Information-transmission investment rose 26.0 percent, aerospace-equipment investment 18.7 percent, and investment in computers, communications, and other electronic equipment 7.8 percent. These observations support a rotation or divergence reading only when their distinct category weights remain unknown.",
      "The NBS summary adds a high-technology-industry investment measure of 5.0 percent growth. It is useful official context, but it should not be silently merged with the intellectual-property or named industry series. Similar labels do not guarantee identical classifications or weights.",
    ],
    property: [
      "Property is the broadest cluster of negative observations in the packet. Development investment fell 19.2 percent, new starts by floor area fell 24.0 percent, the floor area of newly built commercial buildings sold fell 11.8 percent, and sales value fell 13.1 percent. Funds available to development enterprises fell 20.3 percent.",
      "The units prevent false arithmetic. Investment, sales value, and funds are monetary flows. New starts and sales area are square meters. The figures cover January through July and are compared with the same period of 2025. They cannot be added, averaged, or described as one property index.",
      "The IMF's 2025 Article IV staff work links property downturns to weaker consumption and disinflation through investment, local-government finance, and household wealth. BIS researchers using Alipay transactions from 2017 through early 2023 find positive housing wealth effects in 33 larger cities but different results in smaller cities and among younger people. These sources make the transmission channel plausible and heterogeneous; they do not measure its July 2026 size.",
      "The alternative reading is not that property is irrelevant. It is that a property contraction can coexist with growth in industrial output and selected investment categories, and that coexistence says more than either a national collapse story or a national acceleration story.",
    ],
    synthesis: [
      "The six signals line up most clearly as a composition problem. Supply-side industrial measures remained positive. The household-facing retail measure was positive but soft. The manufacturing survey moved below its threshold. Investment fell overall while selected technology-related categories expanded. Property contraction cut across activity, sales, and financing.",
      "Profit growth adds evidence of industrial earnings, not a universal demand verdict. The 17.6 percent aggregate included a sharp electronics rise and a sharp automotive fall. Receivables rose 8.5 percent and finished-goods inventories 10.8 percent at the end of July. Those facts are consistent with several business conditions, and the release does not identify one cause.",
      "The official NBS synthesis calls the economy generally stable and says the imbalance between strong supply and weak demand remained acute. That wording is a government characterization. The World Bank, OECD, and IMF use different models and assumptions but also distinguish industrial or export resilience from property and consumption weakness. Their overlap is interpretively useful without becoming independent verification of every official number.",
      "A bounded conclusion can carry all of this at once: July's measured activity was uneven by sector, demand channel, and statistical clock. The next release may change the direction or breadth. It will not make these July definitions interchangeable after the fact.",
    ],
    changed: [
      "The August 27 candidate ledger supplied the bounded frame and nine admitted source groups. The August 29 review checked every primary URL, added the NBS English industrial-profit translation published August 28, and retained the August 27 Chinese record as the source date for the original release.",
      "The review also records that the live PMI page displays August 1 even though the candidate ledger listed August 3. The Notebook uses the publisher-displayed date, preserves July as the observation month, and leaves the discrepancy visible in the source limitation rather than treating a URL date as the publication date.",
    ],
  },
  unresolvedQuestion:
    "Will the August releases show broader household and private-investment demand without a renewed deterioration in property activity, or will July's divergence persist on the same definitions and comparable bases?",
  limitations: [
    "All six observations originate with China's National Bureau of Statistics. The international sources add analysis and forecasts but do not independently reproduce the underlying July microdata.",
    "Retail sales are not total household consumption, and the published growth rates are nominal rather than price adjusted.",
    "Industrial output and PMI use different comparisons: year-over-year real value added versus a seasonally adjusted month-to-month diffusion survey.",
    "The industrial-profit, fixed-investment, property, and January-July retail figures are cumulative. They are not stand-alone July growth rates.",
    "Industrial and retail enterprise coverage changes as firms cross designated-size thresholds. NBS calculates comparison rates on current-period coverage, which differs from previously published totals.",
    "Fixed investment is not price adjusted. Property and fixed-investment year-over-year rates use revised comparison bases, and the components have different weights.",
    "World Bank and OECD full-year growth numbers are forecasts conditioned on policy and external assumptions. The IMF and BIS property mechanisms use earlier data and analytical methods.",
    "The source review was current through August 29, 2026. Revised July tables and August data should be checked before any later update.",
  ],
  sourceTrail: [
    {
      id: "notebook-source-july-output",
      role: "Primary observation - industrial output",
      title: "Industrial Production Operation in July 2026",
      publisher: "National Bureau of Statistics of China",
      publishedAt: "2026-08-18",
      retrievedAt: "2026-08-29",
      links: [
        {
          label: "Industrial output release",
          url: "https://www.stats.gov.cn/english/PressRelease/202608/t20260818_1965071.html",
        },
      ],
      context:
        "Reports July real value-added growth of 4.5 percent for industrial enterprises above the designated size, plus sector, industry, product, sales-ratio, export-delivery, coverage, and seasonal-adjustment details.",
      limitation:
        "The enterprise population changes annually. Value added is a real output measure for covered industrial firms, not a measure of profits, employment, or the entire economy.",
    },
    {
      id: "notebook-source-july-profits",
      role: "Primary observation - industrial profits",
      title:
        "Profits of Industrial Enterprises above the Designated Size from January to July in 2026",
      publisher: "National Bureau of Statistics of China",
      publishedAt: "2026-08-27",
      retrievedAt: "2026-08-29",
      links: [
        {
          label: "Chinese release",
          url: "https://www.stats.gov.cn/sj/zxfb/202608/t20260827_1965126.html",
        },
        {
          label: "English release",
          url: "https://www.stats.gov.cn/english/PressRelease/202608/t20260828_1965134.html",
        },
      ],
      context:
        "The original August 27 record reports 17.6 percent comparable-basis profit growth, major industry differences, revenue and cost totals, margin, receivables, inventories, and balance-sheet measures. NBS posted its English version on August 28.",
      limitation:
        "A cumulative aggregate can be concentrated by sector and affected by the comparable enterprise population. Profit, receivables, inventory, and cash flow are distinct measures.",
    },
    {
      id: "notebook-source-july-retail",
      role: "Primary observation - retail sales",
      title: "Total Retail Sales of Consumer Goods from January to July 2026",
      publisher: "National Bureau of Statistics of China",
      publishedAt: "2026-08-18",
      retrievedAt: "2026-08-29",
      links: [
        {
          label: "Retail sales release",
          url: "https://www.stats.gov.cn/english/PressRelease/202608/t20260819_1965078.html",
        },
      ],
      context:
        "Reports 28.7744 trillion yuan in January-July retail sales, up 1.2 percent, and 3.9022 trillion yuan in July, up 0.6 percent, with area, format, category, online, coverage, and revision notes.",
      limitation:
        "Retail sales cover goods and catering rather than total household consumption. Growth rates are not adjusted for prices, and the 2026 online series changed coverage.",
    },
    {
      id: "notebook-source-july-investment",
      role: "Primary observation - fixed investment",
      title: "Investment in Fixed Assets from January to July 2026",
      publisher: "National Bureau of Statistics of China",
      publishedAt: "2026-08-18",
      retrievedAt: "2026-08-29",
      links: [
        {
          label: "Fixed investment release",
          url: "https://www.stats.gov.cn/english/PressRelease/202608/t20260818_1965072.html",
        },
      ],
      context:
        "Reports 26.0328 trillion yuan in fixed investment excluding rural households, down 6.7 percent, alongside industry, ownership, regional, technology-related, coverage, and revision detail.",
      limitation:
        "The series includes projects above a threshold and all property development, is not price adjusted, and uses a revised prior-year comparison base.",
    },
    {
      id: "notebook-source-july-property",
      role: "Primary observation - property activity",
      title: "Investment in Real Estate Development from January to July 2026",
      publisher: "National Bureau of Statistics of China",
      publishedAt: "2026-08-18",
      retrievedAt: "2026-08-29",
      links: [
        {
          label: "Property investment release",
          url: "https://www.stats.gov.cn/english/PressRelease/202608/t20260819_1965077.html",
        },
      ],
      context:
        "Reports property investment, construction, new starts, completions, new-commercial-building sales area and value, inventory, financing, regional results, coverage, and comparable-basis revisions.",
      limitation:
        "The indicators are cumulative and mix monetary flows with square-meter measures. The prior-year base was revised for comparability.",
    },
    {
      id: "notebook-source-july-pmi",
      role: "Primary survey - manufacturing PMI",
      title: "Purchasing Managers' Index for July 2026",
      publisher:
        "National Bureau of Statistics of China and China Federation of Logistics and Purchasing",
      publishedAt: "2026-08-01",
      retrievedAt: "2026-08-29",
      links: [
        {
          label: "Manufacturing PMI release",
          url: "https://www.stats.gov.cn/english/PressRelease/202608/t20260803_1964272.html",
        },
      ],
      context:
        "Reports a 49.2 manufacturing PMI, enterprise-size indexes, five headline subindexes, longer historical tables, survey definitions, coverage, and calculation method.",
      limitation:
        "PMI is a seasonally adjusted diffusion index relative to the previous month, not an output-growth rate. The live page displays August 1; the August 27 candidate ledger recorded August 3.",
    },
    {
      id: "notebook-source-july-nbs-summary",
      role: "Official synthesis - government characterization",
      title:
        "National Economy Maintained Steady Momentum with Innovation-driven and High-quality Development in the First Seven Months",
      publisher: "National Bureau of Statistics of China",
      publishedAt: "2026-08-17",
      retrievedAt: "2026-08-29",
      links: [
        {
          label: "Official summary",
          url: "https://www.stats.gov.cn/english/PressRelease/202608/t20260817_1965057.html",
        },
      ],
      context:
        "Synthesizes July and January-July releases and describes stable production, employment, prices, trade, and new growth drivers while acknowledging an acute imbalance between strong supply and weak demand.",
      limitation:
        "This is the publishing government's characterization of its data and policy context, not independent validation of the underlying records or causal claims.",
    },
    {
      id: "notebook-source-july-world-bank",
      role: "Independent institutional analysis - current outlook",
      title: "Rebalancing Growth: China Economic Update",
      publisher: "World Bank",
      publishedAt: "2026-07-07",
      retrievedAt: "2026-08-29",
      links: [
        {
          label: "Press release",
          url: "https://www.worldbank.org/en/news/press-release/2026/07/07/rebalancing-growth-china-economic-update",
        },
        {
          label: "Report record",
          url: "https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099713507162625724",
        },
      ],
      context:
        "Contrasts high-technology investment, exports, and policy buffers with weaker domestic demand, cautious consumers, and property adjustment; projects 4.4 percent growth for 2026.",
      limitation:
        "The growth number is a full-year forecast published before the July indicator releases. The analysis depends on policy, energy, trade, and property assumptions.",
    },
    {
      id: "notebook-source-july-oecd",
      role: "Independent institutional forecast - alternative outlook",
      title: "China: OECD Economic Outlook, Volume 2026 Issue 1",
      publisher: "OECD",
      publishedAt: "2026-06",
      retrievedAt: "2026-08-29",
      links: [
        {
          label: "Country outlook",
          url: "https://www.oecd.org/en/publications/oecd-economic-outlook-volume-2026-issue-1_2d1956f0-en/full-report/china_6526c66b.html",
        },
      ],
      context:
        "Projects 4.5 percent growth for 2026 and discusses industrial strength, property adjustment, precautionary saving, policy support, investment composition, and external risks.",
      limitation:
        "The forecast precedes the July releases and is conditional on stated assumptions. It is an institutional interpretation, not a July measurement.",
    },
    {
      id: "notebook-source-july-imf",
      role: "Independent institutional analysis - structural context",
      title:
        "People's Republic of China: 2025 Article IV Consultation - Staff Report",
      publisher: "International Monetary Fund",
      publishedAt: "2026-01-28",
      retrievedAt: "2026-08-29",
      links: [
        {
          label: "Publication record",
          url: "https://www.imf.org/en/publications/cr/issues/2026/02/17/peoples-republic-of-china-2025-article-iv-consultation-press-release-staff-report-and-574028",
        },
        {
          label: "Staff report PDF",
          url: "https://www.imf.org/-/media/files/publications/cr/2026/english/1chnea2026001-source-pdf.pdf",
        },
      ],
      context:
        "Analyzes property adjustment, domestic demand, disinflation, household wealth, saving, local-government finance, trade, and rebalancing with country and provincial evidence.",
      limitation:
        "The report uses an earlier data cutoff, institutional judgments, and model-based estimates. It supplies mechanisms and context, not a direct reading of July 2026.",
    },
    {
      id: "notebook-source-july-bis",
      role: "Technical research - housing wealth mechanism",
      title: "Housing wealth effects in China",
      publisher: "Bank for International Settlements",
      author: "Benoit Mojon, Han Qiu, Fang Wang, and Michael Weber",
      publishedAt: "2025-12-17",
      retrievedAt: "2026-08-29",
      links: [
        {
          label: "Working paper record",
          url: "https://www.bis.org/publications/working-paper-1319-housing-wealth-effects-china",
        },
      ],
      context:
        "Uses household Alipay transactions and survey information to estimate heterogeneous relationships between house prices and consumption across larger and smaller Chinese cities and demographic groups.",
      limitation:
        "The transaction data run from 2017 to early 2023, estimates vary by city tier and group, and the authors' views do not necessarily represent the BIS. It is not a July 2026 estimate.",
    },
  ],
});
