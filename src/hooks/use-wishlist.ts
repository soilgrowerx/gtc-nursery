'use client';

import { useState, useEffect, useCallback } from 'react';

const WISHLIST_STORAGE_KEY = 'greentree-wishlist';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (stored) {
          setWishlist(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      } catch (error) {
        console.error('Error saving wishlist:', error);
      }
    }
  }, [wishlist]);

  const addToWishlist = useCallback((treeId: string) => {
    setWishlist(prev => {
      if (!prev.includes(treeId)) {
        return [...prev, treeId];
      }
      return prev;
    });
  }, []);

  const removeFromWishlist = useCallback((treeId: string) => {
    setWishlist(prev => prev.filter(id => id !== treeId));
  }, []);

  const toggleWishlist = useCallback((treeId: string) => {
    setWishlist(prev => {
      if (prev.includes(treeId)) {
        return prev.filter(id => id !== treeId);
      } else {
        return [...prev, treeId];
      }
    });
  }, []);

  const isInWishlist = useCallback((treeId: string) => {
    return wishlist.includes(treeId);
  }, [wishlist]);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  return {
    wishlist,
    wishlistCount: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist
  };
}