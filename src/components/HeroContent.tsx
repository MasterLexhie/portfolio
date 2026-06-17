'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const item = (delay: number) => ({
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease },
  },
})

export function HeroContent() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? undefined : 'hidden'}
      animate={reduce ? undefined : 'visible'}
    >
      <motion.div variants={item(0)} className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-foreground/40" aria-hidden="true" />
        <p className="text-xs tracking-widest uppercase text-muted">
          Full-stack engineer &middot; Product builder
        </p>
      </motion.div>
      <motion.h1
        variants={item(0.1)}
        className="text-3xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl leading-[1.08]"
      >
        I build products that <em className="italic">ship</em> — from idea to
        production.
      </motion.h1>
      <motion.p
        variants={item(0.2)}
        className="text-base md:text-lg text-muted mt-6 max-w-md leading-relaxed"
      >
        End-to-end engineering with a bias toward decisions that hold up six
        months later.
      </motion.p>
      <motion.div variants={item(0.35)} className="mt-10">
        <Link
          href="#work"
          className="inline-flex items-center justify-center w-full md:w-auto bg-accent text-accent-foreground px-8 py-3 rounded-lg text-sm hover:bg-accent-hover transition-colors min-h-[44px]"
        >
          See the work
        </Link>
      </motion.div>
      <motion.div variants={item(0.45)} className="flex items-center gap-2 mt-5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        <span className="text-xs text-muted">
          Open to full-time roles, contracts, and co-builds
        </span>
      </motion.div>
    </motion.div>
  )
}
