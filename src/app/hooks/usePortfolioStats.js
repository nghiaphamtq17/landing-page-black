'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const usePortfolioStats = (slug) => {
  const [stats, setStats] = useState({ views: 0, likes: 0 });
  const [loading, setLoading] = useState(true);

  // Lade Stats beim ersten Render
  useEffect(() => {
    if (slug) {
      loadStats();
    }
  }, [slug]);

  const loadStats = async () => {
    try {
      let { data, error } = await supabase
        .from('portfolio_stats')
        .select('views, likes')
        .eq('slug', slug)
        .single();

      if (error && error.code === 'PGRST116') {
        // Post existiert noch nicht, erstelle ihn mit 0 Werten
        const { data: newData, error: insertError } = await supabase
          .from('portfolio_stats')
          .insert([{
            slug,
            views: 0,
            likes: 0,
            created_at: now,
            updated_at: now
          }])
          .select('views, likes')
          .single();

        if (insertError) {
          console.error('Error creating portfolio stats:', insertError);
          setStats({ views: 0, likes: 0 });
          setLoading(false);
          return;
        }
        data = newData;
      } else if (error) {
        console.error('Error loading portfolio stats:', error);
        setStats({ views: 0, likes: 0 });
        setLoading(false);
        return;
      }

      setStats(data || { views: 0, likes: 0 });
    } catch (error) {
      console.error('Error in loadStats:', error);
      setStats({ views: 0, likes: 0 });
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async () => {
    try {
      console.log('Incrementing views for portfolio slug:', slug);
      
      // Verwende direkte Upsert-Methode statt RPC für bessere Zuverlässigkeit
      const { data: currentData, error: selectError } = await supabase
        .from('portfolio_stats')
        .select('views, likes')
        .eq('slug', slug)
        .single();

      let newViews = 1;
      let currentLikes = 0;

      if (!selectError && currentData) {
        newViews = (currentData.views || 0) + 1;
        currentLikes = currentData.likes || 0;
      }

      // Upsert: Update wenn existiert, Insert wenn nicht
      const { data: upsertData, error: upsertError } = await supabase
        .from('portfolio_stats')
        .upsert({
          slug: slug,
          views: newViews,
          likes: currentLikes,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'slug',
          ignoreDuplicates: false
        })
        .select('views, likes')
        .single();

      if (upsertError) {
        console.error('Error upserting portfolio views:', upsertError);
        return await incrementViewsRPC();
      }

      console.log('Portfolio views incremented successfully:', upsertData);
      setStats(upsertData);

    } catch (error) {
      console.error('Error in incrementViews:', error);
      await incrementViewsRPC();
    }
  };

  // Fallback RPC-Methode
  const incrementViewsRPC = async () => {
    try {
      const { data, error } = await supabase.rpc('increment_portfolio_views', {
        post_slug: slug
      });

      if (error) {
        console.error('RPC Error incrementing portfolio views:', error);
        await loadStats();
        return;
      }

      if (data && Array.isArray(data) && data.length > 0) {
        setStats({
          views: data[0].views,
          likes: data[0].likes
        });
      } else if (data && !Array.isArray(data)) {
        setStats({
          views: data.views,
          likes: data.likes
        });
      } else {
        await loadStats();
      }
    } catch (error) {
      console.error('Error in RPC fallback:', error);
      await loadStats();
    }
  };

  const incrementLikes = async () => {
    try {
      console.log('Incrementing likes for portfolio slug:', slug);
      
      // Verwende direkte Upsert-Methode
      const { data: currentData, error: selectError } = await supabase
        .from('portfolio_stats')
        .select('views, likes')
        .eq('slug', slug)
        .single();

      let currentViews = 0;
      let newLikes = 1;

      if (!selectError && currentData) {
        currentViews = currentData.views || 0;
        newLikes = (currentData.likes || 0) + 1;
      }

      const { data: upsertData, error: upsertError } = await supabase
        .from('portfolio_stats')
        .upsert({
          slug: slug,
          views: currentViews,
          likes: newLikes,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'slug',
          ignoreDuplicates: false
        })
        .select('views, likes')
        .single();

      if (upsertError) {
        console.error('Error upserting portfolio likes:', upsertError);
        return await incrementLikesRPC();
      }

      console.log('Portfolio likes incremented successfully:', upsertData);
      setStats(upsertData);

    } catch (error) {
      console.error('Error in incrementLikes:', error);
      await incrementLikesRPC();
    }
  };

  // Fallback RPC-Methode für Likes
  const incrementLikesRPC = async () => {
    try {
      const { data, error } = await supabase.rpc('increment_portfolio_likes', {
        post_slug: slug
      });

      if (error) {
        console.error('RPC Error incrementing portfolio likes:', error);
        await loadStats();
        return;
      }

      if (data && Array.isArray(data) && data.length > 0) {
        setStats({
          views: data[0].views,
          likes: data[0].likes
        });
      } else if (data && !Array.isArray(data)) {
        setStats({
          views: data.views,
          likes: data.likes
        });
      } else {
        await loadStats();
      }
    } catch (error) {
      console.error('Error in RPC fallback:', error);
      await loadStats();
    }
  };

  return {
    stats,
    loading,
    incrementViews,
    incrementLikes,
    refreshStats: loadStats
  };
};