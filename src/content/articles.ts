/**
 * INSPIRATION / GUIDES — maps to an `article` document type in the CMS.
 *
 * These are written to be genuinely useful to somebody deciding what floor to
 * buy. They are not SEO filler: no article restates the same advice with a
 * different keyword, and none of them claims anything about how RABS trades
 * (prices, guarantees, free measuring) that has not been confirmed.
 */

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

export interface Article {
  slug: string;
  title: string;
  /** Card + meta description. One sentence. */
  excerpt: string;
  category: "Flooring advice" | "Furniture advice" | "Buying guide";
  /** Asset slot under /public/media/ */
  image: string;
  readMinutes: number;
  published: string;
  updated: string | null;
  intro: string;
  sections: ArticleSection[];
  /** Where the reader should go next. */
  cta: { label: string; href: string };
}

export const articles: Article[] = [
  {
    slug: "carpet-vs-lvt",
    title: "Carpet or LVT? An honest comparison",
    excerpt:
      "The two most popular floors we sell, and a straight answer on which suits which room.",
    category: "Flooring advice",
    image: "flooring/carpets",
    readMinutes: 4,
    published: "2026-02-10",
    updated: null,
    intro:
      "Most people arrive at the showroom having narrowed it down to these two. They are not really competitors — they solve different problems — but here is how to decide.",
    sections: [
      {
        heading: "Where carpet wins",
        paragraphs: [
          "Warmth and quiet. A carpeted bedroom feels different the moment you step out of bed, and a carpeted staircase is dramatically quieter than a hard one — which matters more than people expect in a house with children or shift workers.",
          "Carpet is also more forgiving of a subfloor that is not perfectly flat, and it is usually the cheaper option to get a room finished.",
        ],
      },
      {
        heading: "Where LVT wins",
        paragraphs: [
          "Anywhere that gets wet or dirty. Kitchens, hallways, utility rooms and bathrooms are LVT territory, because spills wipe off and mud does not sink in.",
          "It also handles pets far better. Claws do not pull at it, and accidents clean up completely rather than leaving something behind in the pile.",
        ],
      },
      {
        heading: "The honest cost comparison",
        paragraphs: [
          "Carpet is generally cheaper to buy and quicker to fit. LVT often costs more up front, partly because the subfloor usually needs proper preparation first — and that preparation is not optional.",
          "Over a long period the sums can even out, because a hard floor in a hallway will typically outlast a carpet in the same spot. But be wary of anyone presenting that as a guarantee: it depends entirely on the product and the traffic.",
        ],
      },
      {
        heading: "What most people actually do",
        paragraphs: [
          "The common answer in a typical family home is both: LVT downstairs through the hallway, kitchen and living space, carpet on the stairs and in the bedrooms. It plays to each material's strengths and it is how a large share of whole-house jobs end up specified.",
        ],
      },
    ],
    cta: { label: "Talk it through with us", href: "/get-a-quote" },
  },
  {
    slug: "best-flooring-for-stairs",
    title: "The best flooring for stairs",
    excerpt: "Stairs wear faster than any other floor in the house. Here is how to specify them.",
    category: "Flooring advice",
    image: "flooring/carpets",
    readMinutes: 3,
    published: "2026-02-18",
    updated: null,
    intro:
      "Every trip up and down the house concentrates onto the same narrow strip of each step. If you are going to spend money anywhere, spend it here.",
    sections: [
      {
        heading: "Durability first, colour second",
        paragraphs: [
          "A hard-wearing twist pile is the standard recommendation for a reason. It holds its shape on the nose of the step, which is where a softer pile flattens and starts to look tired first.",
        ],
      },
      {
        heading: "Mid-tones hide the most",
        paragraphs: [
          "Very light carpet shows every mark on a staircase. Very dark carpet shows dust and lint. A mid-tone grey, beige or brown is the practical middle ground, which is why it is what most people end up choosing.",
        ],
      },
      {
        heading: "Underlay matters more on stairs than anywhere",
        paragraphs: [
          "The underlay takes the impact of every footfall. A good one noticeably extends how long the carpet keeps its appearance, and it makes the stairs quieter and safer underfoot.",
        ],
      },
      {
        heading: "A word on hard floors on stairs",
        paragraphs: [
          "Laminate and LVT can be used on stairs, and done well they look excellent. But they need proper stair nosings, careful fitting and an honest conversation about slip resistance — particularly in a house with young children or older relatives. It is a specialist job rather than a straightforward one.",
        ],
      },
    ],
    cta: { label: "Get a quote for your stairs", href: "/get-a-quote?interest=flooring" },
  },
  {
    slug: "best-flooring-for-pets",
    title: "The best flooring if you have pets",
    excerpt: "Claws, accidents and shedding — what actually holds up, and what does not.",
    category: "Flooring advice",
    image: "flooring/lvt",
    readMinutes: 3,
    published: "2026-03-02",
    updated: null,
    intro:
      "Pets are hard on floors in three specific ways, and the right choice depends on which of the three is your real problem.",
    sections: [
      {
        heading: "Scratching",
        paragraphs: [
          "Claws are the main enemy of a soft wood finish and of loop-pile carpet, where a claw can catch and pull a loop into a run. A twist pile or a good LVT with a decent wear layer both cope far better.",
        ],
      },
      {
        heading: "Accidents",
        paragraphs: [
          "This is where hard flooring is simply in a different league. Anything that gets into carpet backing or underlay is very difficult to fully remove. If you have a young or elderly animal, LVT or vinyl in the main areas will save you a great deal of grief.",
        ],
      },
      {
        heading: "Hair and grip",
        paragraphs: [
          "Hard floors show hair more but clean completely in seconds. One thing worth thinking about: some dogs, especially older or larger ones, slip on very smooth floors. A textured LVT gives noticeably more grip than a high-gloss finish.",
        ],
      },
      {
        heading: "A practical compromise",
        paragraphs: [
          "Hard flooring where the animal spends its day and walks in from outside; carpet in the bedrooms where they are less often. It is the arrangement most pet owners settle on.",
        ],
      },
    ],
    cta: { label: "See LVT in the showroom", href: "/flooring/lvt" },
  },
  {
    slug: "how-much-flooring-do-i-need",
    title: "How much flooring do I need?",
    excerpt: "A straightforward method for working out roughly what a room will take.",
    category: "Buying guide",
    image: "flooring/laminate",
    readMinutes: 3,
    published: "2026-03-14",
    updated: null,
    intro:
      "You do not need to be exact to get a useful ballpark. Here is how to get close enough to have a sensible conversation about budget.",
    sections: [
      {
        heading: "The basic sum",
        paragraphs: [
          "Measure the length and the width of the room at the widest points, in metres, and multiply them. That gives you the floor area in square metres. For an L-shaped room, split it into two rectangles and add them together.",
        ],
      },
      {
        heading: "Then add for waste",
        paragraphs: [
          "No floor is laid with zero waste. Adding roughly ten percent is a reasonable working assumption for a simple room. Patterned carpet, herringbone LVT and awkward shapes all need more, because the pattern has to line up and offcuts cannot always be reused.",
        ],
      },
      {
        heading: "Do not forget the bits that are not the floor",
        paragraphs: [
          "Underlay, gripper, beading, door bars and any subfloor preparation are all part of the real cost of a finished floor. A quote that only covers the covering itself is not comparing like with like.",
        ],
      },
      {
        heading: "Why we still measure",
        paragraphs: [
          "Your own measurement is perfect for planning a budget. It is not what we order from. Doorways, recesses, chimney breasts and the direction the material has to run all change the amount needed, so the ordering figure comes from a proper measure.",
        ],
        bullets: [
          "Length × width = area in m²",
          "Add around 10% for waste on a simple room",
          "Add more for patterns, herringbone and awkward shapes",
          "Budget separately for underlay, bars and preparation",
        ],
      },
    ],
    cta: { label: "Book a measure", href: "/get-a-quote?measure=true" },
  },
  {
    slug: "how-to-choose-carpet-colour",
    title: "How to choose a carpet colour you will still like",
    excerpt: "Why samples look different at home, and how to test one properly.",
    category: "Buying guide",
    image: "flooring/carpets",
    readMinutes: 3,
    published: "2026-03-25",
    updated: null,
    intro:
      "Colour is where most carpet regret comes from, and it is almost always for the same reason: the decision was made under the wrong light.",
    sections: [
      {
        heading: "Take the sample home",
        paragraphs: [
          "Showroom lighting is bright and even. Your living room is not. Put the sample down on the actual floor, in the actual room, and look at it in the morning, in the afternoon and under your own lights in the evening.",
        ],
      },
      {
        heading: "Look at it flat, not held up",
        paragraphs: [
          "Carpet held vertically catches the light completely differently from carpet lying on the floor. Always judge it flat, and walk past it a few times rather than staring at it.",
        ],
      },
      {
        heading: "Which way does the room face?",
        paragraphs: [
          "A north-facing room gets cooler light and can make grey read as blue or flat. A south-facing room warms everything up. This is why the same carpet genuinely does look different in two houses on the same street.",
        ],
      },
      {
        heading: "Be honest about the household",
        paragraphs: [
          "A pale cream carpet in a hallway with children and a dog is a decision you will revisit. It is not that it cannot be done — it is that you should choose it knowing what it will ask of you.",
        ],
      },
    ],
    cta: { label: "See carpets in person", href: "/flooring/carpets" },
  },
  {
    slug: "how-to-choose-a-sofa-size",
    title: "How to choose a sofa that fits",
    excerpt: "Measure the route in, not just the room. The most common furniture mistake.",
    category: "Furniture advice",
    image: "furniture/sofas",
    readMinutes: 3,
    published: "2026-04-06",
    updated: null,
    intro:
      "Almost every sofa problem is a measuring problem, and almost none of them are about the room itself.",
    sections: [
      {
        heading: "Measure the narrowest point on the way in",
        paragraphs: [
          "The front door, the hallway, the turn at the bottom of the stairs, the living room doorway. A sofa that fits the room beautifully is no use if it will not come through the hall. Measure the tightest point and the diagonal of any turn.",
        ],
      },
      {
        heading: "Then plan the room around it",
        paragraphs: [
          "Leave a walkway of roughly 60–75cm where people need to get past, and around 40–45cm between the sofa and a coffee table. Mark the sofa's footprint out on the floor with masking tape — it takes five minutes and it is remarkably revealing.",
        ],
      },
      {
        heading: "Corner sofas and which way round",
        paragraphs: [
          "A corner unit is usually handed left or right, and getting it the wrong way round is a genuinely expensive mistake. Work out which way the corner needs to face while you are standing in the room, not in the shop.",
        ],
      },
      {
        heading: "Sit on it. Properly.",
        paragraphs: [
          "Not perched on the edge for ten seconds. Sit the way you actually sit at home, for a few minutes, with whoever else uses it. Seat depth and back height are personal, and the showroom is the only place to find out.",
        ],
      },
    ],
    cta: { label: "Try sofas in the showroom", href: "/furniture/sofas" },
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const articleCategories = [
  "Flooring advice",
  "Furniture advice",
  "Buying guide",
] as const;
