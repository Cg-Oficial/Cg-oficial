import { siteConfig } from "@/config/siteConfig";

export default function StatisticsSection() {
  if (siteConfig.statistics.length === 0) return null;

  return (
    <section className="statistics-section" aria-label="Indicadores">
      <div className="page-container statistics-grid">
        {siteConfig.statistics.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
