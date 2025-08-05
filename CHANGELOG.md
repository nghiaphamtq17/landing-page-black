***********************
*                     *
*    P O R T I F Y    *
*                     *
***********************

# Changelog & Documentation
Beta / Still in Work

Current Problems:
[X] The challenge is integrating PostgreSQL to store and manage like and view counts, while ensuring data security and preventing multiple likes from the same user by utilizing a unique session ID. I'm currently learning APIs and PostgreSQL but am using JSON for now until I'm more experienced. I also have two folders, one called "backend." for this stuff :/
[ ]
[ ]


Note and Todos for myself:
[X] git commit -m "Add backend folder to .gitignore"
[X] Clean the Assets folder
[X] Oranize Css files + add Comments and split it in logical parts
[X] Find better Color Palette
[X] Check out HeroUI maybe useful ?
[X] Improve Mobile Menu and Header alignment
[X] SSR Component pieces
--------------------------

Lookbook:
Updates / Fixes:

0.0.23 - Latest Updates
• Supabase database set up with separate tables: one for portfolio items and one shared table for blog posts and the "You Might Like" section to track likes and views.
• Created a "You Might Like" component that shows related blog posts based on shared tags, or random posts if no matches are found.
• View and like counters are fully functional across portfolio items, blog grid, individual blog posts, and the "You Might Like" section, each connected to the appropriate table.
• Updated the homepage text content
• Improved the glass effect on the landing carousel mouse button, still a work in progress
• Set testimonials section to overflow visible so the blue light shadows in the background are no longer cut off by border size
• Cleaned up the interactive features component by removing unnecessary animations and effects that were too distracting
• improved the portfolio post page and added portfoliopost.json default structure
• Blog title and description shortener #alex

0.0.22 - Previous Updates
• hank God GitHub exists, I deleted my repo and had a panic attack haha
• Changed every Component in Home / layout.js
• Added and improved portfolio page buttons
• Enhanced blog grid layout, cleaner and easier to browse
• Refined the call-to-action section, now more modern and elegant
• Improved testimonial layout and style
• Started working on the skills component
• Cleaned up various parts of the codebase
• Continued work on the single project page
• Added Lucide React icon library is way cleaner and super useful
• Restarted the project to improve it and add new features. Currently, managing everything is challenging due to school and life commitments.
• Testimonials have been updated for a cleaner look but are still not fully functional.
• Project single page view updated: like and view counters improved and a better information list added.


0.0.21 - Previous Updates
• Improved the Skills section design
• Added a new Testimonials design
• Added static numbers for Likes/Views in the Blog Single Card View
• Added some icons for the Skills page – looking for a better solution to display stats, possibly using the WakaTime API, but not just images (not a priority for now)
• Added Related Posts in the single blog view.
• Updated filter design and added an option to order blog posts by newest or oldest.
• Created a better AboutMe Page


0.0.20 - Previous Updates
• Portfolio projects are now dynamically loaded based on the slug from the URL, eliminating the need for separate static pages. The data is centrally stored in a portfolio.json file, simplifying maintenance and expansion. With client-side rendering, static generation, and improved loading states and error handling, the user experience is optimized, and performance is enhanced.
• Updated Favicon
• Updated Skills view with tabs
• Cleaned and improved Landing Page Carousel
• Installed HandBrake software for video performance optimization
• Website is extremely slow – working on performance improvements
• Added Preload design and function to load images, videos, components, and pages in advance
• Removed unnecessary files from the src folder
• Working on an improved Single Card View
• Added a search bar for BlogGrid and search functionality by tags (added tags in JSON). + Fixed minor BlogGrid performance issues.


0.0.19 - Previous Updates

• Holographic Card:
handleMouseMove & handleMouseLeave: Functions properly defined to control 3D effects when moving the mouse or leaving the card.
GSAP Animations: Shine and glare animations with delay and linear effect for smooth movement.
Styling: styleVars dynamically passed to the card’s style attribute to update effects.
• Added Guestbook Via Gisco


0.0.18 - Previous Updates

• Deactivated the mobile/tablet card hover effect  
• Started working on responsive settings for the header in mobile view  
• Adjusted the portfolio page button layout for better responsiveness  
• Made the features section responsive and customized the button design  
• Currently working on a 3D carousel and menu hover design to enhance interactivity and improve the UI/UX experience  
• Refined the code structure, but there’s still more to be done  
• Created a better GitHub repository for archiving and sharing purposes

0.0.17 - Previous Updates

• Developed the audio indicator, dark mode toggle with SVG animation, and a hamburger menu (design improvements to follow)  
• Built the features component  
• Converted the portfolio to React after research revealed that Next.js offers better functionality and performance for the project  
• Selected Next.js for its server-side rendering and routing capabilities, which align with the project’s needs  
• Found the syntax of Next.js familiar and enjoyable, with similarities to my experience with Unity C#—its structure and flow make it easier and more fun to work with  
• Expect protocol updates soon, including improved performance and new features


0.0.16 - Previous Updates

• Started working on the portfolio again
• Cleaned up some CSS and grouped using #regio and #endregio (learned from C#)  
• Renamed the filter to "design," "coding," and "marketing"  
• Added slider transitions and navigation dots  
• Disabled the previous visibility of Holo Effects  
• Deleted the HTML acard2 ID  
• Made the progress bar clickable, and updated the timer functionality  

0.0.15 - Previous Updates

• Updated portfolio holographic effect  
• Added filter with various options  
• Refactored JavaScript code into smaller segments for better readability  
• Cleaned up unnecessary CSS code  
• Enhanced custom cursor and dark-mode script performance  
• Improved performance of hamburger menu (JS/CSS)  
• Added filter bar to the portfolio page  
• Added footer  
• Overall code improvements  

0.0.14 - Previous Updates

• Improved project file management for cleaner organization  
• Split style.css into multiple parts  
• Implemented SASS (learned something new #Newbie)  

0.0.13 - Previous Updates

• Updated cursor functionality: clicking, following, and circle effect  
• Added dark-mode JSON Lottie file with switching functionality  
• Working on updating holographic cards (coming soon)  
• Implemented transparent header with smooth transition  

0.0.12 - Previous Updates

• Improved CSS documentation  
• New landing page slider with dark mode, responsive design, and dot navigation  
• Implemented custom cursor with hide feature  
• Added new GIFs to the landing page  

0.0.11 - Previous Updates

• Integrated Quicksand font locally  
• Added Skills page  
• Included Bootstrap/FontAwesome icons  
• Fixed dark mode on the single card information on the Portfolio page  
• Updated menu text  
• Applied CSS ascending ordering  
• Improved code organization  
• Implemented custom cursor  

0.0.10 - Previous Updates

• New footer design  
• Added simple "About Me" page  
• Implemented loading animation (gsap.min.js with SVG code)  
• Created new gallery for single card  
• Improved header icons position  
• Fixed various bugs  
• Fixed layout for single card  
• Integrated JS scripts locally  
• Added simple lightbox for gallery (single card)  

0.0.9 - New Single Portfolio Page

• Clicking on cards opens /Pages/Cards/Card1.html for detailed information  

0.0.8 - Header Enhancements

• Improved header design and functionality  
• Refined icon positioning  
• Added new logo  
• Fixed spacing/margin/padding issues  
• Added responsive toggle for menu bar  
• Animated menu  
• Logo click now navigates to home  
• Added scale animation  
• Added favicon  
• Implemented sticky header  

0.0.7 - Header Structure / Menu Organization

• Established header structure  
• Organized the menu for intuitive navigation  

0.0.6 - Portfolio Card Design Refinement

• Enhanced the design of portfolio cards for aesthetics and usability  

0.0.5 - Local Font Integration

• Integrated fonts locally for improved performance and design consistency  

0.0.4 - Vanilla JavaScript / Pop-Up and Glare Effect

• Incorporated Vanilla JavaScript for functionality  
• Added pop-up feature and glare effect for enhanced user experience  

0.0.3 - Responsive Card Design

• Implemented responsive design for cards:  
  • Mobile: 2 rows  
  • Tablet: 3 rows  
  • PC: 4 rows  

0.0.2 - GitHub Integration

• Installed GitHub and connected repository  

0.0.1 - Portfolio and Personal Website

• Began the development of the Portfolio/Home section  
• Established the foundational structure of the website and navigated through initial challenges  
• Defined Readme.md as Updates & Logs  
