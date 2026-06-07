import { Level, Role } from '@/lib/types';

export const ROLES: Role[] = [
  {
    id: 'privileged-child',
    label: 'Privileged Child',
    description: 'A child born into a family with full access to resources, education, health, and opportunities',
    emoji: '👑',
    isObserver: false,
  },
  {
    id: 'orphan',
    label: 'Orphan',
    description: 'A child who has lost both parents',
    emoji: '🧒',
    isObserver: false,
  },
  {
    id: 'semi-orphan',
    label: 'Semi-Orphan',
    description: 'A child who has lost one parent',
    emoji: '👦',
    isObserver: false,
  },
  {
    id: 'abandoned-child',
    label: 'Abandoned Child',
    description: 'A child separated from family without support',
    emoji: '👧',
    isObserver: false,
  },
  {
    id: 'child-in-need',
    label: 'Child in Need of Care and Protection',
    description: 'A child in difficult circumstances requiring care',
    emoji: '🌱',
    isObserver: false,
  },
  {
    id: 'child-welfare-authority',
    label: 'Child Welfare Authority',
    description: 'Observer: government child welfare officer',
    emoji: '🏛️',
    isObserver: true,
  },
  {
    id: 'organization',
    label: 'NGO / Organization',
    description: 'Observer: an organization supporting children',
    emoji: '🤝',
    isObserver: true,
  },
  {
    id: 'police-officer',
    label: 'Police Officer',
    description: 'Observer: law enforcement supporting child safety',
    emoji: '👮',
    isObserver: true,
  },
  {
    id: 'society',
    label: 'Society',
    description: 'Observer: a member of the general public',
    emoji: '🌍',
    isObserver: true,
  },
];

export const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Education Development',
    program: 'Level 1',
    tagline: 'Every child deserves a chance to learn.',
    unlockMessage: 'This level explores access to education. Answer honestly based on your own childhood experience.',
    reflection:
      'Think about how you felt answering these questions. Did you take your access to education for granted? For many children in care institutions, even basic schooling is disrupted by circumstances beyond their control.',
    questions: [
      { id: 'edu-1', text: 'Did you attend school regularly without having to miss days for work or survival needs?' },
      { id: 'edu-2', text: 'Did you have a parent or guardian who helped you with homework or schoolwork?' },
      { id: 'edu-3', text: 'Did you have access to books and stationery whenever you needed them for school?' },
      { id: 'edu-4', text: 'Did someone actively encourage you to continue education and build a future?' },
      { id: 'edu-5', text: 'Did you go to school with proper uniforms, shoes, and a bag?' },
    ],
  },
  {
    id: 2,
    name: 'Social-Emotional Learning',
    program: 'Level 2',
    tagline: 'Every child deserves to feel safe and loved.',
    unlockMessage: 'This level explores emotional safety and belonging. Consider what it meant to feel supported growing up.',
    reflection:
      'Emotional safety shapes who we become. Children in care institutions often carry invisible wounds from loss, separation, and instability. Reflect on the emotional support you received and imagine growing up without it.',
    questions: [
      { id: 'sel-1', text: 'Did you have trusted adults you could talk to when you felt sad, scared, or confused?' },
      { id: 'sel-2', text: 'Did you celebrate your birthday and feel like a special person on that day?' },
      { id: 'sel-3', text: 'Did you have friends you could freely play with after school?' },
      { id: 'sel-4', text: 'Did you feel safe and secure in the place you called home?' },
      { id: 'sel-5', text: 'Did someone tell you regularly that they were proud of you?' },
    ],
  },
  {
    id: 3,
    name: 'Digital Literacy and AI',
    program: 'Level 3',
    tagline: 'Every child deserves access to the future.',
    unlockMessage: 'This level is about access to the digital world. Technology is no longer optional for opportunity.',
    reflection:
      'The digital divide is the new poverty line. Children without access to technology are left behind in an increasingly connected world. Think about the skills you built through screens and who gets left out.',
    questions: [
      { id: 'dig-1', text: 'Did you have access to a smartphone or computer growing up?' },
      { id: 'dig-2', text: 'Did you have consistent electricity and internet at home?' },
      { id: 'dig-3', text: 'Did you learn to use the internet safely in school or at home?' },
      { id: 'dig-4', text: 'Did you have access to online learning resources or educational apps?' },
      { id: 'dig-5', text: 'Did someone teach you digital skills like typing, email, or online research?' },
    ],
  },
  {
    id: 4,
    name: 'Health and Nutrition',
    program: 'Level 4',
    tagline: 'Every child deserves to grow strong.',
    unlockMessage: 'This level explores basic health and nutrition. A hungry or sick child cannot learn or grow.',
    reflection:
      'A hungry or sick child cannot learn or grow. Many children in care institutions lack access to nutritious food, clean water, or timely medical attention. Consider how health shaped your ability to show up fully in life.',
    questions: [
      { id: 'hlt-1', text: 'Did you eat at least two proper, nutritious meals every day as a child?' },
      { id: 'hlt-2', text: 'Did you visit a doctor or clinic whenever you were sick or injured?' },
      { id: 'hlt-3', text: 'Did you have access to clean drinking water at home?' },
      { id: 'hlt-4', text: 'Did you receive vaccines and regular health checkups as a child?' },
      { id: 'hlt-5', text: 'Did you regularly eat fruits, vegetables, and protein-rich foods growing up?' },
    ],
  },
  {
    id: 5,
    name: 'Project Library',
    program: 'Level 5',
    tagline: 'Every child deserves the magic of stories.',
    unlockMessage: 'The final level is about literacy and the joy of reading. Stories open worlds.',
    reflection:
      'Stories open worlds. A child who reads widely gains empathy, curiosity, and imagination. For children in institutions, access to books and the joy of reading can be transformative but it is rarely guaranteed.',
    questions: [
      { id: 'lib-1', text: 'Did you have storybooks, comics, or novels at home as a child?' },
      { id: 'lib-2', text: 'Did someone read to you or tell you stories when you were young?' },
      { id: 'lib-3', text: 'Did you have access to a library or a quiet space dedicated to reading?' },
      { id: 'lib-4', text: 'Did you develop a habit of reading for enjoyment, not just for school?' },
      { id: 'lib-5', text: 'Did someone help you discover books and stories that genuinely excited you?' },
    ],
  },
];

export const TOTAL_QUESTIONS = LEVELS.reduce((sum, l) => sum + l.questions.length, 0);
export const ALL_QUESTIONS = LEVELS.flatMap(l => l.questions);
