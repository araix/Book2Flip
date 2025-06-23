/**
 * Book2Flip Theme Configuration
 * 
 * This file centralizes all theme-related settings for the application.
 * Modify these values to easily change the appearance of your flip book.
 */

export const themeConfig = {
  // Font Configuration
  fonts: {
    // Main font used for body text and general content
    body: {
      family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    // Font used for headings, titles, and emphasized text
    heading: {
      family: "'Playfair Display', Georgia, serif",
      weights: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    // Monospace font for code blocks or special sections
    mono: {
      family: "'JetBrains Mono', 'Courier New', monospace",
    },
  },

  // Color Palette
  colors: {
    // Primary brand colors
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407',
    },
    // Secondary/accent colors
    secondary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    // Neutral colors for text, backgrounds, etc.
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
    // Success, warning, error states
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Background Configurations
  backgrounds: {
    // Main app background
    app: {
      gradient: 'from-amber-100 to-orange-100',
      texture: "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23d97706%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      textureOpacity: 0.1,
    },
    // Book cover background
    cover: {
      gradient: 'from-amber-700 to-amber-900',
      pattern: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1%, transparent 1%) top left / 50px 50px',
    },
    // Book page background
    page: {
      color: '#fffbf0',
      texture: "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      textureOpacity: 0.05,
    },
    // Modal backgrounds
    modal: {
      overlay: 'bg-black/60 backdrop-blur-sm',
      content: 'bg-white',
      header: 'bg-gradient-to-r from-amber-600 to-amber-700',
      footer: 'bg-gray-50',
    },
  },

  // Component-specific styling
  components: {
    // Book styling
    book: {
      borderRadius: 'rounded-lg',
      shadow: 'shadow-xl',
      spine: {
        color: 'bg-amber-800',
        width: '1px',
      },
    },
    // Navigation controls
    navigation: {
      buttons: {
        primary: 'bg-amber-600 hover:bg-amber-700 text-white',
        secondary: 'bg-white/80 hover:bg-white text-amber-800',
      },
    },
    // Progress bar
    progressBar: {
      track: 'bg-amber-200/30',
      indicator: 'bg-amber-600',
      height: '4px',
    },
    // Table of contents
    tableOfContents: {
      background: 'bg-white/95 backdrop-blur-md',
      activeItem: 'bg-amber-100 text-amber-900',
      item: 'hover:bg-amber-50',
    },
    // Purchase modal
    purchaseModal: {
      button: 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800',
      infoBox: 'bg-amber-50',
    },
  },

  // Animation settings
  animations: {
    pageTurn: {
      duration: '0.5s',
      easing: 'ease-in-out',
    },
    fadeIn: {
      duration: '0.3s',
      easing: 'ease-out',
    },
    modal: {
      enter: 'animate-in zoom-in-95 duration-300',
      exit: 'animate-out zoom-out-95 duration-200',
    },
  },

  // Responsive breakpoints
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
    wide: '1536px',
  },
};

// Helper function to get a specific theme value
export const getThemeValue = (path: string): any => {
  const keys = path.split('.');
  return keys.reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : undefined;
  }, themeConfig as any);
};

// Export individual theme sections for convenience
export const { fonts, colors, backgrounds, components, animations, breakpoints } = themeConfig;
