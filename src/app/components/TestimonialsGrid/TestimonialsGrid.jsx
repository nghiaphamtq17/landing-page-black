"use client";

import { useEffect, useState, useRef } from "react";
import { 
  Globe, 
  Palette, 
  Code, 
  ShoppingCart, 
  Settings,
  Grid3X3
} from "lucide-react";
import './TestimonialsGrid.css';

const filterIcons = {
  1: Grid3X3,
  2: Palette,
  3: Globe,
  4: Code,
  5: ShoppingCart,
  6: Settings,
};

const categories = [
  { id: 1, name: "All Projects", icon: Grid3X3 },
  { id: 2, name: "Design & Branding", icon: Palette },
  { id: 3, name: "Websites", icon: Globe },
  { id: 4, name: "Web Applications", icon: Code },
  { id: 5, name: "E-Commerce", icon: ShoppingCart },
  { id: 6, name: "Custom Solutions", icon: Settings },
];

const testimonials = [
  {
    id: 1,
    img: "/assets/img/testimonial/testimonial-07.jpg",
    clientImg: "/assets/img/testimonial/client-logo-07.svg",
    name: "Pierre-Gilles Laurent",
    company: "Binance",
    role: "Senior Product Manager",
    content: "The attention to detail and technical expertise delivered exceeded our expectations. Within just a few hours, we had a professional platform that impressed our entire team and stakeholders.",
    categories: [1, 3],
    rating: 5
  },
  {
    id: 2,
    img: "/assets/img/testimonial/testimonial-02.jpg",
    clientImg: "/assets/img/testimonial/client-logo-02.svg",
    name: "Andrew Kim",
    company: "Samsung",
    role: "Design Director",
    content: "Outstanding work that perfectly captured our brand vision. The solution is not only visually stunning but also incredibly functional. Truly world-class quality.",
    categories: [1, 2],
    rating: 5
  },
  {
    id: 3,
    img: "/assets/img/testimonial/testimonial-05.jpg",
    clientImg: "/assets/img/testimonial/client-logo-05.svg",
    name: "Miriam Evans",
    company: "Cadbury",
    role: "Marketing Lead",
    content: "This has been a game-changer for our marketing operations. The efficiency and quality delivered has transformed how we approach digital campaigns across multiple markets.",
    categories: [1, 3, 6],
    rating: 5
  },
  {
    id: 4,
    img: "/assets/img/testimonial/testimonial-01.jpg",
    clientImg: "/assets/img/testimonial/client-logo-01.svg",
    name: "MaKayla Parker",
    company: "Disney",
    role: "Creative Producer",
    content: "Exceptional creativity combined with technical precision. The deliverables not only met our high standards but elevated our entire digital presence. Truly impressive work.",
    categories: [1, 2, 4],
    rating: 5
  },
  {
    id: 5,
    img: "/assets/img/testimonial/testimonial-09.jpg",
    clientImg: "/assets/img/testimonial/client-logo-09.svg",
    name: "Mary Peterson",
    company: "Ray-Ban",
    role: "Digital Strategy Lead",
    content: "Perfect balance of innovation and usability. The solution requires no technical expertise to manage, yet delivers enterprise-level functionality. Couldn't be happier.",
    categories: [1, 3, 5],
    rating: 5
  },
  {
    id: 6,
    img: "/assets/img/testimonial/testimonial-04.jpg",
    clientImg: "/assets/img/testimonial/client-logo-04.svg",
    name: "Pavel Martinez",
    company: "Canon",
    role: "Product Development Manager",
    content: "Outstanding technical execution that has elevated our digital marketing capabilities. The quality and attention to detail is evident in every aspect of the final product.",
    categories: [1, 4, 6],
    rating: 5
  },
  {
    id: 7,
    img: "/assets/img/testimonial/testimonial-06.jpg",
    clientImg: "/assets/img/testimonial/client-logo-06.svg",
    name: "Eloise Vance",
    company: "Maffell",
    role: "Operations Director",
    content: "Incredibly versatile solution that adapts to our diverse needs. From content management to user engagement, everything works seamlessly. Highly recommended.",
    categories: [1, 4, 6],
    rating: 5
  },
  {
    id: 8,
    img: "/assets/img/testimonial/testimonial-08.jpg",
    clientImg: "/assets/img/testimonial/client-logo-08.svg",
    name: "Danielle Knox",
    company: "Forbes Inc.",
    role: "Technology Editor",
    content: "Elegant simplicity that doesn't compromise on functionality. The minimalist approach combined with powerful features makes this solution stand out in the market.",
    categories: [1, 2, 4],
    rating: 5
  },
  {
    id: 9,
    img: "/assets/img/testimonial/testimonial-03.jpg",
    clientImg: "/assets/img/testimonial/client-logo-03.svg",
    name: "Lucy Davis",
    company: "Rio",
    role: "Creative Director",
    content: "Transformed our entire workflow and creative process. The intuitive design and robust functionality feels like having an additional team member who never rests. Exceptional.",
    categories: [1, 2, 3],
    rating: 5
  },
];

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const gridRef = useRef(null);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === activeCategory || isAnimating) return;
    
    setIsAnimating(true);
    setActiveCategory(categoryId);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const filteredTestimonials = activeCategory === 1 
    ? testimonials 
    : testimonials.filter(testimonial => 
        testimonial.categories.includes(activeCategory)
      );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`testimonial-card__star ${i < rating ? 'testimonial-card__star--filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials" aria-label="Client Testimonials">
      <div className="testimonials__container">
        
        {/* Header Section */}
        <header className="testimonials__header">
          <h2 className="testimonials__title">
            Trusted to Deliver Excellence
          </h2>
          <p className="testimonials__subtitle">
            Empowering businesses with innovative solutions that drive growth, 
            enhance user experience, and create lasting digital impact across industries.
          </p>
        </header>

        {/* Filter Navigation */}
        <nav className="testimonials__filters" aria-label="Project Categories">
          <div className="testimonials__filter-wrapper">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  className={`testimonials__filter-btn ${
                    activeCategory === category.id ? 'testimonials__filter-btn--active' : ''
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                  aria-pressed={activeCategory === category.id}
                  disabled={isAnimating}
                >
                  <IconComponent className="testimonials__filter-icon" size={18} />
                  <span className="testimonials__filter-text">{category.name}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Testimonials Grid */}
        <div 
          className={`testimonials__grid ${isAnimating ? 'testimonials__grid--animating' : ''}`}
          ref={gridRef}
        >
          {filteredTestimonials.map((testimonial, index) => (
            <article 
              key={testimonial.id}
              className="testimonial-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="testimonial-card__inner">
                
                {/* Client Logo */}
                <div className="testimonial-card__logo-wrapper">
                  <img
                    src={testimonial.clientImg}
                    alt={`${testimonial.company} logo`}
                    className="testimonial-card__logo"
                    loading="lazy"
                  />
                </div>

                {/* Rating */}
                <div className="testimonial-card__rating">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Content */}
                <blockquote className="testimonial-card__content">
                  {testimonial.content}
                </blockquote>

                {/* Author Info */}
                <footer className="testimonial-card__author">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="testimonial-card__avatar"
                    loading="lazy"
                  />
                  <div className="testimonial-card__author-info">
                    <cite className="testimonial-card__name">
                      {testimonial.name}
                    </cite>
                    <span className="testimonial-card__role">
                      {testimonial.role}
                    </span>
                    <a 
                      href="#" 
                      className="testimonial-card__company"
                      aria-label={`Visit ${testimonial.company} website`}
                    >
                      {testimonial.company}
                    </a>
                  </div>
                </footer>

              </div>
            </article>
          ))}
        </div>

        {/* Results Counter */}
        <div className="testimonials__counter">
          <span className="testimonials__counter-text">
            Showing {filteredTestimonials.length} of {testimonials.length} testimonials
          </span>
        </div>

      </div>
    </section>
  );
}