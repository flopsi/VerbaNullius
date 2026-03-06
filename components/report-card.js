import { VERDICT_MAP, CLAIM_ICONS, PLATFORM_ICONS, PLATFORM_LABELS } from "../config/ui.js";
import { escHtml, downloadNameFromPath } from "../lib/utils.js";

const renderClaimsBar = (claims) => {
  const parts = [];
  if (claims.refuted) parts.push(`<div class="claims-bar-segment refuted" style="flex:${claims.refuted}"></div>`);
  if (claims.verified) parts.push(`<div class="claims-bar-segment verified" style="flex:${claims.verified}"></div>`);
  if (claims.unverifiable) parts.push(`<div class="claims-bar-segment unverifiable" style="flex:${claims.unverifiable}"></div>`);
  if (claims.hedged) parts.push(`<div class="claims-bar-segment hedged" style="flex:${claims.hedged}"></div>`);
  return parts.join("");
};

const renderClaimsLegend = (claims) => {
  const items = [];
  if (claims.refuted) items.push(`<span class="claims-legend-item"><span class="claims-legend-dot refuted"></span>${claims.refuted} Refuted</span>`);
  if (claims.verified) items.push(`<span class="claims-legend-item"><span class="claims-legend-dot verified"></span>${claims.verified} Verified</span>`);
  if (claims.unverifiable) items.push(`<span class="claims-legend-item"><span class="claims-legend-dot unverifiable"></span>${claims.unverifiable} N/A</span>`);
  if (claims.hedged) items.push(`<span class="claims-legend-item"><span class="claims-legend-dot hedged"></span>${claims.hedged} Hedged</span>`);
  return items.join("");
};

const renderClaimRows = (claims) =>
  claims.items
    .map(
      (c) => `
        <div class="example-claim" data-verdict="${escHtml(c.verdict)}">
          <span class="claim-verdict-icon ${escHtml(c.verdict)}">${CLAIM_ICONS[c.verdict] ?? "?"}</span>
          <span class="claim-id">${escHtml(c.id)}</span>
          <span class="claim-text">${escHtml(c.text)}</span>
        </div>
      `
    )
    .join("");

const renderReportContent = (fullReport) => {
  if (!fullReport) return `<p>Full report not available.</p>`;

  const reportTableRows = (fullReport.claimTable || [])
    .map(
      (row) => `
        <tr>
          <td>${escHtml(row.id)}</td>
          <td>${escHtml(row.summary)}</td>
          <td>${escHtml(row.isr)}</td>
          <td>${escHtml(row.verdict)}</td>
        </tr>
      `
    )
    .join("");

  const analysisItems = (fullReport.criticalAnalysis || [])
    .map((item) => `<li>${item}</li>`)
    .join("");

  const credParagraphs = (fullReport.sourceCredibility || [])
    .map((item) => `<p>${item}</p>`)
    .join("");

  return `
    <h3>Executive Summary</h3>
    <p>${fullReport.executiveSummary ?? ""}</p>
    <h3>Claim-Level Breakdown</h3>
    <table>
      <thead><tr><th>Claim</th><th>Summary</th><th>ISR</th><th>Verdict</th></tr></thead>
      <tbody>${reportTableRows}</tbody>
    </table>
    <h3>Critical Misrepresentation Analysis</h3>
    <ol>${analysisItems}</ol>
    <h3>Source Credibility</h3>
    ${credParagraphs}
    <h3>Final Verdict</h3>
    <p>${fullReport.finalVerdict ?? ""}</p>
  `;
};

export const renderReportCard = (report) => {
  const verdict = VERDICT_MAP[report.verdict] ?? VERDICT_MAP.REJECT;
  const platformIcon = PLATFORM_ICONS[report.platform] ?? PLATFORM_ICONS.web;
  const platformLabel = PLATFORM_LABELS[report.platform] ?? "Source";
  const patternTags = (report.patterns || []).map((p) => `<span class="pattern-tag">${escHtml(p)}</span>`).join("");
  const claimsSummary = renderClaimsLegend(report.claims);
  const reportDownloadName = downloadNameFromPath(report.reportFile);

  return `
    <article class="example-flip-container" data-report-id="${escHtml(report.id)}">
      <div class="example-flip-inner">
        <section class="example-front">
          <div class="front-image-area">
            <img src="${escHtml(report.image)}" alt="${escHtml(report.imageAlt)}" loading="lazy" />
            <div class="verdict-stamp">${escHtml(verdict.stamp)}</div>
          </div>

          <div class="front-info">
            <div class="front-type-badge">
              <span class="front-type-label">${escHtml(report.claimType)}</span>
              <span class="front-platform-badge">${platformIcon}<span>${escHtml(platformLabel)}</span></span>
            </div>

            <div class="front-title">${escHtml(report.title)}</div>

            <div class="front-meta">
              <div class="front-meta-row"><span class="front-meta-label">Author</span><span class="front-meta-value">${escHtml(report.author)}</span></div>
              <div class="front-meta-row"><span class="front-meta-label">Date</span><span class="front-meta-value">${escHtml(report.datePublished)}</span></div>
              <div class="front-meta-row"><span class="front-meta-label">Checked</span><span class="front-meta-value">${escHtml(report.dateChecked)}</span></div>
            </div>

            <div class="front-divider"></div>

            <div class="front-score">
              <span class="front-score-value">${escHtml(report.b2tScore)}</span>
              <span class="front-score-label">B2T Trust Score</span>
            </div>

            <div class="front-claims-bar">${renderClaimsBar(report.claims)}</div>
            <div class="front-claims-legend">${claimsSummary}</div>
            <div class="front-divider"></div>
            <div class="front-patterns">${patternTags}</div>
          </div>
        </section>

        <section class="example-back" data-severity="${escHtml(report.severity)}">
          <div class="example-card">
            <div class="example-card-header">
              <div class="example-meta">
                <span class="example-platform-icon">${platformIcon}</span>
                <span class="example-author">${escHtml(report.author)}</span>
                <span class="example-date">${escHtml(report.datePublished)}</span>
                ${report.views ? `<span class="example-views">${escHtml(report.views)}</span>` : ""}
              </div>
              <span class="example-verdict ${verdict.className}">${escHtml(report.verdict)}</span>
            </div>

            <blockquote class="example-original">${escHtml(report.originalQuote ?? "")}</blockquote>
            <div class="example-summary"><p>${escHtml(report.summary ?? "")}</p></div>

            <div class="example-claims">
              <div class="example-claims-header">
                <span>${escHtml(report.claims.total)} Claims Analyzed</span>
                <span class="claims-summary">${claimsSummary}</span>
              </div>
              ${renderClaimRows(report.claims)}
            </div>

            ${
              report.keyFinding
                ? `
              <div class="example-key-finding">
                <div class="example-key-finding-label">Key Finding</div>
                <div class="example-key-finding-grid">
                  <div class="finding-col">
                    <div class="finding-col-label">The study actually says</div>
                    <p>${escHtml(report.keyFinding.sourceActuallySays)}</p>
                  </div>
                  <div class="finding-col">
                    <div class="finding-col-label">The post claims</div>
                    <p>${escHtml(report.keyFinding.postClaims)}</p>
                  </div>
                </div>
              </div>
            `
                : ""
            }

            <div class="back-patterns">${patternTags}</div>

            <div class="example-report-actions">
              <details class="example-full-report">
                <summary>Full M8 Verification Report</summary>
                <div class="example-report-content">${renderReportContent(report.fullReport)}</div>
              </details>

              ${
                report.reportFile
                  ? `
                <a href="${escHtml(report.reportFile)}" download="${escHtml(reportDownloadName)}" class="report-download-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download Full Report .md
                </a>
              `
                  : ""
              }
            </div>

            <div class="example-footer">
              <span class="modules-badge">${escHtml(report.modulesUsed ?? "")}</span>
              ${
                report.sourceUrl
                  ? `<a href="${escHtml(report.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="example-source-link">View Original Post</a>`
                  : ""
              }
            </div>
          </div>
        </section>
      </div>

      <div class="flip-hint">Click card to flip</div>
    </article>
  `;
};
