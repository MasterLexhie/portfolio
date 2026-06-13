import type { PortfolioTestimonial } from '@/src/lib/data'

type TestimonialBlockProps = {
  testimonial: PortfolioTestimonial
}

export function TestimonialBlock({ testimonial }: TestimonialBlockProps) {
  return (
    <figure className="relative pl-8 md:pl-12">
      <span
        className="absolute left-0 -top-4 font-serif text-6xl md:text-7xl text-neutral-200 dark:text-neutral-700 select-none leading-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <blockquote>
        <p className="font-serif text-xl md:text-2xl italic tracking-tight leading-snug">
          {testimonial.quote}
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {testimonial.avatar?.url && (
          <div className="w-10 h-10 rounded-full bg-surface overflow-hidden" />
        )}
        <span className="w-8 h-px bg-foreground/40" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.role}</p>
        </div>
      </figcaption>
    </figure>
  )
}
