'use client';
import React, { useState, useEffect } from "react";
import { Grid3X3, Grid2X2, LayoutGrid, ChevronDown, Filter as FilterIcon, Sparkles, Code, TrendingUp } from "lucide-react";
import './Filter.css';

const Filter = ({ onCategoryChange, onCardTypeChange, onLayoutChange, hasContent = true, isLoading = false, onLoadMore, showLoadMore = false }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRarity, setSelectedRarity] = useState("normal");
  const [activeLayout, setActiveLayout] = useState(1);
  const [isRarityDropdownOpen, setIsRarityDropdownOpen] = useState(false);

  useEffect(() => {
    onCategoryChange(selectedCategory);
  }, [selectedCategory, onCategoryChange]);

  useEffect(() => {
    onLayoutChange(activeLayout);
  }, [activeLayout, onLayoutChange]);

  useEffect(() => {
    onCardTypeChange(selectedRarity);
  }, [selectedRarity, onCardTypeChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.rarity-dropdown')) {
        setIsRarityDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const rarities = [
    { value: "normal", label: "Standard", description: "Regular projects" },
    { value: "rare ultra", label: "Premium", description: "Enhanced features" },
    { value: "ShineBlitz", label: "Spotlight", description: "Featured work" },
    { value: "ShineBlitz2", label: "Spotlight Pro", description: "Premium featured" },
    { value: "radiant", label: "Radiant", description: "Glowing effects" },
    { value: "rare holo", label: "Holographic", description: "3D elements" },
    { value: "rare holo vmax", label: "Holo Max", description: "Maximum impact" },
    { value: "rare rainbow", label: "Rainbow", description: "Colorful design" },
    { value: "rare secret", label: "Secret", description: "Hidden gems" },
    { value: "rare holo v1", label: "Holo V1", description: "Version 1.0" },
    { value: "rare holo vstar", label: "Holo Star", description: "Star quality" },
  ];

  const categories = [
    { 
      value: "all", 
      label: "All Projects", 
      icon: LayoutGrid,
      description: "View everything"
    },
    { 
      value: "Design", 
      label: "Design", 
      icon: Sparkles,
      description: "UI/UX & Visual"
    },
    { 
      value: "Coding", 
      label: "Development", 
      icon: Code,
      description: "Web & Mobile Apps"
    },
    { 
      value: "Marketing", 
      label: "Marketing", 
      icon: TrendingUp,
      description: "Campaigns & Strategy"
    }
  ];

  const layoutOptions = [
    { id: 1, icon: LayoutGrid, label: "Grid" },
    { id: 2, icon: Grid2X2, label: "Cards" },
    { id: 3, icon: Grid3X3, label: "List" }
  ];

  const getSelectedRarity = () => {
    return rarities.find(r => r.value === selectedRarity) || rarities[0];
  };

  const handleRaritySelect = (rarity) => {
    setSelectedRarity(rarity.value);
    setIsRarityDropdownOpen(false);
  };

  const NoContentSection = () => (
    <div className="no-content-section">
      <div className="no-content-container">
        <div className="no-content-icon">
          <TrendingUp size={48} />
        </div>
        <h3 className="no-content-title">No {selectedCategory} Projects Yet</h3>
        <p className="no-content-description">
          We&apos;re currently working on some amazing {selectedCategory.toLowerCase()} projects. 
          Check back soon to see our latest work!
        </p>
        <button 
          className="no-content-button"
          onClick={() => setSelectedCategory("all")}
        >
          View All Projects
        </button>
      </div>
    </div>
  );

  const LoadMoreSection = () => (
    showLoadMore && (
      <div className="load-more-section">
        <button 
          className="load-more-button"
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              Loading...
            </>
          ) : (
            <>
              <LayoutGrid size={18} />
              Load More Projects
            </>
          )}
        </button>
      </div>
    )
  );

  return (
    <>
      <section className="filter-section">
        <div className="filter-container">
          <div className="filter-controls">
            {/* Categories */}
            <div className="filter-group">
              <label className="filter-label">Categories</label>
              <div className="category-buttons">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.value}
                      type="button"
                      className={`category-button ${selectedCategory === category.value ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category.value)}
                      title={category.description}
                    >
                      <IconComponent size={18} />
                      <span className="category-label">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Layout Options */}
            <div className="filter-group">
              <label className="filter-label">Layout</label>
              <div className="layout-buttons">
                {layoutOptions.map((layout) => {
                  const IconComponent = layout.icon;
                  return (
                    <button
                      key={layout.id}
                      type="button"
                      className={`layout-button ${activeLayout === layout.id ? 'active' : ''}`}
                      onClick={() => setActiveLayout(layout.id)}
                      title={layout.label}
                    >
                      <IconComponent size={20} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rarity Dropdown */}
            <div className="filter-group">
              <label className="filter-label">Style Variant</label>
              <div className="rarity-dropdown">
                <button
                  type="button"
                  className={`rarity-trigger ${isRarityDropdownOpen ? 'open' : ''}`}
                  onClick={() => setIsRarityDropdownOpen(!isRarityDropdownOpen)}
                >
                  <span className="rarity-selected">
                    {getSelectedRarity().label}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`chevron ${isRarityDropdownOpen ? 'rotated' : ''}`}
                  />
                </button>
                
                {isRarityDropdownOpen && (
                  <div className="rarity-dropdown-menu">
                    {rarities.map((rarity) => (
                      <button
                        key={rarity.value}
                        type="button"
                        className={`rarity-option ${selectedRarity === rarity.value ? 'selected' : ''}`}
                        onClick={() => handleRaritySelect(rarity)}
                      >
                        <div className="rarity-info">
                          <span className="rarity-name">{rarity.label}</span>
                          <span className="rarity-description">{rarity.description}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No Content Section - wird angezeigt wenn kein Inhalt da ist */}
      {!hasContent && <NoContentSection />}

      {/* Load More Section - wird nach den Projekten angezeigt */}
      <LoadMoreSection />
    </>
  );
};

export default Filter;