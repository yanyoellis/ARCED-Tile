import { useEffect } from 'react'

const baseUrl = 'https://arcedtile.ca/'
const siteName = 'ARCED Construction Group LTD'
const phone = '+1 431 338-5322'
const email = 'arcedconstruction@outlook.com'

function absolute(path) {
  return new URL(path, baseUrl).toString()
}

function upsertMeta(attribute, key, content) {
  if (!content) return
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function upsertJsonLd(schema) {
  if (!schema) return
  let element = document.head.querySelector('#structured-data')
  if (!element) {
    element = document.createElement('script')
    element.type = 'application/ld+json'
    element.id = 'structured-data'
    document.head.appendChild(element)
  }
  element.textContent = JSON.stringify(schema)
}

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${baseUrl}#business`,
  name: siteName,
  legalName: 'ARCED Construction Group LTD.',
  url: baseUrl,
  logo: absolute('/assets/arced-logo.png'),
  image: absolute('/assets/hero-bathroom.webp'),
  telephone: phone,
  email,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Winnipeg',
    addressRegion: 'Manitoba',
    addressCountry: 'CA',
  },
  areaServed: [
    { '@type': 'City', name: 'Winnipeg' },
    { '@type': 'AdministrativeArea', name: 'Manitoba' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tile installation services',
    itemListElement: [
      'Bathroom tile installation',
      'Kitchen tile installation',
      'Floor tile installation',
      'Wall tile installation',
      'Shower tile installation',
      'Backsplash installation',
      'Tile removal and replacement',
      'Waterproofing',
      'Commercial tile installation',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name, areaServed: 'Winnipeg, Manitoba' },
    })),
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}#website`,
  name: siteName,
  url: baseUrl,
  publisher: { '@id': `${baseUrl}#business` },
}

function pageSchema(path, name, description) {
  const url = absolute(path)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': `${baseUrl}#website` },
    about: { '@id': `${baseUrl}#business` },
  }
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ['Do you work only in Winnipeg?', 'ARCED is based in Winnipeg and serves Winnipeg and surrounding areas.'],
    ['Do you remove old tile?', 'Yes. Old tile removal is available and can be included in the project estimate.'],
    ['Do you install shower tile?', 'Yes. ARCED installs shower tile and can provide required waterproofing before tile installation.'],
    ['Do you offer a warranty?', 'Yes. Tile installation is backed by a two-year workmanship warranty.'],
  ].map(([name, text]) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: { '@type': 'Answer', text },
  })),
}

const homeDescription = 'Professional tile installation in Winnipeg for bathrooms, kitchens, floors, walls, showers, backsplashes and commercial properties.'
const calculatorDescription = 'Estimate tile installation costs in Winnipeg by project type, tile type, square footage and optional preparation services.'
const privacyDescription = 'Privacy Policy for ARCED Construction Group LTD. and its Winnipeg tile installation website.'
const termsDescription = 'Terms of Use for ARCED Construction Group LTD. and its Winnipeg tile installation website.'

export const siteSeo = {
  home: {
    title: 'Tile Installation Winnipeg | ARCED Construction Group LTD',
    description: homeDescription,
    canonicalPath: '/',
    image: '/assets/hero-bathroom.webp',
    schema: [businessSchema, websiteSchema, pageSchema('/', 'Tile Installation Winnipeg | ARCED Construction Group LTD', homeDescription), faqSchema],
  },
  calculator: {
    title: 'Tile Installation Cost Calculator Winnipeg | ARCED',
    description: calculatorDescription,
    canonicalPath: '/calculator',
    image: '/assets/project-commercial.webp',
    schema: [businessSchema, websiteSchema, pageSchema('/calculator', 'Tile Installation Cost Calculator Winnipeg | ARCED', calculatorDescription)],
  },
  privacy: {
    title: 'Privacy Policy | ARCED Construction Group LTD',
    description: privacyDescription,
    canonicalPath: '/privacy-policy',
    image: '/assets/arced-logo.png',
    schema: [businessSchema, websiteSchema, pageSchema('/privacy-policy', 'Privacy Policy | ARCED Construction Group LTD', privacyDescription)],
  },
  terms: {
    title: 'Terms of Use | ARCED Construction Group LTD',
    description: termsDescription,
    canonicalPath: '/terms-of-use',
    image: '/assets/arced-logo.png',
    schema: [businessSchema, websiteSchema, pageSchema('/terms-of-use', 'Terms of Use | ARCED Construction Group LTD', termsDescription)],
  },
}

export function usePageSeo({ title, description, canonicalPath, image, schema }) {
  useEffect(() => {
    const canonical = absolute(canonicalPath)
    const imageUrl = absolute(image)

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', 'index, follow')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:site_name', siteName)
    upsertMeta('property', 'og:locale', 'en_CA')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)
    upsertCanonical(canonical)
    upsertJsonLd(schema)
  }, [title, description, canonicalPath, image, schema])
}
