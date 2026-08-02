/**
 * Identity, education, experience and skills.
 * Single source of truth — every surface reads from here.
 */

export const profile = {
  name: 'Eesha Dagar',
  /* Positioning: someone who trains the model *and* builds the product around it.
     Rarer than either "data scientist" or "full stack dev" alone. */
  role: 'ML Engineer who ships',
  title: 'MCA · Machine Learning & Full Stack',
  tagline: 'I train the model, then build the product around it.',

  summary: `I build machine learning systems that don't stop at the notebook. Python and
    scikit-learn for the model, FastAPI for the service, React for the thing people
    actually click. Currently finishing an MCA at The NorthCap University.`,

  bio: [
    `Most of my projects start with a question I can't answer by staring at a spreadsheet —
     can a classifier separate real reporting from fabrication, can a language model explain
     unfamiliar code well enough to save someone an afternoon.`,
    `The part I care about is what happens after the model works. A 94%-accurate classifier
     sitting in a notebook helps nobody, so I've spent as much time on FastAPI endpoints,
     React front ends and deployment as I have on training loops.`,
  ],

  location: 'Gurugram, Haryana, India',
  email: 'eesha5950@gmail.com',
  /* Phone intentionally not published — public numbers get scraped within days.
     It's on the downloadable PDF, which is enough. */
  website: 'https://eesha.codes',
  linkedin: 'https://www.linkedin.com/in/eeshadagar/',
  github: 'https://github.com/eeshadagar',
  leetcode: 'https://leetcode.com/u/eeshadagar/',
  resumePdf: '/Eesha_Dagar_Resume.pdf',
  avatar: '/images/me.webp',

  availability: 'Open to full-time roles from mid-2026',
} as const;

export type Education = {
  degree: string;
  short: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  coursework: string[];
};

export const education: Education[] = [
  {
    degree: 'Master of Computer Applications',
    short: 'MCA',
    institution: 'The NorthCap University',
    location: 'Gurugram',
    period: '2024 – 2026',
    grade: '8.3 CGPA',
    coursework: [
      'Machine Learning',
      'Data Mining',
      'Advanced Databases',
      'Cloud Computing (AWS)',
      'Software Engineering',
      'Cybersecurity',
    ],
  },
  {
    degree: 'Bachelor of Computer Applications',
    short: 'BCA',
    institution: 'Symbiosis International University',
    location: 'Pune',
    period: '2020 – 2023',
    grade: '6.66 CGPA',
    coursework: [
      'Data Structures & Algorithms',
      'Web Technologies',
      'Operating Systems',
      'Computer Networks',
      'SQL & DBMS',
    ],
  },
];

export type Role = {
  id: string;
  title: string;
  company: string;
  period: string;
  type: string;
  skills: string[];
  bullets: string[];
};

export const experience: Role[] = [
  {
    id: 'datoop',
    title: 'Data Science Intern',
    company: 'Datoop Technology Pvt Ltd',
    period: 'Jun 2025 – Jul 2025',
    type: 'Remote',
    skills: ['Python', 'scikit-learn', 'pandas', 'Power BI', 'REST APIs'],
    bullets: [
      'Developed and optimised ML models for customer segmentation, sharpening how the team targeted at-risk accounts.',
      'Processed customer datasets with pandas and scikit-learn, then surfaced the output in Power BI dashboards used for decision-making.',
      'Owned data pipelines and feature logic independently in a fully remote setup.',
    ],
  },
  {
    id: 'jobizo',
    title: 'Data Analyst Intern',
    company: 'Jobizo',
    period: 'Mar 2023 – May 2023',
    type: 'Hybrid',
    skills: ['Python', 'Tableau', 'Excel', 'Data Cleaning'],
    bullets: [
      'Automated data preprocessing pipelines in Python, cutting manual effort and making runs reproducible.',
      'Analysed large datasets for business insight and built Tableau and Excel dashboards for stakeholder reporting.',
      'Worked asynchronously with product and analytics teams.',
    ],
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

/**
 * Grouped by what you'd do with them. Deliberately not percentages —
 * "Python 90%" invites the question "90% of what?"
 */
export const skillGroups: SkillGroup[] = [
  { label: 'Languages', items: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'R'] },
  {
    label: 'ML & Data',
    items: ['scikit-learn', 'TensorFlow', 'PyTorch', 'pandas', 'NumPy', 'NLTK', 'Hugging Face'],
  },
  { label: 'Generative AI', items: ['LangChain', 'OpenAI API', 'Gemini API', 'Prompt design'] },
  { label: 'Backend', items: ['FastAPI', 'REST APIs', 'Flask', 'Django'] },
  { label: 'Frontend', items: ['React', 'Tailwind CSS', 'Vite'] },
  { label: 'Tooling', items: ['Git', 'Docker', 'AWS', 'Streamlit', 'Power BI', 'Tableau'] },
];

export const interests = [
  'Applied NLP',
  'Model deployment',
  'Data visualisation',
  'Developer tooling',
];
