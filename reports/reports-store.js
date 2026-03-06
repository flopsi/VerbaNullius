import { reportRegistry } from "../../data/report-registry.js";

export class ReportsStore {
  constructor(seed = reportRegistry.reports) {
    this.reports = [...seed];
  }

  getAll() {
    return [...this.reports];
  }

  getById(id) {
    return this.reports.find((r) => r.id === id) ?? null;
  }

  add(report) {
    if (!report?.id) throw new Error("Report id is required.");
    if (this.getById(report.id)) throw new Error(`Duplicate report id: ${report.id}`);
    this.reports.push(report);
  }

  filter(filters = {}) {
    return this.reports.filter((report) => {
      if (filters.verdict && report.verdict !== filters.verdict) return false;
      if (filters.platform && report.platform !== filters.platform) return false;
      if (filters.severity && report.severity !== filters.severity) return false;
      if (filters.query) {
        const haystack = [
          report.title,
          report.author,
          report.summary,
          report.claimType,
          ...(report.patterns || [])
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(filters.query.toLowerCase())) return false;
      }
      return true;
    });
  }
}
