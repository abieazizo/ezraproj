"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "shefa_wishlist";

function readWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function writeWishlist(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage full or unavailable
  }
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Hydrate from localStorage after mount
  useEffect(() => {
    setWishlist(readWishlist());
  }, []);

  const toggle = useCallback((id: string) => {
    setWishlist((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      writeWishlist(next);
      return next;
    });
  }, []);

  const isWishlisted = useCallback(
    (id: string) => wishlist.includes(id),
    [wishlist]
  );

  const count = wishlist.length;

  return { wishlist, toggle, isWishlisted, count };
}
