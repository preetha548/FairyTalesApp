import { useMemo, useState } from "react";

type Story = {
  id: number;
  title: string;
  origin: string;
  time: string;
  category: string;
  image: string;
  excerpt: string;
  text: string[];
};

const stories: Story[] = [
  {
    id: 1,
    title: "The Glass Mountain",
    origin: "Polish folklore",
    time: "12 min read",
    category: "Enchanted",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
    excerpt: "A fearless wanderer, a silver apple, and a castle no mortal has ever reached.",
    text: [
      "Beyond seven rivers and seven forests stood a mountain made entirely of glass. At its summit, where the clouds gathered like sheep, a castle shone in the morning light.",
      "Many had tried to climb it. Knights came with golden spurs and ropes of silk, but the mountain sent each one sliding gently back to the meadow below.",
      "Then, one autumn evening, a quiet wanderer arrived carrying nothing but a silver apple and a promise made long ago.",
    ],
  },
  {
    id: 2,
    title: "The Moss-Covered Door",
    origin: "A tale from the North",
    time: "8 min read",
    category: "Forest",
    image:
      "https://images.unsplash.com/photo-1544039161-b0c20826c6f6?auto=format&fit=crop&w=900&q=85",
    excerpt: "Deep in the pines, a little door appears only to those who have lost their way.",
    text: [
      "Mara had followed the white moth farther than she meant to. By dusk, every pine looked like the last, and the path had disappeared beneath the ferns.",
      "That was when she saw the door: small, round, and green with moss, set into the roots of the oldest tree in the forest.",
    ],
  },
  {
    id: 3,
    title: "Moonlight & Marigolds",
    origin: "Mexican folktale",
    time: "6 min read",
    category: "Magic",
    image:
      "https://images.unsplash.com/photo-1723529424854-6090e211133b?auto=format&fit=crop&w=900&q=85",
    excerpt: "Each full moon, golden flowers trace a path to everything the heart has forgotten.",
    text: [
      "In the village of San Aurelio, marigolds bloomed only after sunset. Their golden heads turned not toward the moon, but toward the wishes people had forgotten to make.",
      "One night, Inés followed their glowing path beyond the last adobe wall and up into the silver hills.",
    ],
  },
  {
    id: 4,
    title: "The Nightingale’s Crown",
    origin: "Danish folklore",
    time: "10 min read",
    category: "Kingdoms",
    image:
      "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=900&q=85",
    excerpt: "A proud king discovers that the smallest voice can carry the greatest truth.",
    text: [
      "The king owned a crown for every hour of the day, but none so fine as the crown he wore at midnight. It was set with black pearls and a single feather.",
      "The feather belonged to a nightingale who lived beyond the palace walls and sang only for those willing to listen without speaking.",
    ],
  },
  {
    id: 5,
    title: "The River That Remembered",
    origin: "West African folklore",
    time: "7 min read",
    category: "Magic",
    image:
      "https://images.unsplash.com/photo-1610129142564-79956dcecc7b?auto=format&fit=crop&w=900&q=85",
    excerpt: "A young potter asks an ancient river to return one precious memory.",
    text: [
      "Long before the village had a name, the river remembered everything. It remembered the first rain, the first drumbeat, and every foot that crossed its shining stones.",
      "When Adia came to its bank with an empty clay jar, the river already knew what she had come to ask.",
    ],
  },
  {
    id: 6,
    title: "The Starlight Tailor",
    origin: "Japanese folktale",
    time: "9 min read",
    category: "Enchanted",
    image:
      "https://images.unsplash.com/photo-1656828561601-3981f28438c1?auto=format&fit=crop&w=900&q=85",
    excerpt: "With a needle of bone and thread made of stars, a tailor mends the torn night.",
    text: [
      "At the very top of the mountain lived a tailor whose lantern never went dark. Travelers said he could stitch a shadow back to its owner.",
      "But on the longest night of winter, a silver tear appeared across the sky, and three stars fell into his garden.",
    ],
  },
  {
    id: 7,
    title: "The Lantern in the Lake",
    origin: "Scottish folklore",
    time: "8 min read",
    category: "Sea & Sky",
    image:
      "https://images.unsplash.com/photo-1763084559105-da09d3e33d4c?auto=format&fit=crop&w=900&q=85",
    excerpt: "On moonless nights, a sunken lantern guides the kind-hearted safely home.",
    text: [
      "The loch was black as ink when Isla saw the lantern moving beneath the water. It gave no reflection and made no ripple, yet it followed her along the shore.",
      "Her grandmother had warned her never to answer a light that knew her name. But this one whispered the name of someone else—someone lost.",
    ],
  },
  {
    id: 8,
    title: "The Fox and the Amber Bell",
    origin: "Korean folktale",
    time: "7 min read",
    category: "Creatures",
    image:
      "https://images.unsplash.com/photo-1717292068934-46cfe68fb6d4?auto=format&fit=crop&w=900&q=85",
    excerpt: "A clever fox borrows a temple bell and accidentally wakes the sleeping hills.",
    text: [
      "At the edge of the bamboo wood lived a fox with seven names and no patience at all. One rainy morning, he stole the smallest bell from the mountain temple.",
      "The first ring woke the birds. The second woke the stones. By the third, the whole mountain had begun to stretch.",
    ],
  },
  {
    id: 9,
    title: "The Palace Beneath the Waves",
    origin: "Greek island tale",
    time: "11 min read",
    category: "Sea & Sky",
    image:
      "https://images.unsplash.com/photo-1733011469361-bb54c3d01033?auto=format&fit=crop&w=900&q=85",
    excerpt: "A pearl diver discovers a forgotten palace where the clocks run backward.",
    text: [
      "Niko could hold his breath longer than anyone on the island. One morning he followed a trail of blue pearls deeper than the sunlight could reach.",
      "There, between two forests of coral, stood a palace with open doors and clocks that ticked toward yesterday.",
    ],
  },
  {
    id: 10,
    title: "The Weaver of Snow",
    origin: "Finnish folklore",
    time: "9 min read",
    category: "Enchanted",
    image:
      "https://images.unsplash.com/photo-1680023773562-58db0b1595c7?auto=format&fit=crop&w=900&q=85",
    excerpt: "Every winter, an old weaver embroiders the frost across the sleeping world.",
    text: [
      "North of the last red cottage, where the road narrowed to a thread, lived a weaver called Lumi. Her loom was made of birch and her shuttle was carved from ice.",
      "All winter she worked, stitching ferns onto windows and white branches onto the fields. Then one year, spring arrived before her work was done.",
    ],
  },
  {
    id: 11,
    title: "The Clay Bird",
    origin: "Persian folktale",
    time: "6 min read",
    category: "Creatures",
    image:
      "https://images.unsplash.com/photo-1751390785221-b68a04d23fa0?auto=format&fit=crop&w=900&q=85",
    excerpt: "A potter shapes a tiny bird that sings of places no traveler has seen.",
    text: [
      "In a city the color of saffron, Farid made bowls, water jars, and once—quite by accident—a little clay bird.",
      "When the kiln opened, the bird was singing. Its song described a green country beyond the desert where rain fell upward into the clouds.",
    ],
  },
  {
    id: 12,
    title: "Three Wishes for the Wind",
    origin: "Moroccan folklore",
    time: "10 min read",
    category: "Journeys",
    image:
      "https://images.unsplash.com/photo-1680914681939-79839cd49aec?auto=format&fit=crop&w=900&q=85",
    excerpt: "A spice seller chases three runaway wishes across a sea of golden dunes.",
    text: [
      "Samira kept her wishes in three blue bottles on the highest shelf. She had saved them so long that she had almost forgotten what they contained.",
      "Then the east wind swept through her shop, uncorked every bottle, and carried the wishes out across the dunes.",
    ],
  },
  {
    id: 13,
    title: "The House with Seven Chimneys",
    origin: "Romanian folklore",
    time: "8 min read",
    category: "Forest",
    image:
      "https://images.unsplash.com/photo-1744533782176-c75bd3f8bb4a?auto=format&fit=crop&w=900&q=85",
    excerpt: "At dusk, seven chimneys send seven different dreams into the valley below.",
    text: [
      "Nobody remembered building the house on the hill. It had seven windows, seven doors, and seven crooked chimneys, though never more than one fire burned inside.",
      "Each chimney carried a different dream. The blue smoke brought adventures; the silver smoke brought memories; and the gold smoke brought truth.",
    ],
  },
  {
    id: 14,
    title: "The Girl Who Borrowed Dawn",
    origin: "Andean folktale",
    time: "7 min read",
    category: "Sea & Sky",
    image:
      "https://images.unsplash.com/photo-1501769844226-964f74b54e53?auto=format&fit=crop&w=900&q=85",
    excerpt: "When morning fails to arrive, a shepherd climbs the highest peak to find it.",
    text: [
      "For three days the sun did not rise above the mountains. The llamas would not stir, and even the roosters grew tired of calling.",
      "So Amaya packed maize cakes in her red shawl and began the long climb to the house where Dawn was said to sleep.",
    ],
  },
  {
    id: 15,
    title: "The Tiger’s Golden Whisker",
    origin: "Bhutanese folklore",
    time: "9 min read",
    category: "Creatures",
    image:
      "https://images.unsplash.com/photo-1565103368255-313fd208340d?auto=format&fit=crop&w=900&q=85",
    excerpt: "A healer seeks one golden whisker and learns that courage can be quiet.",
    text: [
      "High above the cloud line lived a tiger whose coat shone like autumn. From his chin grew a single golden whisker said to mend any broken thing.",
      "Pema climbed the mountain to find him, carrying no spear—only a bowl of warm milk and a story for each night.",
    ],
  },
  {
    id: 16,
    title: "The Bellmaker’s Daughter",
    origin: "Italian folktale",
    time: "12 min read",
    category: "Kingdoms",
    image:
      "https://images.unsplash.com/photo-1592989847310-2b19515028bd?auto=format&fit=crop&w=900&q=85",
    excerpt: "A girl casts a bell whose voice can reveal every promise the king has broken.",
    text: [
      "In the cliffside town of Bellacqua, every hour had its own bell. Sofia knew them by voice: the bronze noon bell, the silver wedding bell, and the little iron bell for storms.",
      "But the king ordered her father to make a bell that would never ring. Sofia made one that could not keep silent.",
    ],
  },
  {
    id: 17,
    title: "The Road of White Feathers",
    origin: "Māori-inspired tale",
    time: "8 min read",
    category: "Journeys",
    image:
      "https://images.unsplash.com/photo-1721506451270-befd39123acb?auto=format&fit=crop&w=900&q=85",
    excerpt: "White feathers appear across the hills, marking a path toward a vanished song.",
    text: [
      "After the great storm, the valley woke without birdsong. Not one chirp sounded in the flax or the tall trees, and the morning felt unfinished.",
      "Tui found the first white feather at the garden gate. By noon, a whole road of them wound over the western hills.",
    ],
  },
  {
    id: 18,
    title: "The Moon in the Mango Tree",
    origin: "Indian folktale",
    time: "6 min read",
    category: "Magic",
    image:
      "https://images.unsplash.com/photo-1560454758-babbc0393c24?auto=format&fit=crop&w=900&q=85",
    excerpt: "A village believes the moon is caught in a tree, but one child knows how to listen.",
    text: [
      "One hot evening, the full moon settled between the branches of the old mango tree. The villagers brought ladders, baskets, and the longest fishing net they could find.",
      "Only little Kavya sat beneath the tree and listened. The moon, she discovered, was trying to tell them something.",
    ],
  },
];

const storyEndings: Record<number, string[]> = {
  1: [
    "At the foot of the mountain, the wanderer cut the apple into three shining pieces. He placed the first beneath his tongue and found he could speak to the wind. He buried the second in the earth, and a silver-rooted tree sprang upward. The third he held toward the summit, where it glowed like a small moon.",
    "The wind lifted him into the branches, and the tree carried him halfway to the clouds. From there, the apple drew a staircase of light across the glass. At the castle gate he found not treasure, but an old woman waiting beside an empty hearth. Long ago, he had promised his mother that he would find her missing sister. The woman smiled, and the frozen castle began to thaw.",
    "They descended together as the glass mountain softened into clear, singing streams. The silver tree remained on the hillside, bearing one apple each year for any traveler brave enough to keep a promise. And though the wanderer was offered crowns in seven kingdoms, he chose a small house beside the stream, where no guest ever found the door closed.",
  ],
  2: [
    "Inside was a room no larger than a cupboard, lit by jars of fireflies. A tiny woman in a cloak of bark sat mending a map. She told Mara that the forest moved its paths whenever someone entered carrying a worry too heavy to name.",
    "Mara confessed that she had run away after breaking her mother’s only blue cup. The woman smiled and handed her a spool of red thread. Together they stitched a path onto the map: over the stream, beneath the leaning oak, and straight toward the warm light of home.",
    "By midnight Mara stood at her own gate. Her mother was waiting, not for the cup, but for her. The next morning they returned to thank the little woman, yet found only an old tree and a patch of moss. From then on, whenever Mara met someone lost, she tied a red thread to a branch and showed them the way.",
  ],
  3: [
    "At the end of the flower path stood a little house she remembered from childhood. Her grandfather sat on the porch, exactly as he had before he was gone, humming a tune she had nearly forgotten. He could stay only until moonset, so they spoke quickly and laughed slowly.",
    "Before the first pale light, he placed a marigold seed in her palm. “Memory is not a room you must live in,” he told her. “It is a lamp you carry forward.” Then the house faded, leaving Inés alone among the bright flowers.",
    "She planted the seed in the village square. By the next full moon, marigolds covered the fountain, and every person who followed their path returned with a story worth sharing. Inés never saw the little house again, but whenever she hummed her grandfather’s tune, one golden flower turned its face toward her.",
  ],
  4: [
    "The king sent hunters to capture the bird, but each returned unable to speak. At last he went himself, wearing no crown, for the branches were too low. He found the nightingale beside a pool, singing the names of every promise he had forgotten.",
    "The king listened until dawn. He heard the names of hungry villages, lonely prisoners, and friends he had abandoned for praise. With each truth, a black pearl fell from his midnight crown and dissolved in the water.",
    "He returned to the palace bareheaded and spent seven years repairing what his pride had broken. The nightingale came to his window each spring, not to flatter him, but to remind him. And when the king grew old, he gave away all his crowns except the smallest one, which he placed gently around the bird’s nest.",
  ],
  5: [
    "Adia lowered her jar into the current and asked for the sound of her mother’s voice. The river warned that returned memories could not be kept; they could only be heard once and passed onward. Adia agreed, and the jar filled with water clear as glass.",
    "When she opened it at home, her mother’s lullaby poured through the doorway. Neighbors stopped in the road. Children learned the melody before the final note faded, and the oldest woman in the village remembered a second verse.",
    "Adia shaped a hundred clay jars and painted the song around their rims. She gave them away so the melody would travel farther than grief. Years later, people said the river had returned a memory, but Adia knew the truth: the river had taught the village how to remember together.",
  ],
  6: [
    "The tailor threaded his finest needle with the light of the fallen stars. He climbed above the tree line, where the tear in the sky flapped like torn silk, spilling darkness over the valleys below.",
    "All night he stitched. The work was so cold that his fingers turned blue, and so bright that his eyes filled with constellations. Just before dawn, he tied the final knot—but one small star remained in his pocket.",
    "He carried it home and hung it above his door as a lantern for lost travelers. The repaired seam can still be seen on clear winter nights: a pale river of stars across the sky. And if one star seems lower than the rest, it is the tailor’s lamp, showing someone the way home.",
  ],
  7: [
    "Isla followed the light to a cove where a fisherman clung to an overturned boat. The lantern rose from the depths and rested on the waves, illuminating a safe passage between the rocks.",
    "She waded into the freezing water and pulled the fisherman ashore. He was an old man from the next village who had once saved Isla’s grandmother in the very same cove. The lantern, it seemed, remembered every kindness owed.",
    "At sunrise it sank beneath the loch and vanished. Isla never heard it speak again, but on stormy nights she left a lamp in her window. Sailors began to steer by it, and soon lights shone all around the loch—kindness answering kindness from shore to shore.",
  ],
  8: [
    "The fox raced uphill to return the bell, but the waking mountain rolled its shoulders and sent boulders tumbling into the valley. He rang once to warn the rabbits, twice to call the deer, and three times to wake the villagers.",
    "Together they cleared the road and guided the river back to its bed. By sunset the mountain settled, though it left one eye open: a round blue lake near the summit. The fox placed the amber bell beside it and bowed lower than he ever had before.",
    "The temple keeper did not punish him. Instead, she made him guardian of the bell, for a thief who learns responsibility may become a careful protector. The fox kept all seven of his names, but from then on the valley gave him an eighth: the One Who Rings for Others.",
  ],
  9: [
    "Inside the palace, pale courtiers danced backward through empty halls. Their queen explained that a jealous sea-witch had reversed every clock, trapping the kingdom in the final hour before its fall.",
    "Niko found the oldest clock in a tower of shells. Rather than forcing its hands forward, he removed them entirely. At once, the palace shuddered. Without an hour to repeat, time flowed freely again, and dawn-colored fish filled the windows.",
    "The queen offered Niko a chest of pearls, but he chose a single compass that pointed toward whatever was most needed. It led him home to his waiting family. Years later, when he became an old sailor, the compass still pointed not north, but toward anyone lost at sea.",
  ],
  10: [
    "Lumi carried her unfinished cloth to the lake, where the early sun was already melting the shore. She asked Spring for one more night. Spring refused, saying every season must make room for the next.",
    "So Lumi did something she had never done: she cut the cloth from her loom. The loose white threads flew south as swans, and the embroidered frost became clouds. By evening, a gentle rain cooled the budding fields.",
    "Lumi understood that beauty need not remain unchanged to endure. After that, she wove with every season: green rain in spring, gold wind in autumn, and soft snow in winter. The world grew less perfect, perhaps, but far more alive.",
  ],
  11: [
    "The emir heard of the singing bird and demanded it for his collection. Farid agreed on one condition: the emir must follow wherever it flew. The clay bird sprang from his hand and crossed the city walls.",
    "For forty days it led them through the desert. The emir’s silk shoes tore, his jeweled water flask emptied, and he learned to share bread with strangers. At last they reached no green country, only a dry village gathered around a broken well.",
    "The emir understood. He sold the jewels he had carried and paid workers to deepen the well until clear water rose. Gardens soon covered the valley. The clay bird never sang again, but it perched above the well, its little beak pointed toward the country it had helped create.",
  ],
  12: [
    "The first wish became a red bird and flew toward the western cliffs. Samira caught it by promising her finest cinnamon to the wind. The second became a silver fish swimming beneath the sand; she lured it out with a bowl of rainwater.",
    "The third wish traveled farthest, all the way to a village where the wells were dry. When Samira arrived, she found it hovering over an empty cistern, waiting to be spoken. She had planned to wish for a grand house, but the thirsty children changed her mind.",
    "She wished for water, and a spring burst from the stones. Samira returned home with two wishes still bottled, yet she never used them. She had discovered that an unused wish gathers dust, while a generous one becomes a river.",
  ],
  13: [
    "One evening, seven children climbed the hill and each chose a chimney. Six dreamed of treasure, flight, feasts, faraway cities, talking animals, and endless summer. The youngest, Petru, chose the gold smoke and dreamed that the valley’s beloved mayor was secretly afraid.",
    "The next day Petru visited the mayor, who confessed that he could not read the important letter on his desk. He had hidden the truth for years. Petru promised to teach him, just as the mayor had once taught Petru to plant apple trees.",
    "When the lessons were done, the house on the hill disappeared. In its place stood seven young trees, one for each dream. The gold tree bore no fruit, but people rested beneath it whenever they needed courage to tell the truth.",
  ],
  14: [
    "At the summit, Amaya found Dawn tangled in a net of shadows. A great condor guarded the knots. He would free the morning only if she could give him something more beautiful than sunrise.",
    "Amaya had no jewels, so she sang the shepherding song her father had taught her. It held the sound of bells, warm kitchens, and sleepy lambs. The condor had flown over every sunrise, but he had never heard a song about home. He opened his claws.",
    "Dawn spread across the sky in pink and gold. As thanks, she tucked one ray of light into Amaya’s shawl. The girl used it only once, many winters later, to warm a lost lamb. Even now, shepherds say the first golden line on the mountain is Dawn remembering her brave friend.",
  ],
  15: [
    "For seven evenings Pema left milk near the tiger’s cave and told a story from a safe distance. On the eighth, the tiger sat outside to listen. On the ninth, he drank. On the tenth, he rested his great head beside her.",
    "Pema reached for the golden whisker, then stopped. She explained that she needed it to heal her brother’s anger after he returned from war. The tiger laughed softly. “You crossed a mountain with patience,” he said. “Use the same medicine at home.” Still, he gave her the whisker freely.",
    "Pema kept it above the hearth but never touched it. Each evening she brought her brother tea, sat nearby, and waited. Slowly he began to speak. By spring he smiled again. Pema returned the whisker to the tiger, having learned that patience was the magic all along.",
  ],
  16: [
    "When Sofia’s bell first rang, its voice rolled across the bay. With every note, words appeared in the air: promises of fair taxes, safe roads, and bread in winter—all spoken by the king and forgotten.",
    "The king ordered the bell destroyed, but no hammer could crack it. The townspeople gathered beneath the tower and repeated the floating words until the whole coast echoed. At last the king understood that silence could not be commanded once truth had found a voice.",
    "He kept each promise, one by one. Sofia became the royal bellmaker, though she refused to live at court. Her truth bell still hangs above Bellacqua. It rings only rarely now, but rulers everywhere are said to hear a faint chime whenever they are tempted to forget their word.",
  ],
  17: [
    "The feathers led Tui to a hidden cove where the missing birds huddled beneath an overhang. The storm had carried their songs away and sealed them inside a giant shell at the water’s edge.",
    "Tui pressed the shell to her ear. Instead of breaking it, she sang one clear note into its spiral. The shell answered with two, then ten, then a thousand. It opened like a flower and released every stolen song.",
    "Birds swept over the hills, scattering white feathers as they flew. Tui returned home along a road filled with music. From then on, the valley began each morning by listening before speaking, so no song—however small—would ever be taken for granted again.",
  ],
  18: [
    "The moon told Kavya that it was not trapped at all; it was reflected in a bowl of water hidden among the leaves. A thirsty owl had carried the bowl there and could not tip it without spilling the moon.",
    "Kavya climbed slowly, brought the bowl down, and placed it beside the well. The owl drank, and the moon rose unharmed into the sky. The villagers lowered their ladders and nets, feeling a little foolish.",
    "The village headman offered Kavya a silver coin for solving the mystery. She asked instead for a bench beneath the mango tree. Every evening after that, people gathered there to listen before trying to fix what they did not understand. The moon often joined them, shining quietly through the branches.",
  ],
};

const categories = [
  "All tales",
  "Enchanted",
  "Forest",
  "Magic",
  "Kingdoms",
  "Sea & Sky",
  "Creatures",
  "Journeys",
];

function BookmarkIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.5 4.8A1.8 1.8 0 0 1 8.3 3h7.4a1.8 1.8 0 0 1 1.8 1.8V21L12 17.4 6.5 21V4.8Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h13M14 7l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function App() {
  const [category, setCategory] = useState("All tales");
  const [saved, setSaved] = useState<number[]>([]);
  const [reading, setReading] = useState<Story | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleStories = useMemo(
    () =>
      category === "All tales"
        ? stories.slice(1)
        : stories.filter((story) => story.category === category),
    [category],
  );
  const renderedStories = visibleStories.slice(0, visibleCount);

  const chooseCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    setVisibleCount(6);
  };

  const toggleSaved = (id: number) => {
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Once Upon home">
          <span className="brand-mark">O</span>
          <span>
            <strong>Once Upon</strong>
            <small>A library of wonder</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a className="active" href="#tales">
            Tales
          </a>
          <a href="#collections">Collections</a>
          <a href="#about">About</a>
        </nav>
        <button className="saved-button" type="button" onClick={() => chooseCategory("All tales")}>
          <BookmarkIcon filled={saved.length > 0} />
          <span>Saved</span>
          {saved.length > 0 && <b>{saved.length}</b>}
        </button>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div
          className="hero-image"
          role="img"
          aria-label="Ancient castle rising above a misty forest"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">
            <span /> Today’s featured tale
          </p>
          <h1 id="hero-title">
            The Glass
            <br />
            Mountain
          </h1>
          <p className="hero-description">{stories[0].excerpt}</p>
          <div className="hero-meta">
            <span>{stories[0].origin}</span>
            <i />
            <span>{stories[0].time}</span>
          </div>
          <button className="read-button" type="button" onClick={() => setReading(stories[0])}>
            Begin the tale <ArrowIcon />
          </button>
        </div>
        <p className="photo-credit">Photo by Tim Rebkavets / Unsplash</p>
        <div className="hero-index" aria-hidden="true">
          <span>01</span>
          <i />
          <span>18</span>
        </div>
      </section>

      <section className="library" id="tales">
        <div className="library-heading">
          <div>
            <p className="section-kicker">Stories for slow evenings</p>
            <h2>Choose your next adventure</h2>
          </div>
          <p>
            Old stories, lovingly gathered from every corner of the world. Best enjoyed with a warm
            drink and nowhere else to be.
          </p>
        </div>

        <div className="filters" role="group" aria-label="Filter tales">
          {categories.map((item) => (
            <button
              className={category === item ? "selected" : ""}
              data-category={item}
              key={item}
              type="button"
              onClick={() => chooseCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="story-grid" id="collections">
          {renderedStories.map((story) => (
            <article className="story-card" data-category={story.category} key={story.id}>
              <button
                className="story-image"
                type="button"
                onClick={() => setReading(story)}
                aria-label={`Read ${story.title}`}
              >
                <img src={story.image} alt="" />
                <span className="card-category">{story.category}</span>
              </button>
              <div className="card-body">
                <div className="card-meta">
                  <span>{story.origin}</span>
                  <i />
                  <span>{story.time}</span>
                </div>
                <h3>{story.title}</h3>
                <p>{story.excerpt}</p>
                <div className="card-actions">
                  <button className="text-button" type="button" onClick={() => setReading(story)}>
                    Read story <ArrowIcon />
                  </button>
                  <button
                    className={`bookmark ${saved.includes(story.id) ? "is-saved" : ""}`}
                    type="button"
                    onClick={() => toggleSaved(story.id)}
                    aria-label={
                      saved.includes(story.id)
                        ? `Remove ${story.title} from saved`
                        : `Save ${story.title}`
                    }
                  >
                    <BookmarkIcon filled={saved.includes(story.id)} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {visibleStories.length === 0 && (
          <p className="empty-state">More tales from this collection are coming soon.</p>
        )}
        {visibleCount < visibleStories.length && (
          <div className="load-more-wrap">
            <p>
              Showing {renderedStories.length} of {visibleStories.length} tales
            </p>
            <button type="button" onClick={() => setVisibleCount((count) => count + 6)}>
              Discover more stories <ArrowIcon />
            </button>
          </div>
        )}
      </section>

      <section className="quote-section" id="about">
        <span className="ornament">✦</span>
        <blockquote>
          “If you want your children to be intelligent, read them fairy tales. If you want them to
          be more intelligent, read them more fairy tales.”
        </blockquote>
        <p>Albert Einstein</p>
      </section>

      <footer>
        <a className="brand footer-brand" href="#">
          <span className="brand-mark">O</span>
          <span>
            <strong>Once Upon</strong>
            <small>A library of wonder</small>
          </span>
        </a>
        <p>For curious minds, young and old.</p>
        <p>© 2025 Once Upon</p>
      </footer>

      {reading && (
        <div className="reader-backdrop" role="presentation" onMouseDown={() => setReading(null)}>
          <article
            className="reader"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reader-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              className="reader-close"
              type="button"
              onClick={() => setReading(null)}
              aria-label="Close story"
            >
              ×
            </button>
            <p className="section-kicker">
              {reading.origin} · {reading.time}
            </p>
            <h2 id="reader-title">{reading.title}</h2>
            <div className="reader-rule">
              <span>✦</span>
            </div>
            {[...reading.text, ...storyEndings[reading.id]].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="continued">The End</p>
          </article>
        </div>
      )}
    </main>
  );
}
