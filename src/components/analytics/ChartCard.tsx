export function ChartCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-border bg-white p-5 shadow-sm ${className}`}
    >
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}
