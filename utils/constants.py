# Define the Oscar categories we're interested in predicting
OSCAR_CATEGORIES = [
    "Best Picture",
    "Actor in a Leading Role",
    "Actress in a Leading Role",
    "Actor in a Supporting Role",
    "Actress in a Supporting Role",
    "Directing",
    "Writing (Original Screenplay)",
    "Writing (Adapted Screenplay)",
    "Cinematography",
    "Film Editing",
    "International Feature Film",
    "Documentary Feature",
    "Animated Feature Film",
    "Visual Effects",
    "Sound",
    "Production Design",
    "Costume Design",
    "Makeup and Hairstyling",
    "Original Score",
    "Original Song"
]

# Define award venues that might predict Oscar winners
AWARD_VENUES = [
    "BAFTA",
    "Golden Globes",
    "Critics Choice",
    "SAG",
    "PGA",
    "DGA",
    "WGA",  # Writers Guild of America
    "ACE",  # American Cinema Editors
    "ASC",  # American Society of Cinematographers
    "ADG",  # Art Directors Guild
    "CDG",  # Costume Designers Guild
    "MUAHS",  # Makeup and Hairstyling Guild
    "MPSE",  # Motion Picture Sound Editors
    "CAS",  # Cinema Audio Society
    "VES",  # Visual Effects Society
    "LAFCA",  # Los Angeles Film Critics Association
    "NYFCC",  # New York Film Critics Circle
    "NBR",  # National Board of Review
    "Cannes",  # Cannes Film Festival
    "Venice",  # Venice Film Festival
    "TIFF",  # Toronto International Film Festival
    "Sundance",  # Sundance Film Festival
    "Spirit",  # Independent Spirit Awards
]

# Define the mapping between Oscar categories and award venues
CATEGORY_MAPPINGS = {
    "Best Picture": [
        "BAFTA:Best Film",
        "Golden Globes:Best Motion Picture – Drama",
        "Golden Globes:Best Motion Picture – Musical or Comedy",
        "Critics Choice:Best Picture",
        "PGA:Outstanding Producer of Theatrical Motion Pictures",
        "SAG:Outstanding Performance by a Cast in a Motion Picture"
    ],
    "Directing": [
        "BAFTA:Director",
        "Golden Globes:Best Director – Motion Picture",
        "Critics Choice:Best Director",
        "DGA:Outstanding Directorial Achievement in Motion Pictures"
    ],
    "Actor in a Leading Role": [
        "BAFTA:Leading Actor",
        "Golden Globes:Best Actor – Motion Picture Drama",
        "Golden Globes:Best Actor – Motion Picture Musical or Comedy",
        "Critics Choice:Best Actor",
        "SAG:Outstanding Performance by a Male Actor in a Leading Role"
    ],
    "Actress in a Leading Role": [
        "BAFTA:Leading Actress",
        "Golden Globes:Best Actress – Motion Picture Drama",
        "Golden Globes:Best Actress – Motion Picture Musical or Comedy",
        "Critics Choice:Best Actress",
        "SAG:Outstanding Performance by a Female Actor in a Leading Role"
    ],
    "Actor in a Supporting Role": [
        "BAFTA:Supporting Actor",
        "Golden Globes:Best Supporting Actor – Motion Picture",
        "Critics Choice:Best Supporting Actor",
        "SAG:Outstanding Performance by a Male Actor in a Supporting Role"
    ],
    "Actress in a Supporting Role": [
        "BAFTA:Supporting Actress",
        "Golden Globes:Best Supporting Actress – Motion Picture",
        "Critics Choice:Best Supporting Actress",
        "SAG:Outstanding Performance by a Female Actor in a Supporting Role"
    ],
    "Writing (Original Screenplay)": [
        "BAFTA:Original Screenplay",
        "Critics Choice:Best Original Screenplay",
        "WGA:Original Screenplay"
    ],
    "Writing (Adapted Screenplay)": [
        "BAFTA:Adapted Screenplay",
        "Critics Choice:Best Adapted Screenplay",
        "WGA:Adapted Screenplay"
    ],
    "Cinematography": [
        "BAFTA:Cinematography",
        "Critics Choice:Best Cinematography",
        "ASC:Feature Film"
    ],
    "Film Editing": [
        "BAFTA:Film Editing",
        "Critics Choice:Best Editing",
        "ACE:Dramatic Feature",
        "ACE:Comedy Feature"
    ]
}
