import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Precious Kanu',
  description:
    'Full-stack software engineer and product builder based in Nigeria. I build software from idea to production — with the engineering depth to build it right and the product thinking to build the right thing.',
  openGraph: {
    title: 'About — Precious Kanu',
    description:
      'Full-stack software engineer and product builder. Engineering execution meets product thinking — based in Nigeria, working remotely.',
    images: [{ url: '/og-default.jpg' }],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/about`,
  },
}

const skills = {
  'Full-Stack': [
    'TypeScript',
    'Node.js',
    'Next.js',
    'React',
    'PostgreSQL',
    'GraphQL',
    'REST APIs',
  ],
  'AI & Third-Party Integrations': [
    'AI Integration',
    'Prompt Engineering',
    'AI-powered features',
    'Multi-provider AI (OpenAI · Claude · Gemini)',
    'Facebook Ads API',
    'TikTok Ads API',
    'Google Ads API',
    'Shopify API',
  ],
  'Cloud & Deployment': [
    'AWS S3',
    'AWS Lambda',
    'AWS AppSync',
    'AWS Amplify',
    'Azure App Service',
    'Azure Static Web Apps',
    'Azure Storage',
    'Firebase',
  ],
  'Analytics & Monitoring': [
    'Mixpanel',
    'Google Analytics',
    'PostHog',
    'Sentry',
  ],
  'Product & Process': [
    'Product Ownership',
    'Requirements Gathering',
    'Cross-functional Collaboration',
    'Stakeholder Communication',
    'Agile Product Development',
  ],
}

const experience = [
  {
    company: 'Athletiverse',
    period: '2025 – present',
    current: true,
    roles: [{ title: 'Full-Stack Engineer', dates: '2025 – present' }],
  },
  {
    company: 'Sirge Inc',
    period: '2022 – 2025',
    current: false,
    roles: [{ title: 'Full-Stack Engineer', dates: 'Aug 2022 – Apr 2025' }],
  },
  {
    company: 'Bimbi Philips LTD',
    period: '2021 – 2022',
    current: false,
    roles: [
      { title: 'Senior Product Owner', dates: 'Jul 2021 – Nov 2022' },
      { title: 'Full-Stack Developer', dates: 'Feb 2021 – Jul 2021' },
    ],
  },
  {
    company: 'SB Telecoms & Devices',
    period: '2018 – 2020',
    current: false,
    roles: [{ title: 'Frontend Developer', dates: 'Oct 2018 – Jun 2020' }],
  },
]

const currently = [
  { label: 'Building', value: 'Contract work + B2B SaaS product for Nigerian vendors' },
  { label: 'Available for', value: 'Full-time roles, contracts, consulting, and founding engineer opportunities' },
  { label: 'Interested in', value: 'SaaS, B2B tools, developer tools, AI-powered products' },
  { label: 'Location', value: 'Remote · Nigeria · UTC+1' },
]

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="md:grid md:grid-cols-2 md:gap-16">
          {/* Left column — bio */}
          <div className="mb-12 md:mb-0">
            {/* TODO: replace with real avatar */}
            <div className="w-20 h-20 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto md:mx-0 mb-4">
              <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono tracking-wide">
                photo
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl tracking-tight text-center md:text-left">
              Precious Kanu
            </h1>
            <p className="text-sm text-muted mt-1 text-center md:text-left">
              Full-Stack Engineer &middot; Product Builder &middot; Remote &middot; Nigeria
            </p>

            <div className="mt-6 space-y-4 text-base text-muted leading-relaxed">
              <p>
                I&rsquo;m a full-stack software engineer with over seven years of
                experience building SaaS products, API integrations, and AI-powered
                features across the full stack. Most of that time has been at the
                intersection of engineering and product — writing the code, but also
                owning the decisions that shape what gets built and why.
              </p>
              <p>
                At Sirge I shipped everything from PostgreSQL performance optimisations
                and serverless AWS infrastructure to AI-powered product features —
                building AI integrations, prompt engineering pipelines, and
                multi-provider AI tooling in production — while also owning product
                delivery as a Senior Product Owner at Bimbi Philips. The common thread
                across all of it is complexity that needs to be made simple for the
                people using it.
              </p>
              <p>
                I care about clean architecture, but I care more about outcomes. A system
                that&rsquo;s elegant but ships late is worse than one that&rsquo;s pragmatic
                and running in production. If that&rsquo;s how you think about building
                — we&rsquo;ll work well together.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6 justify-center md:justify-start">
              <a
                href="https://github.com/MasterLexhie"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border rounded-lg px-4 py-2.5 text-sm text-muted hover:text-foreground hover:border-foreground transition-colors min-h-[44px] flex items-center"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/precious-alexandra-kanu/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border rounded-lg px-4 py-2.5 text-sm text-muted hover:text-foreground hover:border-foreground transition-colors min-h-[44px] flex items-center"
              >
                LinkedIn
              </a>
              <a
                href="mailto:kanuprecious89@gmail.com"
                className="border border-border rounded-lg px-4 py-2.5 text-sm text-muted hover:text-foreground hover:border-foreground transition-colors min-h-[44px] flex items-center"
              >
                Email
              </a>
            </div>
          </div>

          {/* Right column — skills, timeline, currently */}
          <div>
            {/* Skills */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-muted">01</span>
                <h2 className="font-sans text-xs tracking-widest uppercase text-muted">
                  Skills
                </h2>
                <span className="flex-1 h-px bg-border" aria-hidden="true" />
              </div>
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="mb-4">
                  <p className="text-sm font-medium mb-2">{category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-mono text-muted bg-surface px-2.5 py-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-muted">02</span>
                <h2 className="font-sans text-xs tracking-widest uppercase text-muted">
                  Experience
                </h2>
                <span className="flex-1 h-px bg-border" aria-hidden="true" />
              </div>
              <div>
                {experience.map((group, i) => (
                  <div
                    key={group.company}
                    className={`py-3 ${i < experience.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {group.current && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                      )}
                      <p className="text-sm md:text-[14px] font-medium">{group.company}</p>
                    </div>
                    <p className="text-[11px] font-mono text-muted/60 mb-2">{group.period}</p>
                    <div className="pl-2.5 border-l-[1.5px] border-border flex flex-col gap-1.5">
                      {group.roles.map((role) => (
                        <div key={role.title} className="flex items-start justify-between gap-2">
                          <span className="text-[13px] text-muted">{role.title}</span>
                          <span className="text-[11px] font-mono text-muted/60 whitespace-nowrap">{role.dates}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-muted">03</span>
                <h2 className="font-sans text-xs tracking-widest uppercase text-muted">
                  Currently
                </h2>
                <span className="flex-1 h-px bg-border" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {currently.map((item) => (
                  <div key={item.label} className="bg-surface rounded-lg p-4">
                    <p className="text-[10px] uppercase tracking-widest text-muted mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-12 border-t border-border text-center md:text-left">
          <h2 className="text-2xl md:text-3xl tracking-tight mb-6">
            Building something? Let&rsquo;s <em className="italic">talk</em>.
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center w-full md:w-auto bg-accent text-accent-foreground px-8 py-3 rounded-lg text-sm hover:bg-accent-hover transition-colors min-h-[44px]"
          >
            Book 20 minutes &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
