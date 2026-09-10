export type Tone = 'primary' | 'secondary' | 'accent' | 'foreground' | 'muted'
export type IconKey = 'search' | 'megaphone' | 'target' | 'barChart3' | 'layers' | 'repeat'

/**
 * Single source of truth for every piece of copy, number, and asset path
 * on the site. Edit values here — no component code needs to change.
 */

export const meta = {
  title: 'Zehran — Performance Marketing Strategist',
  description: 'Zehran is a performance marketing strategist helping ecommerce & SaaS brands scale profitable growth across Google, Meta, and TikTok with data-driven media buying, CRO, and analytics.',
}

export const profile = {
  name: 'Zehran',
  brandMark: 'ZEHRAN',
  role: 'Performance Marketing Strategist',
  email: 'hello@zehran.co',
  /** Drop a transparent-background PNG/WebP at public/profile.png to have it appear in the hero automatically. */
  photo: '/profile.png',
  photoAlt: 'Portrait of Zehran, performance marketing strategist',
}

export const nav = {
  links: [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
  ],
  cta: { label: 'Book a call', href: '#contact' },
}

export const hero = {
  eyebrow: profile.role,
  headline: 'I turn ad spend into predictable revenue.',
  highlight: 'predictable',
  subtext: `I'm ${profile.name} — a performance marketer helping ecommerce and SaaS brands scale profitably across Google, Meta, and TikTok with data-backed strategy, not guesswork.`,
  primaryCta: { label: 'See the results', href: '#work' },
  secondaryCta: { label: 'Book a strategy call', href: '#contact' },
  stats: [
    { value: 18, prefix: '$', suffix: 'M+', decimals: 0, label: 'Ad spend managed', tone: 'secondary' as Tone },
    { value: 4.8, suffix: 'x', decimals: 1, label: 'Avg. ROAS', tone: 'primary' as Tone },
    { value: 60, suffix: '+', decimals: 0, label: 'Brands scaled', tone: 'accent' as Tone },
  ],
  scene: {
    liveLabel: 'Live',
    panelTitle: 'Campaign performance',
    panelSubtitle: 'All channels · Last 30 days',
    bars: [38, 62, 48, 80, 58, 94, 70],
    kpis: [
      { value: '4.8x', label: 'ROAS', tone: 'secondary' as Tone },
      { value: '3.2%', label: 'CTR', tone: 'foreground' as Tone },
      { value: '−34%', label: 'CPA', tone: 'accent' as Tone },
    ],
    revenueBadge: { value: '$2.4M', label: 'Revenue influenced' },
    platformBadge: { value: 'Google · Meta · TikTok', label: 'Unified attribution' },
    spendBadge: { value: '$18M+', label: 'Ad spend managed' },
  },
}

export const platformsLabel = 'Platforms & tools I run performance on'
export const platforms = [
  'Google Ads', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads', 'Microsoft Ads',
  'GA4', 'Shopify', 'HubSpot', 'Klaviyo', 'Looker Studio', 'Semrush', 'Triple Whale',
]

export const about = {
  eyebrow: '01 / The strategist behind the spend',
  heading: 'Growth, backed by data.',
  paragraph: 'The best campaigns don’t rely on luck. I pair sharp media-buying instincts with rigorous testing and clean attribution, so every dollar you spend earns its keep and every decision has a number behind it.',
  stats: [
    { value: 7, suffix: '+', decimals: 0, label: 'Years in performance' },
    { value: 18, prefix: '$', suffix: 'M+', decimals: 0, label: 'Ad spend managed' },
    { value: 4.8, suffix: 'x', decimals: 1, label: 'Average ROAS' },
    { value: 60, suffix: '+', decimals: 0, label: 'Brands scaled' },
  ],
}

export const servicesHeading = {
  eyebrow: '02 / What I do',
  heading: 'Full-funnel performance marketing.',
}

export const services: {
  icon: IconKey
  title: string
  sub: string
  desc: string
  tags: string[]
}[] = [
  { icon: 'search', title: 'Paid Search', sub: 'Google & Microsoft Ads', desc: 'Search, Shopping, and Performance Max campaigns engineered for buyer intent and healthy margins.', tags: ['Search', 'Shopping', 'PMax'] },
  { icon: 'megaphone', title: 'Paid Social', sub: 'Meta, TikTok & LinkedIn', desc: 'Scroll-stopping creative and relentless audience testing that keeps CAC low while you scale.', tags: ['Meta', 'TikTok', 'LinkedIn'] },
  { icon: 'target', title: 'Conversion Rate Optimization', sub: 'Landing pages & funnels', desc: 'Structured experiments across your funnel that turn more of your existing traffic into revenue.', tags: ['A/B Testing', 'Landing Pages'] },
  { icon: 'barChart3', title: 'Analytics & Attribution', sub: 'GA4, tracking, dashboards', desc: 'Clean server-side tracking and reporting that shows exactly which dollar drove which result.', tags: ['GA4', 'Dashboards'] },
  { icon: 'layers', title: 'Programmatic & Retargeting', sub: 'Display & video', desc: 'Full-funnel display and retargeting that keeps your brand front of mind through the buying cycle.', tags: ['Display', 'Retargeting'] },
  { icon: 'repeat', title: 'Retention & Lifecycle', sub: 'Email & CRM', desc: 'Klaviyo and HubSpot flows that compound customer value without adding to your ad budget.', tags: ['Klaviyo', 'HubSpot'] },
]

export const socialHeading = {
  eyebrow: '03 / Beyond paid',
  heading: 'Social Media Management & Growth.',
  description: 'The organic side that makes paid work harder — a consistent, on-brand presence that compounds reach instead of renting it.',
}

export const socialCapabilities = [
  'Social Media Management',
  'Content Strategy',
  'Content Planning & Calendars',
  'Script Writing',
  'Content & Trend Research',
  'Competitor Analysis',
  'Analytics & Reporting',
  'Audience Engagement',
  'Page Growth Strategy',
  'Content Optimization',
]

export const processHeading = {
  eyebrow: '04 / How we get there',
  heading: 'A process built for compounding results.',
}

export const process = [
  { step: '01', title: 'Audit & Discovery', desc: 'A full teardown of your accounts, funnel, and data to find where budget is leaking.' },
  { step: '02', title: 'Strategy & Forecasting', desc: 'A channel plan and spend forecast built around your margins, not vanity metrics.' },
  { step: '03', title: 'Launch & Creative Testing', desc: 'Rapid, structured tests across offers, audiences, and creative to find what scales.' },
  { step: '04', title: 'Optimize & Scale', desc: 'Budget shifts toward proven winners as CPA drops and ROAS climbs.' },
  { step: '05', title: 'Report & Iterate', desc: 'Clear weekly reporting and a standing roadmap of what we test next.' },
]

export const workHeading = {
  eyebrow: '05 / Selected work',
  heading: 'Proof, not promises.',
  linkLabel: 'Have a project?',
  linkHref: '#contact',
  cardBadgeLabel: 'View case study',
  modalEyebrowPrefix: 'Case study',
  modalCtaLabel: 'Work together',
}

export const projects = [
  {
    title: 'Verve Nutrition',
    category: 'DTC Supplements · Paid Social & Search',
    description: 'Rebuilt the funnel and creative testing engine behind a stalled supplements brand.',
    extendedNote: 'We rebuilt the tracking foundation, ran a structured creative-testing roadmap, and reallocated spend weekly toward what the data showed was working.',
    color: 'from-[#1e3f8f] to-[#5c8dff]',
    metrics: ['+286% ROAS', '−38% CPA', '$2.1M revenue / 6mo'],
  },
  {
    title: 'Northpeak SaaS',
    category: 'B2B SaaS · Search & LinkedIn',
    description: 'Shifted a founder-led SaaS from scattered spend to a predictable demand engine.',
    extendedNote: 'We consolidated lead scoring, rebuilt LinkedIn targeting around ICP firmographics, and tied every campaign to pipeline, not clicks.',
    color: 'from-[#8a6a2e] to-[#e0b673]',
    metrics: ['3.4x pipeline', '−46% CAC', '212 SQLs / mo'],
  },
  {
    title: 'Solstice Home',
    category: 'Ecommerce · Full-funnel',
    description: 'A full-funnel rebuild spanning paid media, CRO, and retention for a furniture brand.',
    extendedNote: 'We restructured the catalog feed, rebuilt PDP and checkout flows around real session data, and layered in lifecycle email to lift repeat purchase rate.',
    color: 'from-[#5e3c1c] to-[#c99461]',
    metrics: ['+164% CVR', '5.1x ROAS', '$4.6M revenue influenced'],
  },
]

export const testimonials = [
  { quote: 'Zehran didn’t just manage our ad spend, he rebuilt how we think about growth. We finally know which dollar is doing the work.', name: 'Priya Anand', role: 'Founder, Verve Nutrition' },
  { quote: 'Pipeline tripled in a quarter and our CAC finally made sense on a board slide. Rare to find someone this fluent in both media and margins.', name: 'Daniel Cho', role: 'CEO, Northpeak SaaS' },
  { quote: 'The reporting alone changed how our team operates. No more guessing, every recommendation is backed by a number.', name: 'Elena Marsh', role: 'CMO, Solstice Home' },
]

export const performanceSnapshot = {
  eyebrow: '06 / Live snapshot',
  heading: 'Where the budget performs best.',
  description: 'Average client ROAS by channel across active accounts, reallocated weekly toward what’s actually converting.',
  channels: [
    { name: 'Google Ads', value: 5.2, tone: 'primary' as Tone },
    { name: 'Meta Ads', value: 4.6, tone: 'secondary' as Tone },
    { name: 'TikTok Ads', value: 3.8, tone: 'accent' as Tone },
    { name: 'LinkedIn Ads', value: 4.1, tone: 'muted' as Tone },
  ],
}

export const contact = {
  eyebrow: '07 / Let’s scale something',
  heading: 'Ready to grow profitably?',
  paragraph: 'Tell me about your funnel, your current numbers, and where you want ROAS to be next quarter.',
  email: profile.email,
  bookingLabel: 'Book a 30-min strategy call',
  form: {
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Work email',
    budgetPlaceholder: 'Current monthly ad spend (optional)',
    messagePlaceholder: 'Tell me about your goals',
    submitLabel: 'Send it my way',
    submitLabelSent: 'Message sent',
  },
}

export const footer = {
  copyright: `© 2026 ${profile.name}. Performance marketing that pays for itself.`,
  links: [
    { label: 'LinkedIn', href: '#top' },
    { label: 'X (Twitter)', href: '#top' },
    { label: 'Back to top ↑', href: '#top' },
  ],
}

/** Full payload shape served by app/api/site-data and fetched via useSiteData(). */
export const siteData = {
  meta, profile, nav, hero, platformsLabel, platforms, about, servicesHeading, services,
  socialHeading, socialCapabilities,
  processHeading, process, workHeading, projects, testimonials, performanceSnapshot, contact, footer,
}

export type SiteData = typeof siteData
