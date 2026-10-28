"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import SectionHeader from "@/components/ui-custom/SectionHeader";
import { blogPosts } from "@/data/blog";
import { staggerContainer, fadeInUp } from "@/lib/animations";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LatestInsights() {
  return (
    <section className="bg-brand-cream py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Blog"
          title="Latest Insights"
          subtitle="Stay informed with expert analysis, market trends, and practical guides from our team."
          action={{ label: "View All Articles", href: "/blog" }}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogPosts.slice(0, 3).map((post, i) => (
            <motion.div key={post.id} variants={fadeInUp} custom={i}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Category badge */}
                <span className="absolute top-3 left-3 bg-brand-gold text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Read time */}
                <div className="flex items-center gap-1.5 text-brand-slate text-xs mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime} min read</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold text-brand-navy line-clamp-2 leading-snug mb-2 group-hover:text-brand-gold transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-brand-slate line-clamp-3 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Author + Date */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Image
                      src={post.author.photo}
                      alt={post.author.name}
                      width={28}
                      height={28}
                      className="rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-brand-navy">
                      {post.author.name}
                    </span>
                  </div>
                  <span className="text-xs text-brand-slate">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>

                {/* Read more */}
                <p className="text-brand-gold text-sm font-semibold mt-4 group-hover:underline">
                  Read More &rarr;
                </p>
              </div>
            </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
