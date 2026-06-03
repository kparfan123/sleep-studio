import { Product, Review, QuizQuestion } from './types';

export const SHOWROOM_INFO = {
  address: "Noor E Mall, Palakkode, Near Petrol Pump, Kerala",
  phones: ["+91 9995081947", "+91 8137977542"],
  whatsapp: "919995081947",
  email: "contact@thesleepstudio.in",
  openingHours: "Monday - Sunday: 10:00 AM - 9:00 PM",
  dealerStatus: "Authorized ZAARA Dealer"
};

export const CATEGORIES = [
  {
    id: "mattresses",
    title: "Mattresses",
    description: "Expertly engineered for spine health and unmatched comfort.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAba2paGwKf9wpIwjSpr5F2SiYw2a5DDKwLh4lX_sfSWvfo54SxI1ovAKemqzsSShBKLJ7ffp03IqmB23papRZduB79z2-KKtd6TlQoZyrJjuFjUih1k5XLDHDC1w00v9PQfx1HtiG_JdI0ZcpKl4u6XVHYVUmN9dDXk60TQPpE_x0rTg2VFu8P1VVAZYaTHiTi_SPsLI_yUMVqVXL3jDp1y2N8CF7PTRwD869QG4mRB37HdMGJK8M896TBqCQbUjq8-EIWrLShnTY"
  },
  {
    id: "pillows",
    title: "Pillows",
    description: "From memory foam to plush down alternatives for perfect support.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFl1Vc0j0N6SSwIGVuZ9mOMwQ47v4wUSpmf45-ejLATrsj8gS4xWZQJJogbA4vp1-ZMAF6vax62aDOnjdP7yVpyW1natRg05MwSnT22HChfyFB_A_-UlVKGBWym2k6wf9moPH7Gnpu-DCcz9JutXaRE01L2vrxb7V7GlzBcauANhkU83vUvdn0eqT0GeRBi3rHbWZSlbzxK6sFOIJnXAUdY45RCxA4VWcn8maQWq0mHZSn5Sj4K__lo3Ouk_zQf7JEPt_xOVptNoU"
  },
  {
    id: "bedsheets",
    title: "Bedsheets",
    description: "High-thread-count cotton and silk blends for a silky smooth feel.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCrv6xi96B-nD5PlPjyjNmU_H5N3FAXPN-no_448NjZDzbRSM9mknbijOPNgX7xn4BuUQh4oOjV2YS8s32hEcMrDcVP__Tqb6u1YMmzo5Bcezm1MMWt9fy9kZlZ3Md7p60bPSQIgjTOGMyikZCCm3GKrXxJqn87lobicKdpeOvpDresiOBehH7g3Dmqcp2S1Nyv2z_YnW3RR76f94dYt1GIHfdcPJluzDb05Kc5Whq_ozp5ieGhrWZhD99_PWNYwU-2M6aiw2cH84"
  },
  {
    id: "duvets",
    title: "Duvets & Comforters",
    description: "Lightweight and insulating layers for year-round temperature control.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1TtcV8ZA2LHcsuUdVVjIhlBI9HWrb8-WNmZdNh2baM5JvXv_veT0JZqHlQ3VUMrio19aJg4k1dGMegl6YgAIUz6khQLR7gKh76RuYvEZ6pBzrBTFJV4QQvVWF7SeVEhH7LfeqWoeiDtvENluuTdDrFqonjYDga7BUu5-jY1R5VSiDhOBmL5i5CuZI1rMVhnlADzpySnfwyO9aW8QG33CuU_d4uE5qiIQK0oT7ZZuSsTpaKxTHvypttUB47QkN3UfyHLE7Si5ONu0"
  },
  {
    id: "blankets",
    title: "Blankets",
    description: "Cozy textures that add a layer of warmth and style to any room.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFJ31NdSwQbKX2rRAcWXm43XtOmkVC5N8hYYcbiPgOsrDUBfMYQZJ0EAsFxBZ9LAlR-UyF_iYVzxwEPrFZgyhD5IFwSTf3ZwHpveTWFlGxDk_f12-R7kmt7ftUtT2P6qYkFPC8kPHcjHkmhM4xJwIQL8tSCiINMeE3JiTvWvP3E8Thx6uGH9237du8yGnrwmotxyVSAbnhEA1qD45qlmx5Ept5DGsJyHY8W7Ddq8LiEBzJXSJGRL1rzdAqhwIqoXCvXzXKr44nBSc"
  },
  {
    id: "carpets",
    title: "Carpets & Rugs",
    description: "Premium floor coverings to ground your space in luxury.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDo-7KSnjhpBt2tzyio3mIWSB9-4mxjqVCyj2yAKEGufVLmJANgFzIqnovxTyyWM0g8836DkHBWwOTZ3Kz23sPxTSGE_3w01uvigtmF8LBV3Gj7qoGySflZBkXZM6aDl5kuWIGmGyz_kUmvThCVhRr_3YG4j1OfRnAYKS2Gazyknq1U6fe3VZgZjew0x0_kfjtLwbi18CQ7q6-WXKnj_XF8HN4ikTkD4gKJs0yVoj8uRJy7XrNq7r7nQyb_8Tra7RQOV-Jf2zOIIYE"
  }
];

export const PRODUCTS: Product[] = [
  // Mattresses
  {
    id: "zaara-ortho",
    title: "ZAARA Orthopedic Spine-Support Mattress",
    category: "mattresses",
    description: "Engineered specifically to support spine alignment and alleviate pressure points. This certified orthopedic mattress utilizes core spring support combined with high-density pressure absorption, making it Kerala's premier sleep choice.",
    price: 18900,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAba2paGwKf9wpIwjSpr5F2SiYw2a5DDKwLh4lX_sfSWvfo54SxI1ovAKemqzsSShBKLJ7ffp03IqmB23papRZduB79z2-KKtd6TlQoZyrJjuFjUih1k5XLDHDC1w00v9PQfx1HtiG_JdI0ZcpKl4u6XVHYVUmN9dDXk60TQPpE_x0rTg2VFu8P1VVAZYaTHiTi_SPsLI_yUMVqVXL3jDp1y2N8CF7PTRwD869QG4mRB37HdMGJK8M896TBqCQbUjq8-EIWrLShnTY",
    features: [
      "Certified Spine-Health alignment design",
      "Authorized ZAARA air-circulation core layer",
      "Anti-dust-mite & hypoallergenic fabric weave",
      "Ideal balanced medium-firm surface density"
    ],
    specs: {
      "Warranty": "10 Years Manufacturer Warranty",
      "Material": "Natural Latex & Pocket Springs",
      "Thickness": "6 inch, 8 inch options",
      "Firmness": "Medium Firm (Recommended for back-pain)"
    },
    sizes: ["Single (72 x 36)", "Queen (78 x 60)", "King (78 x 72)"],
    thicknesses: ["6 inches", "8 inches"],
    isZaaraAuthorized: true
  },
  {
    id: "zaara-dual-comfort",
    title: "ZAARA Dual-Comfort Premium Hybrid",
    category: "mattresses",
    description: "The ultimate dual-season mattress designed with reversible comfort profiles. Choose the soft-quilted cloud side for high-fidelity luxury casing, or flip over to the highly-supportive firm side for therapeutic back support.",
    price: 24500,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAba2paGwKf9wpIwjSpr5F2SiYw2a5DDKwLh4lX_sfSWvfo54SxI1ovAKemqzsSShBKLJ7ffp03IqmB23papRZduB79z2-KKtd6TlQoZyrJjuFjUih1k5XLDHDC1w00v9PQfx1HtiG_JdI0ZcpKl4u6XVHYVUmN9dDXk60TQPpE_x0rTg2VFu8P1VVAZYaTHiTi_SPsLI_yUMVqVXL3jDp1y2N8CF7PTRwD869QG4mRB37HdMGJK8M896TBqCQbUjq8-EIWrLShnTY",
    features: [
      "Reversible Dual-Comfort layers",
      "Breathable cool-gel memory foam layer",
      "High-resilience supportive bottom core",
      "Plush organic cotton knit outer casing"
    ],
    specs: {
      "Warranty": "12 Years Premium Warranty",
      "Material": "Cool Gel Memory Foam & Ortho support",
      "Thickness": "8 inches",
      "Firmness": "Dual-sided (Soft one side, Firm on reverse)"
    },
    sizes: ["Queen (78 x 60)", "King (78 x 72)", "Super King (84 x 72)"],
    thicknesses: ["8 inches", "10 inches"],
    isZaaraAuthorized: true
  },

  // Pillows
  {
    id: "zaara-ortho-pillow",
    title: "ZAARA Ergonomic Contour Memory Foam Pillow",
    category: "pillows",
    description: "Crafted specifically to cradles the neck and support optimal airway space. The pressure-responsive contour shape provides immediate tension relief for neck-pain and side sleepers.",
    price: 2499,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFl1Vc0j0N6SSwIGVuZ9mOMwQ47v4wUSpmf45-ejLATrsj8gS4xWZQJJogbA4vp1-ZMAF6vax62aDOnjdP7yVpyW1natRg05MwSnT22HChfyFB_A_-UlVKGBWym2k6wf9moPH7Gnpu-DCcz9JutXaRE01L2vrxb7V7GlzBcauANhkU83vUvdn0eqT0GeRBi3rHbWZSlbzxK6sFOIJnXAUdY45RCxA4VWcn8maQWq0mHZSn5Sj4K__lo3Ouk_zQf7JEPt_xOVptNoU",
    features: [
      "Anatomic contour shape promotes open airways",
      "Thermoregulating bamboo charcoal particles",
      "Machine-washable moisture-absorbing mesh cover",
      "Zero-pressure sink speed for smooth neck contouring"
    ],
    specs: {
      "Filling": "100% High-Density Memory Foam",
      "Outer fabric": "Hypoallergenic bamboo fiber fabric",
      "Dimensions": "24 x 16 x 4.5 inches"
    },
    sizes: ["Standard Medium", "Queen High-Profile"]
  },
  {
    id: "luxury-microfiber-pillow",
    title: "Premium Microfiber Down-Alternative Pillow (Twin Set)",
    category: "pillows",
    description: "Instantly add a 5-star hotel feel into your master bedroom. Made of ultra-fine blown gel-microfibers that replicate the high-loft properties of high-end down feathers without any allergens.",
    price: 1899,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFl1Vc0j0N6SSwIGVuZ9mOMwQ47v4wUSpmf45-ejLATrsj8gS4xWZQJJogbA4vp1-ZMAF6vax62aDOnjdP7yVpyW1natRg05MwSnT22HChfyFB_A_-UlVKGBWym2k6wf9moPH7Gnpu-DCcz9JutXaRE01L2vrxb7V7GlzBcauANhkU83vUvdn0eqT0GeRBi3rHbWZSlbzxK6sFOIJnXAUdY45RCxA4VWcn8maQWq0mHZSn5Sj4K__lo3Ouk_zQf7JEPt_xOVptNoU",
    features: [
      "Delivered in a generous twin pack set",
      "Zero-clumping highly aerated structure",
      "Machine washable with hyper-resilience bounce back",
      "Made with custom premium sateen stripe design casing"
    ],
    specs: {
      "Filling": "Aero-blown virgin gel-microfiber",
      "Cover": "100% Premium Cotton Sateen",
      "Loft": "Medium Plush"
    },
    sizes: ["Standard Set of 2", "King Set of 2"]
  },

  // Bedsheets
  {
    id: "elegance-silk-sheet",
    title: "Elegance Silk Blend Sateen Luxury Bedsheet Set",
    category: "bedsheets",
    description: "Woven in a sophisticated 800-thread count weave, this pure silk and combed cotton blend provides an incredible silk-like handfeel. Features exceptional heat dissipation properties to keep you cool through warm Kerala nights.",
    price: 4500,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCrv6xi96B-nD5PlPjyjNmU_H5N3FAXPN-no_448NjZDzbRSM9mknbijOPNgX7xn4BuUQh4oOjV2YS8s32hEcMrDcVP__Tqb6u1YMmzo5Bcezm1MMWt9fy9kZlZ3Md7p60bPSQIgjTOGMyikZCCm3GKrXxJqn87lobicKdpeOvpDresiOBehH7g3Dmqcp2S1Nyv2z_YnW3RR76f94dYt1GIHfdcPJluzDb05Kc5Whq_ozp5ieGhrWZhD99_PWNYwU-2M6aiw2cH84",
    features: [
      "Premium 800 Thread Count silk sateen structure",
      "Excellent heat dissipation & moisture control",
      "Deep pocket grip design fits up to 12\" mattresses",
      "Non-fading organic reactive botanical dyes"
    ],
    specs: {
      "Thread Count": "800 TC",
      "Material": "60% Organic Silk, 40% Egyptian Cotton",
      "Casing Items": "1 Flat Sheet, 1 Fitted Grip-sheet, 2 Pilow covers"
    },
    sizes: ["Queen Double", "King Classic"]
  },

  // Duvets
  {
    id: "quilted-insulating-duvet",
    title: "All-Season Quilted Temperature-Regulating Duvet",
    category: "duvets",
    description: "An incredibly lightweight but perfectly insulating blanket designed for continuous airflows. Perfectly balances air-conditioned chillness while remaining breathable and light.",
    price: 5999,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1TtcV8ZA2LHcsuUdVVjIhlBI9HWrb8-WNmZdNh2baM5JvXv_veT0JZqHlQ3VUMrio19aJg4k1dGMegl6YgAIUz6khQLR7gKh76RuYvEZ6pBzrBTFJV4QQvVWF7SeVEhH7LfeqWoeiDtvENluuTdDrFqonjYDga7BUu5-jY1R5VSiDhOBmL5i5CuZI1rMVhnlADzpySnfwyO9aW8QG33CuU_d4uE5qiIQK0oT7ZZuSsTpaKxTHvypttUB47QkN3UfyHLE7Si5ONu0",
    features: [
      "Hypoallergenic hollow-siliconized down fibers",
      "Hexagonal box stitch pattern inhibits filling shifts",
      "Durable anchor loops to lock duvets firmly inside covers",
      "Highly breathable structure, perfect for air-conditioned rooms"
    ],
    specs: {
      "Weight": "300 GSM (All-Season Luxury)",
      "Filling": "Premium Hollow-fiber fill",
      "Casing": "100% Breathable Brushed Cotton fabric"
    },
    sizes: ["Single Size", "Double/King Bed Size"]
  },

  // Blankets
  {
    id: "cashmere-accent-throw",
    title: "Hand-Woven Premium Cashmere Throw Blanket",
    category: "blankets",
    description: "The utmost addition of soft texture and elegance. Hand-crafted using ethical high-grade cashmere wool, this beautiful throw blanket fits perfectly draped over armchairs or bed footings.",
    price: 3499,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFJ31NdSwQbKX2rRAcWXm43XtOmkVC5N8hYYcbiPgOsrDUBfMYQZJ0EAsFxBZ9LAlR-UyF_iYVzxwEPrFZgyhD5IFwSTf3ZwHpveTWFlGxDk_f12-R7kmt7ftUtT2P6qYkFPC8kPHcjHkmhM4xJwIQL8tSCiINMeE3JiTvWvP3E8Thx6uGH9237du8yGnrwmotxyVSAbnhEA1qD45qlmx5Ept5DGsJyHY8W7Ddq8LiEBzJXSJGRL1rzdAqhwIqoXCvXzXKr44nBSc",
    features: [
      "Genuine handcrafted premium soft cashmere composition",
      "Features beautiful handcrafted fringe borders",
      "Adds structural texture for editorial layered bedroom layouts",
      "Ultra gentle surface skin-feel formulation"
    ],
    specs: {
      "Material": "80% Organic Cashmere, 20% Soft Wool blend",
      "Craft": "Hand-loom crafted in India",
      "Weight": "450 grams"
    },
    sizes: ["Standard Accent Throw (50 x 70 inches)"]
  },

  // Carpets & Rugs
  {
    id: "teal-charcoal-rug",
    title: "The Teal & Graphite Contemporary Designer Rug",
    category: "carpets",
    description: "A gorgeous designer carpet featuring muted slate, teal-green, and deep charcoal watercolor brush strokes. Provides exceptional sound-absorption and cozy padding for your feet.",
    price: 8999,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDo-7KSnjhpBt2tzyio3mIWSB9-4mxjqVCyj2yAKEGufVLmJANgFzIqnovxTyyWM0g8836DkHBWwOTZ3Kz23sPxTSGE_3w01uvigtmF8LBV3Gj7qoGySflZBkXZM6aDl5kuWIGmGyz_kUmvThCVhRr_3YG4j1OfRnAYKS2Gazyknq1U6fe3VZgZjew0x0_kfjtLwbi18CQ7q6-WXKnj_XF8HN4ikTkD4gKJs0yVoj8uRJy7XrNq7r7nQyb_8Tra7RQOV-Jf2zOIIYE",
    features: [
      "High density yarn weave for heavy foot layouts",
      "Exceptional sound damping properties for master suites",
      "Non-shedding synthetic fibers, highly cleanable base",
      "Extremely soft medium pile height of 1"
    ],
    specs: {
      "Material": "Premium Polypropylene & Silk-weave accents",
      "Backing": "Natural latex organic anti-slip grip",
      "Origin": "Premium India Handmade collection"
    },
    sizes: ["Medium Room (5' x 8')", "Large Room (8' x 10')"]
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJfTmajYCZ0Sky8xATpaDSfDMOkTKK5uUhzw4PC8tJNkRfFXLbJ7UNilGwzYIw2qAMOwRwV7l7WD06G5hxh2dCU0lJS8DDgikBuCem1jZ8I7jYZtJBzCNX00rdXncah8c2gUimW4mHRWEN7XqdaHI8XIlo3yzWJEQJ1YqGzdY86Px_m_DO7a1RwKckvvQQixCgAEZzfssiERg2DhMdSvN8EZwI3FZImYGdZrAYNRBOaX9wo6bS863W3RJ97ADAr4PXVN-M-OSgwBw",
    title: "Master Suite Sanctuary",
    category: "Bedroom setup featuring premium ZAARA bedding"
  },
  {
    id: "g2",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLp5BnRn6nLyg1p18pM1zYy-IVE78LcOqPQPH5q1nDe-NEw706t2JgRK1F8Mwy4exfUXFcJkaU_agzWCZ0YSG2XIaheDIY4GVYBGn19oY1OjzYJR0W4sblCCkjFLbTi-9IZYK8NQlzv23H5EjwAHNMvBF9ViQlXojwRke-GX9urV4MuzTXVrIvD5oTLGbbbA8owOyXQbc7fWkR6uKr23iS_pYT50PCf1c1mp5t2PAOyDKJzHX2ob2r510gl_z1Kg_k4GxpLFt9UHY",
    title: "Tactile Silk Elegance",
    category: "High thread count silk weave details"
  },
  {
    id: "g3",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsjolstZq_QjfuXqYhLMqvcwvBKle_Ow_NNNKbqpsUzfxghTK-_P_q5YUv9eODz_FupZfAuw8W4BlN30ezCTp09XUyHHwNXCe05RKumcz0Xa8ZRYkUSPW79bhzWXcHDASvEvSVIM4an-LdpAxP00Uex_BEA64KR4C3ZrZd8bRLUTTZB328lnI6ZoJAPXJV4iGD9TYFpYdb_gn2C6mHaSdKXLhaFHiFclJKGivCBA-uzPCoJ298cenB1DEfqGqky6YmobmlpuIzKeU",
    title: "Velvet Cozy Aesthetics",
    category: "Handcrafted cushions arrangement"
  },
  {
    id: "g4",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYeoN9_p5s6XCeffJgysB6ZyKOl-I6mjRstwgPJ7fCzP0mYKvZvXMgXsYLoHztVK-sEP2e8JxxoHwRW9cAMlc7BcyshdUlq8PzFhH1A0j2hJeT_lI08OWX6fRKB59ZdSqdeeAkAEm3DxqPSMcFQHfmr581tgnZKj1zLkURARhipaQsFBueOAjz3bpwxgK2DTc9afINz5jDBagAzpe6mGPdYX-TUYI3EOo6lrBvptCqL7gsM7Fk3JTPzCjN7qLWDEUj_jqbvjLtie0",
    title: "Zen Platform Minimalism",
    category: "Orthopedic design and low platform bed space"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev1",
    author: "Arjun K.",
    text: "The quality of the ZAARA mattress we bought is exceptional. I haven't slept this well in years. The Sleep Studio really knows their stuff and helped with delivery directly to our home in Palakkade!",
    role: "Homeowner",
    location: "Kerala",
    rating: 5,
    avatarInitial: "AK",
    date: "May 12, 2026"
  },
  {
    id: "rev2",
    author: "Sana Mary",
    text: "Wide range of options and very professional showroom in Noor E Mall. They helped me pick the perfect ergonomic contour pillow for my severe neck pain. Highly recommend!",
    role: "Wellness Consultant",
    location: "Kochi",
    rating: 5,
    avatarInitial: "SM",
    date: "April 28, 2026"
  },
  {
    id: "rev3",
    author: "Rahul V.",
    text: "Finding high-quality orthopedic bedding at affordable, honest prices is hard, but The Sleep Studio made it incredibly easy. Their contemporary designer rugs are also stunning and match our modern architectural designs!",
    role: "Architect",
    location: "Palakkode",
    rating: 5,
    avatarInitial: "RV",
    date: "Feb 15, 2026"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is your primary sleeping position during the night?",
    options: [
      { text: "On my side", value: "side" },
      { text: "On my back", value: "back" },
      { text: "On my stomach", value: "stomach" },
      { text: "Tossing & turning / combination", value: "combination" }
    ]
  },
  {
    id: 2,
    question: "Do you experience any chronic back or neck discomfort?",
    options: [
      { text: "Yes, constant lower back stiffness", value: "back_pain" },
      { text: "Yes, severe neck strain / headaches", value: "neck_pain" },
      { text: "No, but want to prevent stiffness", value: "general_comfort" }
    ]
  },
  {
    id: 3,
    question: "What is your preferred mattress density / feel?",
    options: [
      { text: "Firm & highly supportive (Spine alignment)", value: "firm" },
      { text: "Medium Firm with responsive spring contouring", value: "medium_firm" },
      { text: "Soft, plush, and Cloud-like pressure sink", value: "soft" }
    ]
  },
  {
    id: 4,
    question: "How do you rate your body temperature environment during sleep?",
    options: [
      { text: "Extremely Hot (Need severe cooling layers)", value: "hot" },
      { text: "Moderate (Always use air conditioning)", value: "moderate" },
      { text: "Perfect (Rarely feel overheated)", value: "cool" }
    ]
  }
];
