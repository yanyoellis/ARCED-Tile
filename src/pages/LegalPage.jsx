import { useEffect } from 'react'
import { ArrowUp, Mail, Phone } from 'lucide-react'
import { SiteFooter } from '../components/SiteFooter.jsx'
import { SiteHeader } from '../components/SiteHeader.jsx'

function ContactBlock() {
  return (
    <address className="legal-contact">
      <strong>ARCED Construction Group LTD.</strong>
      <span>Winnipeg, Manitoba, Canada</span>
      <a href="tel:+14313385322"><Phone aria-hidden="true" />+1 (431) 338-5322</a>
      <a href="mailto:arcedconstruction@outlook.com"><Mail aria-hidden="true" />arcedconstruction@outlook.com</a>
    </address>
  )
}

function LegalBlock({ block }) {
  if (block.type === 'contact') return <ContactBlock />
  if (block.type === 'list') return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
  return <p>{block.text}</p>
}

export function LegalPage({ document }) {
  useEffect(() => {
    const previousTitle = window.document.title
    window.document.title = `${document.title} | ARCED Construction Group LTD`
    return () => { window.document.title = previousTitle }
  }, [document.title])

  return (
    <>
      <a className="skip-link" href="#legal-content">Skip to document</a>
      <SiteHeader currentPage="legal" />
      <main className="legal-page" id="legal-top">
        <header className="legal-hero">
          <div className="shell">
            <p className="eyebrow">ARCED Construction Group LTD.</p>
            <h1>{document.title}</h1>
            <p>Effective Date: {document.effectiveDate}</p>
          </div>
        </header>
        <div className="shell legal-layout">
          <aside className="legal-toc" aria-label={`${document.title} contents`}>
            <p>On this page</p>
            <nav>{document.sections.map(({ title }, index) => <a key={title} href={`#section-${index + 1}`}>{title}</a>)}</nav>
          </aside>
          <article className="legal-document" id="legal-content">
            <div className="legal-intro">{document.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            {document.sections.map(({ title, blocks }, index) => (
              <section key={title} id={`section-${index + 1}`}>
                <h2>{title}</h2>
                {blocks.map((block, blockIndex) => <LegalBlock key={`${block.type}-${blockIndex}`} block={block} />)}
              </section>
            ))}
            <footer className="legal-updated"><span>Last Updated</span><strong>{document.lastUpdated}</strong><a href="#legal-top">Back to top <ArrowUp aria-hidden="true" /></a></footer>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
