export type Project = { name: string; kind: string; description: string; tags: string[]; status: string };

export const projects: Project[] = [
  { name: 'RitsheAI Lab', kind: 'AI / Research', description: 'A working notebook for experiments where language models meet useful interfaces.', tags: ['Python', 'LLMs'], status: 'Active' },
  { name: 'Signalboard', kind: 'Developer tools', description: 'A calm, local-first command center for the work that usually gets lost between tabs.', tags: ['TypeScript', 'Open source'], status: 'Shipping' },
  { name: 'Prompt Atlas', kind: 'Automation', description: 'A small cartography of prompts, patterns, and repeatable thinking systems.', tags: ['AI', 'Systems'], status: 'Exploring' },
  { name: 'Web Experiments', kind: 'Web / Creative', description: 'A collection of interfaces built to test an idea before it becomes a product.', tags: ['React', 'Motion'], status: 'Ongoing' },
];

export const buildAreas = [
  { number: '01', title: 'Intelligence', description: 'Models, agents, retrieval, and the practical edge of AI.', icon: 'brain' },
  { number: '02', title: 'Software', description: 'Small tools with sharp opinions and very little ceremony.', icon: 'code' },
  { number: '03', title: 'Automation', description: 'Systems that turn the repetitive into the invisible.', icon: 'workflow' },
  { number: '04', title: 'Experiments', description: 'Web, motion, and prototypes that make new futures tangible.', icon: 'flask' },
];

export const tools = [
  ['Claude', 'thinking partner'], ['Cursor', 'pair programmer'], ['Vercel', 'ship surface'],
  ['PostgreSQL', 'memory layer'], ['Python', 'experiment engine'], ['React', 'interface layer'],
];

export const nowItems = [
  { title: 'Teaching machines to use tools', detail: 'agent workflows · 62%', progress: 62 },
  { title: 'A better home for side projects', detail: 'RitsheAI Lab · 38%', progress: 38 },
  { title: 'Writing in public, slowly', detail: 'notes & field logs · 24%', progress: 24 },
];

export const posts = [
  { type: 'FIELD NOTE', title: 'The useful distance between a prompt and a product', meta: '06 min read · placeholder' },
  { type: 'BUILD LOG', title: 'Why the best developer tools disappear', meta: '04 min read · placeholder' },
  { type: 'THOUGHTS', title: 'A lab is a way of paying attention', meta: '03 min read · placeholder' },
];