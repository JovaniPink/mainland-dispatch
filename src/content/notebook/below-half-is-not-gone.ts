import { parseEnergySystemNotebookEntry } from "@/content/notebook/schema";

export const belowHalfIsNotGone = parseEnergySystemNotebookEntry({
  variant: "energy-system",
  ordinal: 8,
  slug: "below-half-is-not-gone",
  title: "Below Half Is Not Gone",
  subtitle:
    "Coal fell below half of China's electricity generation. Why did its output and fleet still grow, and what does that tell us about the transition?",
  description:
    "A layered reading of China's first-half 2026 electricity data separates generation share, output, capacity, and system use.",
  thesis:
    "Coal's 49.7 percent generation share marks a structural change, even as coal output and installed capacity grew. Share, output, capacity, and utilization answer different questions. A larger fleet can generate more electricity while losing share and being used less intensively; integration constraints can also coexist with rapid renewable growth.",
  frontPagePreview: {
    finding:
      "Coal supplied 49.7 percent of first-half generation, even as coal output rose 3.4 percent and 30 GW of capacity entered operation.",
    status: "interpretation",
    caveat:
      "The measures cover different periods and systems; the 360 TWh curtailment value is modeled, not an official observation.",
    sourceIds: [
      "notebook-source-energy-nea-h1",
      "notebook-source-energy-crea-gem-h1",
    ],
  },
  presentationUpdatedAt: "2026-09-07",
  publishedAt: "2026-09-01",
  updatedAt: "2026-09-01",
  readTime: "16 min",
  tags: [
    "China electricity",
    "coal power",
    "renewable energy",
    "energy transition",
    "grid integration",
    "curtailment",
  ],
  editorialStatus: "published",
  reviewState: "source-reviewed",
  formats: [
    {
      id: "format-energy-nea-conference",
      label: "Official record",
      title:
        "National Energy Administration press conference on first-half 2026 energy conditions",
      publisher: "National Energy Administration",
      url: "https://www.nea.gov.cn/20260730/6c60113d8ba5471eb0045cb7b314dee8/c.html",
      retrievedAt: "2026-09-01",
      note: "The controlling Chinese-language item for the 49.7 percent share, 2.5 trillion kWh coal generation, and wind-and-solar capacity.",
    },
    {
      id: "format-energy-crea-gem-report",
      label: "Complete report",
      title: "Built for backup, contracted to run",
      publisher: "CREA and Global Energy Monitor",
      url: "https://globalenergymonitor.org/sites/default/files/2026-08/CREA_GEM_China_Coal%20power_H1%202026.pdf",
      retrievedAt: "2026-09-01",
      note: "The 18-page report controls the coal fleet, utilization, generation-change, and modeled curtailment measures.",
    },
    {
      id: "format-energy-iea-midyear",
      label: "Forecast context",
      title: "Electricity Mid-Year Update 2026 - Executive summary",
      publisher: "International Energy Agency",
      url: "https://www.iea.org/reports/electricity-mid-year-update-2026/executive-summary",
      retrievedAt: "2026-09-01",
      note: "The 5.5 percent demand-growth value is a forecast for 2026, not an observed first-half measure.",
    },
  ],
  turningPoints: [
    {
      id: "turning-energy-mix",
      timecode: "Generation mix",
      title: "Coal's share moves below half",
      status: "observed",
      argument:
        "The NEA reported that coal supplied 49.7 percent of total electricity output in the first half of 2026.",
      reading:
        "A falling share says non-coal generation grew faster; it does not by itself say coal output fell.",
      sourceIds: ["notebook-source-energy-nea-h1"],
    },
    {
      id: "turning-energy-output",
      timecode: "Generation volume",
      title: "Coal output still rises",
      status: "observed",
      argument:
        "Official data put coal generation at 2.5 trillion kWh, while CREA/GEM calculated a 3.4 percent year-over-year increase.",
      reading:
        "Share and volume can move in opposite directions when the whole electricity system expands.",
      sourceIds: [
        "notebook-source-energy-state-council-h1",
        "notebook-source-energy-crea-gem-h1",
      ],
    },
    {
      id: "turning-energy-capacity",
      timecode: "Installed capacity",
      title: "Both renewable and coal fleets expand",
      status: "observed",
      argument:
        "Wind and solar reached 1.95 billion kW while 30 GW of coal capacity entered operation.",
      reading:
        "Capacity describes the fleet available to generate, not the electricity it actually produced.",
      sourceIds: [
        "notebook-source-energy-nea-h1",
        "notebook-source-energy-crea-gem-h1",
      ],
    },
    {
      id: "turning-energy-system-use",
      timecode: "System use",
      title: "Utilization falls as curtailment rises",
      status: "interpretation",
      argument:
        "CREA/GEM reported lower coal utilization and estimated 360 TWh of wind-and-solar curtailment.",
      reading:
        "The pairing points to integration and market constraints, but the curtailment total is partly modeled and is not a one-for-one dispatch counterfactual.",
      sourceIds: ["notebook-source-energy-crea-gem-h1"],
    },
  ],
  energyLayers: [
    {
      id: "generation-mix",
      label: "Generation mix",
      question: "What share of total electricity came from each source?",
      measures: [
        {
          id: "energy-measure-coal-share",
          layer: "generation-mix",
          label: "Coal-fired generation share",
          display: "49.7%",
          value: 49.7,
          unit: "percent of total electricity output",
          period: "January-June 2026",
          comparison: "First half-year below 50 percent",
          basis: "NEA total-generation share",
          evidenceKind: "official-measurement",
          interpretation:
            "Non-coal sources supplied slightly more than half of first-half electricity output.",
          counterReading:
            "Below half does not mean coal disappeared or that its absolute output declined.",
          boundary:
            "Not a full-year share, capacity value, fuel-consumption total, or emissions measure.",
          contrasts: [],
          sourceIds: [
            "notebook-source-energy-nea-h1",
            "notebook-source-energy-state-council-h1",
          ],
        },
        {
          id: "energy-measure-renewable-share",
          layer: "generation-mix",
          label: "Renewable generation share",
          display: "41.2%",
          value: 41.2,
          unit: "percent of total electricity generation",
          period: "January-June 2026",
          comparison:
            "About 9 percent more renewable generation year over year",
          basis: "NEA renewable-generation share",
          evidenceKind: "official-measurement",
          interpretation:
            "Renewables served a large and growing share of the system.",
          counterReading:
            "Coal and renewables do not exhaust the generation mix; nuclear, gas, and other sources remain outside this pair.",
          boundary:
            "Generation share is not installed capacity and does not reveal hourly availability or location.",
          contrasts: [],
          sourceIds: ["notebook-source-energy-state-council-h1"],
        },
      ],
    },
    {
      id: "generation-volume",
      label: "Generation volume",
      question: "How much coal-fired electricity was produced?",
      measures: [
        {
          id: "energy-measure-coal-output",
          layer: "generation-volume",
          label: "Coal-fired generation",
          display: "2.5 trillion kWh",
          value: 2.5,
          unit: "trillion kilowatt-hours",
          period: "January-June 2026",
          comparison: "Absolute first-half output",
          basis: "NEA coal-fired generation total",
          evidenceKind: "official-measurement",
          interpretation:
            "Coal remained an enormous source of electricity even after its share fell below half.",
          counterReading:
            "An absolute output level alone does not show whether coal is gaining or losing relative importance.",
          boundary:
            "Not installed capacity, thermal generation, coal production, consumption, or emissions.",
          contrasts: [],
          sourceIds: [
            "notebook-source-energy-nea-h1",
            "notebook-source-energy-state-council-h1",
          ],
        },
        {
          id: "energy-measure-coal-output-change",
          layer: "generation-volume",
          label: "Coal-fired generation change",
          display: "+3.4%",
          value: 3.4,
          unit: "percent change",
          period: "H1 2026 versus H1 2025",
          comparison: "Year over year",
          basis: "CREA/GEM bounded coal-generation series",
          evidenceKind: "independent-analysis",
          interpretation:
            "Coal generation grew, but more slowly than the total system, allowing its share to fall.",
          counterReading:
            "The analysts' series is not interchangeable with official thermal-power data or the IEA's annual 2025 comparison.",
          boundary:
            "An analyst-calculated first-half change, not an official full-year observation.",
          contrasts: [
            {
              id: "energy-contrast-demand-forecast",
              label: "China electricity-demand growth forecast",
              display: "5.5%",
              value: 5.5,
              unit: "percent change",
              period: "Full-year 2026",
              comparison: "IEA forecast versus 5.2 percent in 2025",
              evidenceKind: "forecast",
              boundary:
                "Not an observed first-half total and not a sufficient causal explanation for the 3.4 percent coal change.",
              sourceIds: ["notebook-source-energy-iea-midyear"],
            },
          ],
          sourceIds: ["notebook-source-energy-crea-gem-h1"],
        },
      ],
    },
    {
      id: "installed-capacity",
      label: "Installed capacity",
      question: "What generating equipment was connected or commissioned?",
      measures: [
        {
          id: "energy-measure-wind-solar-capacity",
          layer: "installed-capacity",
          label: "Combined wind and solar capacity",
          display: "1.95 billion kW",
          value: 1.95,
          unit: "billion kilowatts",
          period: "End of June 2026",
          comparison: "+16.8 percent year over year",
          basis: "Installed nameplate capacity",
          evidenceKind: "official-measurement",
          interpretation:
            "Wind and solar capacity expanded rapidly enough to reshape the fleet.",
          counterReading:
            "Nameplate capacity cannot be read as the same amount of generated electricity.",
          boundary:
            "Does not encode utilization, curtailment, dispatch priority, transmission, or storage.",
          contrasts: [],
          sourceIds: [
            "notebook-source-energy-nea-h1",
            "notebook-source-energy-state-council-h1",
          ],
        },
        {
          id: "energy-measure-coal-commissioned",
          layer: "installed-capacity",
          label: "Coal capacity commissioned",
          display: "30 GW",
          value: 30,
          unit: "gigawatts",
          period: "January-June 2026",
          comparison: "+43 percent year over year",
          basis: "Gross units entering operation",
          evidenceKind: "independent-analysis",
          interpretation:
            "A large previously approved pipeline continued to add operating coal capacity.",
          counterReading:
            "Gross commissioning is not net fleet growth and does not establish future output or motive.",
          boundary:
            "Separate from retirements, construction starts, proposals, permits, utilization, and generation.",
          contrasts: [
            {
              id: "energy-contrast-coal-retired",
              label: "Coal capacity retired",
              display: "2.7 GW",
              value: 2.7,
              unit: "gigawatts",
              period: "January-June 2026",
              comparison: "Retirements during the same period",
              evidenceKind: "independent-analysis",
              boundary:
                "A retirement total does not prove when replacement capacity generated electricity.",
              sourceIds: ["notebook-source-energy-crea-gem-h1"],
            },
            {
              id: "energy-contrast-coal-construction",
              label: "Coal capacity starting construction",
              display: "25.4 GW",
              value: 25.4,
              unit: "gigawatts",
              period: "January-June 2026",
              comparison: "New construction starts",
              evidenceKind: "independent-analysis",
              boundary:
                "Construction start is not completion, operation, or future utilization.",
              sourceIds: ["notebook-source-energy-crea-gem-h1"],
            },
          ],
          sourceIds: [
            "notebook-source-energy-crea-gem-h1",
            "notebook-source-energy-gcpt",
          ],
        },
      ],
    },
    {
      id: "system-use",
      label: "System use",
      question:
        "How intensively were assets used, and what clean output was not absorbed?",
      measures: [
        {
          id: "energy-measure-coal-utilization",
          layer: "system-use",
          label: "Average coal utilization",
          display: "1,998 hours",
          value: 1998,
          unit: "utilization hours",
          period: "January-June 2026",
          comparison: "Down 2.9 percent year over year",
          basis: "CREA/GEM average utilization calculation",
          evidenceKind: "independent-analysis",
          interpretation:
            "The coal fleet grew faster than the electricity produced from it, lowering average use per unit of capacity.",
          counterReading:
            "Lower utilization does not by itself measure reliability value, profitability, retirement timing, or emissions.",
          boundary:
            "A first-half average, not a full-year capacity factor or plant-by-plant dispatch record.",
          contrasts: [
            {
              id: "energy-contrast-coal-utilization-prior",
              label: "Prior first-half utilization",
              display: "2,056 hours",
              value: 2056,
              unit: "utilization hours",
              period: "January-June 2025",
              comparison: "58 more hours than H1 2026",
              evidenceKind: "independent-analysis",
              boundary:
                "The comparison shares the report's series and does not substitute for official plant-level data.",
              sourceIds: ["notebook-source-energy-crea-gem-h1"],
            },
          ],
          sourceIds: ["notebook-source-energy-crea-gem-h1"],
        },
        {
          id: "energy-measure-curtailment",
          layer: "system-use",
          label: "Estimated wind and solar curtailment",
          display: "360 TWh",
          value: 360,
          unit: "terawatt-hours",
          period: "January-June 2026",
          comparison: "+49 percent year over year",
          basis: "Reported values plus modeled unreported curtailment",
          evidenceKind: "modeled-estimate",
          interpretation:
            "Clean electricity availability exceeded what the system absorbed in some places and hours.",
          counterReading:
            "The national estimate cannot prove that every curtailed unit could have displaced coal at the same time and place.",
          boundary:
            "Not an official observed total; depends on provincial data availability, weather regression, and spatial and temporal constraints.",
          contrasts: [
            {
              id: "energy-contrast-demand-growth-volume",
              label: "Electricity-demand growth",
              display: "258 TWh",
              value: 258,
              unit: "terawatt-hours",
              period: "January-June 2026",
              comparison: "CREA/GEM national-scale comparison",
              evidenceKind: "independent-analysis",
              boundary:
                "National arithmetic is not proof of a feasible one-for-one dispatch counterfactual.",
              sourceIds: ["notebook-source-energy-crea-gem-h1"],
            },
          ],
          sourceIds: ["notebook-source-energy-crea-gem-h1"],
        },
      ],
    },
  ],
  alternativeReadings: [
    {
      id: "reading-energy-structural-milestone",
      label: "A structural milestone",
      status: "interpretation",
      reading:
        "Coal below half is meaningful because non-coal sources served a larger share of a growing electricity system.",
      boundary:
        "The milestone is a first-half generation-share observation, not a full-year emissions result.",
      sourceIds: ["notebook-source-energy-nea-h1"],
    },
    {
      id: "reading-energy-absolute-caution",
      label: "Absolute levels still matter",
      status: "interpretation",
      reading:
        "Coal's share fell while its electricity output rose and new capacity entered operation.",
      boundary:
        "The record does not establish a durable future direction from one half-year.",
      sourceIds: [
        "notebook-source-energy-state-council-h1",
        "notebook-source-energy-crea-gem-h1",
      ],
    },
    {
      id: "reading-energy-portfolio-incentives",
      label: "A portfolio and incentive problem",
      status: "scenario",
      reading:
        "Reliability planning, provincial incentives, capacity payments, long-term contracts, and legacy approvals may overlap in sustaining coal investment.",
      boundary:
        "The reviewed sources do not isolate one motive or estimate each factor's causal share.",
      sourceIds: [
        "notebook-source-energy-crea-gem-h1",
        "notebook-source-energy-gcpt",
      ],
    },
    {
      id: "reading-energy-integration",
      label: "An integration constraint",
      status: "interpretation",
      reading:
        "Curtailment and falling coal utilization place grid, dispatch, storage, and market design beside renewable construction in the transition story.",
      boundary:
        "The 360 TWh magnitude is modeled, and national availability does not prove local substitutability.",
      sourceIds: ["notebook-source-energy-crea-gem-h1"],
    },
  ],
  sections: {
    frame: [
      "A percentage is a fraction, not a physical quantity. Coal can supply a smaller fraction of a larger electricity system while still producing more kilowatt-hours. The below-half headline becomes useful only after the denominator and the other layers are kept visible.",
      "This Notebook therefore asks four separate questions: what share each source supplied, how much electricity coal produced, what capacity existed, and how intensively the system used that capacity. No shared axis combines them, because their units and evidence kinds are not commensurate.",
    ],
    mix: [
      "The NEA's 49.7 percent coal share marks the first half-year below 50 percent. The same official record places renewable generation at 41.2 percent. These figures support a structural reading without implying that coal and renewables are the whole mix.",
    ],
    output: [
      "Coal generation still totaled 2.5 trillion kWh. CREA/GEM's bounded series estimates that this was 3.4 percent above the first half of 2025. The apparent contradiction disappears once total electricity demand and non-coal generation grow faster than coal output.",
    ],
    capacity: [
      "Wind and solar nameplate capacity reached 1.95 billion kW, up 16.8 percent year over year. At the same time, 30 GW of coal capacity entered operation, only 2.7 GW retired, and another 25.4 GW started construction. These are fleet measures, not generation totals.",
    ],
    constraints: [
      "CREA/GEM reports that average coal utilization fell from 2,056 to 1,998 hours as the fleet expanded. Its 360 TWh curtailment estimate combines reported values with modeled unreported wind-and-solar output. Both measures point toward an integration problem, but neither proves a simple counterfactual.",
    ],
    synthesis: [
      "The four layers can all be true at once: coal loses share, coal produces more electricity, both renewable and coal capacity expand, and the system uses coal capacity less intensively while curtailing clean output. The transition is a rebalancing of a growing system, not a single finish line.",
    ],
    changed: [
      "The September 1 publication refresh added the exact NEA conference item rather than relying only on its hub, rechecked every admitted source and both CREA/GEM URLs, and preserved the H1 frame because no correction or superseding full-year release was found.",
      "The refresh did not convert access into verification. Official summaries remain official, the CREA/GEM calculations remain independent analysis or modeled estimates, and the IEA demand figure remains a forecast.",
    ],
  },
  sourceTrail: [
    {
      id: "notebook-source-energy-nea-h1",
      role: "Primary official measurement",
      title:
        "National Energy Administration press conference on first-half 2026 energy conditions",
      publisher: "National Energy Administration",
      publishedAt: "2026-07-30",
      retrievedAt: "2026-09-01",
      links: [
        {
          label: "Exact first-half energy item",
          url: "https://www.nea.gov.cn/20260730/6c60113d8ba5471eb0045cb7b314dee8/c.html",
        },
        {
          label: "First-half conference hub",
          url: "https://www.nea.gov.cn/xwfb/202603zb/index.htm",
        },
      ],
      context:
        "Controls the official Chinese-language 49.7 percent share, 2.5 trillion kWh coal generation, and 1.95 billion kW wind-and-solar capacity figures.",
      limitation:
        "Official measurement and characterization, not independent validation; the hub contains multiple records with distinct definitions.",
    },
    {
      id: "notebook-source-energy-state-council-h1",
      role: "Official English summary",
      title:
        "China's coal-fired power output share falls below 50 pct for first time in H1",
      publisher: "State Council / Xinhua",
      publishedAt: "2026-07-30",
      retrievedAt: "2026-09-01",
      links: [
        {
          label: "English official summary",
          url: "https://english.www.gov.cn/archive/statistics/202607/30/content_WS6a6b131ac6d00ca5f9a0c7c4.html",
        },
      ],
      context:
        "Provides the official English-language share, generation, renewable output, and capacity summary.",
      limitation:
        "Repeats official NEA data and does not independently validate the figures or make unlike measures interchangeable.",
    },
    {
      id: "notebook-source-energy-nbs-july",
      role: "Official later-period context",
      title: "Energy Production in July 2026",
      publisher: "National Bureau of Statistics",
      publishedAt: "2026-08-18",
      retrievedAt: "2026-09-01",
      links: [
        {
          label: "July energy production release",
          url: "https://www.stats.gov.cn/english/PressRelease/202608/t20260819_1965079.html",
        },
      ],
      context:
        "Supplies July and January-July coal-production and thermal-generation context after the H1 window.",
      limitation:
        "Raw coal, thermal generation, coal-fired generation, capacity, consumption, and emissions are different series; July does not replace H1.",
    },
    {
      id: "notebook-source-energy-crea-gem-h1",
      role: "Independent analysis and modeled estimate",
      title: "Built for backup, contracted to run",
      publisher: "CREA and Global Energy Monitor",
      publishedAt: "2026-08",
      retrievedAt: "2026-09-01",
      links: [
        {
          label: "CREA GEM report landing page",
          url: "https://globalenergymonitor.org/research/built-backup-contracted-run",
        },
        {
          label: "CREA GEM complete report PDF",
          url: "https://globalenergymonitor.org/sites/default/files/2026-08/CREA_GEM_China_Coal%20power_H1%202026.pdf",
        },
      ],
      context:
        "Controls the 3.4 percent coal-generation change, coal fleet flows, utilization, and 360 TWh modeled curtailment estimate.",
      limitation:
        "CREA is an advocacy/research organization and GEM supplies tracker data; curtailment combines reported and modeled values and is not locally substitutable one for one.",
    },
    {
      id: "notebook-source-energy-gcpt",
      role: "Independent unit-level dataset",
      title: "Global Coal Plant Tracker",
      publisher: "Global Energy Monitor",
      publishedAt: "2026-07",
      retrievedAt: "2026-09-01",
      links: [
        {
          label: "Coal plant tracker project page",
          url: "https://globalenergymonitor.org/projects/global-coal-plant-tracker",
        },
      ],
      context:
        "Supplies the unit-level coal project status data used in the CREA/GEM report.",
      limitation:
        "Project classifications depend on sourced records and periodic updates; proposal, permit, construction, operation, and retirement are distinct states.",
    },
    {
      id: "notebook-source-energy-iea-review",
      role: "Independent annual historical analysis",
      title: "Global Energy Review 2026 - Coal",
      publisher: "International Energy Agency",
      publishedAt: "2026",
      retrievedAt: "2026-09-01",
      links: [
        {
          label: "IEA annual coal analysis",
          url: "https://www.iea.org/reports/global-energy-review-2026/coal",
        },
      ],
      context:
        "Reports that China coal-fired generation fell about 1.5 percent in 2025 while almost 80 GW of coal capacity was commissioned.",
      limitation:
        "Annual 2025 context, not an H1 2026 measurement and not interchangeable with the CREA/GEM first-half change.",
    },
    {
      id: "notebook-source-energy-iea-midyear",
      role: "Independent forecast",
      title: "Electricity Mid-Year Update 2026 - Executive summary",
      publisher: "International Energy Agency",
      publishedAt: "2026",
      retrievedAt: "2026-09-01",
      links: [
        {
          label: "IEA midyear electricity forecast",
          url: "https://www.iea.org/reports/electricity-mid-year-update-2026/executive-summary",
        },
      ],
      context:
        "Forecasts 5.5 percent China electricity-demand growth in 2026 compared with 5.2 percent in 2025.",
      limitation:
        "A forecast, not an observed full-year result and not a causal estimate for the H1 mix.",
    },
    {
      id: "notebook-source-energy-crea-gem-2025",
      role: "Independent prior-year analysis",
      title: "Built to peak? Coal power expansion runs out of room in China",
      publisher: "CREA and Global Energy Monitor",
      publishedAt: "2026-02",
      retrievedAt: "2026-09-01",
      links: [
        {
          label: "CREA GEM 2025 coal review",
          url: "https://globalenergymonitor.org/research/built-peak-coal-power-expansion-runs-out-room-china",
        },
      ],
      context:
        "Provides prior-year context for the coal construction pipeline and commissioning surge.",
      limitation:
        "Proposals are not operating capacity, gross commissioning is not net fleet growth, and neither proves future utilization.",
    },
  ],
  unresolvedQuestion:
    "What comparable full-year official series will show whether coal share, output, utilization, capacity, curtailment, and electricity-sector emissions converge or continue to diverge?",
  limitations: [
    "The 49.7 percent result covers January through June 2026, not the full year.",
    "Generation share, generation volume, installed capacity, utilization, fuel production, consumption, and emissions are not interchangeable.",
    "The official English summary repeats NEA data and is not independent corroboration.",
    "CREA/GEM's 3.4 percent generation change uses its bounded series rather than an official full-year comparison.",
    "The 360 TWh curtailment total combines reported values with modeled unreported output.",
    "National curtailment arithmetic cannot prove local and hourly substitutability with coal generation.",
    "The IEA 5.5 percent demand-growth value is a forecast, not an observed result.",
    "The reviewed record does not isolate the causal contribution of reliability planning, provincial incentives, contracts, capacity payments, or legacy approvals.",
  ],
});
