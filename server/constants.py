"""Constants used throughout the application."""

# Current Oscar year
CURRENT_OSCAR_YEAR = 2025

# Award venues that we track
AWARD_VENUES = [
    "BAFTA",
    "Golden Globes",
    "Critics Choice",
    "SAG",
    "PGA",
    "DGA"
]

# Oscar categories that we track
OSCAR_CATEGORIES = [
    "Best Picture",
    "Best Director",
    "Best Actor",
    "Best Actress",
    "Best Supporting Actor",
    "Best Supporting Actress",
    "Best Original Screenplay",
    "Best Adapted Screenplay",
    "Best Cinematography",
    "Best Film Editing",
    "Best International Feature Film",
    "Best Animated Feature",
    "Best Documentary Feature",
    "Best Visual Effects",
    "Best Production Design",
    "Best Costume Design",
    "Best Makeup and Hairstyling",
    "Best Sound",
    "Best Original Score",
    "Best Original Song"
]

# Nomination types
NOMINATION_TYPES = {
    "Performer": [
        "Best Actor",
        "Best Actress",
        "Best Supporting Actor",
        "Best Supporting Actress"
    ],
    "Creator": [
        "Best Director",
        "Best Original Screenplay",
        "Best Adapted Screenplay"
    ],
    "Maker": [
        "Best Picture",
        "Best International Feature Film",
        "Best Animated Feature",
        "Best Documentary Feature"
    ],
    "Crafter": [
        "Best Cinematography",
        "Best Film Editing",
        "Best Visual Effects",
        "Best Production Design",
        "Best Costume Design",
        "Best Makeup and Hairstyling",
        "Best Sound",
        "Best Original Score",
        "Best Original Song"
    ]
}

# Theme colors
THEME_COLORS = {
    "primary": "#8A3FFC",
    "secondary": "#4CAF50",
    "background": "#1e2638",
    "card_background": "#1a2136",
    "text": "#ffffff",
    "text_secondary": "#e0e0e0",
    "border": "#2d3652"
}

# App sections
APP_SECTIONS = {
    "predictive_25": "Predictive 25",
    "history": "History",
    "about": "About"
}

# Nomination type descriptions
NOMINATION_TYPE_DESCRIPTIONS = {
    "Performer": "🎭 Performance categories for acting roles",
    "Creator": "🎬 Creative direction and writing categories",
    "Maker": "🏆 Film production and overall achievement categories",
    "Crafter": "🎨 Technical and artistic craft categories"
}

# Detailed descriptions for nomination types
NOMINATION_TYPE_DETAILED_DESCRIPTIONS = {
    "Performer": """
    Performance categories recognize the art of acting. These awards honor actors and actresses 
    who bring characters to life through their performances, embodying the emotional depth and 
    authenticity required for compelling storytelling.
    """,
    "Creator": """
    Creator categories celebrate the visionary minds behind films. These awards recognize directors 
    and writers who shape the overall narrative, tone, and artistic vision of a film, translating 
    ideas and scripts into cohesive cinematic experiences.
    """,
    "Maker": """
    Maker categories acknowledge the collaborative achievement of filmmaking. These awards honor 
    producers and production teams who oversee the entire filmmaking process, from concept to 
    completion, and films that represent significant achievements in their genres.
    """,
    "Crafter": """
    Crafter categories highlight the technical and artistic specialties that bring films to life. 
    These awards recognize the experts who create the visual aesthetics, sound design, special 
    effects, and other technical aspects that enhance storytelling and audience immersion.
    """
}