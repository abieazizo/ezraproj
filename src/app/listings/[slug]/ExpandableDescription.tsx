"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ExpandableDescriptionProps {
  description: string;
}

export default function ExpandableDescription({
  description,
}: ExpandableDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > 300;

  return (
    <div>
      <p
        className={cn(
          "text-brand-slate leading-relaxed",
          !expanded && isLong && "line-clamp-4"
        )}
      >
        {description}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm font-semibold text-brand-gold hover:text-brand-gold-400 transition-colors"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
