'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import './blogmightlike.css';
import { useAllBlogStats } from '../../hooks/useBlogStats'; // bloggrid hook fetch

const BlogMightLike = ({ relatedPosts = [], currentPostTags = [], currentPostSlug = null }) => {
  const [maxPosts, setMaxPosts] = useState(3); // Default: Desktop = 3
  const { allStats, loading: statsLoading } = useAllBlogStats();

  useEffect(() => {
    const updateMaxPosts = () => {
      if (window.innerWidth < 768) {
        setMaxPosts(4); // Mobile: 4 Posts
      } else {
        setMaxPosts(3); // Desktop: 3 Posts
      }
    };

    updateMaxPosts(); // initial aufrufen
    window.addEventListener('resize', updateMaxPosts);
    return () => window.removeEventListener('resize', updateMaxPosts);
  }, []);

  if (!Array.isArray(relatedPosts) || relatedPosts.length === 0) {
    return null;
  }

  // Verbesserte Tag-Filterung mit Fallback für mindestens maxPosts Anzahl
  const getFilteredAndSortedPosts = () => {
    // Filtere den aktuellen Post aus den Related Posts raus
    const filteredRelatedPosts = currentPostSlug 
      ? relatedPosts.filter(post => post.slug !== currentPostSlug)
      : relatedPosts;

    // Wenn currentPostTags leer ist oder nicht existiert, zeige alle Posts
    if (!Array.isArray(currentPostTags) || currentPostTags.length === 0) {
      console.log('No current post tags, showing all posts');
      return filteredRelatedPosts;
    }

    // Normalisiere currentPostTags (lowercase, trim)
    const normalizedCurrentTags = currentPostTags.map(tag => 
      tag.toLowerCase().trim()
    );

    console.log('Current post tags (normalized):', normalizedCurrentTags);

    // Berechne Relevanz-Score für jeden Post
    const postsWithScore = filteredRelatedPosts.map(post => {
      let score = 0;
      const matchingTags = [];

      if (post.tags && Array.isArray(post.tags)) {
        const normalizedPostTags = post.tags.map(tag => tag.toLowerCase().trim());
        
        normalizedCurrentTags.forEach(currentTag => {
          if (normalizedPostTags.includes(currentTag)) {
            score += 1;
            matchingTags.push(currentTag);
          }
        });
      }

      console.log(`Post "${post.title}" - Score: ${score}, Matching tags:`, matchingTags);

      return {
        ...post,
        relevanceScore: score,
        matchingTags: matchingTags
      };
    });

    // Sortiere nach Relevanz-Score (höchster zuerst)
    const sortedPosts = postsWithScore.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Zeige Posts mit matching tags zuerst, dann andere
    const postsWithMatchingTags = sortedPosts.filter(post => post.relevanceScore > 0);
    const postsWithoutMatchingTags = sortedPosts.filter(post => post.relevanceScore === 0);

    console.log(`Found ${postsWithMatchingTags.length} posts with matching tags`);
    console.log(`Found ${postsWithoutMatchingTags.length} posts without matching tags`);

    // WICHTIGER FIX: Immer eine kombinierte Liste zurückgeben
    // Posts mit matching tags zuerst, dann andere als Auffüllung
    const combinedPosts = [...postsWithMatchingTags, ...postsWithoutMatchingTags];
    
    console.log(`Total combined posts: ${combinedPosts.length}, will show: ${Math.min(maxPosts, combinedPosts.length)}`);
    
    return combinedPosts;
  };

  const filteredPosts = getFilteredAndSortedPosts();
  
  if (filteredPosts.length === 0) {
    return null;
  }

  // Stelle sicher, dass wir immer maxPosts anzeigen (oder alle verfügbaren, falls weniger)
  const shownPosts = filteredPosts.slice(0, maxPosts);

  return (
    <section className="related-posts-section">
      <div className="related-posts-header">
        <h2 className="related-posts-title">You might also like</h2>
        <p className="related-posts-subtitle">
          Discover more articles that might interest you
        </p>
      </div>

      <div className="related-posts-grid">
        {shownPosts.map((related, index) => {
          const currentStats = allStats[related.slug] || { views: 0, likes: 0 };
          
          // Zeige matching tags oder alle tags falls keine matches
          const tagsToShow = related.matchingTags && related.matchingTags.length > 0
            ? related.tags.filter(tag => 
                related.matchingTags.includes(tag.toLowerCase().trim())
              )
            : related.tags?.slice(0, 2) || [];

          return (
            <article
              key={related.id}
              className="related-post-card"
              style={{ '--animation-delay': `${index * 0.1}s` }}
            >
              <Link href={`/blog/${related.slug}`} className="related-post-link">
                <div className="related-post-image-container">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="related-post-image"
                  />
                  <div className="related-post-overlay">
                    <div className="related-read-indicator">
                      <span>Read Article</span>
                      <div className="related-arrow-icon">→</div>
                    </div>
                  </div>
                </div>

                <div className="related-post-content">
                  <div className="related-post-meta">
                    <span className="related-post-date">{related.date}</span>
                    <span className="related-post-readtime">{related.readTime} read</span>
                  </div>

                  <h3 className="related-post-title">{related.title}</h3>
                  <p className="related-post-excerpt">{related.excerpt}</p>

                  {tagsToShow.length > 0 && (
                    <div className="related-post-tags">
                      {tagsToShow.slice(0, 2).map(tag => (
                        <span 
                          key={tag} 
                          className={`related-post-tag ${
                            related.matchingTags && 
                            related.matchingTags.includes(tag.toLowerCase().trim()) 
                              ? 'matching-tag' : ''
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {related.relevanceScore > 0 && (
                        <span className="relevance-indicator">
                          {related.relevanceScore} match{related.relevanceScore > 1 ? 'es' : ''}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="related-post-footer">
                    <div className="related-post-author">
                      <img
                        src={related.authorImage || '/assets/img/blog/author.webp'}
                        alt={related.author}
                        className="related-post-author-image"
                      />
                      <div>
                        <p className="related-post-author-name">{related.author}</p>
                      </div>
                    </div>

                    <div className="related-post-stats">
                      <div className="related-post-stat">
                        <EyeIcon />
                        <span>{statsLoading ? '0' : currentStats.views}</span>
                      </div>
                      <div className="related-post-stat">
                        <HeartIcon />
                        <span>{statsLoading ? '0' : currentStats.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

// Icon Components
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
  </svg>
);

export default BlogMightLike;