export const escHtml = (value = "") => {
  const div = document.createElement("div");
  div.textContent = String(value);
  return div.innerHTML;
};

export const normalizeSeverity = (severity = "") => {
  const s = String(severity).toUpperCase();
  if (s.includes("ALARMING")) return "ALARMING";
  if (s.includes("HIGH") || s.includes("CRITICAL")) return "HIGH";
  if (s.includes("MODERATE")) return "MODERATE";
  if (s.includes("MILD")) return "MILD";
  if (s.includes("META")) return "META";
  return "MODERATE";
};

export const downloadNameFromPath = (path = "") => path.split("/").pop() || "report.md";

// File: src/config/ui.js
export const VERDICT_MAP = {
  REJECT: { className: "verdict-reject", stamp: "REJECT" },
  FLAG: { className: "verdict-flag", stamp: "FLAG" },
  HEDGE: { className: "verdict-hedge", stamp: "HEDGE" },
  ENDORSE: { className: "verdict-endorse", stamp: "ENDORSE" }
};

export const CLAIM_ICONS = {
  refuted: "✕",
  verified: "✓",
  unverifiable: "?",
  hedged: "~"
};

export const PLATFORM_LABELS = {
  x: "X",
  document: "Document",
  web: "Web"
};

export const PLATFORM_ICONS = {
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20"/></svg>`,
  document: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v6h6"/></svg>`,
  web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>`
};
