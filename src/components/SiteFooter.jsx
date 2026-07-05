import { ExternalLink, Globe2, Mail, MapPin, Phone, Send } from 'lucide-react'

const footerNavigation = [
  ['Home', '/#home'],
  ['Services', '/#services'],
  ['Projects', '/#projects'],
  ['Process', '/#process'],
  ['FAQ', '/#faq'],
  ['Calculator', '/calculator'],
  ['Contact', '/#contact'],
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand"><img src="/assets/arced-logo.png" alt="ARCED Construction Group LTD" /><p>Professional tile installation for residential and commercial projects in Winnipeg.</p></div>
        <div className="footer-column"><h2>Navigate</h2>{footerNavigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div>
        <div className="footer-column"><h2>Services</h2><a href="/#services">Bathroom tile</a><a href="/#services">Kitchen tile</a><a href="/#services">Floor tile</a><a href="/#services">Commercial tile</a></div>
        <div className="footer-column footer-contact"><h2>Contact</h2><span><MapPin aria-hidden="true" /> Winnipeg, Manitoba</span><a href="tel:+14313385322"><Phone aria-hidden="true" /> +1 431 338-5322</a><a href="mailto:arcedconstruction@outlook.com"><Mail aria-hidden="true" /> arcedconstruction@outlook.com</a></div>
      </div>
      <div className="shell footer-credits">
        <details className="designer-credit">
          <summary>
            <img src="/assets/yana-ellis-logo.png" alt="Yana Ellis logo" />
            <span><small>Website designed by</small><strong>Yana Ellis</strong></span>
          </summary>
          <div className="designer-popover">
            <p><strong>Yana Ellis</strong><span>UX/UI Designer & Developer</span></p>
            <a href="https://t.me/ohyanyo" target="_blank" rel="noreferrer"><Send aria-hidden="true" /><span>Telegram<small>@ohyanyo</small></span><ExternalLink aria-hidden="true" /></a>
            <a href="https://yanaellis.vercel.app" target="_blank" rel="noreferrer"><Globe2 aria-hidden="true" /><span>Portfolio<small>yanaellis.vercel.app</small></span><ExternalLink aria-hidden="true" /></a>
          </div>
        </details>
        <nav className="footer-legal" aria-label="Legal"><a href="/privacy-policy">Privacy Policy</a><a href="/terms-of-use">Terms of Use</a></nav>
      </div>
      <div className="shell footer-bottom"><p>© {new Date().getFullYear()} ARCED Construction Group LTD. All rights reserved.</p><p>Tile installation · Winnipeg, Canada</p></div>
    </footer>
  )
}
