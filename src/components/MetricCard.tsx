type MetricCardProps = {
  value: string
  label: string
}

export function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="py-8 md:py-10 px-4 md:px-6">
      <p className="font-serif text-4xl md:text-5xl tracking-tight text-accent leading-none">
        {value}
      </p>
      <p className="text-xs tracking-wide uppercase text-muted mt-3 leading-snug">
        {label}
      </p>
    </div>
  )
}
