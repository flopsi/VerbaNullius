import { renderReportCard } from "../../components/report-card.js";

export class ReportsView {
  constructor({ grid, store }) {
    this.grid = grid;
    this.store = store;
  }

  render(filters = {}) {
    const reports = this.store.filter(filters);
    this.grid.innerHTML = reports.length
      ? reports.map(renderReportCard).join("")
      : `<div class="placeholder-view" style="grid-column:1/-1"><p>No reports match the current filters.</p></div>`;

    this.bindCardFlip();
  }

  bindCardFlip() {
    this.grid.querySelectorAll(".example-flip-container").forEach((card) => {
      card.addEventListener("click", (event) => {
        const interactive = event.target.closest("a, button, summary, details");
        if (interactive) return;
        card.classList.toggle("flipped");
      });
    });
  }
}

// File: src/main.js
import { ReportsStore } from "./features/reports/reports-store.js";
import { ReportsView } from "./features/reports/reports-view.js";

const boot = () => {
  const grid = document.getElementById("examples-grid");
  if (!grid) return;

  const reportsStore = new ReportsStore();
  const reportsView = new ReportsView({ grid, store: reportsStore });

  reportsView.render();

  window.VerbaNulliusReports = {
    addReport(report) {
      reportsStore.add(report);
      reportsView.render();
    },
    render(filters = {}) {
      reportsView.render(filters);
    },
    getAll() {
      return reportsStore.getAll();
    }
  };
};

document.addEventListener("DOMContentLoaded", boot);
