// Award venues tracked by the application
export const AWARD_VENUES = [
  "BAFTA",
  "Golden Globes",
  "SAG",
  "PGA",
  "DGA",
  "WGA"
];

// Oscar categories tracked by the application
export const OSCAR_CATEGORIES = [
  // Main Categories
  "Best Picture",
  "Directing",
  "Actor in a Leading Role",
  "Actress in a Leading Role",
  "Actor in a Supporting Role",
  "Actress in a Supporting Role",
  "Writing (Original Screenplay)",
  "Writing (Adapted Screenplay)",
  
  // Craft Categories
  "Cinematography",
  "Film Editing",
  "Production Design",
  "Costume Design",
  "Makeup and Hairstyling",
  "Sound",
  "Visual Effects",
  
  // Music Categories
  "Music (Original Score)",
  "Music (Original Song)",
  
  // Feature Categories
  "Animated Feature Film",
  "Documentary Feature",
  "International Feature Film",
  
  // Short Film Categories
  "Documentary Short Film",
  "Animated Short Film",
  "Live Action Short Film"
];

// Nomination categories for portfolio style view
export const NOMINATION_CATEGORIES = [
  "All",
  "Maker",
  "Performer",
  "Creator",
  "Crafter"
];

// Nomination types (for grouping categories)
export const NOMINATION_TYPES: Record<string, string[]> = {
  "Maker": [
    "Best Picture",
    "Directing",
    "Animated Feature Film",
    "Documentary Feature",
    "International Feature Film",
    "Documentary Short Film",
    "Animated Short Film",
    "Live Action Short Film"
  ],
  "Performer": [
    "Actor in a Leading Role",
    "Actress in a Leading Role",
    "Actor in a Supporting Role",
    "Actress in a Supporting Role"
  ],
  "Creator": [
    "Writing (Original Screenplay)",
    "Writing (Adapted Screenplay)",
    "Music (Original Score)",
    "Music (Original Song)"
  ],
  "Crafter": [
    "Cinematography",
    "Film Editing",
    "Production Design",
    "Costume Design",
    "Makeup and Hairstyling",
    "Sound",
    "Visual Effects"
  ]
};

// Current year for Oscar predictions
export const CURRENT_OSCAR_YEAR = 2025;

// Theme colors (using samir.xyz purple)
export const THEME_COLORS = {
  primary: "#8A3FFC",      // Bright Purple
  primaryLight: "#F6F2FF", // Light Purple
  secondary: "#3F51B5",    // Indigo
  accent: "#FF5722",       // Orange
  background: "#1e2638",   // Dark blue background
  backgroundLight: "#2a3548", // Lighter dark blue for cards
  cardBackground: "#2a3548", // Card background color
  text: "#ffffff",         // White text
  textSecondary: "#B4B7BD",// Light gray text
  border: "#404859"        // Border color
};

// App sections
export const APP_SECTIONS = {
  predictions: "Predictive 25",
  history: "History",
  about: "About"
};

// Nomination type descriptions for the UI
export const NOMINATION_TYPE_DESCRIPTIONS = {
  "Maker": "Directors, Producers, and full Film categories",
  "Performer": "Lead & Supporting Actors/Actresses",
  "Creator": "Writers (Screenplays) and Musicians (Score/Song)",
  "Crafter": "Technical artists including Cinematographers, Editors, Production Designers, etc."
};

// Detailed nomination type descriptions for About section
export const NOMINATION_TYPE_DETAILED_DESCRIPTIONS = {
  "Maker": "Directors who guide the creative vision of the film, Producers who oversee the production process, and categories that recognize the overall film achievement.",
  "Performer": "Actors and actresses in both leading and supporting roles who bring characters to life through their performances.",
  "Creator": "Writers who craft original or adapted screenplays, and musicians who compose original scores or songs for films.",
  "Crafter": "Technical artists including Cinematographers (camera work), Editors (film assembly), Production Designers (sets/environments), Costume Designers, Makeup & Hair Artists, Sound Artists, and Visual Effects Artists."
};