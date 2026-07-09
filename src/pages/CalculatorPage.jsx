import { useState } from 'react'
import { ArrowRight, Calculator, Check, Clock3, Info, Ruler, ShieldCheck } from 'lucide-react'
import { SiteFooter } from '../components/SiteFooter.jsx'
import { SiteHeader } from '../components/SiteHeader.jsx'
import { siteSeo, usePageSeo } from '../seo.js'
import {
  calculateEstimate,
  exampleEstimates,
  optionalServices,
  projectTypes,
  rateCards,
  standardInclusions,
  tileTypes,
} from '../calculatorData.js'

const cad = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
})

const initialOptions = Object.fromEntries(optionalServices.map(({ id }) => [id, false]))

export function CalculatorPage() {
  usePageSeo(siteSeo.calculator)

  const [projectId, setProjectId] = useState('floor')
  const [tileId, setTileId] = useState('ceramic')
  const [squareFeet, setSquareFeet] = useState('100')
  const [selectedOptions, setSelectedOptions] = useState(initialOptions)

  const estimate = calculateEstimate({ projectId, tileId, squareFeet, selectedOptions })

  function updateOption(id, checked) {
    setSelectedOptions((current) => ({ ...current, [id]: checked }))
  }

  return (
    <>
      <a className="skip-link" href="#calculator-form">Skip to calculator</a>
      <SiteHeader currentPage="calculator" />
      <main className="calculator-page">
        <section className="calculator-hero">
          <img src="/assets/project-commercial.webp" alt="" aria-hidden="true" />
          <div className="shell calculator-hero__content">
            <p className="eyebrow">Tile Project Planning Tool</p>
            <h1>Tile Installation<br />Cost Calculator</h1>
            <p>Build a more useful preliminary estimate by selecting the project, tile type, area and preparation your space may need.</p>
            <div className="estimate-warning"><Info aria-hidden="true" /><p><strong>Important:</strong> This price is approximate and requires detailed discussion and a site inspection before the final quote.</p></div>
          </div>
        </section>

        <section className="calculator-workspace" id="calculator-form">
          <div className="shell calculator-layout">
            <form className="calculator-form" onSubmit={(event) => event.preventDefault()}>
              <div className="calculator-form__heading">
                <span><Calculator aria-hidden="true" /></span>
                <div><p className="eyebrow">Your project</p><h2>Estimate the scope</h2></div>
              </div>

              <div className="calculator-fields">
                <label>
                  Project Type
                  <select name="projectType" value={projectId} onChange={(event) => setProjectId(event.target.value)}>
                    {projectTypes.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
                  </select>
                  <small>{estimate.project.note}</small>
                </label>
                <label>
                  Tile Type
                  <select name="tileType" value={tileId} onChange={(event) => setTileId(event.target.value)}>
                    {tileTypes.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
                  </select>
                  <small>For floor projects, tile type determines the base rate.</small>
                </label>
                <label>
                  Square Footage
                  <span className="area-input"><input name="squareFeet" type="number" min="1" max="5000" step="1" inputMode="numeric" value={squareFeet} onChange={(event) => setSquareFeet(event.target.value)} aria-describedby="area-help" /><span>ft²</span></span>
                  <small id="area-help">Measure the tileable surface, not the room footprint.</small>
                </label>
              </div>

              <fieldset className="calculator-options">
                <legend>Optional Services</legend>
                <p>Select every item your project may require.</p>
                <div className="option-grid">
                  {optionalServices.map(({ id, label, rate, includes }) => (
                    <label className={`option-card${selectedOptions[id] ? ' is-selected' : ''}`} key={id}>
                      <input name={id} type="checkbox" checked={selectedOptions[id]} onChange={(event) => updateOption(id, event.target.checked)} />
                      <span className="option-check"><Check aria-hidden="true" /></span>
                      <span><strong>{label}</strong><small>+ ${rate.toFixed(2)} / ft²</small><em>{includes}</em></span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </form>

            <aside className="estimate-result" aria-live="polite">
              <p className="eyebrow">Estimated price</p>
              <p className="estimate-total">{cad.format(estimate.total)}</p>
              <p className="estimate-currency">CAD · approximate project total</p>

              <div className="estimate-summary">
                <div><Ruler aria-hidden="true" /><span><small>Project</small><strong>{estimate.project.label} · {estimate.area || 0} ft²</strong></span></div>
                <div><Clock3 aria-hidden="true" /><span><small>Estimated duration</small><strong>{estimate.duration}</strong></span></div>
              </div>

              <div className="estimate-breakdown">
                <h2>Estimate breakdown</h2>
                <div><span>{estimate.project.label} installation<br /><small>{estimate.tile.label} · ${estimate.baseRate.toFixed(2)} / ft²</small></span><strong>{cad.format(estimate.baseCost)}</strong></div>
                {estimate.addonItems.map(({ id, label, rate, cost }) => <div key={id}><span>{label}<br /><small>${rate.toFixed(2)} / ft²</small></span><strong>{cad.format(cost)}</strong></div>)}
                {estimate.minimumApplied && <div className="minimum-line"><span>Minimum project adjustment<br /><small>Projects under 50 ft² start from $450</small></span><strong>Applied</strong></div>}
              </div>

              <div className="result-inclusions">
                <h2>Included in the base rate</h2>
                <ul>{standardInclusions.slice(0, 6).map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
              </div>

              <div className="result-disclaimer"><Info aria-hidden="true" /><p><strong>This is a preliminary estimate—not a final quote.</strong> Final pricing requires detailed discussion, exact measurements and inspection of the surface, layout and tile. Tile purchase and applicable taxes are not included.</p></div>
              <a className="button estimate-cta" href="/#contact">Request a Free Estimate <ArrowRight aria-hidden="true" /></a>
            </aside>
          </div>
        </section>

        <section className="calculator-section pricing-section">
          <div className="shell">
            <div className="calculator-section__heading"><p className="eyebrow">Transparent starting rates</p><h2>Tile Installation Pricing</h2><p>Rates below include professional installation and the listed standard materials and finishing work. Every site is different, so final pricing is confirmed after project review.</p></div>
            <div className="rate-grid">
              {rateCards.map(({ title, price, note, includes, featured }) => (
                <article className={`rate-card${featured ? ' rate-card--featured' : ''}`} key={title}>
                  <div><h3>{title}</h3><p className="rate-price">{price}</p>{note && <p className="rate-note">{note}</p>}</div>
                  <ul>{includes.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="calculator-section optional-pricing">
          <div className="shell">
            <div className="calculator-section__heading calculator-section__heading--compact"><p className="eyebrow">When your space needs more preparation</p><h2>Optional Services</h2></div>
            <div className="optional-price-grid">
              {optionalServices.map(({ id, label, rate, includes }) => <article key={id}><span>+ ${rate.toFixed(2)} / ft²</span><h3>{label}</h3><p>{includes}</p></article>)}
            </div>
          </div>
        </section>

        <section className="calculator-section examples-section">
          <div className="shell">
            <div className="calculator-section__heading calculator-section__heading--compact"><p className="eyebrow">For quick comparison</p><h2>Example Estimates</h2><p>These examples are based on the starting rates and are not final quotations.</p></div>
            <div className="example-grid">
              {exampleEstimates.map(({ title, area, detail, price }) => <article key={title}><p>{area}</p><h3>{title}</h3><span>{detail}</span><strong>{price}</strong></article>)}
            </div>
            <div className="minimum-project"><div><ShieldCheck aria-hidden="true" /><span><strong>Minimum project</strong><small>Small projects under 50 ft² start from $450 CAD.</small></span></div><a className="text-link" href="/#contact">Discuss a small project <ArrowRight aria-hidden="true" /></a></div>
          </div>
        </section>

        <section className="calculator-section included-section">
          <div className="shell included-layout">
            <div><p className="eyebrow">The ARCED standard</p><h2>What the Base Price Includes</h2><p>All primary installation rates include the essential preparation, setting and finishing work listed here. Optional services are added only when selected or required after inspection.</p></div>
            <ul>{standardInclusions.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
