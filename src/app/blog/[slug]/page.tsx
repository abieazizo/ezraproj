import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, Share2, ExternalLink, Link2 } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { listings } from "@/data/listings";
import PropertyCard from "@/components/ui-custom/PropertyCard";
import { format } from "date-fns";

interface PageProps {
  params: { slug: string };
}

function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Shefa Real Estate Blog`,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  const latestListings = listings.slice(0, 3);

  const shareUrl = `https://shefa.ae/blog/${post.slug}`;

  return (
    <>
      {/* Hero Header */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-10 w-full">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-white/70 text-sm hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-gold text-white text-xs font-semibold mb-3">
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Article (70%) */}
            <article className="w-full lg:w-[70%]">
              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Image
                    src={post.author.photo}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-brand-slate">
                      {post.author.title}
                    </p>
                  </div>
                </div>
                <span className="w-px h-6 bg-gray-200 hidden sm:block" />
                <span className="flex items-center gap-1 text-sm text-brand-slate">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                </span>
                <span className="flex items-center gap-1 text-sm text-brand-slate">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </span>
              </div>

              {/* Article Body */}
              <div
                className="prose prose-lg prose-slate max-w-none
                  prose-headings:font-display prose-headings:text-brand-navy
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-brand-slate prose-p:leading-relaxed
                  prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-brand-navy
                  prose-ul:text-brand-slate prose-ol:text-brand-slate
                  prose-li:marker:text-brand-gold
                  prose-blockquote:border-l-brand-gold prose-blockquote:bg-brand-cream prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
                  prose-blockquote:text-brand-navy prose-blockquote:font-display
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-brand-gold" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-brand-cream text-brand-navy text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm font-medium text-brand-navy flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" />
                  Share
                </span>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  className="w-9 h-9 rounded-full bg-brand-cream flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
                  aria-label="Share on Facebook"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  className="w-9 h-9 rounded-full bg-brand-cream flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Share2 className="w-4 h-4" />
                </Link>
                <Link
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  className="w-9 h-9 rounded-full bg-brand-cream flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Link2 className="w-4 h-4" />
                </Link>
              </div>

              {/* Author Bio */}
              <div className="mt-10 bg-brand-cream rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-start">
                <Image
                  src={post.author.photo}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider mb-1">
                    Written by
                  </p>
                  <p className="font-display text-lg font-bold text-brand-navy">
                    {post.author.name}
                  </p>
                  <p className="text-brand-slate text-sm">{post.author.title}</p>
                  <p className="text-brand-slate text-sm mt-2">
                    A seasoned real estate professional with deep expertise in
                    the Dubai property market. Committed to providing
                    data-driven insights that help clients make informed
                    decisions.
                  </p>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-display text-2xl font-bold text-brand-navy mb-6">
                    Related Articles
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.id}
                        href={`/blog/${rp.slug}`}
                        className="group flex gap-4 bg-brand-cream rounded-xl p-4 hover:shadow-card transition-all duration-300"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={rp.coverImage}
                            alt={rp.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-brand-navy line-clamp-2 group-hover:text-brand-gold transition-colors">
                            {rp.title}
                          </h4>
                          <p className="text-xs text-brand-slate mt-1">
                            {rp.readTime} min read
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar (30%) */}
            <aside className="w-full lg:w-[30%]">
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* Author Card */}
                <div className="bg-brand-cream rounded-xl p-6 text-center">
                  <Image
                    src={post.author.photo}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover mx-auto mb-3"
                  />
                  <p className="font-display text-lg font-bold text-brand-navy">
                    {post.author.name}
                  </p>
                  <p className="text-brand-slate text-sm">{post.author.title}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-block px-5 py-2 bg-brand-gold text-white rounded-full text-sm font-semibold hover:bg-brand-gold-400 transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>

                {/* Latest Listings */}
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-navy mb-4">
                    Latest Listings
                  </h3>
                  <div className="space-y-3">
                    {latestListings.map((listing) => (
                      <PropertyCard
                        key={listing.id}
                        property={listing}
                        variant="compact"
                      />
                    ))}
                  </div>
                </div>

                {/* Related Posts Sidebar */}
                {relatedPosts.length > 0 && (
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand-navy mb-4">
                      More to Read
                    </h3>
                    <div className="space-y-3">
                      {relatedPosts.map((rp) => (
                        <Link
                          key={rp.id}
                          href={`/blog/${rp.slug}`}
                          className="group block bg-white rounded-xl p-3 shadow-card hover:shadow-card-lg transition-shadow"
                        >
                          <h4 className="text-sm font-semibold text-brand-navy line-clamp-2 group-hover:text-brand-gold transition-colors">
                            {rp.title}
                          </h4>
                          <p className="text-xs text-brand-slate mt-1">
                            {rp.category} &middot; {rp.readTime} min read
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
