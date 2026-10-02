import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  action?: { label: string; href: string };
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  action,
  className,
}: SectionHeaderProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div className={cn("flex flex-col gap-3", alignClass, className)}>
      {eyebrow && (
        <span className="text-brand-gold uppercase tracking-[0.15em] text-xs font-sans font-semibold">
          {eyebrow}
        </span>
      )}

      <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-navy">
        {title}
      </h2>

      <div
        className={cn(
          "w-10 h-[3px] bg-brand-gold",
          align === "center" && "mx-auto"
        )}
      />

      {subtitle && (
        <p
          className={cn(
            "text-brand-slate text-lg max-w-[580px]",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}

      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1.5 text-brand-gold font-semibold text-sm mt-2 hover:text-brand-gold-400 transition-colors"
        >
          {action.label}
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
