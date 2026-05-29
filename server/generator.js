/**
 * Atlas Travel Planner - Server-Side Cinematic Generator
 * Compiles deeply personalized, sensory-rich travel itineraries.
 */

// Import static databases (in a real app, this could also call an external LLM/AI model)
const AtlasData = {
  curated: {
    tokyo: {
      name: "Tokyo",
      tagline: "Neon Rivers & Sacred Silence",
      country: "Japan",
      themeClass: "theme-tokyo",
      coordinates: "35.6762° N, 139.6503° E",
      bestTime: "Late March to April (Sakura Bloom) or November (Golden Gingko Leaves)",
      baseVibe: "A breathtaking collision of hyper-futurism and ancient quietude.",
      
      budgetTiers: {
        budget: {
          stay: "Nihonbashi Capsule & Social Hostels — sleek, architect-designed micro-spaces with warm pine wood and reading corners.",
          budgetEstimate: { flights: 650, lodging: 280, dining: 180, activities: 120, transit: 60 }
        },
        comfort: {
          stay: "Hotel 1899 Tokyo — a tea-themed sanctuary in Shimbashi, where rooms smell faintly of green tea and overlook quiet alleys.",
          budgetEstimate: { flights: 950, lodging: 750, dining: 450, activities: 300, transit: 100 }
        },
        luxury: {
          stay: "Aman Tokyo — a serene sky sanctuary high above Otemachi, featuring black basalt baths, shoji paper screens, and Mount Fuji views.",
          budgetEstimate: { flights: 2400, lodging: 4500, dining: 1200, activities: 900, transit: 350 }
        }
      },

      itinerary: [
        {
          day: 1,
          title: "Neon Rain & Golden Lanterns",
          description: "Arrive in the city as dusk falls, painting the towering glass canyons in shades of violet and cobalt. Check into your sanctuary and prepare to step into a different pacing of life.",
          schedule: [
            { time: "09:00 AM", activity: "Meiji Jingu Shrine", detail: "Walk the gravel paths beneath 100-year-old cedar trees. The sound of Tokyo fades away instantly, replaced by the rustle of leaves and the low chime of wooden prayer tablets." },
            { time: "02:00 PM", activity: "Aoyama Café Crawl", detail: "Discover café culture tucked inside residential backstreets. Watch baristas pull espresso shots with laboratory precision in glass-walled minimalist bars." },
            { time: "06:30 PM", activity: "Omoide Yokocho", detail: "Dine under glowing red paper lanterns in narrow alleys. Sip warm sake in a wooden counter bar that seats only four people, listening to the soft sizzle of yakitori." }
          ]
        },
        {
          day: 2,
          title: "The Architecture of Zen",
          description: "Dedicate your day to the harmonious lines of traditional Japanese design and the elegant simplicity of modern art museums.",
          schedule: [
            { time: "08:00 AM", activity: "Tsukiji Outer Market", detail: "Eat warm tamagoyaki (sweet egg omelet) and fresh sea urchin from family-owned wooden stalls operating for generations." },
            { time: "11:30 AM", activity: "Nezu Museum & Gardens", detail: "Walk the stone pathways of a private garden hidden behind a bamboo screen wall. Reflect on ancient ceramics beside moss-covered stone lanterns." },
            { time: "04:00 PM", activity: "Sunset over Shibuya Crossing", detail: "Observe the organized chaos from a quiet library-café on the upper floors, watching thousands of stories cross paths under a pink sky." }
          ]
        },
        {
          day: 3,
          title: "Subcultural Mists & Vintage Vinyl",
          description: "Step into the slower-paced, vintage neighborhoods of western Tokyo, where creators and collectors set the tempo.",
          schedule: [
            { time: "10:00 AM", activity: "Yanaka Neighborhood", detail: "Wander through one of Tokyo's oldest districts. Elderly locals sweep wooden doorsteps, and small independent artisans paint hand-made paper umbrellas." },
            { time: "02:00 PM", activity: "Shimokitazawa Backstreets", detail: "Browse curated second-hand clothing boutiques, independent bookstores, and dusty vinyl record shops smelling of aged paper." },
            { time: "08:00 PM", activity: "Shinjuku Jazz Kissaten", detail: "Spend your final evening in a dark, wood-paneled 'kissaten' (jazz café) where the owner plays old records on a massive vintage horn speaker system." }
          ]
        }
      ],

      food: [
        {
          name: "Chacha Koubou (Nishi-Waseda)",
          type: "Teahouse & Sweets",
          atmosphere: "A quiet wooden house tucked away from the main road. The interior is filled with soft acoustic guitar and the scent of roasting hojicha tea."
        },
        {
          name: "Afuri Ramen (Harajuku)",
          type: "Yuzu Shio Ramen",
          atmosphere: "Sleek stainless steel counter where chefs hand-blow charcoal embers. The broth is light, infused with fresh Japanese citrus (yuzu), clean and revitalizing."
        },
        {
          name: "Bar Benfiddich (Shinjuku)",
          type: "Botanical Cocktail Bar",
          atmosphere: "No menu. The alchemist bartender mixes elixirs using fresh herbs, roots, and spices grown on his family farm, served in a dark apothecary-like setting."
        }
      ],

      hiddenGems: [
        {
          name: "Todoroki Valley",
          vibe: "A lush, jungle-like ravine hidden completely inside the urban boundaries of southern Tokyo. You walk along a wooden deck next to a bubbling stream, hearing cicadas and looking up at concrete bridges towering hundreds of feet above."
        },
        {
          name: "Daikanyama T-Site",
          vibe: "An architectural masterpiece dedicated to books, design, and music. Sit in the library lounge under soft lighting, surrounded by rare vintage magazines and sipping freshly brewed drip coffee."
        }
      ],

      photoSpots: [
        { location: "Shinjuku Alleyways (Dusk)", description: "Position yourself at the entrance of Omoide Yokocho just as the lanterns light up, capturing the contrast between neon signs and rising steam." },
        { location: "Meiji Shrine Torii Gate (Golden Hour)", description: "Shoot through the massive wooden cypress pillars as rays of warm light pierce the dense forest canopy." }
      ],

      tips: [
        { title: "The Silent Carriage", detail: "Trains are sacred spaces of silence. Avoid talking or phone calls; download your playlists beforehand and let the city slide past your window silently." },
        { title: "Cash is King", detail: "Keep a small, beautiful coin purse on you. Many of the oldest, most authentic wooden dining bars and temple stalls only accept cash." }
      ],

      memoryHighlight: {
        title: "A Quiet Rain in Shinjuku Gyoen",
        description: "It is late afternoon, and a soft, misty rain begins to fall over Shinjuku Gyoen. You seek shelter inside a traditional wooden tea pavilion beside a quiet pond. As you hold a warm ceramic bowl of matcha, you watch water droplets ripple across the surface of the green water. Across the pond, the massive skyscrapers of Shinjuku loom like sleeping giants in the fog, completely silent. In this single breath, the frantic energy of the world's largest metropolis dissolves into absolute, cinematic stillness. You smell wet cedar and damp earth, holding onto a warmth that stays with you long after you leave."
      }
    },

    paris: {
      name: "Paris",
      tagline: "Golden Mists & Café Philosophy",
      country: "France",
      themeClass: "theme-paris",
      coordinates: "48.8566° N, 2.3522° E",
      bestTime: "October (Crisp autumn leaves along the Seine) or May (Blooming chestnut trees)",
      baseVibe: "A poetic tapestry of golden light, literary ghosts, and slow-paced sensory indulgence.",

      budgetTiers: {
        budget: {
          stay: "Les Piaules Belleville — an artfully restored boutique hostel with rooftop views of the Sacré-Cœur and a cozy fireplace lounge.",
          budgetEstimate: { flights: 550, lodging: 250, dining: 200, activities: 90, transit: 45 }
        },
        comfort: {
          stay: "Hotel Caron de Beaumarchais — a theatrical Marais hotel styled like an 18th-century private home, complete with antique harpsichords.",
          budgetEstimate: { flights: 850, lodging: 800, dining: 500, activities: 250, transit: 80 }
        },
        luxury: {
          stay: "L'Hôtel (Saint-Germain) — Paris's smallest five-star gem, where Oscar Wilde lived his final days, featuring private vaulted pool caves.",
          budgetEstimate: { flights: 2200, lodging: 3800, dining: 1400, activities: 800, transit: 250 }
        }
      },

      itinerary: [
        {
          day: 1,
          title: "The Slow Awakening of the Seine",
          description: "Arrive in Paris and immediately drop to the local tempo. The key to Paris is not checking boxes, but allowing yourself to drift.",
          schedule: [
            { time: "08:30 AM", activity: "Canal Saint-Martin Morning", detail: "Sit at a quiet corner café near Canal Saint-Martin, where locals read newspapers slowly and the city wakes up gently around you over fresh croissants." },
            { time: "01:00 PM", activity: "The Bookstores of the Marais", detail: "Browse antique bookstands along the riverbank (Bouquinistes) and duck into hidden courtyard galleries smelling of beeswax and oil paint." },
            { time: "07:00 PM", activity: "Bistrot Dining", detail: "Dine in a classic wood-paneled bistro. Order steak frites and house red wine served in heavy glass carafes under low incandescent lighting." }
          ]
        },
        {
          day: 2,
          title: "Chasing Literary Shadows",
          description: "Walk the paths of the writers, artists, and dreamers who defined the bohemian heart of Paris.",
          schedule: [
            { time: "09:00 AM", activity: "Jardin du Luxembourg", detail: "Pull up a green metal chair near the Medici Fountain. Watch children sail wooden boats and elders play chess under the shade of ancient chestnut trees." },
            { time: "02:00 PM", activity: "Shakespeare and Company", detail: "Explore the cramped, book-lined rooms upstairs. Listen to an anonymous traveler play a slow waltz on the dusty upright piano." },
            { time: "08:00 PM", activity: "Jazz Nocturne", detail: "Descend the stone steps of a medieval vaulted cellar in Saint-Germain-des-Prés, where brassy bebop jazz echoes off damp stone walls." }
          ]
        },
        {
          day: 3,
          title: "The Golden Heights of Montmartre",
          description: "Ascend the winding stone steps to Montmartre, avoiding the tourist squares to find the quiet vineyards and cobblestones.",
          schedule: [
            { time: "09:00 AM", activity: "Vignes de Montmartre", detail: "Walk the steep, ivy-walled streets behind the basilica. View the tiny, hidden vineyard that tourists rarely notice, soaking in quiet provincial vibes." },
            { time: "03:00 PM", activity: "Musée de l'Orangerie", detail: "Sit in the oval rooms designed by Monet himself, completely enveloped by his massive water lilies panels under natural filtered skylight." },
            { time: "09:00 PM", activity: "The Eiffel Beacon", detail: "Walk along the Pont de Bir-Hakeim at night. Watch the Eiffel Tower burst into thousands of glittering lights, reflecting across the dark, ripples of the Seine." }
          ]
        }
      ],

      food: [
        {
          name: "Café de Flore (Saint-Germain)",
          type: "Classic Café & Hot Chocolate",
          atmosphere: "Steeped in intellectual history. Order the ultra-thick 'chocolat chaud' served in silver pitchers and watch Parisian street fashion parade past your sidewalk table."
        },
        {
          name: "Le Comptoir de La Gastronomie",
          type: "Traditional French Bistro",
          atmosphere: "Warm, bustling interior with white aproned waiters. The rich French onion soup topped with deeply browned Gruyère cheese is legendary."
        },
        {
          name: "L'As du Fallafel (Marais)",
          type: "Street Food",
          atmosphere: "Lively, fast-paced street queue in the historic Jewish quarter. The warm pita stuffed with crispy, herb-packed falafel and smoky eggplant is world-class."
        }
      ],

      hiddenGems: [
        {
          name: "Musée de la Vie Romantique",
          vibe: "A quiet, green-shuttered villa hidden at the end of a cobblestone alley in Pigalle. It features a secret greenhouse café surrounded by blooming roses where you can write or read undisturbed."
        },
        {
          name: "Passage des Panoramas",
          vibe: "A glass-roofed 19th-century arcade lined with vintage stamp shops, old theaters, and tiny modern wine bars. It feels like stepping straight into a time machine."
        }
      ],

      photoSpots: [
        { location: "Rue de l'Abreuvoir, Montmartre (Dawn)", description: "Capture the winding cobblestones, pink ivy-clad villa, and Sacré-Cœur dome rising in the morning mist before the crowds arrive." },
        { location: "Medici Fountain, Luxembourg Gardens (Afternoon)", description: "Shoot the long reflective water basin framed by overhanging golden autumn leaves and weathered stone statues." }
      ],

      tips: [
        { title: "The 'Bonjour' Rule", detail: "Never enter a boutique, café, or taxi without saying 'Bonjour, Monsieur/Madame' first. It is the magic key that unlocks French warmth." },
        { title: "The Art of Flânerie", detail: "To 'flâner' is to stroll aimlessly. Put your map away for at least two hours a day, turn down alleys that look appealing, and let Paris reveal itself." }
      ],

      memoryHighlight: {
        title: "Sunset on Pont des Arts",
        description: "You stand at the center of the wooden pedestrian bridge Pont des Arts. The sun is melting into the Seine, painting the sky in brushstrokes of dusty rose and gold. Nearby, a young cellist begins to play a soft Bach suite. The deep, resonance of the strings blends with the distant laughter of students sharing wine on the stone banks below. As the golden light catches the stone facades of the Louvre, you feel a sharp, beautiful pang of nostalgia for a moment you are currently living. Paris is not a place; it is a feeling of holding onto a beautiful transient dream."
      }
    },

    amalfi: {
      name: "Amalfi Coast",
      tagline: "Azure Cliffs & Lemon Gardens",
      country: "Italy",
      themeClass: "theme-amalfi",
      coordinates: "40.6331° N, 14.6029° E",
      bestTime: "May (Scent of lemon blossoms) or September (Warm water, summer crowds departing)",
      baseVibe: "A dramatic Mediterranean dreamscape carved of sun-bleached stone, sapphire seas, and sweet citrus wind.",

      budgetTiers: {
        budget: {
          stay: "Ostello Bacio di Sole (Tramonti) — a tranquil hostel set high in the hills among vineyards, offering terraces with panoramic gorge views.",
          budgetEstimate: { flights: 700, lodging: 220, dining: 190, activities: 100, transit: 70 }
        },
        comfort: {
          stay: "Hotel Margherita (Praiano) — a charming clifftop hotel with a lemon-fringed breakfast terrace and a pool looking out to Capri.",
          budgetEstimate: { flights: 1000, lodging: 950, dining: 550, activities: 350, transit: 150 }
        },
        luxury: {
          stay: "Le Sirenuse (Positano) — a legendary crimson palace overlooking Positano's vertical village, lit by 400 handmade candles every evening.",
          budgetEstimate: { flights: 2200, lodging: 5500, dining: 1600, activities: 1200, transit: 450 }
        }
      },

      itinerary: [
        {
          day: 1,
          title: "Ascending the Vertical Dream",
          description: "Arrive along the winding clifftop roads. Positano climbs straight up from the sea, a cascade of peach, pink, and terracotta homes clinging to the rock face.",
          schedule: [
            { time: "10:30 AM", activity: "Sita Bus Coastal Ride", detail: "Ride the public bus from Sorrento to Praiano. Sit on the right side of the bus to watch the cliffs drop thousands of feet straight into the cobalt water." },
            { time: "03:00 PM", activity: "Fornillo Beach", detail: "Escape Positano's busy main beach for Fornillo. Walk the coastal stone path, rent a sunbed, and swim in calm, mineral-rich Mediterranean waters." },
            { time: "07:30 PM", activity: "Trattoria Dinner in Praiano", detail: "Eat fresh hand-rolled scialatielli pasta tossed with clams and garlic on a quiet, family-run terrace surrounded by tomato vines." }
          ]
        },
        {
          day: 2,
          title: "The Silent Heights of Ravello",
          description: "Climb high above the sea to the aristocratic mountain retreat of Ravello, where classical music floats on the breeze.",
          schedule: [
            { time: "09:00 AM", activity: "Villa Cimbrone Gardens", detail: "Walk to the 'Terrace of Infinity'. Stand at the marble balustrade where the sky and the sea blend into a single, infinite canvas of blue." },
            { time: "02:00 PM", activity: "Lemon Orchard Walk", detail: "Descend the historic stone staircases from Ravello to Minori, walking through terraced lemon orchards heavy with massive sfusato lemons." },
            { time: "06:00 PM", activity: "Piazza Duomo Aperitivo", detail: "Sit in Ravello's main square. Sip a cold Limoncello Spritz while children play soccer against the ancient white cathedral walls." }
          ]
        },
        {
          day: 3,
          title: "A Sailor's Solitude",
          description: "Rent a small wooden boat to explore the hidden sea caves, grottos, and empty stone coves accessible only by sea.",
          schedule: [
            { time: "09:30 AM", activity: "Private Gozzo Boat Charter", detail: "Board a traditional wooden gozzo. Swim inside the emerald waters of the Grotta dello Smeraldo and explore vertical fjords." },
            { time: "01:30 PM", activity: "Da Adolfo Beach Lunch", detail: "Pull up to a remote pebble cove. Dine at a legendary rustic shack on wooden decks, eating grilled mozzarella on lemon leaves." },
            { time: "08:00 PM", activity: "Seaside Nightfall", detail: "Stroll Positano's illuminated alleys, smelling sweet jasmine and ocean brine while purchasing handmade custom leather sandals." }
          ]
        }
      ],

      food: [
        {
          name: "Chez Black (Positano)",
          type: "Seafood & Heart-Shaped Pizza",
          atmosphere: "Right on the main boardwalk. Bustling, glamorous, and decorated like an old wooden yacht. The sea urchin pasta is intensely fresh and briny."
        },
        {
          name: "Salvatore Ravello",
          type: "Modern Neapolitan Cuisine",
          atmosphere: "A quiet terrace overlooking the deep valleys. The chef serves artisanal local cheeses paired with wild citrus honey under olive trees."
        },
        {
          name: "Bar Sole (Praiano)",
          type: "Local Café & Granita",
          atmosphere: "Unpretentious local hangout. Sit on red plastic chairs, chatting with local fishermen while eating fresh, tart lemon granita shaved from real lemons."
        }
      ],

      hiddenGems: [
        {
          name: "Fiordo di Furore",
          vibe: "A dramatic secret gorge where a high arched bridge spans a tiny hidden beach. The sea rushes in between two towering rock walls, creating a secluded, shaded swimming hole straight out of a cinematic dream."
        },
        {
          name: "Path of the Gods (Sentiero degli Dei)",
          vibe: "A breathtaking clifftop hiking trail that connects quiet mountain villages. You walk through wild rosemary and sage, high above the clouds, with Positano looking like a toy village below."
        }
      ],

      photoSpots: [
        { location: "Terrace of Infinity, Villa Cimbrone (Midday)", description: "Capture the white neoclassical marble busts lined up against the impossibly vast blue horizon of the Gulf of Salerno." },
        { location: "Franco's Bar, Positano (Dusk)", description: "Shoot Positano's pastel houses starting to glow with yellow lights under a purple sky, framed by bright yellow umbrellas and modern art." }
      ],

      tips: [
        { title: "Avoid the Car", detail: "Parking is scarce and costly, and driving the narrow clifftop lanes can be highly stressful. Rely on ferries and the local SITA buses instead." },
        { title: "Sensory Souvenirs", detail: "Skip plastic knickknacks. Purchase a linen shirt hand-loomed in Positano, a ceramic bottle of real limoncello, or custom sandals made on your feet." }
      ],

      memoryHighlight: {
        title: "Swimming in the Emerald Grotto",
        description: "You jump off the side of the wooden gozzo boat into the deep water just outside Praiano. As your body submerges, the intense midday heat disappears, replaced by a cool, silky embrace of blue. You swim into a small, shadowed limestone cave. Sunlight filters through a deep underwater opening, refracting to color the cave's waters an otherworldly, glowing emerald. You float on your back, staring at the cathedral-like stalactites above, listening to the echoing slap of waves against rock. For a moment, you are weightless, suspended between stone and sea, fully alive in a Mediterranean postcard."
      }
    },

    iceland: {
      name: "Iceland",
      tagline: "Ice & Fire Wilds",
      country: "Iceland",
      themeClass: "theme-iceland",
      coordinates: "64.9631° N, 19.0208° W",
      bestTime: "September to March (Northern Lights) or June to July (24-Hour Midnight Sun)",
      baseVibe: "An awe-inspiring primordial landscape of active volcanoes, blue glaciers, and endless black ash plains.",

      budgetTiers: {
        budget: {
          stay: "Kex Hostel (Reykjavík) — a stylishly industrial, converted biscuit factory with vintage leather sofas, live music, and harbor views.",
          budgetEstimate: { flights: 500, lodging: 260, dining: 160, activities: 140, transit: 120 }
        },
        comfort: {
          stay: "Fosshotel Glacier Lagoon — a contemporary design hotel clad in dark wood, tucked between massive black volcanic plains and icebergs.",
          budgetEstimate: { flights: 800, lodging: 1100, dining: 650, activities: 450, transit: 300 }
        },
        luxury: {
          stay: "The Retreat at Blue Lagoon — an architectural marvel cut into 800-year-old lava fields, with private mineral lagoons wrapping your suite.",
          budgetEstimate: { flights: 1800, lodging: 4800, dining: 1300, activities: 1100, transit: 550 }
        }
      },

      itinerary: [
        {
          day: 1,
          title: "The Smoldering Earth",
          description: "Arrive in the volcanic peninsula. The air is cold and crisp, smelling faintly of sulfur and wild ocean basalt.",
          schedule: [
            { time: "09:00 AM", activity: "Reykjanes Peninsula Drive", detail: "Drive through endless moss-covered lava fields that look like the surface of the moon, under a vast, low-hanging slate grey sky." },
            { time: "02:00 PM", activity: "Seltún Hot Springs", detail: "Walk along wooden boardwalks over boiling mud pools and steaming fumaroles painting the clay hills in vivid red, yellow, and green." },
            { time: "06:00 PM", activity: "Reykjavík Harbor Dinner", detail: "Dine at a cozy timber warehouse. Warm up with a rich, creamy langoustine soup and fresh rye bread baked in hot volcanic soil." }
          ]
        },
        {
          day: 2,
          title: "The Echo of Glacial Giants",
          description: "Journey along the dramatic south coast, where massive ice sheets descend toward black sand beaches.",
          schedule: [
            { time: "08:30 AM", activity: "Skógafoss Waterfall", detail: "Stand at the base of a roaring 200-foot waterfall. Feel the icy mist on your face and climb the steep wooden staircase for view of the valley." },
            { time: "01:00 PM", activity: "Reynisfjara Black Sand Beach", detail: "Walk among towering hexagonal basalt columns. Watch the massive white waves of the Atlantic crash violently onto pitch-black sand." },
            { time: "05:30 PM", activity: "Jökulsárlón Glacier Lagoon", detail: "Watch massive icebergs glowing in deep shades of blue and white drift silently from the glacier out to the open ocean." }
          ]
        },
        {
          day: 3,
          title: "Thermal Canyons & Midnight Skies",
          description: "Hike deep into remote valleys to bathe in geothermal rivers under the vast Icelandic sky.",
          schedule: [
            { time: "10:00 AM", activity: "Reykjadalur Valley Hike", detail: "Hike through green mountains to a hot steam river. Change on wooden decks and float in warm mineral currents surrounded by mountain mist." },
            { time: "03:30 PM", activity: "Kerid Crater Lake", detail: "Stand at the rim of a massive volcanic crater filled with deep turquoise water, framed by vivid red volcanic earth." },
            { time: "09:00 PM", activity: "Aurora Hunting / Midnight Soak", detail: "Seek out dark country roads to watch the green ribbons of the Northern Lights dance across a canvas of infinite stars." }
          ]
        }
      ],

      food: [
        {
          name: "Matur og Drykkur (Reykjavík)",
          type: "Modern Icelandic Gastronomy",
          atmosphere: "Located in an old salt-fish factory. Historic recipes are given modern, elegant twists, like cod's head cooked in honey and mountain herbs."
        },
        {
          name: "Kaffi Loki (Reykjavík)",
          type: "Traditional Rye Bread Ice Cream",
          atmosphere: "Cozy, multi-story house opposite the iconic Hallgrímskirkja church. Try the sweet rye bread ice cream topped with fresh whipped cream."
        },
        {
          name: "Pakkhús Restaurant (Höfn)",
          type: "Glacial Langoustine & Wild Game",
          atmosphere: "Rustic harbor warehouse filled with historical fishing gear. The cast-iron pans of local langoustine tails in herb butter are legendary."
        }
      ],

      hiddenGems: [
        {
          name: "Gljufrabui Waterfall",
          vibe: "A secret waterfall hidden inside a narrow slot canyon next to Seljalandsfoss. You walk through a shallow stream between mossy cliffs to stand inside a cave where the waterfall drops from a skylight."
        },
        {
          name: "Seljavallalaug Pool",
          vibe: "Iceland's oldest concrete swimming pool, built in 1923 deep inside a dramatic mountain valley. Geothermal water trickles down the rock face to warm the pool, offering a quiet, green sanctuary."
        }
      ],

      photoSpots: [
        { location: "Diamond Beach (Sunrise)", description: "Shoot polished, crystal-like blocks of ice washed up on the jet-black volcanic sand as the golden sun rises through them." },
        { location: "Reynisfjara Basalt Columns (Overcast)", description: "Capture the organic geometry of the hexagonal columns framing a solitary traveler looking out to the stormy sea." }
      ],

      tips: [
        { title: "Check Vedur.is", detail: "Icelandic weather changes instantly. A sunny hour can turn into a gale-force blizzard. Keep the weather app open and respect all warnings." },
        { title: "No Tipping Needed", detail: "Service is fully included in all restaurant checks. Tipping is not expected; instead, express your appreciation with a warm, genuine 'Takk'." }
      ],

      memoryHighlight: {
        title: "Bathed in Light on Diamond Beach",
        description: "You stand on the volcanic shores of Diamond Beach. The air is freezing, but you are layered in thick wool. Before you, hundreds of icebergs lie scattered like giant diamonds on black velvet sand. As the sun begins to rise, it strikes a massive, head-height shard of prehistoric ice, refracting the light into a blazing orange glow. At that exact moment, a wave sweeps in, coating the black sand in a mirror of water that reflects the golden sky and the glowing ice. You stand completely still, surrounded by the crackle of ancient ice melting and the low, rhythmic rumble of the Arctic ocean. You feel incredibly small, yet profoundly connected to the breathing, elemental force of the earth."
      }
    }
  },

  procedural: {
    vibes: {
      luxury: {
        adjectives: ["opulent", "curated", "bespoke", "sumptuous", "refined", "exclusive", "gilded"],
        stayNoun: "private heritage villa",
        stayDesc: "styled with hand-selected local antiques, glowing linens, and floor-to-ceiling glass looking out over the silent city layout."
      },
      cafes: {
        adjectives: ["sun-dappled", "intimate", "minimalist", "wood-scented", "bohemian", "slow-paced"],
        stayNoun: "neighborhood art loft",
        stayDesc: "tucked above a historic bookstore, smelling of roasted coffee, paper books, and polished pine wood floors."
      },
      nature: {
        adjectives: ["elemental", "primordial", "misty", "vast", "mossy", "silent", "wind-swept"],
        stayNoun: "secluded eco-cabin",
        stayDesc: "crafted from local stone and cedar, featuring a crackling wood fireplace and stargazing skylights."
      },
      nightlife: {
        adjectives: ["pulsing", "electric", "neon-lit", "shadowy", "uninhibited", "velvet", "vibrant"],
        stayNoun: "sleek industrial studio",
        stayDesc: "high above the neon rivers, with polished concrete floors and panoramic windows frame-locking the skyline."
      },
      calm: {
        adjectives: ["serene", "silent", "whispering", "still", "gentle", "meditative", "peaceful"],
        stayNoun: "monastery sanctuary room",
        stayDesc: "wrapped in absolute quiet, looking into a stone courtyard garden with a gentle bubbling water basin."
      },
      romantic: {
        adjectives: ["rose-hued", "misty", "candle-lit", "timeless", "poetic", "dream-like"],
        stayNoun: "historic boutique suite",
        stayDesc: "complete with an iron balcony, soft flowing silk curtains, and views of chimney stacks and cobblestones."
      },
      culture: {
        adjectives: ["soulful", "storied", "ancestral", "authentic", "living", "rich", "textural"],
        stayNoun: "family-owned courtyard riad",
        stayDesc: "passed down through generations, featuring hand-glazed tiles, citrus trees, and ancient plaster arches."
      },
      adventure: {
        adjectives: ["rugged", "dramatic", "limitless", "wild", "exhilarating", "untamed"],
        stayNoun: "cliffside ridge basecamp",
        stayDesc: "clinging safely to the granite peak, equipped with woolen gear, panoramic maps, and views of gorges."
      },
      photography: {
        adjectives: ["cinematic", "chiaroscuro", "golden-hued", "graphic", "luminous", "atmospheric"],
        stayNoun: "architectural vantage loft",
        stayDesc: "designed with dynamic geometric lines and skylights positioned to track the exact path of the golden hour sun."
      },
      food: {
        adjectives: ["sensory", "aromatic", "savory", "earthy", "rich", "flavor-packed", "slow-cooked"],
        stayNoun: "market-adjacent kitchen suite",
        stayDesc: "equipped with heavy cast-iron stoves and shelves stocked with local spices, rosemary bundles, and cold-pressed oils."
      }
    },

    regions: {
      coastal: {
        scents: "salt air, wild jasmine, and hot terracotta",
        vibeDescription: "where cliffs tumble into cobalt seas and days are marked by the tide.",
        cafeName: "La Baia del Silenzio",
        cafeType: "seaside espresso terrace",
        cafeDesc: "perched on weather-beaten wooden pilings above clear turquoise waters.",
        foodSpot: "Trattoria del Mare",
        foodType: "seared local octopus with wild fennel",
        gemName: "The Fisherman's Cove",
        gemDesc: "A crescent sand patch hidden behind a stone archway, reachable only by stepping down 300 weathered cliff stairs.",
        highlightTitle: "Floating Under a Golden Moon",
        highlightDesc: "You lie flat on a wooden paddleboard as the warm tide pushes you gently into a dark cave. Outside, the moon rises over the cliffs, coloring the water silver. You listen to the rhythmic swell of the sea, breathing in wild lavender. For this brief pocket of time, you are completely dissolved into the dark, sapphire heart of the coast."
      },
      continental: {
        scents: "old books, damp cobblestones, and roasting chestnuts",
        vibeDescription: "a canvas of classical stone facades, hidden gardens, and quiet afternoon mists.",
        cafeName: "Café des Poètes",
        cafeType: "cozy wood-paneled salon",
        cafeDesc: "hidden in a quiet courtyard under the branches of a grand oak tree.",
        foodSpot: "L'Auberge Rustique",
        foodType: "slow-braised mushrooms in dark red wine",
        gemName: "The Alchemist's Library",
        gemDesc: "A dusty, multi-story bookstore specializing in rare leather-bound manuscripts and forgotten botanical drawings.",
        highlightTitle: "A Rainy Afternoon on Cobblestones",
        highlightDesc: "You step out of a sudden, warm afternoon shower under a stone archway. An accordionist in the distance begins to play a slow waltz, the notes echoing off the damp, glistening brick walls. You pull your collar up, smelling the rain-soaked earth and old wood, watching the city lights catch the wet streets like a sea of amber stars. The world slows down completely."
      },
      nordic: {
        scents: "cold pine needles, burning birchwood, and clean glacial wind",
        vibeDescription: "a primordial landscape of extreme scale, silent fjords, and dancing green lights.",
        cafeName: "Fjord Kaffi",
        cafeType: "stone-walled warmth hub",
        cafeDesc: "equipped with heavy sheepskin blankets, roaring fires, and views of slate cliffs.",
        foodSpot: "Nordic Eldur",
        foodType: "crisp hot rye bread with smoked mountain trout",
        gemName: "The Thermal Geothermal Basin",
        gemDesc: "A bubbling natural hot pool hidden in a birch forest, known only to the local farmers of the valley.",
        highlightTitle: "The Dance in the Silent Fjord",
        highlightDesc: "You sit wrapped in wool on the wooden deck of a remote cabin, looking out at the still, mirror-like water of a dark fjord. Suddenly, a pale green light begins to pulse in the sky, stretching into massive glowing ribbons that dance silently across the peaks. There is no sound but the occasional crack of distant ice. You feel a deep, beautiful awe."
      },
      asian: {
        scents: "incense cedar, roasted green tea, and wet moss",
        vibeDescription: "a meticulous balance of quiet bamboo structures and glowing neon skylines.",
        cafeName: "Chashitsu Oku",
        cafeType: "tatami-matted bamboo house",
        cafeDesc: "overlooking a small gravel courtyard with a single weeping maple tree.",
        foodSpot: "Kettle & Charcoal",
        foodType: "fresh hand-pulled noodles in a smoky wild mushroom broth",
        gemName: "The Forest Lantern Path",
        gemDesc: "A mossy stone walkway lined with hundreds of ancient wooden lanterns that light up only when the wind blows.",
        highlightTitle: "The Whispering Bamboo Temple",
        highlightDesc: "You walk deep into a hillside bamboo grove just as the morning fog starts to lift. The wind sweeps through the green stalks, creating a hollow, wooden rattle that sounds like a thousand whispers. You reach a small, weathered wooden shrine where incense curls lazily into the damp air. You bow your head, feeling an ancient peace."
      },
      metropolitan: {
        scents: "polished steel, exhaust mist, and hot roasted nuts",
        vibeDescription: "a high-energy grid of soaring glass towers, velvet bar booths, and unexpected green parks.",
        cafeName: "The Vantage Corner",
        cafeType: "industrial glass-box bar",
        cafeDesc: "perched on the 40th floor with custom viewing platforms facing the setting sun.",
        foodSpot: "Brick & Sizzle",
        foodType: "wood-fired artisan flatbread with local wild herbs",
        gemName: "The Speakeasy Corridor",
        gemDesc: "An unmarked steel door behind an old barber shop, leading to an elegant plush room playing vintage records.",
        highlightTitle: "Lost in the Skyline Glow",
        highlightDesc: "You walk across a steel suspension bridge as the sun drops behind the towering glass mountains. The skyline erupts into a billion glittering lights, casting a neon reflection across the dark river below. You put your headphones in, watching the silent rush of yellow cabs and busy faces, feeling like a single, free atom inside a giant, humming electric star."
      }
    }
  }
};

/**
 * Main compilation algorithm for generating itineraries
 */
function generateItinerary({ destination, duration, budgetTier, companion, vibe, memories }) {
  const query = destination.toLowerCase();
  let data;

  // 1. Resolve to hand-crafted curated models or compile a custom one
  if (query.includes("tokyo")) {
    data = JSON.parse(JSON.stringify(AtlasData.curated.tokyo));
  } else if (query.includes("paris")) {
    data = JSON.parse(JSON.stringify(AtlasData.curated.paris));
  } else if (query.includes("amalfi") || query.includes("positano") || query.includes("praiano")) {
    data = JSON.parse(JSON.stringify(AtlasData.curated.amalfi));
  } else if (query.includes("iceland") || query.includes("reykjavik")) {
    data = JSON.parse(JSON.stringify(AtlasData.curated.iceland));
  } else {
    data = compileCustomItinerary(destination, vibe);
  }

  // 2. Select Stays & Base Rates based on Budget Tier
  const tier = data.budgetTiers[budgetTier || "comfort"];
  data.stay = tier.stay;
  
  const baseEstimates = JSON.parse(JSON.stringify(tier.budgetEstimate));
  const daysMultiplier = duration / 3;
  
  baseEstimates.lodging = Math.round(baseEstimates.lodging * daysMultiplier);
  baseEstimates.dining = Math.round(baseEstimates.dining * daysMultiplier);
  baseEstimates.activities = Math.round(baseEstimates.activities * daysMultiplier);
  baseEstimates.transit = Math.round(baseEstimates.transit * daysMultiplier);
  
  // 3. Adjust for Companions
  if (companion === "partner") {
    baseEstimates.lodging = Math.round(baseEstimates.lodging * 1.2);
    baseEstimates.dining = Math.round(baseEstimates.dining * 2);
    baseEstimates.activities = Math.round(baseEstimates.activities * 2);
    baseEstimates.transit = Math.round(baseEstimates.transit * 1.5);
  } else if (companion === "friends" || companion === "family") {
    baseEstimates.lodging = Math.round(baseEstimates.lodging * 1.8);
    baseEstimates.dining = Math.round(baseEstimates.dining * 3.5);
    baseEstimates.activities = Math.round(baseEstimates.activities * 3.5);
    baseEstimates.transit = Math.round(baseEstimates.transit * 2.2);
  }
  
  data.budgetEstimate = baseEstimates;

  // 4. Pad or slice daily itineraries
  if (data.itinerary.length > duration) {
    data.itinerary = data.itinerary.slice(0, duration);
  } else if (data.itinerary.length < duration) {
    for (let d = data.itinerary.length + 1; d <= duration; d++) {
      data.itinerary.push({
        day: d,
        title: `Chasing Local Secrets — Day ${d}`,
        description: "Dedicate this extra day to wandering off the path, returning to your favorite spot, or seeking custom secrets.",
        schedule: [
          { time: "10:00 AM", activity: "The Late Wake-Up", detail: "Sleep late under heavy organic linen sheets. Let the morning breeze fill your room." },
          { time: "01:00 PM", activity: "The Return Stroll", detail: "Return to that quiet canal corner or mossy garden pavilion you discovered on day one." },
          { time: "08:00 PM", activity: "Unplanned Indulgence", detail: "Ask the lodging host where they dine with their family on Sundays. Go there." }
        ]
      });
    }
  }

  // Attach metadata
  data.vibe = vibe;
  data.companion = companion;
  data.duration = duration;
  data.budgetTier = budgetTier;
  
  return data;
}

function compileCustomItinerary(destination, vibeKey) {
  const cityName = destination.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // Regional heuristics
  let regionKey = "continental";
  const norm = destination.toLowerCase();
  
  if (norm.match(/(coast|beach|island|sea|bay|amalfi|maldives|bali|hawaii|phuket|sydney|rio|cove|capri|cancun|greece|santorini)/)) {
    regionKey = "coastal";
  } else if (norm.match(/(iceland|reykjavik|oslo|norway|sweden|stockholm|finland|lapland|alps|swiss|glacier|canada|alaska)/)) {
    regionKey = "nordic";
  } else if (norm.match(/(tokyo|kyoto|osaka|seoul|beijing|shanghai|bangkok|singapore|vietnam|bali|indonesia|temple|asia)/)) {
    regionKey = "asian";
  } else if (norm.match(/(new york|nyc|london|chicago|tokyo|hong kong|singapore|berlin|metropolis|skyline)/)) {
    regionKey = "metropolitan";
  }
  
  const region = AtlasData.procedural.regions[regionKey];
  const vibeData = AtlasData.procedural.vibes[vibeKey || "cafes"];
  
  const adjective = vibeData.adjectives[Math.floor(Math.random() * vibeData.adjectives.length)];
  const adjective2 = vibeData.adjectives[(Math.floor(Math.random() * vibeData.adjectives.length) + 1) % vibeData.adjectives.length];
  
  const data = {
    name: cityName,
    tagline: `${adjective.charAt(0).toUpperCase() + adjective.slice(1)} Drifts & Local Secrets`,
    country: "Global Wanderings",
    themeClass: `theme-${regionKey === 'nordic' ? 'iceland' : regionKey === 'asian' ? 'tokyo' : regionKey === 'coastal' ? 'amalfi' : 'paris'}`,
    coordinates: `${(Math.random() * 80).toFixed(4)}° N, ${(Math.random() * 180).toFixed(4)}° W`,
    bestTime: "September to October (Autumn glow crisp leaves) or late Spring (mild winds, low crowds)",
    baseVibe: `A high-fidelity layout of ${region.vibeDescription} It focuses on a ${adjective} pace tailored for a ${adjective2} experience.`,
    
    budgetTiers: {
      budget: {
        stay: `Sleek architectural micro-cabins — cozy wood spaces smelling of ${region.scents.split(',')[0]} and fresh wool blankets.`,
        budgetEstimate: { flights: 600, lodging: 220, dining: 160, activities: 90, transit: 50 }
      },
      comfort: {
        stay: `Boutique local lodging — featuring sun-dappled courtyard lounge rooms and a library stocking rare city guides.`,
        budgetEstimate: { flights: 900, lodging: 700, dining: 420, activities: 280, transit: 90 }
      },
      luxury: {
        stay: `Private historic estate terrace — complete with vaulted skylights, bespoke local craft textiles, and views of chimney stacks.`,
        budgetEstimate: { flights: 2000, lodging: 3500, dining: 1200, activities: 800, transit: 300 }
      }
    },
    
    itinerary: [],
    
    food: [
      {
        name: region.cafeName,
        type: region.cafeType,
        atmosphere: region.cafeDesc
      },
      {
        name: region.foodSpot,
        type: "Sensory Delicacy",
        atmosphere: `A charming local spot serving authentic ${region.foodType}. The kitchen is open and smells faintly of woodsmoke, wild rosemary, and ${region.scents.split(',')[0]}.`
      },
      {
        name: "The Creator's Den",
        type: "Speakeasy Lounge",
        atmosphere: "Hidden behind an unmarked steel courtyard entrance. Warm low lighting, cozy leather seats, and the gentle scratch of ancient vinyl records playing in the dark."
      }
    ],
    
    hiddenGems: [
      {
        name: region.gemName,
        vibe: region.gemDesc
      },
      {
        name: "The Sunlit Botanical Cloister",
        vibe: `An ancient stonewalled garden pavilion where wild grapevines wrap historical columns. Inside, a circular stone well trickles mineral water silently under filtered sunlight.`
      }
    ],
    
    photoSpots: [
      {
        location: "The Old Clocktower Terrace (Golden Hour)",
        description: "Align your lens as the setting sun shoots golden rays directly through the open gearwork of the iron dial, casting beautiful shadow patterns."
      },
      {
        location: "The Narrow Back-Alley Archway (Dusk)",
        description: `Shoot high-contrast reflections off wet brickwork just as the local hanging lanterns turn amber, framing the quiet path.`
      }
    ],
    
    tips: [
      {
        title: "Move Like a Shadow",
        detail: `Avoid rushing. The locals here value slow conversation. Always say their local greeting before ordering or asking for direction.`
      },
      {
        title: "Pack Smart",
        detail: `Keep light layer options. The ambient weather oscillates between warm afternoon sun and chilly evening coastal/mountain breezes.`
      }
    ],
    
    memoryHighlight: {
      title: region.highlightTitle,
      description: region.highlightDesc
    }
  };

  return data;
}

module.exports = { generateItinerary };
