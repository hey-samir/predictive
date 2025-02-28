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

// Nomination categories for portfolio style view
export const NOMINATION_CATEGORIES = [
  "All",
  "Makers",
  "Performers",
  "Creators",
  "Crafters"
];

// Nomination types (for grouping categories)
export const NOMINATION_TYPES: Record<string, string[]> = {
  "Makers": [
    "Best Picture",
    "Directing",
    "Animated Feature Film",
    "Documentary Feature",
    "International Feature Film"
  ],
  "Performers": [
    "Actor in a Leading Role",
    "Actress in a Leading Role",
    "Actor in a Supporting Role",
    "Actress in a Supporting Role"
  ],
  "Creators": [
    "Writing (Original Screenplay)",
    "Writing (Adapted Screenplay)",
    "Music (Original Score)",
    "Music (Original Song)"
  ],
  "Crafters": [
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
  background: "#FFFFFF",   // White
  text: "#212121",         // Dark gray
  textSecondary: "#6E6E6E",// Medium gray
  border: "#E6E6E6"        // Light gray
};

// App sections
export const APP_SECTIONS = {
  predictions: "Predictive 25",
  history: "History",
  about: "About"
};

// Nomination type descriptions for the UI
export const NOMINATION_TYPE_DESCRIPTIONS = {
  "Makers": "Directors, Producers, and full Film categories",
  "Performers": "Lead & Supporting Actors/Actresses",
  "Creators": "Writers (Screenplays) and Musicians (Score/Song)",
  "Crafters": "Technical artists including Cinematographers, Editors, Production Designers, etc."
};

// Detailed nomination type descriptions for About section
export const NOMINATION_TYPE_DETAILED_DESCRIPTIONS = {
  "Makers": "Directors who guide the creative vision of the film, Producers who oversee the production process, and categories that recognize the overall film achievement.",
  "Performers": "Actors and actresses in both leading and supporting roles who bring characters to life through their performances.",
  "Creators": "Writers who craft original or adapted screenplays, and musicians who compose original scores or songs for films.",
  "Crafters": "Technical artists including Cinematographers (camera work), Editors (film assembly), Production Designers (sets/environments), Costume Designers, Makeup & Hair Artists, Sound Artists, and Visual Effects Artists."
};