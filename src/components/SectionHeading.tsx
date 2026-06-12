type SectionHeadingProps = {
  index?: string
  label: string
  title?: string
  className?: string
}

export function SectionHeading({ index, label, title, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-3">
        {index && (
          <span className="text-xs font-mono text-muted">{index}</span>
        )}
        <span className="text-xs tracking-widest uppercase text-muted">
          {label}
        </span>
        <span className="flex-1 h-px bg-border" aria-hidden="true" />
      </div>
      {title && (
        <h2 className="text-2xl md:text-3xl tracking-tight max-w-2xl">
          {title}
        </h2>
      )}
    </div>
  )
}
