'use client'

import { useState } from 'react'
import { Award, ArrowUpRight, Building2, Calendar, Check, ChevronLeft, ChevronRight, GraduationCap, Mail, Menu, Play, Quote, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Counter } from '@/components/counter'
import { TiltCard } from '@/components/tilt-card'
import { Marquee } from '@/components/marquee'
import { HeroScene } from '@/components/hero-scene'
import { AboutPhoto } from '@/components/about-photo'
import { ChannelChart } from '@/components/channel-chart'
import { ThemeToggle } from '@/components/theme-toggle'
import { toneText } from '@/lib/utils'
import { iconMap } from '@/lib/icon-map'
import { useSiteData } from '@/lib/use-site-data'

export default function Page() {
  const { data } = useSiteData()
  const {
    profile, nav, hero, platformsLabel, platforms, about,
    certificationsHeading, certifications, experienceHeading, experience, educationHeading, education,
    servicesHeading, services,
    socialHeading, socialCapabilities,
    processHeading, process, workHeading, projects, testimonials, performanceSnapshot, contact, footer,
  } = data

  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [testimonial, setTestimonial] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)

  // Guards against an edited headline that no longer contains the
  // highlight word (e.g. via the admin editor) — falls back to plain text
  // instead of visibly appending the stale highlight.
  const highlightIndex = hero.highlight ? hero.headline.indexOf(hero.highlight) : -1
  const headlineBefore = highlightIndex === -1 ? hero.headline : hero.headline.slice(0, highlightIndex)
  const headlineAfter = highlightIndex === -1 ? '' : hero.headline.slice(highlightIndex + hero.highlight.length)

  return <main className="min-h-screen overflow-hidden bg-background text-foreground">
    <nav className="fixed inset-x-0 top-0 z-40 border-b border-foreground/10 bg-background/80 px-6 py-5 backdrop-blur-xl md:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#top" className="font-mono text-sm font-bold tracking-[0.24em] text-foreground">{profile.brandMark}<span className="text-primary">.</span></a>
        <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.18em] text-muted-foreground md:flex">
          {nav.links.map((link) => <a key={link.href} href={link.href} className="hover:text-foreground">{link.label}</a>)}
          <a href={nav.cta.href} className="rounded-full border border-primary/50 px-4 py-2 text-primary hover:bg-primary hover:text-primary-foreground">{nav.cta.label}</a>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 text-muted-foreground transition-colors hover:border-primary hover:text-primary" />
          <button aria-label="Toggle menu" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {menuOpen && <div className="flex flex-col gap-5 pb-2 pt-6 text-sm uppercase tracking-widest md:hidden">
        {nav.links.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
        <a href={nav.cta.href} onClick={() => setMenuOpen(false)}>{nav.cta.label}</a>
      </div>}
    </nav>

    {/* HERO */}
    <section id="top" className="grain-bg relative flex min-h-screen items-center px-6 pb-20 pt-32 md:px-12">
      <div className="grid-lines absolute inset-0 -z-10" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> {hero.eyebrow}
          </div>
          <h1 className="max-w-3xl text-balance text-6xl font-semibold leading-[.95] tracking-[-0.06em] md:text-8xl">
            {headlineBefore}{highlightIndex !== -1 && <span className="text-primary">{hero.highlight}</span>}{headlineAfter}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">{hero.subtext}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={hero.primaryCta.href} className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-1">{hero.primaryCta.label} <ArrowUpRight size={17} /></a>
            <a href={hero.secondaryCta.href} className="flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-sm hover:border-primary hover:text-primary">{hero.secondaryCta.label}</a>
          </div>
          <div className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-foreground/10 pt-8">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <Counter value={stat.value} decimals={stat.decimals} prefix={stat.prefix} suffix={stat.suffix} className={`font-mono-tight text-2xl font-bold ${toneText(stat.tone)}`} />
                <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <HeroScene
          liveLabel={hero.scene.liveLabel}
          panelTitle={hero.scene.panelTitle}
          panelSubtitle={hero.scene.panelSubtitle}
          bars={hero.scene.bars}
          kpis={hero.scene.kpis}
          revenueBadge={hero.scene.revenueBadge}
          platformBadge={hero.scene.platformBadge}
          spendBadge={hero.scene.spendBadge}
        />
      </div>
    </section>

    {/* TRUSTED PLATFORMS */}
    <section className="border-y border-foreground/10 bg-card/40 py-8">
      <Reveal>
        <p className="mb-6 text-center font-mono-tight text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{platformsLabel}</p>
        <Marquee items={platforms} />
      </Reveal>
    </section>

    {/* ABOUT */}
    <section id="about" className="border-b border-foreground/10 bg-card/40 px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal>
          <AboutPhoto photoSrc={profile.photo} photoAlt={profile.photoAlt} name={profile.name} />
          <p className="eyebrow mt-8">{about.eyebrow}</p>
          <h2 className="mt-5 max-w-md text-4xl font-semibold tracking-tight md:text-5xl">{about.heading}</h2>
        </Reveal>
        <Reveal delay={120} className="max-w-2xl">
          <p className="text-xl leading-relaxed text-muted-foreground">{about.paragraph}</p>
          <div id="certifications" className="mt-10 border-t border-foreground/10 pt-8">
            <p className="font-mono-tight text-xs uppercase tracking-widest text-muted-foreground">{certificationsHeading.eyebrow}</p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">{certificationsHeading.heading}</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-foreground/[.02] px-4 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Award size={16} /></span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{cert.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{cert.issuer} · {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* EXPERIENCE & EDUCATION */}
    <section id="experience" className="border-y border-foreground/10 bg-card/40 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal><p className="eyebrow">{experienceHeading.eyebrow}</p><h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">{experienceHeading.heading}</h2></Reveal>
        <div className="mt-14 grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div className="relative max-w-2xl">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-foreground/10" />
            <div className="space-y-10">
              {experience.map((role, i) => (
                <Reveal key={`${role.role}-${role.company}`} delay={i * 100} className="relative flex gap-6">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background text-primary"><Building2 size={16} /></span>
                  <div className="pt-1">
                    <p className="font-mono-tight text-xs uppercase tracking-widest text-muted-foreground">{role.period}</p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">{role.role} · <span className="text-primary">{role.company}</span></h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{role.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div id="education">
            <p className="font-mono-tight text-xs uppercase tracking-widest text-muted-foreground">{educationHeading.eyebrow}</p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">{educationHeading.heading}</h3>
            <div className="mt-6 space-y-4">
              {education.map((item, i) => (
                <Reveal key={item.degree} delay={i * 90}>
                  <div className="flex items-start gap-4 rounded-2xl border border-foreground/10 bg-foreground/[.02] p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"><GraduationCap size={18} /></span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{item.degree}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.school}</p>
                      <p className="mt-1 font-mono-tight text-xs uppercase tracking-widest text-muted-foreground">{item.period}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* SERVICES */}
    <section id="services" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal><p className="eyebrow">{servicesHeading.eyebrow}</p><h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">{servicesHeading.heading}</h2></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((service, i) => {
            const ServiceIcon = iconMap[service.icon]
            return (
            <Reveal key={service.title} delay={i * 90}>
              <TiltCard className="service-card h-full">
                <ServiceIcon className="text-primary" size={22} />
                <span className="step mt-6 block">{String(i + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{service.sub}</p>
                <p className="desc">{service.desc}</p>
                <div className="tags mt-8 flex flex-wrap gap-2">{service.tags.map(t => <i key={t}>{t}</i>)}</div>
              </TiltCard>
            </Reveal>
            )
          })}
        </div>
      </div>
    </section>

    {/* SOCIAL MEDIA MANAGEMENT & GROWTH */}
    <section id="social" className="border-y border-foreground/10 bg-card/40 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow">{socialHeading.eyebrow}</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">{socialHeading.heading}</h2>
          {socialHeading.description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{socialHeading.description}</p>}
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {socialCapabilities.map((item, i) => {
            const tone = ['primary', 'secondary', 'accent'][i % 3] as 'primary' | 'secondary' | 'accent'
            const toneBg = { primary: 'bg-primary/10 text-primary', secondary: 'bg-secondary/10 text-secondary', accent: 'bg-accent/10 text-accent' }[tone]
            return (
              <Reveal key={item} delay={i * 60}>
                <div className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-foreground/[.02] px-5 py-4 transition-colors hover:border-foreground/20">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${toneBg}`}><Check size={16} /></span>
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>

    {/* PROCESS */}
    <section id="process" className="border-y border-foreground/10 bg-card/40 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal><p className="eyebrow">{processHeading.eyebrow}</p><h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">{processHeading.heading}</h2></Reveal>
        <div className="relative mt-16 grid gap-10 md:grid-cols-5">
          <div className="process-line absolute left-0 right-0 top-6 hidden h-px opacity-30 md:block" />
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 100} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-background font-mono-tight text-sm text-primary">{p.step}</div>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* WORK */}
    <section id="work" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <Reveal><p className="eyebrow">{workHeading.eyebrow}</p><h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">{workHeading.heading}</h2></Reveal>
          <a href={workHeading.linkHref} className="hidden items-center gap-2 text-sm text-primary md:flex">{workHeading.linkLabel} <ArrowUpRight size={16} /></a>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 100}>
              <button onClick={() => setActiveProject(index)} className="group w-full text-left">
                <TiltCard max={5} className={`project-art bg-gradient-to-br ${project.color}`}>
                  <div className="project-lines" />
                  <span className="relative z-10 rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur">{workHeading.cardBadgeLabel}</span>
                  <Play className="relative z-10 opacity-0 transition-opacity group-hover:opacity-100" fill="currentColor" size={28} />
                </TiltCard>
                <div className="mt-5 flex items-start justify-between">
                  <div><p className="text-xs uppercase tracking-widest text-primary">{project.category}</p><h3 className="mt-2 text-2xl font-medium">{project.title}</h3></div>
                  <ArrowUpRight className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* PERFORMANCE SNAPSHOT */}
    <section className="border-y border-foreground/10 bg-card/40 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal><p className="eyebrow justify-center">{performanceSnapshot.eyebrow}</p><h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">{performanceSnapshot.heading}</h2><p className="mx-auto mt-5 max-w-xl text-muted-foreground">{performanceSnapshot.description}</p></Reveal>
        <Reveal delay={150} scale><ChannelChart channels={performanceSnapshot.channels} /></Reveal>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <Quote className="mx-auto text-primary" size={32} />
        <p className="mt-8 text-3xl font-medium leading-tight tracking-tight md:text-5xl">&ldquo;{testimonials[testimonial].quote}&rdquo;</p>
        <p className="mt-8 text-sm text-muted-foreground"><span className="font-semibold text-foreground">{testimonials[testimonial].name}</span> · {testimonials[testimonial].role}</p>
        <div className="mt-10 flex justify-center gap-3">
          <button aria-label="Previous testimonial" onClick={() => setTestimonial((testimonial + testimonials.length - 1) % testimonials.length)} className="rounded-full border border-foreground/15 p-3 hover:border-primary"><ChevronLeft size={16} /></button>
          <button aria-label="Next testimonial" onClick={() => setTestimonial((testimonial + 1) % testimonials.length)} className="rounded-full border border-foreground/15 p-3 hover:border-primary"><ChevronRight size={16} /></button>
        </div>
      </div>
    </section>

    {/* CONTACT */}
    <section id="contact" className="border-t border-foreground/10 bg-card/40 px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal>
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">{contact.heading}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">{contact.paragraph}</p>
          <div className="mt-10 flex flex-col gap-4 text-sm">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-primary"><Mail size={18} /> {contact.email}</a>
            <a href="#top" className="flex items-center gap-3 hover:text-primary"><Calendar size={18} /> {contact.bookingLabel}</a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
            <label className="block"><span className="sr-only">{contact.form.namePlaceholder}</span><input required placeholder={contact.form.namePlaceholder} className="contact-input" /></label>
            <label className="block"><span className="sr-only">{contact.form.emailPlaceholder}</span><input required type="email" placeholder={contact.form.emailPlaceholder} className="contact-input" /></label>
            <label className="block"><span className="sr-only">{contact.form.budgetPlaceholder}</span><input placeholder={contact.form.budgetPlaceholder} className="contact-input" /></label>
            <label className="block"><span className="sr-only">{contact.form.messagePlaceholder}</span><textarea required placeholder={contact.form.messagePlaceholder} rows={5} className="contact-input resize-none" /></label>
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:opacity-90">{sent ? <><Check size={17} /> {contact.form.submitLabelSent}</> : <>{contact.form.submitLabel} <ArrowUpRight size={17} /></>}</button>
          </form>
        </Reveal>
      </div>
    </section>

    <footer className="flex flex-col gap-6 px-6 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-12">
      <p>{footer.copyright}</p>
      <div className="flex items-center gap-5">
        {footer.links.map((link) => <a key={link.label} href={link.href} className="hover:text-foreground">{link.label}</a>)}
      </div>
    </footer>

    {activeProject !== null && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050602]/80 p-6 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={`${projects[activeProject].title} case study`}>
      <div className="relative w-full max-w-2xl rounded-3xl border border-foreground/15 bg-card p-8 shadow-2xl md:p-12">
        <button aria-label="Close case study" onClick={() => setActiveProject(null)} className="absolute right-6 top-6 rounded-full border border-foreground/15 p-2 hover:border-primary"><X size={18} /></button>
        <p className="eyebrow">{workHeading.modalEyebrowPrefix} / {projects[activeProject].category}</p>
        <h2 className="mt-5 text-4xl font-semibold">{projects[activeProject].title}</h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{projects[activeProject].description} {projects[activeProject].extendedNote}</p>
        <div className="mt-10 grid grid-cols-3 gap-4">{projects[activeProject].metrics.map(metric => <div key={metric} className="rounded-2xl border border-foreground/10 bg-background/50 p-4 text-center text-sm font-medium text-primary">{metric}</div>)}</div>
        <button onClick={() => { setActiveProject(null); document.getElementById('contact')?.scrollIntoView() }} className="mt-10 flex items-center gap-2 text-sm font-semibold text-primary">{workHeading.modalCtaLabel} <ArrowUpRight size={16} /></button>
      </div>
    </div>}
  </main>
}
