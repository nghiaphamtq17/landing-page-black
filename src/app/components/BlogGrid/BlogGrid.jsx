'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useAllBlogStats } from '../../hooks/useBlogStats';
import './bloggrid.css';


// titel, description shortener js vanilla
function blogShortExcerpt(text, maxLength = 100) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  } else {
    return text;
  }
}

const BlogGrid = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');
  const [uniqueTags, setUniqueTags] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 
  const sectionRef = useRef(null);
  const filterRef = useRef(null);

  // Supabase Stats Hook
  const { allStats, loading: statsLoading } = useAllBlogStats();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('/data/bloggrid.json');
        const data = await response.json();
        const tags = [...new Set(data.flatMap(post => post.tags || []))];
        setUniqueTags(tags);
        const sortedPosts = data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
 
          if (sortOrder === 'latest') {
            return dateB - dateA;
          } else {
            return dateA - dateB;
          }
        });
        setBlogPosts(sortedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
 
    loadPosts();
  }, [sortOrder]);

  const handleMouseMove = (e) => {
    if (filterRef.current) {
      const rect = filterRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
     
      setMousePosition({ x, y });
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)));
   
    const matchesTag = selectedTag
      ? post.tags && post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
      : true;
   
    return matchesSearch && matchesTag;
  });

  // Hilfsfunktion für formatierte Zahlen
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div ref={sectionRef} className={`blog-wrapper ${isVisible ? 'visible' : ''}`}>
      {/* Background Elements */}
      <div className="blog-background-grid"></div>
      <div className="blog-floating-orb blog-orb-1"></div>
      <div className="blog-floating-orb blog-orb-2"></div>
      <div className="blog-floating-orb blog-orb-3"></div>

      {/* Hero Header */}
      <div className="blog-hero-section">
        <div className="blog-hero-content">
            <span>Latest Articles</span>
         
          <h1 className="blog-hero-title">
            <span className="blog-title-line">Knowledge</span>
            <span className="blog-title-line gradient">Sharing Hub</span>
          </h1>
         
          <p className="blog-hero-description">
            Discover insights, tutorials, and thoughts on modern development,
            design patterns, and cutting-edge technologies.
          </p>
        </div>
      </div>

      <div className="blog-container">
        {/* Enhanced Filter Section */}
        <div
          ref={filterRef}
          className="blog-filters-card"
          onMouseMove={handleMouseMove}
          style={{
            '--mouse-x': `${mousePosition.x}px`,
            '--mouse-y': `${mousePosition.y}px`
          }}
        >
          <div className="blog-card-glow"></div>
         
          <div className="blog-filters-header">
            <h3 className="blog-filters-title">Find Your Content</h3>
            <p className="blog-filters-subtitle">Filter and search through our articles</p>
          </div>

          <div className="blog-filters-top-row">
            <div className="blog-input-group">
              <div className="blog-search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-search-input"
              />
            </div>
            <div className="blog-select-group">
              <select
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
                className="blog-sort-select"
              >
                <option value="latest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          <div className="blog-tag-section">
            <div className="blog-tag-header">
              <span className="blog-tag-label">Filter by topic:</span>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag('')}
                  className="blog-clear-filter"
                >
                  Clear Filter ✕
                </button>
              )}
            </div>
           
            <div className="blog-tag-filter">
              {uniqueTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`blog-tag-button ${selectedTag.toLowerCase() === tag.toLowerCase() ? 'active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="blog-results-info">
          <span className="blog-results-count">
            {isLoading ? 'Loading...' : `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} found`}
          </span>
          {selectedTag && (
            <span className="blog-active-filter">
              Filtered by: <strong>{selectedTag}</strong>
            </span>
          )}
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="blog-post-card skeleton">
                  <div className="blog-skeleton-image"></div>
                  <div className="blog-skeleton-content">
                    <div className="blog-skeleton-title"></div>
                    <div className="blog-skeleton-text"></div>
                    <div className="blog-skeleton-text short"></div>
                    <div className="blog-skeleton-footer"></div>
                  </div>
                </div>
              ))
            : filteredPosts.map((post, index) => {
                // Hole die aktuellen Stats aus Supabase oder fallback zu JSON
                const currentStats = allStats[post.slug] || { views: 0, likes: 0 };

                return (
                  <article
                    key={post.id}
                    className="blog-post-card"
                    style={{ '--animation-delay': `${index * 0.1}s` }}
                  >
                    <Link href={`/blog/${post.slug}`} className="blog-post-link">
                      <div className="blog-post-image-container">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="blog-post-image"
                        />
                        <div className="blog-post-overlay">
                          <div className="blog-read-indicator">
                            <span>Read Article</span>
                            <div className="blog-arrow-icon">→</div>
                          </div>
                        </div>
                      </div>
                     
                      <div className="blog-post-content">
                        <div className="blog-post-meta">
                          <span className="blog-post-date">{post.date}</span>
                          <span className="blog-post-readtime">{post.readTime} read</span>
                        </div>
                       
                        <h2 className="blog-post-title">{blogShortExcerpt(post.title, 50)}</h2>
                        <p className="blog-post-excerpt">{blogShortExcerpt(post.excerpt, 100)}</p>
                       
                        {post.tags && (
                          <div className="blog-post-tags">
                            {post.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="blog-post-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                       
                        <div className="blog-post-footer">
                          <div className="blog-post-author">
                            <img
                              src={post.authorImage || '/assets/img/blog/author.webp'}
                              alt={post.author}
                              className="blog-post-author-image"
                            />
                            <div>
                              <p className="blog-post-author-name">{post.author}</p>
                            </div>
                          </div>
                         
              <div className="blog-post-stats">
                <div className="blog-post-stat">
                  <EyeIcon />
                  <span>
                    {statsLoading ? '0' : formatNumber(currentStats.views)}
                  </span>
                </div>
                <div className="blog-post-stat">
                  <HeartIcon />
                  <span>
                    {statsLoading ? '0' : formatNumber(currentStats.likes)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
              })}
        </div>

        {/* No Results State */}
        {!isLoading && filteredPosts.length === 0 && (
          <div className="blog-no-results">
            <div className="blog-no-results-icon">📝</div>
            <h3 className="blog-no-results-title">No articles found</h3>
            <p className="blog-no-results-text">
              Try adjusting your search terms or removing filters to see more results.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('');
              }}
              className="blog-reset-filters"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
  </svg>
);

export default BlogGrid;