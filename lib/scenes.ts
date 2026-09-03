export type Scene = {
  id: string
  label: string
  image: string
  eyebrow: string
  title: string
  titleEmphasis?: string
  body: string
  tags?: string[]
  accent: string
  cta?: boolean
}

export const scenes: Scene[] = [
  {
    id: 'invitation',
    label: 'The Invitation',
    image: '/scenes/01-invitation.png',
    eyebrow: 'Veloura Balloon Studio',
    title: 'Make the moment',
    titleEmphasis: 'impossible to miss.',
    body: 'Sculptural balloon experiences, designed around the people and memories at the heart of your event.',
    tags: ['Weddings', 'Milestone Parties', 'Bespoke Events'],
    accent: '#c9a25f',
  },
  {
    id: 'craft',
    label: 'The Craft',
    image: '/scenes/02-craft.png',
    eyebrow: '01 · Our Approach',
    title: 'Beauty with',
    titleEmphasis: 'a blueprint.',
    body: 'What looks effortless at the celebration begins with careful planning — measurements, sightlines, colour balance, structural support and the rhythm of every balloon.',
    tags: ['Listen', 'Design', 'Build', 'Celebrate'],
    accent: '#c58f9a',
  },
  {
    id: 'weddings',
    label: 'Weddings',
    image: '/scenes/03-weddings.png',
    eyebrow: '02 · Designed For',
    title: 'A ceremony',
    titleEmphasis: 'worth arriving to.',
    body: 'Ceremony arches, champagne-toned gardens and elegant reception focal points — shaped for your space and the light of your venue.',
    tags: ['Ceremony arches', 'Champagne gardens', 'Reception focal points'],
    accent: '#d8bd8a',
  },
  {
    id: 'celebrations',
    label: 'Celebrations',
    image: '/scenes/04-celebrations.png',
    eyebrow: '03 · Joy, Made Visible',
    title: 'Built for the',
    titleEmphasis: 'biggest little moments.',
    body: 'From first birthdays to milestone years, freestanding art transforms a familiar room into somewhere extraordinary.',
    tags: ['Birthdays', 'Anniversaries', 'Family celebrations'],
    accent: '#c58f9a',
  },
  {
    id: 'anniversaries',
    label: 'The Detail',
    image: '/scenes/05-anniversary.png',
    eyebrow: "04 · The Work You Don't See",
    title: 'Not just inflated.',
    titleEmphasis: 'Engineered to belong.',
    body: 'Every shade is tested together under the light of your venue. Every form is balanced, reinforced and perfected on-site.',
    tags: ['Palette precision', 'Structural care', 'On-site artistry'],
    accent: '#4a3243',
  },
  {
    id: 'moment',
    label: 'Your Moment',
    image: '/scenes/06-moment.png',
    eyebrow: 'Peterborough, Ontario · Travel within 100 km',
    title: "Let's create your",
    titleEmphasis: 'unforgettable.',
    body: 'Share your event date, location and the feeling you want guests to remember — and we will design the rest.',
    accent: '#c9a25f',
    cta: true,
  },
]
