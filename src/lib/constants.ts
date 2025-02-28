// Award venues tracked by the application
export const AWARD_VENUES = [
  "BAFTA",
  "Golden Globes",
  "SAG",
  "Critics Choice",
  "PGA",
  "DGA",
  "WGA"
];

// Oscar categories tracked by the application
export const OSCAR_CATEGORIES = [
  "Best Picture",
  "Directing",
  "Actor in a Leading Role",
  "Actress in a Leading Role",
  "Actor in a Supporting Role",
  "Actress in a Supporting Role",
  "Writing (Original Screenplay)",
  "Writing (Adapted Screenplay)",
  "Cinematography",
  "Film Editing",
  "Production Design",
  "Costume Design",
  "Makeup and Hairstyling",
  "Sound",
  "Visual Effects",
  "Music (Original Score)",
  "Music (Original Song)",
  "Animated Feature Film",
  "Documentary Feature",
  "International Feature Film" 
];

// Nomination types (for grouping categories)
export const NOMINATION_TYPES: Record<string, string[]> = {
  "Performer": [
    "Actor in a Leading Role",
    "Actress in a Leading Role",
    "Actor in a Supporting Role",
    "Actress in a Supporting Role"
  ],
  "Creator": [
    "Directing",
    "Writing (Original Screenplay)",
    "Writing (Adapted Screenplay)",
    "Music (Original Score)",
    "Music (Original Song)"
  ],
  "Maker": [
    "Best Picture",
    "Animated Feature Film",
    "Documentary Feature",
    "International Feature Film"
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

// Theme colors
export const THEME_COLORS = {
  primary: "#9C27B0",      // Purple
  secondary: "#03A9F4",    // Blue
  accent: "#FF5722",       // Orange
  background: "#FFFFFF",   // White
  text: "#212121",         // Dark gray
  shadow: "#E0E0E0"        // Light gray
};

// App sections
export const APP_SECTIONS = {
  predictions: "Predictive 25",
  history: "History",
  about: "About"
};

// Nomination type descriptions for the UI
export const NOMINATION_TYPE_DESCRIPTIONS = {
  "Performer": "🎭 Performance categories for acting roles",
  "Creator": "🎬 Creative direction and writing categories",
  "Maker": "🏆 Film production and overall achievement categories",
  "Crafter": "🎨 Technical and artistic craft categories"
};