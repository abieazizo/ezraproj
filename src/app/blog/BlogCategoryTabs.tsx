"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

const CATEGORIES = [
  "All",
  "Market Trends",
  "Buying Guide",
  "Investment",
  "Legal & Finance",
] as const;

interface BlogCategoryTabsProps {
  posts: BlogPost[];
}

export default function BlogCategoryTabs({ posts }: BlogCategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeCategory === cat
                ? "bg-brand-navy text-white"
                : "bg-white text-brand-navy hover:bg-brand-cream-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Cover Image */}
              <div className="relative h-[200px] overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-gold text-white text-xs font-semibold">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h3 className="font-display text-lg font-bold text-brand-navy line-clamp-2 group-hover:text-brand-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-brand-slate text-sm line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={post.author.photo}
                      alt={post.author.name}
                      width={28}
                      height={28}
                      className="rounded-full object-cover"
                    />
                    <span className="text-xs text-brand-slate">
                      {post.author.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-brand-slate">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min read
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-brand-gold text-xs font-semibold pt-1">
                  Read Article
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-brand-slate text-lg">
            No articles in this category yet. Check back soon!
          </p>
        </div>
      )}
    </>
  );
}
