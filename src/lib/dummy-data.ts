// TEMPORARY — replaced with Payload queries in Phase 2
// Do not change field names or nesting — they match the Payload collection schema exactly

export type ProjectType = 'full-stack' | 'backend' | 'frontend' | 'web3'

export type DummyImage = {
  url: string
  alt: string
  sizes?: {
    card?: { url: string }
    thumb?: { url: string }
    og?: { url: string }
  }
}

export type DummyProject = {
  id: string
  title: string
  slug: string
  summary: string
  featured: boolean
  cover_image: DummyImage
  role: string
  outcome_metric: string
  type: ProjectType
  problem: string
  solution: string
  result: string
  discovery?: string
  tech_stack: { item: string }[]
  architecture_image?: DummyImage
  screenshots?: DummyImage[]
  live_url?: string
  github_url?: string
  published_date: string
}

export type DummyTestimonial = {
  id: string
  name: string
  role: string
  quote: string
  project?: { id: string } | null
  avatar?: DummyImage | null
}

export const dummyProjects: DummyProject[] = [
  {
    id: '1',
    title: 'Payment reconciliation engine',
    slug: 'payment-reconciliation-engine',
    summary:
      'Automated a ₦2B/month reconciliation cycle from 3 working days to 4 hours by redesigning the ingestion and matching pipeline end to end.',
    featured: true,
    cover_image: {
      url: '/placeholder-cover.svg',
      alt: 'Reconciliation dashboard screenshot',
    },
    role: 'Full-Stack Engineer + Product Owner',
    outcome_metric: '94% cycle time reduction',
    type: 'full-stack',
    problem:
      'The finance team was manually downloading CSV exports from 4 bank portals, merging them in Excel, and cross-referencing against an internal transaction log by hand. At ₦2B monthly volume across 4,000+ transactions, this took 3 working days and produced regular errors.',
    solution:
      'Built an automated ingestion and matching pipeline with a normalisation layer that handles all 4 bank CSV formats, a multi-pass matching engine (exact then fuzzy), and a manual review queue for the ~2% of transactions that cannot be matched automatically.',
    result:
      'Reconciliation cycle dropped from 3 days to 4 hours. Manual review now covers ~2% of transactions, down from 100%. Zero critical errors in 11 months of production.',
    discovery:
      'Shadowed the finance team through a full reconciliation cycle. Discovered that 60% of errors came from inconsistent reference formatting across bank feeds — not from the matching logic itself.',
    tech_stack: [
      { item: 'Node.js' },
      { item: 'TypeScript' },
      { item: 'PostgreSQL' },
      { item: 'Redis' },
      { item: 'BullMQ' },
      { item: 'Next.js' },
      { item: 'Prisma' },
    ],
    live_url: undefined,
    github_url: undefined,
    published_date: '2024-03-01',
  },
  {
    id: '2',
    title: 'Vendor business hub MVP',
    slug: 'vendor-business-hub',
    summary:
      'Built a multi-channel sales aggregator for Nigerian SME vendors that consolidates WhatsApp, Instagram, and marketplace orders into one dashboard with payment-triggered automation.',
    featured: true,
    cover_image: {
      url: '/placeholder-cover.svg',
      alt: 'Vendor dashboard screenshot',
    },
    role: 'Full-Stack Engineer + Product Owner',
    outcome_metric: '0 to production in 8 weeks',
    type: 'full-stack',
    problem:
      'Nigerian vendors were managing sales across 3–5 platforms manually, keeping records in WhatsApp chats and physical notebooks. No single tool consolidated revenue, inventory, and order tracking.',
    solution:
      'Built an MVP with payment-triggered automation at the core — when a payment clears, fulfilment instructions are sent automatically. Dashboard shows live revenue, inventory, and order status across all channels.',
    result:
      'Shipped to first paying customers in 8 weeks. Payment automation eliminated manual follow-up for 80% of orders in beta.',
    tech_stack: [
      { item: 'Next.js' },
      { item: 'TypeScript' },
      { item: 'Prisma' },
      { item: 'PostgreSQL' },
      { item: 'BullMQ' },
      { item: 'Paystack' },
    ],
    live_url: undefined,
    github_url: undefined,
    published_date: '2024-01-15',
  },
  {
    id: '3',
    title: 'Cross-chain transfer UI',
    slug: 'cross-chain-transfer-ui',
    summary:
      'Designed and built a DeFi transfer interface targeting non-crypto-native users — tripling task completion rates by removing jargon and restructuring the flow around user intent.',
    featured: true,
    cover_image: {
      url: '/placeholder-cover.svg',
      alt: 'Transfer UI screenshot',
    },
    role: 'Frontend Engineer',
    outcome_metric: '3× task completion rate',
    type: 'web3',
    problem:
      'Existing cross-chain transfer UIs assumed deep crypto knowledge. Completion rates for new users were under 20% in testing.',
    solution:
      'Rebuilt the flow from scratch — plain-language labels, progressive disclosure of technical detail, confirmation screens that explain what is happening in human terms.',
    result:
      'Task completion rate increased from 18% to 61% in usability testing across non-crypto participants.',
    tech_stack: [
      { item: 'React' },
      { item: 'TypeScript' },
      { item: 'wagmi' },
      { item: 'ethers.js' },
      { item: 'Tailwind CSS' },
    ],
    live_url: undefined,
    github_url: undefined,
    published_date: '2023-11-01',
  },
  {
    id: '4',
    title: 'REST API rate limiter',
    slug: 'rest-api-rate-limiter',
    summary:
      'A production-ready token bucket rate limiter with Redis-backed distributed state, supporting per-user and per-IP limits with configurable windows.',
    featured: false,
    cover_image: {
      url: '/placeholder-cover.svg',
      alt: 'Rate limiter architecture diagram',
    },
    role: 'Backend Engineer',
    outcome_metric: 'Sub-1ms overhead per request',
    type: 'backend',
    problem:
      'Needed a rate limiter that works correctly across multiple Node.js instances without a central bottleneck.',
    solution:
      'Token bucket algorithm with atomic Redis operations. Middleware-style API that drops into any Express or Fastify app.',
    result:
      'Under 1ms overhead per request at 10k RPS in load testing. Used across 3 production services.',
    tech_stack: [
      { item: 'Node.js' },
      { item: 'TypeScript' },
      { item: 'Redis' },
      { item: 'Vitest' },
    ],
    live_url: undefined,
    github_url: 'https://github.com/placeholder/rate-limiter',
    published_date: '2023-09-01',
  },
  {
    id: '5',
    title: 'Real-time order tracker',
    slug: 'real-time-order-tracker',
    summary:
      'WebSocket-driven delivery tracking dashboard with live status updates, driver location, and estimated arrival — built for a Nigerian last-mile logistics company.',
    featured: false,
    cover_image: {
      url: '/placeholder-cover.svg',
      alt: 'Order tracker dashboard',
    },
    role: 'Full-Stack Engineer',
    outcome_metric: 'Live tracking for 500+ daily orders',
    type: 'full-stack',
    problem:
      'Customers had no visibility into delivery status. Support team was fielding 200+ "where is my order" calls daily.',
    solution:
      'Real-time tracker with WebSocket updates every 30 seconds, driver location on a map, and SMS fallback for users without smartphones.',
    result:
      'Support call volume dropped 65% in the first month after launch.',
    tech_stack: [
      { item: 'Next.js' },
      { item: 'Socket.io' },
      { item: 'Express' },
      { item: 'MongoDB' },
    ],
    live_url: undefined,
    github_url: undefined,
    published_date: '2023-07-01',
  },
  {
    id: '6',
    title: 'Auth service (JWT + RBAC)',
    slug: 'auth-service-jwt-rbac',
    summary:
      'Reusable authentication microservice with JWT, refresh token rotation, and role-based access control — designed to be dropped into any Node.js project.',
    featured: false,
    cover_image: {
      url: '/placeholder-cover.svg',
      alt: 'Auth service architecture',
    },
    role: 'Backend Engineer',
    outcome_metric: 'Reused across 4 production projects',
    type: 'backend',
    problem:
      'Building auth from scratch on every project was expensive and error-prone.',
    solution:
      'Standalone auth service with REST API, refresh token rotation, RBAC middleware, and a React hook for the frontend.',
    result:
      'Dropped into 4 production projects. Saved approximately 2 weeks of setup per project.',
    tech_stack: [
      { item: 'Node.js' },
      { item: 'TypeScript' },
      { item: 'PostgreSQL' },
      { item: 'JWT' },
      { item: 'Prisma' },
    ],
    live_url: undefined,
    github_url: 'https://github.com/placeholder/auth-service',
    published_date: '2023-05-01',
  },
  {
    id: '7',
    title: 'E-commerce storefront',
    slug: 'ecommerce-storefront',
    summary:
      'Full checkout flow with cart, discount codes, inventory management, and Paystack integration — built for a Nigerian fashion retailer moving from Instagram DMs to a proper storefront.',
    featured: false,
    cover_image: {
      url: '/placeholder-cover.svg',
      alt: 'Storefront screenshot',
    },
    role: 'Full-Stack Engineer',
    outcome_metric: '₦4M in first-month GMV',
    type: 'full-stack',
    problem:
      'Retailer was processing orders manually through Instagram DMs and bank transfers. No inventory visibility, no order history.',
    solution:
      'Next.js storefront with Payload CMS for product management, Paystack for payments, and an admin dashboard for order and inventory management.',
    result:
      '₦4M in sales in the first month. Order processing time dropped from 2 hours to under 5 minutes.',
    tech_stack: [
      { item: 'Next.js' },
      { item: 'TypeScript' },
      { item: 'Payload CMS' },
      { item: 'Paystack' },
      { item: 'PostgreSQL' },
    ],
    live_url: undefined,
    github_url: undefined,
    published_date: '2023-03-01',
  },
  {
    id: '8',
    title: 'Design system + component library',
    slug: 'design-system-component-library',
    summary:
      'Accessible UI primitives built with React and Radix UI, documented in Storybook — used as the shared component layer across 3 products.',
    featured: false,
    cover_image: {
      url: '/placeholder-cover.svg',
      alt: 'Storybook documentation screenshot',
    },
    role: 'Frontend Engineer',
    outcome_metric: 'Shared across 3 products',
    type: 'frontend',
    problem:
      'Three products were building the same components independently, with diverging implementations and accessibility gaps.',
    solution:
      'Shared component library built on Radix UI primitives, styled with Tailwind, documented in Storybook with accessibility annotations.',
    result:
      'Onboarding time for new UI work dropped significantly. Accessibility audit score improved from 61 to 94.',
    tech_stack: [
      { item: 'React' },
      { item: 'TypeScript' },
      { item: 'Radix UI' },
      { item: 'Tailwind CSS' },
      { item: 'Storybook' },
    ],
    live_url: undefined,
    github_url: 'https://github.com/placeholder/design-system',
    published_date: '2022-12-01',
  },
  {
    id: '9',
    title: 'CSV data pipeline',
    slug: 'csv-data-pipeline',
    summary:
      'ETL pipeline that ingests, validates, transforms, and loads large vendor datasets — processing up to 500k rows per job without blocking the main application thread.',
    featured: false,
    cover_image: {
      url: '/placeholder-cover.svg',
      alt: 'Pipeline architecture diagram',
    },
    role: 'Backend Engineer',
    outcome_metric: '500k rows per job, non-blocking',
    type: 'backend',
    problem:
      'Vendor data imports were timing out and locking the database during business hours.',
    solution:
      'Async pipeline using BullMQ with chunked processing, validation errors reported per row rather than failing the whole job.',
    result:
      'Import jobs now run in the background with zero impact on application response times.',
    tech_stack: [
      { item: 'Node.js' },
      { item: 'TypeScript' },
      { item: 'BullMQ' },
      { item: 'PostgreSQL' },
      { item: 'Redis' },
    ],
    live_url: undefined,
    github_url: 'https://github.com/placeholder/csv-pipeline',
    published_date: '2022-10-01',
  },
  {
    id: '10',
    title: 'Analytics dashboard',
    slug: 'analytics-dashboard',
    summary:
      'Real-time revenue and engagement metrics for SaaS founders — built with tRPC for type-safe API calls and Recharts for the visualisation layer.',
    featured: false,
    cover_image: {
      url: '/placeholder-cover.svg',
      alt: 'Analytics dashboard screenshot',
    },
    role: 'Frontend Engineer',
    outcome_metric: 'Sub-200ms dashboard load time',
    type: 'frontend',
    problem:
      'Founders were context-switching between Stripe, Mixpanel, and spreadsheets to understand their business. No single view of revenue + engagement.',
    solution:
      'Unified dashboard with real-time WebSocket updates, date range filtering, and export to CSV. tRPC keeps the API type-safe end to end.',
    result:
      'Dashboard load time under 200ms. Used by 3 SaaS products in production.',
    tech_stack: [
      { item: 'Next.js' },
      { item: 'TypeScript' },
      { item: 'tRPC' },
      { item: 'Recharts' },
      { item: 'PostgreSQL' },
    ],
    live_url: undefined,
    github_url: undefined,
    published_date: '2022-08-01',
  },
  {
    id: '11',
    title: 'Mobile-first blog platform',
    slug: 'mobile-first-blog-platform',
    summary:
      'Headless CMS-driven blog with MDX support, reading time estimates, and a Lighthouse score of 100 across all four categories.',
    featured: false,
    cover_image: {
      url: '/placeholder-cover.svg',
      alt: 'Blog platform screenshot',
    },
    role: 'Full-Stack Engineer',
    outcome_metric: 'Lighthouse 100 across all categories',
    type: 'frontend',
    problem:
      'Client had a blog on a heavyweight WordPress theme with Lighthouse scores in the 40s and a 6-second load time on mobile.',
    solution:
      'Rebuilt on Next.js with Contentful as the CMS, MDX for rich content, and aggressive static generation.',
    result:
      'Lighthouse 100 on all four categories. Mobile load time under 1.2 seconds.',
    tech_stack: [
      { item: 'Next.js' },
      { item: 'TypeScript' },
      { item: 'Contentful' },
      { item: 'MDX' },
    ],
    live_url: undefined,
    github_url: undefined,
    published_date: '2022-06-01',
  },
  {
    id: '12',
    title: 'Notification service',
    slug: 'notification-service',
    summary:
      'Multi-channel alert system supporting email, SMS, and in-app notifications — with delivery receipts, retry logic, and per-channel rate limiting.',
    featured: false,
    cover_image: {
      url: '/placeholder-cover.svg',
      alt: 'Notification service architecture',
    },
    role: 'Backend Engineer',
    outcome_metric: '99.4% delivery rate across channels',
    type: 'backend',
    problem:
      'Three products were each building their own notification logic. Delivery failures were silent and untracked.',
    solution:
      'Centralised notification service with channel adapters (SendGrid, Twilio, in-app WebSocket), delivery receipts, and a retry queue for transient failures.',
    result:
      '99.4% delivery rate. Failed deliveries are now visible and retried automatically.',
    tech_stack: [
      { item: 'Node.js' },
      { item: 'TypeScript' },
      { item: 'SendGrid' },
      { item: 'Twilio' },
      { item: 'BullMQ' },
      { item: 'Redis' },
    ],
    live_url: undefined,
    github_url: 'https://github.com/placeholder/notification-service',
    published_date: '2022-04-01',
  },
]

export const dummyTestimonials: DummyTestimonial[] = [
  {
    id: '1',
    name: 'Ade Okonkwo',
    role: 'CEO, Drivve Technologies',
    quote:
      'Precious pushed back on two features that would have slowed the launch and was right both times. The system has been in production for 11 months with zero critical incidents.',
    project: null,
    avatar: null,
  },
  {
    id: '2',
    name: 'Chisom Eze',
    role: 'CTO, Tradestack',
    quote:
      'What stood out was the speed. Most engineers at that level need weeks to get productive. Precious was shipping production code by day three and asking the right product questions by day five.',
    project: { id: '2' },
    avatar: null,
  },
]

export const getFeaturedProjects = () =>
  dummyProjects.filter((p) => p.featured).slice(0, 3)

export const getProjectBySlug = (slug: string) =>
  dummyProjects.find((p) => p.slug === slug) ?? null

export const getTestimonialForProject = (projectId: string) =>
  dummyTestimonials.find((t) => t.project?.id === projectId) ?? null

export const getHomepageTestimonials = () =>
  dummyTestimonials.filter((t) => !t.project)
