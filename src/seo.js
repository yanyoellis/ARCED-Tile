import { useEffect } from 'react'

const baseUrl = 'https://arcedtile.ca/'
const siteName = 'ARCED Construction Group LTD'
const phone = '+1 431 338-5322'
const email = 'arcedconstruction@outlook.com'

const tileKeywords = [
  'tile installation Winnipeg',
  'Winnipeg tile contractor',
  'tile installer Winnipeg',
  'tile installer near me Winnipeg',
  'bathroom tile installation Winnipeg',
  'shower tile installation Winnipeg',
  'shower waterproofing Winnipeg',
  'floor tile installation Winnipeg',
  'kitchen backsplash installation Winnipeg',
  'wall tile installation Winnipeg',
  'ceramic tile installation Winnipeg',
  'porcelain tile installation Winnipeg',
  'large format tile installation Winnipeg',
  'tile repair Winnipeg',
  'tile replacement Winnipeg',
  'commercial tile installation Winnipeg',
]

const tileServices = [
  'Bathroom tile installation Winnipeg',
  'Kitchen tile installation Winnipeg',
  'Kitchen backsplash installation Winnipeg',
  'Floor tile installation Winnipeg',
  'Wall tile installation Winnipeg',
  'Shower tile installation Winnipeg',
  'Shower waterproofing Winnipeg',
  'Ceramic tile installation Winnipeg',
  'Porcelain tile installation Winnipeg',
  'Large format tile installation Winnipeg',
  'Tile repair Winnipeg',
  'Tile replacement Winnipeg',
  'Old tile removal Winnipeg',
  'Commercial tile installation Winnipeg',
]

const localAreas = [
  'Winnipeg',
  'Manitoba',
  'Headingley',
  'Oak Bluff',
  'East St. Paul',
  'West St. Paul',
]

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
  description: 'Winnipeg tile contractor providing bathroom tile, shower tile, floor tile, wall tile, kitchen backsplash, waterproofing, tile repair and tile replacement services.',
  slogan: 'Tile installation in Winnipeg built to last.',
  knowsAbout: tileKeywords,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Winnipeg',
    addressRegion: 'Manitoba',
    addressCountry: 'CA',
  },
  areaServed: localAreas.map((name) => ({ '@type': 'Place', name })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tile installation services',
    itemListElement: tileServices.map((name) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name,
        serviceType: name,
        provider: { '@id': `${baseUrl}#business` },
        areaServed: localAreas.map((area) => ({ '@type': 'Place', name: area })),
      },
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

function pageSchema(path, name, description, keywords) {
  const url = absolute(path)
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    ...(keywords ? { keywords: keywords.join(', ') } : {}),
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
    ['What tile installation services do you offer in Winnipeg?', 'ARCED provides floor tile installation, bathroom tile, shower tile, wall tile, kitchen backsplash installation, tile repair, tile replacement, old tile removal, waterproofing and commercial tile installation in Winnipeg.'],
    ['Can you install porcelain, ceramic or large-format tile?', 'Yes. ARCED installs porcelain tile, ceramic tile, large-format tile and mosaic details.'],
  ].map(([name, text]) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: { '@type': 'Answer', text },
  })),
}

const homeDescription = 'Winnipeg tile contractor for bathroom tile, shower waterproofing, floor tile, kitchen backsplashes, porcelain, ceramic, repair and replacement.'
const calculatorDescription = 'Estimate tile installation costs in Winnipeg for ceramic, porcelain, floor, bathroom, shower, backsplash and large-format tile projects.'
const privacyDescription = 'Privacy Policy for ARCED Construction Group LTD. and its Winnipeg tile installation website.'
const termsDescription = 'Terms of Use for ARCED Construction Group LTD. and its Winnipeg tile installation website.'
const reviewsAdminDescription = 'Private review moderation page for ARCED Construction Group LTD.'

export const siteSeo = {
  home: {
    title: 'Tile Installation Winnipeg | Bathroom, Shower, Floor Tile | ARCED',
    description: homeDescription,
    canonicalPath: '/',
    image: '/assets/hero-bathroom.webp',
    schema: [businessSchema, websiteSchema, pageSchema('/', 'Tile Installation Winnipeg | Bathroom, Shower, Floor Tile | ARCED', homeDescription, tileKeywords), faqSchema],
  },
  calculator: {
    title: 'Tile Installation Cost Calculator Winnipeg | ARCED',
    description: calculatorDescription,
    canonicalPath: '/calculator',
    image: '/assets/project-commercial.webp',
    schema: [businessSchema, websiteSchema, pageSchema('/calculator', 'Tile Installation Cost Calculator Winnipeg | ARCED', calculatorDescription, ['tile installation cost Winnipeg', 'tile calculator Winnipeg', 'bathroom tile cost Winnipeg', 'floor tile cost Winnipeg'])],
  },
  privacy: {
    title: 'Privacy Policy | ARCED Construction Group LTD',
    description: privacyDescription,
    canonicalPath: '/privacy-policy',
    image: '/assets/arced-logo.png',
    robots: 'noindex, follow',
    schema: [businessSchema, websiteSchema, pageSchema('/privacy-policy', 'Privacy Policy | ARCED Construction Group LTD', privacyDescription)],
  },
  terms: {
    title: 'Terms of Use | ARCED Construction Group LTD',
    description: termsDescription,
    canonicalPath: '/terms-of-use',
    image: '/assets/arced-logo.png',
    robots: 'noindex, follow',
    schema: [businessSchema, websiteSchema, pageSchema('/terms-of-use', 'Terms of Use | ARCED Construction Group LTD', termsDescription)],
  },
  reviewsAdmin: {
    title: 'Review Admin | ARCED Construction Group LTD',
    description: reviewsAdminDescription,
    canonicalPath: '/admin-reviews',
    image: '/assets/arced-logo.png',
    robots: 'noindex, nofollow',
    schema: [pageSchema('/admin-reviews', 'Review Admin | ARCED Construction Group LTD', reviewsAdminDescription)],
  },
}

export function usePageSeo({ title, description, canonicalPath, image, schema, robots = 'index, follow' }) {
  useEffect(() => {
    const canonical = absolute(canonicalPath)
    const imageUrl = absolute(image)

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots)
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
  }, [title, description, canonicalPath, image, schema, robots])
}
