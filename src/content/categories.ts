/**
 * CATEGORY TAXONOMY — maps to a `category` document type in the CMS.
 *
 * Each flooring category carries its own bespoke editorial: a distinct hero,
 * its own buying guidance, its own room advice, its own FAQs. These pages are
 * deliberately NOT one template with the keyword swapped — that is the single
 * biggest tell of a cheap local-business site, and Google treats it as such.
 *
 * Copy discipline: material properties (water resistance, underfoot feel,
 * construction) are general product facts and safe to state. Anything specific
 * to how RABS trades — brands stocked, prices, guarantees, free measuring — is
 * omitted until confirmed. See docs/CLIENT-CONFIRMATION.md.
 */

export type CategoryGroup = "flooring" | "furniture" | "blinds";

export interface BuyingPoint {
  title: string;
  body: string;
}

export interface RoomFit {
  room: string;
  verdict: "great" | "good" | "consider";
  note: string;
}

export interface CategoryFaq {
  q: string;
  a: string;
}

export interface Category {
  slug: string;
  group: CategoryGroup;
  /** Nav + card label. */
  name: string;
  /** Page H1 — set as two lines for the display lockup. */
  headline: [string, string];
  /** Card one-liner. Short, plain, no adjective soup. */
  strapline: string;
  /** Lead paragraph under the H1. */
  intro: string;
  /** Asset slot id — resolves to /public/media/<group>/<slug>.jpg when supplied. */
  image: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  /** Editorial */
  buying: BuyingPoint[];
  rooms: RoomFit[];
  faqs: CategoryFaq[];
  /** Shown in the "browse by" filter rail. Presentational only until a catalogue exists. */
  filters?: { label: string; options: string[] }[];
  /** Why this one is worth seeing in person rather than online. */
  showroomReason: string;
}

/* ========================================================================== */
/* FLOORING                                                                   */
/* ========================================================================== */

export const flooringCategories: Category[] = [
  {
    slug: "carpets",
    group: "flooring",
    name: "Carpets",
    headline: ["Carpets for", "every home."],
    strapline: "Soft underfoot, warm in winter, quiet on the stairs.",
    intro:
      "Carpet is still the most comfortable floor you can put in a bedroom or a living room — and the choice is far wider than most people expect. Come and walk on it before you decide.",
    image: "flooring/carpets",
    metaTitle: "Carpets in Stoke-on-Trent | Carpet Shop | RABS",
    metaDescription:
      "Browse carpets at the RABS Flooring showroom in Stoke-on-Trent. Supply only or supply and fit, with advice on the right carpet for stairs, bedrooms and living rooms.",
    buying: [
      {
        title: "Pile height changes everything",
        body: "A deep, soft pile feels wonderful in a bedroom but shows every footprint in a hallway. A shorter, denser pile takes daily traffic far better and holds its look for longer. It is worth being honest about which rooms get hammered.",
      },
      {
        title: "Twist pile vs loop pile",
        body: "Twist pile is the safe all-rounder — hard-wearing and forgiving on stairs. Loop pile gives a flatter, more textured finish that suits a modern room, though pets with claws can pull at the loops.",
      },
      {
        title: "Underlay is not the place to save money",
        body: "Good underlay makes a mid-range carpet feel expensive, adds insulation, and meaningfully extends how long the carpet lasts. Skimping here is the most common regret we hear about.",
      },
      {
        title: "Colour looks different at home",
        body: "Showroom lighting, daylight and your own bulbs will all read differently. Take a sample home and look at it in the actual room, morning and evening, before you commit.",
      },
    ],
    rooms: [
      { room: "Bedrooms", verdict: "great", note: "Warm and quiet — the classic carpet room. You can go softer here because traffic is low." },
      { room: "Living rooms", verdict: "great", note: "Choose a denser pile if the room gets constant use, especially with kids." },
      { room: "Stairs & landing", verdict: "good", note: "Stairs take the heaviest wear in the house. Go for a hard-wearing twist pile and a proper underlay." },
      { room: "Hallways", verdict: "consider", note: "Doable with the right specification, but a hard floor handles wet shoes and mud better." },
      { room: "Kitchens & bathrooms", verdict: "consider", note: "Not where carpet belongs. Look at LVT or vinyl instead." },
    ],
    faqs: [
      {
        q: "What carpet is best for stairs?",
        a: "A hard-wearing twist pile in a mid-tone colour is the usual answer. Stairs concentrate more wear into a small area than anywhere else in the house, and a mid-tone hides day-to-day marks far better than very light or very dark shades.",
      },
      {
        q: "Can you fit carpet over floorboards?",
        a: "Usually yes, provided the boards are sound and level. Loose or uneven boards need attention first, otherwise you will feel and eventually see every gap through the carpet. We can assess this when we measure.",
      },
      {
        q: "How long does carpet fitting take?",
        a: "Most single rooms are a same-day job. A full house takes longer and depends on the layout, the amount of furniture to move and whether the subfloor needs preparing. We will give you a realistic timescale with your quote.",
      },
    ],
    filters: [
      { label: "Colour", options: ["Grey", "Beige", "Cream", "Brown", "Charcoal", "Blue", "Green"] },
      { label: "Style", options: ["Twist pile", "Loop pile", "Saxony", "Berber", "Patterned"] },
      { label: "Room", options: ["Bedroom", "Living room", "Stairs", "Hallway", "Whole house"] },
    ],
    showroomReason:
      "Carpet is the one floor you genuinely have to feel. Two samples that look identical on screen can feel completely different underfoot.",
  },
  {
    slug: "lvt",
    group: "flooring",
    name: "LVT",
    headline: ["LVT. Realistic", "and hard-wearing."],
    strapline: "The look of wood or stone, built for real family life.",
    intro:
      "Luxury vinyl tile has become the default choice for kitchens, hallways and open-plan spaces — and once you see a good one down, it is easy to understand why.",
    image: "flooring/lvt",
    metaTitle: "LVT Flooring Stoke-on-Trent | Luxury Vinyl | RABS",
    metaDescription:
      "LVT flooring at the RABS Flooring showroom in Stoke-on-Trent. See wood and stone-effect luxury vinyl tile in person, with supply-only or fitted options.",
    buying: [
      {
        title: "What LVT actually is",
        body: "Individual planks or tiles built in layers: a photographic design layer that reproduces wood or stone, a tough transparent wear layer over the top, and a stable core underneath. It is not a single sheet — it is laid piece by piece, which is why the finish looks convincing.",
      },
      {
        title: "The wear layer is the number that matters",
        body: "Thickness of the clear top layer is the honest guide to how long an LVT will keep looking new. A thicker wear layer costs more and earns it back in a busy hallway or kitchen. In a quiet bedroom you do not need to pay for the maximum.",
      },
      {
        title: "Click or glue-down",
        body: "Click LVT floats over the subfloor and is quicker to lay. Glue-down bonds directly and generally feels more solid underfoot, and copes better with underfloor heating and large open spans. The right answer depends on your subfloor.",
      },
      {
        title: "Your subfloor has to be flat",
        body: "This is the part people underestimate. LVT is thin, so any bump or dip beneath it will telegraph straight through. Proper preparation is most of the difference between a good LVT floor and a disappointing one.",
      },
    ],
    rooms: [
      { room: "Kitchens", verdict: "great", note: "Handles spills, steam and dropped pans without complaint." },
      { room: "Hallways", verdict: "great", note: "Wet shoes, prams and muddy paws all wipe straight off." },
      { room: "Living rooms", verdict: "great", note: "Warmer and quieter underfoot than laminate, especially with the right underlay." },
      { room: "Bathrooms", verdict: "good", note: "Water resistant and a sensible choice, provided the edges are detailed properly." },
      { room: "Bedrooms", verdict: "good", note: "Works well, though many people still prefer carpet for the warmth first thing in the morning." },
    ],
    faqs: [
      {
        q: "Is LVT better than laminate?",
        a: "For water resistance and underfoot feel, generally yes — which is why it dominates kitchens and hallways. Laminate can still be the better value choice in a dry room on a tighter budget. They are different tools rather than one being simply better.",
      },
      {
        q: "Is LVT suitable for underfloor heating?",
        a: "Most LVT is, but there are temperature limits and the specification varies by product. If you have underfloor heating, tell us at the quote stage so we only put suitable products in front of you.",
      },
      {
        q: "How do you clean LVT?",
        a: "Sweep or vacuum, then a damp mop. Avoid steam cleaners and harsh abrasives, which can damage the wear layer over time.",
      },
    ],
    filters: [
      { label: "Effect", options: ["Oak", "Walnut", "Grey wood", "Stone", "Herringbone", "Concrete"] },
      { label: "Format", options: ["Plank", "Tile", "Herringbone"] },
      { label: "Fitting", options: ["Click", "Glue-down"] },
    ],
    showroomReason:
      "Photographs flatten LVT. In person you can see the embossing, the bevel and how the pattern repeats — which is exactly what separates a convincing floor from an obvious one.",
  },
  {
    slug: "laminate",
    group: "flooring",
    name: "Laminate",
    headline: ["Laminate. Smart", "value, real style."],
    strapline: "A hard-wearing wood look that does not need a big budget.",
    intro:
      "Laminate has moved on a long way. Modern boards have deeper texture, better joints and far more convincing grain than the shiny planks people remember from years ago.",
    image: "flooring/laminate",
    metaTitle: "Laminate Flooring Stoke-on-Trent | RABS",
    metaDescription:
      "Laminate flooring at the RABS Flooring showroom in Stoke-on-Trent. Hard-wearing wood-effect boards, supply only or fitted by our team.",
    buying: [
      {
        title: "AC rating tells you the durability",
        body: "Laminate is graded for abrasion resistance. A lower grade is fine for a spare bedroom; a busy family hallway wants a higher one. It is a simple, honest number and worth asking about.",
      },
      {
        title: "Thickness is about feel, not just wear",
        body: "A thicker board sits more solidly and sounds less hollow when you walk on it. Combined with decent underlay, it is the difference between a floor that feels cheap and one that does not.",
      },
      {
        title: "Water is still laminate’s weak point",
        body: "Water-resistant laminates exist and are genuinely better than older boards, but a standing spill left overnight can still swell the core. In a kitchen or bathroom, LVT is the safer specification.",
      },
      {
        title: "Expansion gaps are not optional",
        body: "Laminate moves with temperature and humidity. It needs a gap at the perimeter, hidden by beading or skirting. Fitting it tight to the wall is the classic mistake that causes boards to lift later.",
      },
    ],
    rooms: [
      { room: "Living rooms", verdict: "great", note: "Warm-looking, easy to clean and easy on the budget." },
      { room: "Bedrooms", verdict: "great", note: "Plenty durable for the traffic a bedroom sees." },
      { room: "Hallways", verdict: "good", note: "Fine with a higher wear rating and a doormat to catch grit." },
      { room: "Kitchens", verdict: "consider", note: "Only with a genuinely water-resistant product — otherwise choose LVT." },
      { room: "Bathrooms", verdict: "consider", note: "Not recommended. Standing water and laminate do not mix." },
    ],
    faqs: [
      {
        q: "How long does laminate flooring last?",
        a: "It depends far more on the grade and the traffic than on the brand. A well-specified laminate in a normal living room can look good for many years; the same board in a busy hallway with grit walked in daily will wear faster.",
      },
      {
        q: "Can laminate be laid over existing floors?",
        a: "Often yes, over a sound, flat, dry subfloor with the correct underlay. Over existing carpet, no. We will check what you have when we measure.",
      },
      {
        q: "Is laminate noisy?",
        a: "It can be, particularly on a suspended floor. A good acoustic underlay makes a noticeable difference and is a small addition to the overall cost.",
      },
    ],
    filters: [
      { label: "Effect", options: ["Light oak", "Natural oak", "Dark wood", "Grey", "Whitewashed"] },
      { label: "Format", options: ["Plank", "Wide plank", "Herringbone"] },
      { label: "Finish", options: ["Matt", "Textured", "Embossed"] },
    ],
    showroomReason:
      "Grain texture and joint quality are what make a laminate look expensive or cheap, and neither shows up properly in a photograph.",
  },
  {
    slug: "vinyl",
    group: "flooring",
    name: "Vinyl",
    headline: ["Vinyl. Practical,", "waterproof, easy."],
    strapline: "Sheet vinyl — warm, quiet and genuinely waterproof.",
    intro:
      "Sheet vinyl remains one of the most sensible floors you can buy for a bathroom, kitchen or utility. It is waterproof across the whole surface, soft underfoot and quick to fit.",
    image: "flooring/vinyl",
    metaTitle: "Vinyl Flooring Stoke-on-Trent | Sheet Vinyl | RABS",
    metaDescription:
      "Vinyl flooring at the RABS Flooring showroom in Stoke-on-Trent. Waterproof sheet vinyl for kitchens, bathrooms and utility rooms, supply only or fitted.",
    buying: [
      {
        title: "Fewer joints means fewer problems",
        body: "Because sheet vinyl is laid as a single piece wherever the room allows, there is nowhere for water to get through. In a bathroom that is a real practical advantage over any tile or plank format.",
      },
      {
        title: "Cushioned backing changes the feel",
        body: "A cushioned vinyl is warmer and quieter to stand on — which matters in a kitchen where you are on your feet. It also forgives small subfloor imperfections better than a thin vinyl.",
      },
      {
        title: "Slip resistance is worth asking about",
        body: "Some vinyls carry a slip-resistance rating. If the floor is for a bathroom, a utility, or a home where somebody is unsteady on their feet, say so and we will point you at the right products.",
      },
      {
        title: "Measure generously",
        body: "Vinyl is cut from a roll, so awkward room shapes, door recesses and alcoves affect how much you need. Accurate measuring is what keeps waste — and cost — down.",
      },
    ],
    rooms: [
      { room: "Bathrooms", verdict: "great", note: "Waterproof, warm underfoot and simple to keep clean." },
      { room: "Kitchens", verdict: "great", note: "Spills wipe away and a cushioned backing is kind on your feet." },
      { room: "Utility rooms", verdict: "great", note: "Handles washing machine leaks and muddy boots without drama." },
      { room: "Hallways", verdict: "good", note: "Practical and inexpensive, though LVT gives a more premium finish." },
      { room: "Living rooms", verdict: "consider", note: "Perfectly serviceable, but most people prefer carpet or LVT here." },
    ],
    faqs: [
      {
        q: "What is the difference between vinyl and LVT?",
        a: "Vinyl comes as a continuous sheet cut to the room. LVT comes as individual planks or tiles laid piece by piece. Vinyl wins on outright waterproofing and price; LVT wins on realism and the premium feel of the finished floor.",
      },
      {
        q: "Is vinyl flooring warm?",
        a: "Warmer than tile, yes — especially a cushioned vinyl. It is one of the reasons it stays popular in bathrooms where a cold floor first thing in the morning is unwelcome.",
      },
      {
        q: "Can vinyl be laid over tiles?",
        a: "Sometimes, but grout lines can show through over time. A levelling compound or hardboard overlay usually gives a much better result. We will advise when we see the room.",
      },
    ],
    filters: [
      { label: "Effect", options: ["Wood", "Tile", "Stone", "Plain", "Patterned"] },
      { label: "Backing", options: ["Cushioned", "Standard"] },
      { label: "Room", options: ["Bathroom", "Kitchen", "Utility", "Hallway"] },
    ],
    showroomReason:
      "Modern vinyl has come a very long way from the sheet flooring people remember. Seeing a roll in person tends to change minds.",
  },
];

/* ========================================================================== */
/* FURNITURE                                                                  */
/* ========================================================================== */

export const furnitureCategories: Category[] = [
  {
    slug: "sofas",
    group: "furniture",
    name: "Sofas",
    headline: ["Sofas you can", "actually sit on."],
    strapline: "Corner suites, three-piece sets and everything between.",
    intro:
      "A sofa is the one piece of furniture your whole household uses every single day. Buying it from a photograph is how people end up disappointed.",
    image: "furniture/sofas",
    metaTitle: "Sofas in Stoke-on-Trent | Corner Suites | RABS",
    metaDescription:
      "Sofas, corner suites and three-piece sets at the RABS showroom in Stoke-on-Trent. Come and try them, or enquire about a piece you have seen.",
    buying: [
      {
        title: "Measure the route, not just the room",
        body: "The most common problem is not the room — it is the doorway, the stairwell or the turn on the landing. Measure the narrowest point on the way in before you fall in love with a corner unit.",
      },
      {
        title: "Seat depth decides the comfort",
        body: "A deep seat is wonderful for lounging and awkward for anyone who likes to sit upright. If several people of different heights use it, sit on it together before deciding.",
      },
      {
        title: "Fabric versus leather is a lifestyle question",
        body: "Leather wipes clean and ages well. Fabric is warmer to sit on and offers far more colour. Pets, small children and how much sunlight the room gets should all feed into the answer.",
      },
      {
        title: "Think about the floor underneath",
        body: "This is where buying flooring and furniture in the same place genuinely helps — we can look at the sofa and the floor together instead of hoping two separate purchases work out.",
      },
    ],
    rooms: [
      { room: "Living rooms", verdict: "great", note: "Take the room measurements with you — including where the doors and radiators are." },
      { room: "Snugs & second rooms", verdict: "great", note: "A two-seater or a compact corner often suits these better than a full suite." },
      { room: "Open-plan spaces", verdict: "good", note: "A corner unit can zone an open-plan room very effectively." },
    ],
    faqs: [
      {
        q: "Can I see a sofa before I buy it?",
        a: "That is exactly what the showroom is for. Come and sit on it, check the depth and see the fabric in daylight.",
      },
      {
        q: "Do you deliver furniture?",
        a: "Speak to the team about delivery for your address and the item you are interested in — we will give you the specifics rather than a blanket promise.",
      },
    ],
    filters: [
      { label: "Type", options: ["Corner sofa", "3 seater", "2 seater", "Sofa bed", "Recliner", "Armchair"] },
      { label: "Material", options: ["Fabric", "Leather", "Velvet", "Chenille"] },
      { label: "Colour", options: ["Grey", "Cream", "Charcoal", "Blue", "Green", "Brown"] },
    ],
    showroomReason:
      "Nobody has ever regretted sitting on a sofa before buying it. Comfort is not something a product photograph can tell you.",
  },
  {
    slug: "beds",
    group: "furniture",
    name: "Beds",
    headline: ["Beds, frames", "and mattresses."],
    strapline: "From simple divans to statement upholstered frames.",
    intro:
      "You will spend more hours on this than any other purchase in the house. It is worth ten minutes of lying on it in the showroom.",
    image: "furniture/beds",
    metaTitle: "Beds & Mattresses in Stoke-on-Trent | RABS",
    metaDescription:
      "Bed frames, divans and mattresses at the RABS showroom in Stoke-on-Trent. See them in person and talk to the team about what suits you.",
    buying: [
      {
        title: "Frame style changes the room",
        body: "An upholstered headboard softens a room and adds height; a low divan keeps things simple and leaves more visual space. In a smaller bedroom, that difference matters more than people expect.",
      },
      {
        title: "Storage is worth planning for",
        body: "Ottoman and drawer divans reclaim a lot of space in a house short on cupboards. Just check there is clearance for the lift or the drawers to open.",
      },
      {
        title: "Firmness is personal, not universal",
        body: "There is no single correct firmness. It depends on your weight, how you sleep and who else is in the bed. Trying a few is the only reliable method.",
      },
      {
        title: "Check the ceiling and the doorway",
        body: "Tall headboards and sloped ceilings do not always agree, and a made-up king divan base does not bend around a tight landing. Measure first.",
      },
    ],
    rooms: [
      { room: "Main bedrooms", verdict: "great", note: "Where a statement frame earns its keep." },
      { room: "Guest rooms", verdict: "good", note: "A simple divan or a sofa bed usually makes more sense here." },
      { room: "Children’s rooms", verdict: "good", note: "Storage beds are hard to beat for keeping a small room usable." },
    ],
    faqs: [
      {
        q: "Do you sell mattresses separately?",
        a: "Ask the team about the current range — what is in stock changes, and they will tell you what is available now rather than what a website says.",
      },
      {
        q: "What size bed should I get?",
        a: "Measure the room, then leave walking space on the sides you actually use. A king in a room that cannot take one makes the whole bedroom feel smaller, not more luxurious.",
      },
    ],
    filters: [
      { label: "Size", options: ["Single", "Small double", "Double", "King", "Super king"] },
      { label: "Type", options: ["Divan", "Ottoman", "Upholstered frame", "Wooden frame", "Bunk"] },
      { label: "Colour", options: ["Grey", "Cream", "Charcoal", "Oak", "Black"] },
    ],
    showroomReason:
      "Firmness cannot be described accurately in words. Lying on it for two minutes tells you more than any specification.",
  },
  {
    slug: "dining",
    group: "furniture",
    name: "Dining",
    headline: ["Dining sets", "for real rooms."],
    strapline: "Tables and chairs sized for the space you actually have.",
    intro:
      "Dining furniture is the easiest thing in the house to buy slightly too big. A little planning turns a cramped room into a comfortable one.",
    image: "furniture/dining",
    metaTitle: "Dining Tables & Chairs, Stoke-on-Trent | RABS",
    metaDescription:
      "Dining tables, chairs and sets at the RABS showroom in Stoke-on-Trent. See the finish and the scale in person before you buy.",
    buying: [
      {
        title: "Allow room to pull a chair out",
        body: "As a working rule you want around a metre of clear space around the table so people can get in and out without shuffling. Measure the room, then subtract that before you choose a table size.",
      },
      {
        title: "Extending tables earn their keep",
        body: "If you host occasionally but eat as a smaller household most days, an extending table gives you both without permanently losing the floor space.",
      },
      {
        title: "Chair height and table height must agree",
        body: "Mixing a bought table with existing chairs often ends badly. Check the gap between the seat and the underside of the table top.",
      },
      {
        title: "Hard floors and chair legs",
        body: "Dining chairs get dragged constantly. Felt pads on the legs will protect an LVT or laminate floor and save a lot of annoyance later.",
      },
    ],
    rooms: [
      { room: "Dining rooms", verdict: "great", note: "The one room where you can size up if the space genuinely allows." },
      { room: "Kitchen diners", verdict: "great", note: "Round tables often work better here — no sharp corners in a walkway." },
      { room: "Open-plan spaces", verdict: "good", note: "The table becomes part of the room’s look, so the finish matters more." },
    ],
    faqs: [
      {
        q: "What size dining table do I need?",
        a: "Count the people you seat most weeks, not the maximum you might ever host. Then check you can still walk around it comfortably with the chairs pulled out.",
      },
      {
        q: "Do dining sets come with chairs?",
        a: "Some sets do and some tables are sold separately. The team will tell you exactly what is included for the piece you are looking at.",
      },
    ],
    filters: [
      { label: "Shape", options: ["Rectangular", "Round", "Oval", "Extending"] },
      { label: "Seats", options: ["2", "4", "6", "8+"] },
      { label: "Finish", options: ["Oak", "Grey", "White", "Marble effect", "Black"] },
    ],
    showroomReason:
      "Scale is impossible to judge online. Standing next to a table for ten seconds settles it.",
  },
  {
    slug: "living-room",
    group: "furniture",
    name: "Living room",
    headline: ["Finishing", "the room off."],
    strapline: "Units, tables and the pieces that pull a room together.",
    intro:
      "Once the floor is down and the sofa is in, it is the smaller pieces that make a living room feel finished rather than furnished.",
    image: "furniture/living-room",
    metaTitle: "Living Room Furniture, Stoke-on-Trent | RABS",
    metaDescription:
      "Living room furniture at the RABS showroom in Stoke-on-Trent — TV units, coffee tables and occasional pieces. Come and see the range.",
    buying: [
      {
        title: "Match the wood tone to the floor, or contrast it deliberately",
        body: "The one thing to avoid is nearly matching. Either pick up the floor tone properly or go clearly different — a near-miss is what reads as an accident.",
      },
      {
        title: "TV units: measure the screen, not the box",
        body: "Stand width is what actually matters, and it is often much narrower than the screen. Check both before you buy.",
      },
      {
        title: "Leave circulation space",
        body: "A coffee table wants roughly 40–45cm between it and the sofa — close enough to reach, far enough to walk past.",
      },
    ],
    rooms: [
      { room: "Living rooms", verdict: "great", note: "Where these pieces belong." },
      { room: "Snugs", verdict: "good", note: "Scale down — a large unit will swallow a small room." },
    ],
    faqs: [
      {
        q: "Can I buy furniture and flooring together?",
        a: "Yes, and it is one of the practical advantages of the showroom — you can hold a floor sample against a furniture finish rather than guessing across two different shops.",
      },
    ],
    filters: [
      { label: "Type", options: ["TV unit", "Coffee table", "Sideboard", "Bookcase", "Side table"] },
      { label: "Finish", options: ["Oak", "Grey", "White", "Black", "High gloss"] },
    ],
    showroomReason:
      "Finishes read differently in daylight, and matching them to a floor is much easier with both in front of you.",
  },
];

/* ========================================================================== */
/* BLINDS                                                                     */
/* ========================================================================== */

export const blindsCategory: Category = {
  slug: "blinds",
  group: "blinds",
  name: "Blinds",
  headline: ["Blinds to", "finish the room."],
  strapline: "The last detail — and the one people forget to budget for.",
  intro:
    "New floor, new furniture, old blinds. It is the most common way a finished room still looks unfinished.",
  image: "flooring/blinds",
  metaTitle: "Blinds in Stoke-on-Trent | RABS Flooring",
  metaDescription:
    "Blinds at the RABS showroom in Stoke-on-Trent. Talk to the team about the right style for your windows and rooms.",
  buying: [
    {
      title: "Recess or exact fit",
      body: "A blind inside the window recess looks neater and keeps the sill usable. Fitted outside the recess it covers more glass and blocks more light. Both are valid — decide which problem you are solving.",
    },
    {
      title: "Bathrooms and kitchens need the right material",
      body: "Steam and fabric are not friends over the long term. Moisture-resistant options exist and are worth specifying in those rooms.",
    },
    {
      title: "Child and pet safety",
      body: "Looped cords are a genuine hazard. Ask about safety devices or cordless options where children or pets are in the house.",
    },
  ],
  rooms: [
    { room: "Living rooms", verdict: "great", note: "Where light control makes the most visible difference." },
    { room: "Bedrooms", verdict: "great", note: "Blackout options are worth considering, especially for children." },
    { room: "Kitchens & bathrooms", verdict: "good", note: "Specify a moisture-resistant material." },
  ],
  faqs: [
    {
      q: "Do you measure for blinds?",
      a: "Talk to the team about measuring for your windows — they will explain how it works for your particular job.",
    },
  ],
  showroomReason:
    "Fabric weight and how much light a blind actually lets through are both much easier to judge with the sample in your hand.",
};

/* ========================================================================== */
/* Lookups                                                                    */
/* ========================================================================== */

export const allCategories: Category[] = [
  ...flooringCategories,
  ...furnitureCategories,
  blindsCategory,
];

export function getCategory(group: CategoryGroup, slug: string): Category | undefined {
  return allCategories.find((c) => c.group === group && c.slug === slug);
}

/** Cards used on the homepage "Everything for the home" grid. */
export const homeCategoryCards = [
  { name: "Carpets", href: "/flooring/carpets", image: "flooring/carpets", line: "Soft, warm, quiet" },
  { name: "Laminate", href: "/flooring/laminate", image: "flooring/laminate", line: "Smart value" },
  { name: "LVT", href: "/flooring/lvt", image: "flooring/lvt", line: "Built for family life" },
  { name: "Vinyl", href: "/flooring/vinyl", image: "flooring/vinyl", line: "Practical, waterproof" },
  { name: "Sofas", href: "/furniture/sofas", image: "furniture/sofas", line: "Sit before you buy" },
  { name: "Beds", href: "/furniture/beds", image: "furniture/beds", line: "Frames and mattresses" },
  { name: "Dining", href: "/furniture/dining", image: "furniture/dining", line: "Tables and chairs" },
  { name: "Blinds", href: "/blinds", image: "flooring/blinds", line: "Finish the room" },
] as const;
