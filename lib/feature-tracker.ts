// Feature tracking system to monitor what needs to be built next
export interface Feature {
  id: string
  name: string
  description: string
  category: "core" | "growth" | "monetization" | "social"
  priority: "critical" | "high" | "medium" | "low"
  status: "idea" | "planned" | "in-progress" | "shipped"
  impact: "high" | "medium" | "low"
  effort: "low" | "medium" | "high" | "very-high"
  dependencies?: string[]
}

export const FEATURE_ROADMAP: Feature[] = [
  // CRITICAL PATH TO DOMINANCE
  {
    id: "user-accounts",
    name: "User Accounts & Authentication",
    description: "Full user system with Supabase auth, profiles, preferences",
    category: "core",
    priority: "critical",
    status: "planned",
    impact: "high",
    effort: "medium",
  },
  {
    id: "reviews-ratings",
    name: "Reviews & Ratings System",
    description: "Let users rate venues, upload photos, write detailed reviews",
    category: "core",
    priority: "critical",
    status: "planned",
    impact: "high",
    effort: "high",
    dependencies: ["user-accounts"],
  },
  {
    id: "direct-reservations",
    name: "Direct Reservations",
    description: "Book tables at restaurants directly through the platform",
    category: "core",
    priority: "critical",
    status: "idea",
    impact: "high",
    effort: "very-high",
    dependencies: ["user-accounts"],
  },

  // GROWTH FEATURES
  {
    id: "seo-optimization",
    name: "SEO & Content Marketing",
    description: "Optimize for Google, create blog content, venue pages",
    category: "growth",
    priority: "high",
    status: "idea",
    impact: "high",
    effort: "medium",
  },
  {
    id: "social-sharing",
    name: "Social Sharing & Virality",
    description: "Share discoveries, invite friends, social proof",
    category: "growth",
    priority: "high",
    status: "idea",
    impact: "medium",
    effort: "low",
    dependencies: ["user-accounts"],
  },
  {
    id: "push-notifications",
    name: "Push Notifications",
    description: "Alert users about new events, trending spots, personalized recommendations",
    category: "growth",
    priority: "medium",
    status: "idea",
    impact: "medium",
    effort: "low",
  },

  // MONETIZATION
  {
    id: "loyalty-program",
    name: "Loyalty & Rewards Program",
    description: "Points system, exclusive deals, VIP access",
    category: "monetization",
    priority: "high",
    status: "idea",
    impact: "high",
    effort: "medium",
    dependencies: ["user-accounts"],
  },
  {
    id: "venue-partnerships",
    name: "Venue Partnership Program",
    description: "Partner dashboard, analytics, promotional tools for venues",
    category: "monetization",
    priority: "high",
    status: "idea",
    impact: "high",
    effort: "very-high",
  },
  {
    id: "exclusive-deals",
    name: "Exclusive Member Deals",
    description: "Secret menus, early access, subscriber-only discounts",
    category: "monetization",
    priority: "medium",
    status: "idea",
    impact: "high",
    effort: "medium",
    dependencies: ["user-accounts", "venue-partnerships"],
  },
]

export function getNextFeaturesToBuild(): Feature[] {
  return FEATURE_ROADMAP.filter((f) => f.status === "planned" || f.status === "idea")
    .sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
    .slice(0, 5)
}
