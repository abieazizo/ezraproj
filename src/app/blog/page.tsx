import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";
import BlogCategoryTabs from "./BlogCategoryTabs";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Expert insights on Dubai real estate: market trends, buying guides, investment strategies, and legal advice from the Shefa Real Estate team.",
  openGraph: {
    title: "Blog & Insights | Shefa Real Estate",
    description:
      "Expert insights on Dubai real estate: market trends, buying guides, investment strategies, and legal advice.",
  },
};

export default function BlogPage() {
  return (
    <>
      {/* Mini Hero */}
      <section className="bg-brand-navy py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-brand-gold uppercase tracking-[0.2em] text-sm font-semibold mb-4">
            Knowledge Center
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Blog &amp; Insights
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Market analysis, buying guides, and expert advice to help you make
            confident property decisions.
          </p>
        </div>
      </section>

      {/* Category Tabs + Blog Grid */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4">
          <BlogCategoryTabs posts={blogPosts} />
        </div>
      </section>
    </>
  );
}
