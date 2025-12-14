export interface TimelineItemType {
  text: string
  date: string
  category: { tag: string; color?: string; bgColor: string }
  link?: { url: string; text: string }
  year: number
}

export const timelineData: TimelineItemType[] = [
  // 2024 - Founding Year
  {
    text: 'EasyGo officially launched with a premium fleet of 10 certified vehicles, setting a new standard for car rental safety.',
    date: 'January 15, 2024',
    category: { tag: 'milestone', bgColor: '#FED7AA' },
    year: 2024,
  },
  {
    text: 'Celebrating a major milestone: 1,000 safe journeys completed with zero accidents.',
    date: 'March 22, 2024',
    category: { tag: 'achievement', bgColor: '#FED7AA' },
    year: 2024,
  },
  {
    text: 'Standardized our signature 20-Point Safety Inspection protocol for every single vehicle.',
    date: 'May 10, 2024',
    category: { tag: 'safety', bgColor: '#FED7AA' },
    year: 2024,
  },
  {
    text: 'Strategic fleet expansion to 25 premium vehicles across luxury and economy categories.',
    date: 'July 18, 2024',
    category: { tag: 'expansion', bgColor: '#FED7AA' },
    year: 2024,
  },
  {
    text: 'Reaching new heights with over 1,000 satisfied customers.',
    date: 'September 5, 2024',
    category: { tag: 'achievement', bgColor: '#FED7AA' },
    year: 2024,
  },
  {
    text: 'Secured long-term fleet management contracts with 10 leading multinational corporations.',
    date: 'November 12, 2024',
    category: { tag: 'partnership', bgColor: '#FED7AA' },
    year: 2024,
  },

  // 2025 - Growth Year
  {
    text: 'Revolutionized daily commuting with the launch of "EasyGo Flex" subscription plans.',
    date: 'January 8, 2025',
    category: { tag: 'service', bgColor: '#FED7AA' },
    year: 2025,
  },
  {
    text: 'Achieved 10,000+ safe journeys completed',
    date: 'March 15, 2025',
    category: { tag: 'milestone', bgColor: '#FED7AA' },
    year: 2025,
  },
  {
    text: 'Trusted by over 10 corporate partners for their dedicated business mobility needs.',
    date: 'May 20, 2025',
    category: { tag: 'partnership', bgColor: '#FED7AA' },
    year: 2025,
  },
  {
    text: 'Embracing sustainability: Integrated high-performance Electric Vehicles (EVs) into our fleet.',
    date: 'July 30, 2025',
    category: { tag: 'innovation', bgColor: '#FED7AA' },
    year: 2025,
  },
  {
    text: 'Reached 98% customer satisfaction rate',
    date: 'September 18, 2025',
    category: { tag: 'achievement', bgColor: '#FED7AA' },
    year: 2025,
  },
  {
    text: 'Fleet milestone reached: Over 100+ certified vehicles now available for 24/7 service.',
    date: 'November 25, 2025',
    category: { tag: 'expansion', bgColor: '#FED7AA' },
    year: 2025,
  },

  // 2026 - Future Plans
  {
    text: 'Regional Expansion: Introducing EasyGo cross-border services to neighboring ASEAN countries (Coming Soon).',
    date: 'Quarter 1, 2026',
    category: { tag: 'future', bgColor: '#E8E8E8', color: '#666666' },
    year: 2026,
  },
  {
    text: 'Digital Transformation: Launching the all-new EasyGo Mobile App for instant bookings (Coming Soon).',
    date: 'Quarter 2, 2026',
    category: { tag: 'future', bgColor: '#E8E8E8', color: '#666666' },
    year: 2026,
  },
  {
    text: 'Real-Time GPS Tracking: Monitor your journey with our live vehicle tracking system. (Coming Soon)',
    date: 'Quarter 3, 2026',
    category: { tag: 'future', bgColor: '#E8E8E8', color: '#666666' },
    year: 2026,
  },
  {
    text: 'Target: 50,000 safe journeys and 200+ corporate partners (Coming Soon)',
    date: 'Quarter 4, 2026',
    category: { tag: 'future', bgColor: '#E8E8E8', color: '#666666' },
    year: 2026,
  },
]
