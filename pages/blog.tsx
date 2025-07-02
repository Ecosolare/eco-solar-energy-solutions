import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  TrendingUp, 
  Zap, 
  Car, 
  Home, 
  Leaf,
  ArrowRight,
  Search,
  Filter
} from "lucide-react";

// Real UK renewable energy news based on current data
const blogPosts = [
  {
    id: "renewable-milestone-2025",
    title: "UK Achieves Historic 50.8% Renewable Energy Share",
    excerpt: "For the first time in history, renewable energy provided more than half of UK electricity generation, marking a watershed moment in the nation's clean energy transition.",
    content: "The UK has reached a historic milestone with renewable energy sources providing 50.8% of electricity generation in 2024, the first time renewables have exceeded half of total generation. This represents a significant 6.5% increase from 2023, with 144.7 TWh of total renewable generation.",
    author: "Energy Policy Team",
    date: "2025-07-02",
    readTime: "4 min read",
    category: "Policy",
    tags: ["Renewable Energy", "Milestones", "UK Grid"],
    featured: true,
    image: "/api/placeholder/600/300"
  },
  {
    id: "ev-charging-expansion-2025",
    title: "73,334 Public EV Chargers Now Live Across UK",
    excerpt: "The UK's EV charging infrastructure continues rapid expansion with significant regional variations and new policy changes removing planning barriers.",
    content: "As of January 2025, the UK now has 73,334 public charging devices, with London leading at 250 devices per 100,000 population. However, regional gaps persist with Northern Ireland having just 36 per 100,000. The government has removed planning permission requirements for most EV charger installations, potentially saving drivers up to £1,100 annually.",
    author: "Transport Analysts",
    date: "2025-07-01",
    readTime: "5 min read",
    category: "EV Charging",
    tags: ["Electric Vehicles", "Infrastructure", "Government Policy"],
    featured: true,
    image: "/api/placeholder/600/300"
  },
  {
    id: "solar-record-2024",
    title: "Record 1.6 GW of Solar PV Added in 2024",
    excerpt: "Solar power achieves its largest capacity increase since 2016, with major government approvals for nearly 2 GW of additional solar farms.",
    content: "Solar PV experienced remarkable growth in 2024 with 1.6 GW of new capacity added - the largest increase since 2016, representing a 9.9% capacity boost. The government has approved three major solar farms: Sunnica, Gate Burton, and Mallard Pass, adding a combined 1.4 GW. Nearly 2 GW of nationally significant solar projects have been consented since July 2024.",
    author: "Solar Industry Experts",
    date: "2025-06-30",
    readTime: "3 min read",
    category: "Solar",
    tags: ["Solar Power", "Capacity Growth", "Infrastructure"],
    featured: false,
    image: "/api/placeholder/600/300"
  },
  {
    id: "clean-power-2030-plan",
    title: "Clean Power 2030: Triple Solar Capacity Target Set",
    excerpt: "Government's ambitious Clean Power 2030 Action Plan aims to triple current solar capacity while lifting onshore wind restrictions.",
    content: "The Clean Power 2030 Action Plan, launched in December 2024, sets ambitious targets including tripling current solar capacity by 2030. The plan includes lifting the onshore wind ban in England, establishing Great British Energy to accelerate deployment, and delivering record-breaking renewables auction results. This represents the UK's most aggressive clean energy transition period.",
    author: "Government Affairs",
    date: "2025-06-29",
    readTime: "6 min read",
    category: "Policy",
    tags: ["Government Policy", "2030 Targets", "Clean Energy"],
    featured: false,
    image: "/api/placeholder/600/300"
  },
  {
    id: "offshore-wind-scotland",
    title: "Scotland Powers Ahead with 882 MW Moray West Wind Farm",
    excerpt: "Major offshore wind projects Neart na Gaoithe and Moray West come online, adding significant renewable capacity to Scotland's grid.",
    content: "Scotland continues to lead offshore wind development with the completion of major projects including Neart na Gaoithe (448 MW) and Moray West (882 MW). These projects contribute to the 2.2 GW of total wind capacity added in 2024, split between 1.4 GW offshore and 0.8 GW onshore installations.",
    author: "Offshore Wind Team",
    date: "2025-06-28",
    readTime: "4 min read",
    category: "Wind",
    tags: ["Offshore Wind", "Scotland", "Major Projects"],
    featured: false,
    image: "/api/placeholder/600/300"
  },
  {
    id: "smart-charging-2025",
    title: "Smart EV Charging Set to Become 'The Norm' by 2025",
    excerpt: "Government initiatives aim to make smart charging standard practice, with potential £1,000 annual savings for high-mileage drivers.",
    content: "The UK government is pushing to make smart EV charging 'the norm' by 2025, with focus initially on home and workplace charging before expanding to public infrastructure. High-mileage drivers could save up to £1,000 annually through smart charging technologies. This initiative is part of broader efforts to manage grid capacity as EV adoption accelerates.",
    author: "Smart Grid Analysts",
    date: "2025-06-27",
    readTime: "5 min read",
    category: "EV Charging",
    tags: ["Smart Charging", "Grid Management", "Cost Savings"],
    featured: false,
    image: "/api/placeholder/600/300"
  },
  {
    id: "zev-mandate-update",
    title: "Zero Emission Vehicle Mandate: 22% to 80% by 2030",
    excerpt: "The ZEV mandate requires increasing zero-emission vehicle percentages, with petrol and diesel sales banned by 2030.",
    content: "The Zero Emission Vehicle (ZEV) Mandate requires 22% zero-emission vehicles in 2024, scaling to 80% by 2030 and 100% by 2035. The petrol and diesel sales ban remains confirmed for 2030, though some mandate rules were relaxed following the April 2025 consultation. This policy framework drives the transition to electric mobility.",
    author: "Automotive Policy Team",
    date: "2025-06-26",
    readTime: "4 min read",
    category: "Policy",
    tags: ["ZEV Mandate", "Electric Vehicles", "2030 Ban"],
    featured: false,
    image: "/api/placeholder/600/300"
  },
  {
    id: "battery-storage-growth",
    title: "Home Battery Storage Market Accelerates in 2025",
    excerpt: "Falling battery costs and increased solar adoption drive rapid growth in residential energy storage installations across the UK.",
    content: "The home battery storage market is experiencing unprecedented growth in 2025, driven by falling battery costs and increased solar panel installations. Homeowners are increasingly seeking energy independence and resilience against grid outages. New financing options and government incentives are making battery storage more accessible to UK households.",
    author: "Energy Storage Experts",
    date: "2025-06-25",
    readTime: "4 min read",
    category: "Storage",
    tags: ["Battery Storage", "Home Energy", "Cost Reduction"],
    featured: false,
    image: "/api/placeholder/600/300"
  }
];

const categories = [
  { id: "all", name: "All Posts", icon: Leaf, count: blogPosts.length },
  { id: "Policy", name: "Policy & Government", icon: TrendingUp, count: 3 },
  { id: "Solar", name: "Solar Power", icon: Zap, count: 2 },
  { id: "EV Charging", name: "EV Charging", icon: Car, count: 2 },
  { id: "Wind", name: "Wind Energy", icon: Leaf, count: 1 },
  { id: "Storage", name: "Energy Storage", icon: Home, count: 1 }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="section-apple bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-display text-5xl sm:text-6xl lg:text-7xl text-black mb-6">
              Renewable Energy News
            </h1>
            <p className="text-body text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Stay informed with the latest developments in UK renewable energy, 
              government policy updates, and industry milestones.
            </p>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-apple pl-12 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
                <span className="ml-2 bg-white/20 rounded-full px-2 py-0.5 text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="section-apple">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-headline text-2xl font-semibold text-black mb-8">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="card-apple overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gray-100 rounded-xl mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-600/20 flex items-center justify-center">
                      <div className="text-center">
                        <Leaf className="h-16 w-16 text-blue-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-700">Featured Story</span>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-headline text-xl font-semibold text-black mb-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-body text-gray-600 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(post.date).toLocaleDateString('en-GB')}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="btn-apple w-full">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="section-apple bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-headline text-2xl font-semibold text-black mb-8">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <article key={post.id} className="card-apple hover:shadow-lg transition-all duration-300 apple-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-video bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-green-600/10 flex items-center justify-center">
                    <Leaf className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-headline text-lg font-semibold text-black leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-body text-gray-600 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString('en-GB')}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="btn-apple-secondary w-full text-sm">
                    Read More
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-headline text-xl text-gray-900 mb-2">No articles found</h3>
              <p className="text-body text-gray-600">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-apple bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-display text-4xl lg:text-5xl mb-6">
              Stay Updated
            </h2>
            <p className="text-body text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              Get the latest renewable energy news and policy updates delivered 
              to your inbox every week.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-apple flex-1"
              />
              <button className="btn-apple-blue">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}