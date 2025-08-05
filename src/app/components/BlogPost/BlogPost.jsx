// File: BlogPost.jsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useBlogStats } from '../../hooks/useBlogStats';
import BlogGrid from '../BlogGrid/BlogGrid';
import BlogMightLike from '../BlogMightLike/blogmightlike';
import './blogpost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const [viewProcessed, setViewProcessed] = useState(false);

  // Supabase Stats Hook
  const { stats, loading: statsLoading, incrementViews, incrementLikes } = useBlogStats(slug);

  // Lade Aktuelle Blog-Posts aus blogpost.json
  useEffect(() => {
    const loadPostData = async () => {
      try {
        const response = await fetch('/data/blogpost.json');
        const posts = await response.json();
        const selectedPost = posts.find((post) => post.slug === slug);
        setPost(selectedPost || posts[0]);
      } catch (error) {
        console.error('Error loading post data:', error);
      }
    };

    loadPostData();
  }, [slug]);

  // Verbesserte View Counter Logic
  useEffect(() => {
    if (!post || statsLoading || viewProcessed) return;

    const sessionKey = `blog_viewed_${slug}`;
    let hasViewedInSession = false;
    
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        hasViewedInSession = sessionStorage.getItem(sessionKey) === 'true';
      }
    } catch (error) {
      console.warn('SessionStorage not available, using in-memory tracking');
      hasViewedInSession = window.__viewedPosts?.includes(slug) || false;
    }
    
    if (!hasViewedInSession) {
      console.log('Incrementing view for post:', post.slug);
      setViewProcessed(true);
      
      incrementViews().then(() => {
        try {
          if (typeof window !== 'undefined' && window.sessionStorage) {
            sessionStorage.setItem(sessionKey, 'true');
          } else {
            if (!window.__viewedPosts) window.__viewedPosts = [];
            window.__viewedPosts.push(slug);
          }
        } catch (error) {
          console.warn('Could not save view state:', error);
        }
        setHasViewed(true);
      }).catch(error => {
        console.error('Error incrementing views:', error);
        setViewProcessed(false);
      });
    } else {
      setHasViewed(true);
      setViewProcessed(true);
    }
  }, [post, statsLoading, slug, viewProcessed]);

  // Like Handler mit verbesserter Error Handling
  const handleLike = async () => {
    if (hasLiked) return;
    
    try {
      await incrementLikes();
      setHasLiked(true);
      
      // Verwende in-memory storage statt localStorage für bessere Kompatibilität
      if (typeof window !== 'undefined') {
        if (!window.__likedPosts) window.__likedPosts = [];
        window.__likedPosts.push(slug);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // Prüfe ob bereits geliked beim Laden
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.__likedPosts) {
        setHasLiked(window.__likedPosts.includes(slug));
      }
    } catch (error) {
      console.warn('Could not load liked posts:', error);
      setHasLiked(false);
    }
  }, [slug]);

  // Verbesserte "You might also like"-Posts Logik
  useEffect(() => {
    const loadRelatedPosts = async () => {
      try {
        const response = await fetch('/data/bloggrid.json');
        const allPosts = await response.json();
  
        if (!post) return;

        console.log('Current post:', post.title);
        console.log('Current post tags:', post.tags);
  
        // Filtere aktuellen Post aus
        const otherPosts = allPosts.filter((p) => p.slug !== slug);
        console.log('Other posts count:', otherPosts.length);
        
        let relatedByTags = [];
        let randomPosts = [];
        
        // Wenn der aktuelle Post Tags hat, suche ähnliche Posts
        if (post.tags && post.tags.length > 0) {
          relatedByTags = otherPosts
            .filter((p) => {
              if (!p.tags || !Array.isArray(p.tags)) return false;
              const hasCommonTag = p.tags.some((tag) => post.tags.includes(tag));
              if (hasCommonTag) {
                console.log(`Found related post: ${p.title} with tags:`, p.tags);
              }
              return hasCommonTag;
            })
            .sort((a, b) => {
              // Sortiere nach Anzahl gemeinsamer Tags (absteigend)
              const aCommonTags = a.tags.filter(tag => post.tags.includes(tag)).length;
              const bCommonTags = b.tags.filter(tag => post.tags.includes(tag)).length;
              return bCommonTags - aCommonTags;
            });
        }
        
        console.log('Related posts by tags:', relatedByTags.length);
        
        // Fülle mit zufälligen Posts auf, falls nicht genug ähnliche Posts vorhanden
        const remainingPosts = otherPosts.filter(p => !relatedByTags.includes(p));
        randomPosts = remainingPosts
          .sort(() => Math.random() - 0.5) // Zufällige Sortierung
          .slice(0, 4 - relatedByTags.length);
        
        // Kombiniere ähnliche und zufällige Posts (max. 4)
        const finalRelatedPosts = [...relatedByTags, ...randomPosts].slice(0, 4);
        
        console.log('Final related posts:', finalRelatedPosts.map(p => p.title));
        setRelatedPosts(finalRelatedPosts);
      } catch (error) {
        console.error('Error loading related posts:', error);
      }
    };
  
    if (post) {
      loadRelatedPosts();
    }
  }, [post, slug]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = post?.sections || [];
      const scrollPosition = window.scrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="blog-post">
      <header className="header">
        <h1 className="title">{post.title}</h1>
        <div className="author-info">
          <img src={post.authorImage} alt={post.author} className="author-image" />
          <div>
            <p className="author-name">{post.author}</p>
            <p className="publish-date">{post.date}</p>
          </div>
        </div>

        <div className="post-stats">
          <div className="stat-item">
            <span className="stat-label">Read Time</span>
            <span className="stat-number">{post.readTime}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Views</span>
            <span className="stat-number">
              {statsLoading ? '0' : formatNumber(stats.views)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Likes</span>
            <span className="stat-number">
              {statsLoading ? '0' : formatNumber(stats.likes)}
            </span>
            <button 
              onClick={handleLike}
              disabled={hasLiked || statsLoading}
              className={`like-button ${hasLiked ? 'liked' : ''}`}
              style={{
                backgroundColor: hasLiked ? '#ff6b6b' : '#f0f0f0',
                color: hasLiked ? 'white' : '#333',
                cursor: hasLiked ? 'not-allowed' : 'pointer',
                opacity: hasLiked ? 0.7 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {hasLiked ? '❤️ Liked' : '🤍 Like'}
            </button>
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="content">
          {post.content.map((section) => (
            <section
              key={section.sectionId}
              id={section.sectionId}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          ))}
        </div>

        <aside className="table-of-contents">
          <nav>
            <ul>
              {post.sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      scrollToSection(section.id);
                      setActiveSection(section.id);
                    }}
                    className={activeSection === section.id ? 'active' : ''}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      {/* WICHTIG: Hier übergeben wir jetzt die currentPostTags und currentPostSlug */}
      <BlogMightLike 
        relatedPosts={relatedPosts} 
        currentPostTags={post.tags || []}
        currentPostSlug={post.slug}
      />
    </div>
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

export default BlogPost;