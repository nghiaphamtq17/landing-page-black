const preloadAssets = [
  // Bilder

  // Videos
  { type: "video", path: "/assets/videos/sea.mp4" },
  { type: "video", path: "/assets/videos/drift.mp4" },
  { type: "video", path: "/assets/videos/Video2.mp4" },
  { type: "video", path: "/assets/videos/Video3.mp4" },
  { type: "video", path: "/assets/videos/redfire.mp4" },

  // Komponenten (Lazy Load)
  { type: "component", path: () => import("../../components/AboutMe/AboutMe.jsx") },
  { type: "component", path: () => import("../../components/ANewUpdate/ProductNav.jsx") },
  { type: "component", path: () => import("../../components/BlogGrid/BlogGrid.jsx") },
  { type: "component", path: () => import("../../components/AudioIndicator/AudioIndicator.jsx") },
  { type: "component", path: () => import("../../components/Buttons/Button1.jsx") },
  { type: "component", path: () => import("../../components/BlogPost/BlogPost.jsx") },
  { type: "component", path: () => import("../../components/CallToAction/CallToAction.jsx") },
  { type: "component", path: () => import("../PortfolioCarousel/PortfolioCarousel.jsx") },
  { type: "component", path: () => import("../../components/CompanyCarousel/CompanyCarousel.jsx") },
  { type: "component", path: () => import("../../components/DarkModeToggle/DarkModeToggle.jsx") },
  { type: "component", path: () => import("../../components/FeatureInteractive/FeaturesInteractive.jsx") },
  { type: "component", path: () => import("../../components/Features/Features.jsx") },
  { type: "component", path: () => import("../../components/Filter/Filter.jsx") },
  { type: "component", path: () => import("../../components/Footer/Footer.jsx") },
  { type: "component", path: () => import("../../components/HamburgerMenu/HamburgerMenu.jsx") },
  { type: "component", path: () => import("../../components/HolographicCard/HolographicCard.jsx") },
  { type: "component", path: () => import("../../components/LikeButton/LikeButton.jsx") },
  { type: "component", path: () => import("../../components/Logo/Logo.jsx") },
  { type: "component", path: () => import("../../components/Mouse/Mouse.jsx") },
  { type: "component", path: () => import("../../components/Navbar/Navbar.jsx") },
  { type: "component", path: () => import("../../components/NavLinks/NavLinks.jsx") },
  { type: "component", path: () => import("../../components/PortfolioGrid/PortfolioGrid.jsx") },
  { type: "component", path: () => import("../../components/PortfolioPost/PortfolioPost.jsx") },
  { type: "component", path: () => import("../../components/Skills/Skills.jsx") },
  { type: "component", path: () => import("../../components/TextCarousel/TextCarousel.jsx") },

  // Seiten (Lazy Load)
  { type: "page", path: () => import("../../blog/page.jsx") },
  { type: "page", path: () => import("../../portfolio/page.jsx") },
  { type: "page", path: () => import("../../guestbook/page.jsx") },
];

export default preloadAssets;
