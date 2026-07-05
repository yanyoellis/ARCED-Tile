export const projectTypes = [
  { id: 'floor', label: 'Floor', rate: null, productivity: 70, note: 'Rate is based on the selected tile type.' },
  { id: 'bathroom', label: 'Bathroom Floor', rate: 14.5, productivity: 35, note: 'Includes floor preparation and waterproof membrane.' },
  { id: 'shower', label: 'Shower Walls', rate: 17.5, productivity: 30, note: 'Includes waterproofing and detailed corner finishing.' },
  { id: 'backsplash', label: 'Kitchen Backsplash', rate: 18, productivity: 25, note: 'Includes outlet cutting, installation and grouting.' },
  { id: 'wall', label: 'Wall Tile', rate: 12, productivity: 40, note: 'Includes wall preparation, adhesive and grouting.' },
]

export const tileTypes = [
  { id: 'ceramic', label: 'Ceramic', rate: 9.5, productivityFactor: 1 },
  { id: 'porcelain', label: 'Porcelain', rate: 11.5, productivityFactor: 0.86 },
  { id: 'large-format', label: 'Large Format (24″ × 24″+)', rate: 13.5, productivityFactor: 0.65 },
]

export const optionalServices = [
  { id: 'removal', label: 'Old Tile Removal', rate: 3.5, durationDays: 1, includes: 'Tile and adhesive removal, waste disposal' },
  { id: 'leveling', label: 'Floor Leveling', rate: 2.5, durationDays: 1, includes: 'Self-leveling compound and surface correction' },
  { id: 'waterproofing', label: 'Waterproof Membrane', rate: 3, durationDays: 1, includes: 'Waterproof coating, corners and seams' },
  { id: 'heated-floor', label: 'Heated Floor Preparation', rate: 6, durationDays: 1, includes: 'Heating mat installation and preparation before tiling' },
]

export const standardInclusions = [
  'Site inspection',
  'Surface preparation',
  'Professional installation',
  'Premium thin-set mortar',
  'Tile cutting',
  'Precision alignment',
  'Grouting',
  'Silicone finishing where required',
  'Final cleaning',
  'Construction debris removal',
  '2-Year Workmanship Warranty',
]

export const rateCards = [
  {
    title: 'Floor Tile Installation',
    price: 'Starting from $9.50 / ft²',
    featured: true,
    includes: ['Site preparation', 'Surface cleaning', 'Minor floor leveling', 'Thin-set mortar', 'Professional installation', 'Tile spacers', 'Grouting', 'Silicone finishing', 'Cleanup', 'Waste removal'],
  },
  {
    title: 'Ceramic Tile Installation',
    price: '$9.50 / ft²',
    note: 'Recommended for bedrooms, living rooms and hallways.',
    includes: ['Labour', 'Adhesive', 'Grout', 'Cleanup', 'Waste removal'],
  },
  {
    title: 'Porcelain Tile Installation',
    price: '$11.50 / ft²',
    includes: ['Surface preparation', 'Premium mortar', 'Precision cutting', 'Grouting', 'Final cleaning', 'Waste removal'],
  },
  {
    title: 'Large Format Tile',
    price: '$13.50 / ft²',
    note: 'For tile sized 24″ × 24″ and larger.',
    includes: ['Leveling system', 'Precision installation', 'Large-format cutting', 'Grouting', 'Cleanup'],
  },
  {
    title: 'Bathroom Floor',
    price: '$14.50 / ft²',
    includes: ['Floor preparation', 'Waterproof membrane', 'Tile installation', 'Grouting', 'Silicone joints', 'Cleanup', 'Waste removal'],
  },
  {
    title: 'Shower Walls',
    price: '$17.50 / ft²',
    includes: ['Waterproofing', 'Cement board inspection', 'Tile installation', 'Corner finishing', 'Silicone', 'Cleanup'],
  },
  {
    title: 'Kitchen Backsplash',
    price: '$18 / ft²',
    includes: ['Surface preparation', 'Tile installation', 'Outlet cutting', 'Grouting', 'Cleanup'],
  },
  {
    title: 'Wall Tile Installation',
    price: '$12 / ft²',
    includes: ['Wall preparation', 'Adhesive', 'Tile installation', 'Grouting', 'Cleanup'],
  },
]

export const exampleEstimates = [
  { title: 'Small Bathroom', area: '40 ft²', detail: 'Porcelain tile installation', price: '≈ $460 CAD' },
  { title: 'Kitchen Floor', area: '150 ft²', detail: 'Ceramic tile', price: '≈ $1,425 CAD' },
  { title: 'Living Room', area: '300 ft²', detail: 'Porcelain tile', price: '≈ $3,450 CAD' },
  { title: 'Shower Walls', area: '90 ft²', detail: 'Complete waterproof installation', price: '≈ $1,575 CAD' },
]

export function calculateEstimate({ projectId, tileId, squareFeet, selectedOptions }) {
  const project = projectTypes.find((item) => item.id === projectId) ?? projectTypes[0]
  const tile = tileTypes.find((item) => item.id === tileId) ?? tileTypes[0]
  const area = Math.max(0, Number(squareFeet) || 0)
  const baseRate = project.rate ?? tile.rate
  const baseCost = area * baseRate
  const selectedAddons = optionalServices.filter((service) => selectedOptions[service.id])
  const addonItems = selectedAddons.map((service) => ({
    id: service.id,
    label: service.label,
    rate: service.rate,
    cost: area * service.rate,
  }))
  const addonsCost = addonItems.reduce((total, item) => total + item.cost, 0)
  const calculatedTotal = baseCost + addonsCost
  const minimumApplied = area > 0 && area < 50 && calculatedTotal < 450
  const total = minimumApplied ? 450 : calculatedTotal

  const adjustedProductivity = project.productivity * tile.productivityFactor
  const installationDays = area > 0 ? Math.max(1, Math.ceil(area / adjustedProductivity)) : 0
  const optionDays = selectedAddons.reduce((totalDays, service) => totalDays + service.durationDays, 0)
  const durationStart = installationDays + optionDays
  const durationEnd = durationStart > 0 ? durationStart + (area >= 200 ? 2 : 1) : 0

  return {
    project,
    tile,
    area,
    baseRate,
    baseCost,
    addonItems,
    minimumApplied,
    total,
    duration: durationStart > 0 ? `${durationStart}–${durationEnd} working days` : 'Enter the project size',
  }
}
