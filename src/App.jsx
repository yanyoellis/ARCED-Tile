import { useState } from 'react'
import {
  ArrowRight,
  Bath,
  Building2,
  Check,
  ChevronDown,
  Droplets,
  Grid2X2,
  Hammer,
  Layers3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  SquareStack,
  Wrench,
} from 'lucide-react'
import { CalculatorPage } from './pages/CalculatorPage.jsx'
import { SiteFooter } from './components/SiteFooter.jsx'
import { SiteHeader } from './components/SiteHeader.jsx'
import { ReviewsSection } from './components/ReviewsSection.jsx'
import { LegalPage } from './pages/LegalPage.jsx'
import { ReviewsAdminPage } from './pages/ReviewsAdminPage.jsx'
import { privacyPolicy, termsOfUse } from './legalContent.js'
import { siteSeo, usePageSeo } from './seo.js'

const services = [
  { icon: Bath, title: 'Bathroom Tile Installation', copy: 'Bathroom tile installation in Winnipeg with clean transitions, waterproof details and carefully aligned finishes.' },
  { icon: Grid2X2, title: 'Kitchen Tile Installation', copy: 'Kitchen tile installation and backsplash work designed around cabinets, counters, outlets and daily use.' },
  { icon: Sparkles, title: 'Backsplashes', copy: 'Kitchen backsplash installation in Winnipeg with crisp cuts, even grout lines and a polished focal point.' },
  { icon: SquareStack, title: 'Floor Tile Installation', copy: 'Floor tile installation for ceramic, porcelain and large-format tile in residential and commercial spaces.' },
  { icon: Layers3, title: 'Wall Tile Installation', copy: 'Wall tile installation for bathrooms, kitchens and feature walls with consistent layout and clean corners.' },
  { icon: Droplets, title: 'Shower Tile Installation', copy: 'Shower tile installation and waterproofing for dependable tiled shower systems in Winnipeg homes.' },
  { icon: Hammer, title: 'Tile Removal', copy: 'Old tile removal and surface preparation before new tile installation, repair or replacement.' },
  { icon: Wrench, title: 'Tile Replacement', copy: 'Tile repair and replacement for cracked, loose, outdated or damaged bathroom, kitchen and floor tile.' },
  { icon: ShieldCheck, title: 'Waterproofing', copy: 'Purpose-built shower waterproofing before tile is installed.' },
  { icon: Bath, title: 'Residential Projects', copy: 'Thoughtful installation for Winnipeg homes, renovations and new spaces.' },
  { icon: Building2, title: 'Commercial Projects', copy: 'Reliable tile work for businesses and commercial properties.' },
]

const serviceImages = {
  'Bathroom Tile Installation': '/assets/hero-bathroom.webp',
  'Kitchen Tile Installation': '/assets/project-kitchen.webp',
  Backsplashes: '/assets/project-kitchen.webp',
  'Floor Tile Installation': '/assets/project-commercial.webp',
  'Wall Tile Installation': '/assets/before-after.webp',
  'Shower Tile Installation': '/assets/before-after.webp',
}

const advantages = [
  ['02', '2-Year Workmanship Warranty', 'Confidence in the quality of our installation, well beyond project completion.'],
  ['01', 'Fully Insured', 'Responsible work carried out with the protection your property deserves.'],
  ['03', 'Residential & Commercial', 'A considered approach for homes, businesses and commercial properties.'],
  ['04', 'Transparent Estimates', 'Clear project scope and pricing before installation begins.'],
  ['05', 'High Quality Materials', 'Labour and quality materials can be supplied for a complete solution.'],
  ['06', 'Professional Installation', 'Careful preparation, accurate layout and a clean, polished finish.'],
]

const process = [
  ['01', 'Free Estimate', 'Tell us about your project and we will outline the next steps.'],
  ['02', 'Site Inspection', 'We review the space, measurements, substrate and project requirements.'],
  ['03', 'Surface Preparation', 'The installation area is prepared for a stable, lasting result.'],
  ['04', 'Tile Installation', 'Tile is laid with close attention to pattern, cuts and alignment.'],
  ['05', 'Final Inspection', 'We review the finished work with you and leave the area clean.'],
]

const projects = [
  { image: '/assets/hero-bathroom.webp', title: 'Large-Format Shower Tile', copy: 'Warm porcelain tile, precise alignment and integrated waterproofing.' },
  { image: '/assets/project-kitchen.webp', title: 'Kitchen Backsplash', copy: 'Handmade-look ceramic tile installed with crisp, consistent details.' },
  { image: '/assets/project-commercial.webp', title: 'Commercial Floor Tile', copy: 'Durable large-format porcelain for a polished, high-traffic interior.' },
]

const reviewProjectOptions = [
  'Bathroom tile installation',
  'Kitchen tile installation',
  'Backsplash installation',
  'Floor tile installation',
  'Wall tile installation',
  'Shower tile installation',
  'Tile repair or replacement',
  'Commercial tile project',
]

const searchServices = [
  ['Floor Tile Installation Winnipeg', 'Ceramic, porcelain and large-format floor tile installation for homes, condos, offices and commercial interiors.'],
  ['Bathroom Tile Winnipeg', 'Bathroom floors, walls, tub surrounds and shower tile installed with careful preparation and clean finishing.'],
  ['Shower Tile & Waterproofing', 'Waterproofing, substrate checks, shower wall tile installation, grout, silicone and final cleanup.'],
  ['Kitchen Backsplash Installation', 'Backsplashes for kitchens and renovation projects with outlet cuts, pattern alignment and crisp edges.'],
  ['Tile Repair & Replacement', 'Replacement of cracked tile, loose tile, old tile removal and surface preparation before new installation.'],
  ['Porcelain & Ceramic Tile Installer', 'Professional installation for porcelain tile, ceramic tile, mosaics and large-format tile layouts.'],
]

const serviceAreaKeywords = [
  'Tile installation Winnipeg',
  'Winnipeg tile contractor',
  'Bathroom tile Winnipeg',
  'Shower tile installation Winnipeg',
  'Kitchen backsplash Winnipeg',
  'Floor tile installation Winnipeg',
  'Tile repair Winnipeg',
  'Commercial tile installation',
  'Winnipeg & surrounding areas',
  'Headingley',
  'Oak Bluff',
  'East St. Paul',
  'West St. Paul',
]

const faqs = [
  ['Do you work only in Winnipeg?', 'ARCED is based in Winnipeg and serves Winnipeg and surrounding areas. For projects in nearby communities such as Headingley, Oak Bluff, East St. Paul or West St. Paul, share your location in the estimate form and we can confirm availability.'],
  ['Do you remove old tile?', 'Yes. Old tile removal is available and can be included in the project estimate.'],
  ['Do you install shower tile?', 'Yes. We install shower tile and can provide the waterproofing required before tile installation.'],
  ['Do you provide materials?', 'Yes. ARCED can provide both labour and materials, depending on the needs of your project.'],
  ['Do you offer a warranty?', 'Yes. Our tile installation is backed by a two-year workmanship warranty.'],
  ['How is pricing calculated?', 'Pricing is based on the project area, tile type and pattern, site condition, preparation, removal requirements and material scope. A site inspection helps us provide a transparent estimate.'],
  ['What tile installation services do you offer in Winnipeg?', 'ARCED provides floor tile installation, bathroom tile, shower tile, wall tile, kitchen backsplash installation, tile repair, tile replacement, old tile removal, waterproofing and commercial tile installation in Winnipeg.'],
  ['Can you install porcelain, ceramic or large-format tile?', 'Yes. We install porcelain tile, ceramic tile, large-format tile and mosaic details. Large-format tile may require extra leveling, cutting and layout planning.'],
  ['Can I get an estimate for tile installation near me?', 'Yes. Use the estimate form or tile cost calculator and include your Winnipeg address or neighborhood, square footage, tile type and photos if available.'],
  ['Do you handle bathroom renovations and kitchen backsplash projects?', 'Yes. ARCED works on bathroom tile renovations, shower tile waterproofing, kitchen backsplashes, floor tile and wall tile projects for residential and commercial clients.'],
]

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''

function SectionHeading({ eyebrow, title, copy, light = false }) {
  return (
    <div className={`section-heading${light ? ' section-heading--light' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-intro">{copy}</p>}
    </div>
  )
}

function Hero() {
  return (
    <main>
      <section className="hero" id="home">
        <img className="hero-background" src="/assets/hero-bathroom.webp" alt="" aria-hidden="true" />
        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow">Professional Tile Installation</p>
            <h1>Tile Installation<br />in Winnipeg.<br /><span>Built to Last.</span></h1>
            <p className="hero-lead">Professional tile installation for bathrooms, kitchens, floors, walls, showers and backsplashes.</p>
            <ul className="hero-benefits">
              <li><Check aria-hidden="true" /> High-quality workmanship</li>
              <li><Check aria-hidden="true" /> Transparent estimates</li>
              <li><Check aria-hidden="true" /> Residential & commercial</li>
            </ul>
            <div className="hero-actions">
              <a className="button" href="#contact">Get a Free Estimate <ArrowRight aria-hidden="true" /></a>
              <a className="button button--outline-light" href="#projects">View Our Work <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </div>
        <div className="hero-trust-bar">
          <div className="shell" aria-label="Company assurances">
            <span><ShieldCheck aria-hidden="true" /> Fully insured</span>
            <span><Sparkles aria-hidden="true" /> Professional installation</span>
            <span><Check aria-hidden="true" /> 2-year workmanship warranty</span>
          </div>
        </div>
      </section>
    </main>
  )
}

function Services() {
  return (
    <section className="section services" id="services">
      <div className="shell">
        <SectionHeading eyebrow="What we do" title="Our Tile Services" copy="Complete tile installation for Winnipeg homes and commercial spaces—from careful removal and preparation to the finished surface." />
        <div className="featured-services-grid">
          {services.slice(0, 6).map(({ icon: Icon, title, copy }) => (
            <article className="service-card" key={title}>
              <div className="service-image"><img src={serviceImages[title]} alt={`${title} in Winnipeg by ARCED Construction Group`} /></div>
              <div className="service-icon"><Icon strokeWidth={1.6} aria-hidden="true" /></div>
              <div className="service-content">
                <h3>{title}</h3>
                <p>{copy}</p>
                <a href="#contact">Request a quote <ArrowRight aria-hidden="true" /></a>
              </div>
            </article>
          ))}
        </div>
        <div className="additional-services" aria-label="Additional tile services">
          <p>More ways we can help</p>
          {services.slice(6).map(({ icon: Icon, title }) => <a href="#contact" key={title}><Icon aria-hidden="true" />{title}<ArrowRight aria-hidden="true" /></a>)}
        </div>
      </div>
    </section>
  )
}

function SearchCoverage() {
  return (
    <section className="section seo-coverage" aria-labelledby="tile-seo-title">
      <div className="shell">
        <div className="seo-coverage-layout">
          <div className="seo-coverage-copy">
            <p className="eyebrow">Winnipeg tile contractor</p>
            <h2 id="tile-seo-title">Tile Installation in Winnipeg for Floors, Bathrooms, Showers & Backsplashes</h2>
            <p>ARCED Construction Group LTD helps homeowners, builders and commercial clients who are looking for a reliable tile installer near me in Winnipeg. The work can include ceramic tile installation, porcelain tile installation, large-format tile, shower waterproofing, bathroom tile, kitchen backsplash tile and tile repair or replacement.</p>
            <p>Every project starts with the condition of the surface, the layout, the tile type and the details that affect the final result: transitions, grout lines, corners, silicone, waterproofing and cleanup.</p>
            <a className="text-link" href="/calculator">Estimate tile installation cost <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="seo-keyword-grid">
            {searchServices.map(([title, copy]) => (
              <article className="seo-keyword-card" key={title}>
                <Check aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="seo-area-strip" aria-label="Tile installation service keywords and areas">
          {serviceAreaKeywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  return (
    <section className="section why-us" aria-labelledby="why-title">
      <div className="shell">
        <div className="why-layout">
          <article className="why-feature">
            <img src="/assets/project-kitchen.webp" alt="Completed ARCED kitchen backsplash tile project" />
            <div><p className="eyebrow">The ARCED standard</p><h2 id="why-title">Why Choose ARCED?</h2><p>A dependable tile contractor in Winnipeg should make every part of your project feel considered—from the estimate to the final inspection.</p></div>
          </article>
          <div className="advantages-grid">
            {advantages.slice(0, 4).map(([number, title, copy]) => (
              <article className="advantage-card" key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="proof-strip">
          <div><strong>2-Year</strong><span>Workmanship warranty</span></div>
          <div><strong>Fully</strong><span>Insured</span></div>
          <div><strong>Labour +</strong><span>Materials available</span></div>
          <div><strong>Residential +</strong><span>Commercial projects</span></div>
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section process" id="process">
      <div className="shell">
        <SectionHeading eyebrow="Clear from start to finish" title="Our Installation Process" copy="A straightforward five-step process keeps the work organized, the scope clear and the result aligned with your expectations." />
        <div className="process-list">
          {process.map(([number, title, copy]) => (
            <article className="process-step" key={title}>
              <span className="process-number">{number}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="shell">
        <div className="projects-heading">
          <SectionHeading eyebrow="Selected work" title="Recent Tile Projects" copy="A closer look at the level of finish we bring to bathroom, kitchen, floor and commercial tile installation in Winnipeg." />
          <a className="text-link" href="#contact">Discuss your project <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="project-grid">
          {projects.map(({ image, title, copy }, index) => (
            <article className={`project-card project-card--${index + 1}`} key={title}>
              <div className="project-image"><img src={image} alt={title} /></div>
              <div className="project-info"><div><p>Project {String(index + 1).padStart(2, '0')}</p><h3>{title}</h3></div><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function BeforeAfter() {
  return (
    <section className="section comparison">
      <div className="shell comparison-grid">
        <div className="comparison-copy">
          <p className="eyebrow">The difference is in the details</p>
          <h2>A complete shower transformation</h2>
          <p>Old tile removal, substrate preparation, waterproofing and precise shower tile installation come together in one coordinated process.</p>
          <ul>
            <li><Check aria-hidden="true" /> Old tile removal</li>
            <li><Check aria-hidden="true" /> Surface preparation</li>
            <li><Check aria-hidden="true" /> Shower waterproofing</li>
            <li><Check aria-hidden="true" /> Professional installation</li>
          </ul>
        </div>
        <div className="comparison-visual">
          <img src="/assets/before-after.webp" alt="Before and after comparison of a shower tile renovation" />
          <span className="before-label">Before</span>
          <span className="after-label">After</span>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <ReviewsSection
      title="Reviews from ARCED clients"
      copy="Real client feedback from tile projects in Winnipeg. If ARCED completed work for you, you can leave a public review below."
      formIntro="Share your experience with ARCED tile installation. Your name, rating, project type and review will be shown publicly."
      projectOptions={reviewProjectOptions}
    />
  )
}

function FAQ() {
  return (
    <section className="section faq" id="faq">
      <div className="shell faq-grid">
        <div className="faq-intro">
          <p className="eyebrow">Helpful details</p>
          <h2>Frequently Asked Questions</h2>
          <p>Still have a question about your tile project? Include it with your estimate request and we will be happy to help.</p>
          <a className="text-link" href="#contact">Ask a question <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="accordion">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>{question}<ChevronDown aria-hidden="true" /></summary>
              <div className="answer"><p>{answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formStatus, setFormStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    setSubmitted(false)

    if (!FORMSPREE_ENDPOINT) {
      setFormStatus('error')
      setStatusMessage('The estimate form is being connected. Please email arcedconstruction@outlook.com or call +1 431 338-5322.')
      return
    }

    setFormStatus('loading')
    setStatusMessage('')

    const formData = new FormData(form)
    formData.append('_subject', 'New tile estimate request from arcedtile.ca')
    formData.append('website', 'arcedtile.ca')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (!response.ok) throw new Error('Form submission failed')

      setFormStatus('success')
      setStatusMessage('Thank you. Your request has been sent to ARCED.')
      form.reset()
    } catch {
      setFormStatus('error')
      setStatusMessage('Something went wrong while sending your request. Please email arcedconstruction@outlook.com or call +1 431 338-5322.')
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Start your project</p>
          <h2>Request Your<br />Free Estimate</h2>
          <p>Tell us what you are planning. We will review your project details and follow up to arrange the next step.</p>
          <div className="contact-details">
            <span><MapPin aria-hidden="true" /><span><small>Service area</small>Winnipeg, Manitoba</span></span>
            <a href="tel:+14313385322"><Phone aria-hidden="true" /><span><small>Call us</small>+1 431 338-5322</span></a>
            <a href="mailto:arcedconstruction@outlook.com"><Mail aria-hidden="true" /><span><small>Email us</small>arcedconstruction@outlook.com</span></a>
            <span><ShieldCheck aria-hidden="true" /><span><small>Peace of mind</small>Fully insured · 2-year warranty</span></span>
          </div>
        </div>
        <form className="estimate-form" onSubmit={handleSubmit} aria-busy={formStatus === 'loading'}>
          <div className="field-row">
            <label>Full Name<input name="name" autoComplete="name" required placeholder="Your full name" /></label>
            <label>Email<input type="email" name="email" autoComplete="email" required placeholder="you@example.com" /></label>
          </div>
          <div className="field-row">
            <label>Phone<input type="tel" name="phone" autoComplete="tel" required placeholder="(204) 000-0000" /></label>
            <label>Project Type<select name="projectType" defaultValue="" required><option value="" disabled>Select a service</option><option>Bathroom tile installation</option><option>Kitchen tile installation</option><option>Backsplash installation</option><option>Floor tile installation</option><option>Wall tile installation</option><option>Shower tile installation</option><option>Tile removal or replacement</option><option>Commercial tile project</option><option>Other tile project</option></select></label>
          </div>
          <label>Message<textarea name="message" required rows="5" placeholder="Tell us about the space, tile and timeline you have in mind." /></label>
          <div className="form-footer">
            <button className="button" type="submit" disabled={formStatus === 'loading'}>{formStatus === 'loading' ? 'Sending...' : 'Send Request'} <ArrowRight aria-hidden="true" /></button>
            <p>By submitting, you agree to be contacted about your project.</p>
          </div>
          {formStatus === 'success' && <p className="form-success" role="status"><Check aria-hidden="true" /> {statusMessage}</p>}
          {formStatus === 'error' && <p className="form-success form-error" role="alert">{statusMessage}</p>}
          {submitted && <p className="form-success" role="status"><Check aria-hidden="true" /> Thank you. Your request is ready to be connected to ARCED’s email or CRM.</p>}
        </form>
      </div>
    </section>
  )
}

function HomePage() {
  usePageSeo(siteSeo.home)

  return (
    <>
      <a className="skip-link" href="#services">Skip to main content</a>
      <SiteHeader />
      <Hero />
      <Services />
      <SearchCoverage />
      <WhyUs />
      <Process />
      <Projects />
      <BeforeAfter />
      <Testimonials />
      <FAQ />
      <Contact />
      <SiteFooter />
    </>
  )
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '')

  if (path === '/calculator') {
    return <CalculatorPage />
  }
  if (path === '/privacy-policy') {
    return <LegalPage document={privacyPolicy} />
  }
  if (path === '/terms-of-use') {
    return <LegalPage document={termsOfUse} />
  }
  if (path === '/admin-reviews') {
    return <ReviewsAdminPage />
  }

  return <HomePage />
}
