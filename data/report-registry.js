export const reportRegistry = {
  version: "1.0.0",
  reports: [
    {
      id: "hulscher-pcr-2026",
      slug: "hulscher-pcr-2026",
      verdict: "REJECT",
      severity: "critical",
      claimType: "Conspiracy",
      platform: "x",
      title: "\"86% of PCR-Positive COVID Cases Were Not Real Infections\"",
      author: "Nicolas Hulscher, MPH",
      datePublished: "4 Mar 2026",
      dateChecked: "6 Mar 2026",
      views: "95,730 views",
      sourceUrl: "https://x.com/NicHulscher/status/2029328519394734582",
      image: "image-2.jpg",
      imageAlt: "Screenshot of Nicolas Hulscher tweet",
      reportFile: "reports/m8_verdict_hulscher.md",
      b2tScore: "LOW",
      patterns: [
        "Snowball Confabulation",
        "Science-Washing",
        "Imitative Falsehood",
        "High-Confidence Delusion"
      ],
      originalQuote:
        "\"BREAKING: 86% of PCR-Positive 'COVID Cases' Were Not Real Infections [...] FRAUDULENT testing illusion.\"",
      summary:
        "A legitimate study is reframed into a fraud allegation by confusing PCR positivity with later IgG seroconversion.",
      modulesUsed: "M1 → M2 → M3 → M4 → M5 → M7 → M8 → M9",
      claims: {
        total: 8,
        refuted: 5,
        verified: 2,
        unverifiable: 1,
        hedged: 0,
        items: [
          { id: "C001", text: "86% of PCR cases were not real infections", verdict: "refuted" },
          { id: "C002", text: "Only 14% of PCR-positive individuals were truly infected", verdict: "refuted" }
        ]
      },
      keyFinding: {
        sourceActuallySays:
          "~14% of PCR-positive individuals later developed IgG antibodies in a model calibration context.",
        postClaims:
          "86% of positive COVID tests were fake, proving fraudulent testing."
      },
      fullReport: {
        executiveSummary:
          "The claim misreads a seroconversion parameter as evidence that PCR tests were fake.",
        claimTable: [
          { id: "C001", summary: "86% of PCR cases were not real infections", isr: "0.99", verdict: "REFUTED" },
          { id: "C002", summary: "Only 14% of PCR-positive individuals became infected", isr: "0.99", verdict: "REFUTED" }
        ],
        criticalAnalysis: [
          "Equates lack of later antibody detection with false-positive PCR.",
          "Uses a real paper as a credibility scaffold for unrelated claims."
        ],
        sourceCredibility: [
          "Primary cited paper exists.",
          "Conclusion in the post does not follow from the paper."
        ],
        finalVerdict:
          "<strong>Overall B2T Trust Score: LOW (Reject).</strong>"
      }
    }
  ]
};
