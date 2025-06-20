'use client';

import { useState, useEffect, useCallback } from 'react';

const RECENT_TREES_KEY = 'greentree-recent-trees';
const MAX_RECENT_TREES = 5;

export function useRecentTrees() {
  const [recentTrees, setRecentTrees] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(RECENT_TREES_KEY);
        if (stored) {
          setRecentTrees(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading recent trees:', error);
      }
    }
  }, []);

  const addRecentTree = useCallback((treeId: string) => {
    setRecentTrees(prev => {
      const filtered = prev.filter(id => id !== treeId);
      const updated = [treeId, ...filtered].slice(0, MAX_RECENT_TREES);
      
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(RECENT_TREES_KEY, JSON.stringify(updated));
        } catch (error) {
          console.error('Error saving recent trees:', error);
        }
      }
      
      return updated;
    });
  }, []);

  return { recentTrees, addRecentTree };
}