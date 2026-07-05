import { useEffect, useState } from 'react'
import { MapPin, Menu, Phone, X } from 'lucide-react'

const navigation = [
  { label: 'Home', href: '/#home', page: 'home' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Process', href: '/#process' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Calculator', href: '/calculator', page: 'calculator' },
  { label: 'Contact', href: '/#contact' },
]

export function SiteHeader({ currentPage = 'home' }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="utility-inner shell">
          <a href="/" className="brand" aria-label="ARCED Construction Group home">
            <img src="/assets/arced-logo.png" alt="ARCED Construction Group LTD" />
          </a>
          <div className="utility-item utility-location">
            <MapPin aria-hidden="true" />
            <span><small>Proudly serving</small><strong>Winnipeg & surrounding areas</strong></span>
          </div>
          <a className="utility-item utility-quote" href="tel:+14313385322">
            <Phone aria-hidden="true" />
            <span><small>Call for a free quote</small><strong>+1 431 338-5322</strong></span>
          </a>
          <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className="nav-bar">
        <div className="nav-inner shell">
          <nav className={`primary-nav${open ? ' is-open' : ''}`} aria-label="Primary navigation">
            {navigation.map(({ label, href, page }) => (
              <a key={href} href={href} aria-current={page === currentPage ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <a className="button button--small" href="/#contact" onClick={() => setOpen(false)}>Get a Free Estimate</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
