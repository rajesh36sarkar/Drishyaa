import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

export const useInfiniteScroll = (endpoint) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get(`${endpoint}?page=${page}&limit=12`);
      const newItems = res.data;
      setItems(prev => [...prev, ...newItems]);
      setHasMore(newItems.length === 12);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more:', error);
    }
    setLoading(false);
  };

  return { items, loading, hasMore, lastItemRef };
};