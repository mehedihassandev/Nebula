export type FeaturedProjectConfig =
  | string
  | { name: string; imgSrc?: string; errorImgSrc?: string; description?: string };

export const featuredProjects: FeaturedProjectConfig[] = [
  {
    name: 'Family-Grocery-List',
    description: '**Purpose**: Built to simplify family grocery shopping through shared, real-time lists.\\n\\n**Problem solved**: Have you ever come home from the store only to realize someone else in your family already bought the exact same items? Or maybe you forgot to buy the one thing your partner asked for? This app completely eliminates duplicate purchases and miscommunication. By providing a shared digital space with real-time Firebase synchronization, multiple family members can view, add, and check off grocery items simultaneously from their own devices, ensuring everyone is always on the same page.',
  },
  { name: 'knock-knock', imgSrc: '/assets/knock_knock.gif' },
  {
    name: 'Nebula',
    description: '**Purpose**: Developed as a highly scalable, futuristic portfolio architecture.\\n\\n**Problem solved**: Traditional portfolios are often static, hard to scale, and require tedious manual updates every time you finish a new project. Nebula solves this maintenance nightmare by providing a highly optimized, modular Next.js structure that dynamically syncs with the GitHub API. It automatically pulls in your latest repositories and displays them in a visually stunning, terminal-inspired interface, meaning your portfolio grows effortlessly as you code.',
  },
  { name: 'tshirt-visualizer', imgSrc: '/assets/t_shirt.gif' },
  {
    name: 'International-Day',
    description: '**Purpose**: Created to celebrate and educate users about International Mother Language Day.\\n\\n**Problem solved**: Reading static historical facts from a standard webpage can feel dry and unengaging for modern audiences. This project transforms cultural education into an engaging digital museum experience. It uses fluid, modern animations to bring historical milestones (like the Language Movement of 1952) and cultural heritage to life, making the learning experience memorable and emotionally resonant for a global audience.',
  },
  {
    name: 'pixel-craft',
    description: '**Purpose**: Engineered as an advanced, AI-powered image processing application.\\n\\n**Problem solved**: Professional image editing often requires expensive desktop software that is difficult to learn and inaccessible on the go. Pixel-craft provides users with a powerful, accessible, browser-based alternative. By leveraging efficient cloud processing, users can transform, optimize, and enhance their images using cutting-edge AI tools directly from their web browser, saving both time and money without sacrificing quality.',
  },
  {
    name: 'dev-environment-setup',
    description: '**Purpose**: Curated to provide a one-click, standardized development environment configuration.\\n\\n**Problem solved**: Setting up a new computer or onboarding a new developer often leads to the dreaded "it works on my machine" problem, wasting hours of valuable time configuring dotfiles, terminal settings, and editor tooling. This repository eliminates that friction. It drastically reduces onboarding time by automating the entire setup process, ensuring a perfectly consistent, highly productive development environment across any machine in minutes.',
  },
  { name: 'movie-site', imgSrc: '/assets/movie.gif' },
  { name: 'portfolio', imgSrc: '/assets/portfolio.gif' },
  {
    name: 'eCommerce-nextjs',
    description: '**Purpose**: Developed as a modern, high-performance e-commerce storefront.\\n\\n**Problem solved**: In the highly competitive online retail space, slow page loads and poor SEO can instantly kill conversion rates and drive customers away. This application addresses those critical business needs by utilizing server-side rendering and a robust headless backend architecture. This ensures lightning-fast navigation, exceptional search engine visibility, and a smooth, reliable shopping experience that keeps customers engaged from browsing to checkout.',
  },
  {
    name: 'e-commerce',
    description: '**Purpose**: Built to demonstrate scalable state management in a complex retail application.\\n\\n**Problem solved**: As e-commerce platforms grow, managing the state of complex features like real-time cart synchronization, dynamic product filtering, and user authentication can quickly become a tangled, bug-prone mess. This project solves those architectural challenges by implementing a highly structured Redux-based architecture. It ensures that the user interface remains snappy and perfectly synchronized, preventing frustrating issues like missing items in the cart or unresponsive filters.',
  },
  {
    name: 'BauhausClock',
    description: '**Purpose**: Designed as a minimalist, aesthetically pleasing digital timepiece.\\n\\n**Problem solved**: Many modern clock widgets are cluttered with unnecessary information, breaking the visual harmony of the user desktop or device screen. This project provides a clean, distraction-free alternative that celebrates the functionalist design principles of the Bauhaus movement. By utilizing precise native graphics, it offers a visually striking yet understated widget that focuses purely on elegant timekeeping.',
  },
  {
    name: 'dnd-gallary',
    description: '**Purpose**: Created to offer an intuitive, drag-and-drop image gallery interface.\\n\\n**Problem solved**: Manually sorting media assets in content management systems often involves clunky "move up" or "move down" buttons, making gallery organization a tedious chore for content creators. This interface dramatically improves the user experience by allowing users to physically pick up and reorder images using fluid, natural drag-and-drop interactions, making content curation feel effortless and satisfying.',
  },
  {
    name: 'shihab-nextjs',
    description: '**Purpose**: Developed as a bespoke, highly optimized personal website.\\n\\n**Problem solved**: Personal branding websites often sacrifice performance for visual flair, resulting in sluggish load times on mobile devices. This project strikes the perfect balance. By carefully leveraging React server components and a lightweight styling framework, it delivers a lightning-fast, accessible user experience that guarantees maximum performance metrics without compromising on a professional, polished aesthetic.',
  }
];
