/**
 * One canonical project list.
 *
 * `github: undefined` means the repo URL is still missing — fill these in.
 * For an ML role, a reviewer wants to read the notebook.
 */

export type Project = {
  id: string;
  title: string;
  blurb: string;
  description: string;
  highlights: string[];
  tech: string[];
  date: string; // YYYY-MM, drives sorting and the timeline chart
  dateLabel: string;
  thumbnail?: string;
  demo?: string;
  github?: string;
  featured: boolean;
  accent: string; // tailwind gradient classes for the card header
};

export const projects: Project[] = [
  {
    id: 'code-explainer',
    title: 'AI-Powered Code Explainer',
    blurb: 'React + FastAPI app that explains unfamiliar code in plain English.',
    description: `A full-stack web app that takes a code snippet and returns a plain-English
      walkthrough. React front end, FastAPI backend, Gemini and OpenAI models behind a single
      abstraction so either can serve a request. I built it because reading unfamiliar repos was
      the slowest part of starting any project.`,
    highlights: [
      'Designed and consumed REST APIs covering auth, request flow and streamed responses',
      'Integrated Gemini and OpenAI through LangChain, with a provider interface so models are swappable',
      'Owned it end to end — UI, backend logic, API integration and deployment',
    ],
    tech: ['React', 'FastAPI', 'LangChain', 'Gemini API', 'OpenAI API', 'Python'],
    date: '2025-04',
    dateLabel: 'Apr 2025',
    thumbnail: '/images/projects/code-explainer.webp',
    demo: 'https://codeexplainerfrontend.netlify.app/',
    github: undefined, // TODO: add repo URL
    featured: true,
    accent: 'from-slate to-navy',
  },
  {
    id: 'fake-news',
    title: 'Fake News Detection System',
    blurb: 'TF-IDF + Logistic Regression classifier, deployed on Streamlit.',
    description: `An NLP classifier that flags fabricated news articles. Cleaned and tokenised the
      Kaggle fake-news corpus, vectorised with TF-IDF, then compared Logistic Regression, Random
      Forest and Passive Aggressive classifiers. Logistic Regression won — and being linear, it also
      let me inspect which terms pushed a prediction toward "fake", which the ensembles wouldn't.`,
    highlights: [
      'Full ML lifecycle: preprocessing, training, evaluation and deployment',
      'Chose an interpretable model over a marginally stronger black box, on purpose',
      'Shipped as a Streamlit app so anyone can paste an article and get a verdict',
    ],
    tech: ['Python', 'scikit-learn', 'NLTK', 'TF-IDF', 'Streamlit'],
    date: '2025-03',
    dateLabel: 'Mar 2025',
    thumbnail: '/images/projects/fake-news.webp',
    demo: 'https://fakenews-detector.streamlit.app/',
    github: undefined, // TODO: add repo URL
    featured: true,
    accent: 'from-mist to-slate',
  },
  {
    id: 'sentiment-analyzer',
    title: 'Sentiment Analyzer',
    blurb: 'VADER + TextBlob pipeline behind a FastAPI service. 94% accuracy.',
    description: `A sentiment classification pipeline combining VADER and TextBlob, wrapped in
      scalable REST endpoints with FastAPI and deployed alongside a Streamlit front end. Reached 94%
      accuracy on the evaluation set, with the API designed so other services could consume it.`,
    highlights: [
      'Built REST APIs for classification rather than a one-off script',
      'Reached 94% accuracy on the held-out set',
      'Connected backend services to a working front end',
    ],
    tech: ['Python', 'FastAPI', 'VADER', 'TextBlob', 'Streamlit', 'REST APIs'],
    date: '2024-12',
    dateLabel: 'Dec 2024',
    thumbnail: '/images/projects/sentiment.webp',
    demo: undefined,
    github: 'https://github.com/eeshadagar/sentiment_analyzer',
    featured: true,
    accent: 'from-graphite to-navy',
  },
  {
    id: 'mental-health',
    title: 'Social Media & Mental Health Trends',
    blurb: 'Random Forest model over usage patterns and wellbeing indicators.',
    description: `An exploration of how social media usage patterns relate to self-reported mental
      health indicators. Handled missing data and class imbalance, engineered features from usage
      frequency and demographics, and trained a Random Forest classifier. Published with interactive
      filters so you can watch predictions shift across cohorts.`,
    highlights: [
      'Handled class imbalance rather than reporting a misleading accuracy figure',
      'Feature engineering from raw survey responses',
      'Interactive Streamlit deployment with cohort filters',
    ],
    tech: ['Python', 'pandas', 'scikit-learn', 'Streamlit'],
    date: '2025-01',
    dateLabel: 'Jan 2025',
    thumbnail: '/images/projects/mental-health.webp',
    demo: 'https://socialmediamentalhealthtrends.streamlit.app/',
    github: undefined, // TODO: add repo URL
    featured: true,
    accent: 'from-mist to-navy',
  },
  {
    id: 'kpi-dashboard',
    title: 'Real-Time KPI Dashboard',
    blurb: 'Live business metrics with React, D3 and a Node/Mongo backend.',
    description: `An interactive dashboard for monitoring business KPIs with live updates. Charts
      render with D3 over a Node and MongoDB backend, and the layout reflows down to phone width so
      the same view works in a standup.`,
    highlights: [
      'Live data updates without a full re-render',
      'Responsive down to mobile',
      'D3 for custom charts where a library would have fought me',
    ],
    tech: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    date: '2024-10',
    dateLabel: 'Oct 2024',
    thumbnail: '/images/projects/kpi-dashboard.webp',
    demo: 'https://realtimekpidashboard.netlify.app/',
    github: 'https://github.com/eeshadagar/Real_time_KPI_dashboard',
    featured: false,
    accent: 'from-stone to-graphite',
  },
  {
    id: 'customer-reviews',
    title: 'Customer Review Analysis',
    blurb: 'BERT embeddings + MaxSum similarity for keyword extraction on Yelp data.',
    description: `Merged Yelp user and business datasets, derived sentiment labels from star ratings,
      and visualised the distribution across categories. Extracted high-relevance, low-redundancy
      keywords using BERT sentence embeddings with MaxSum similarity — which surfaces what people
      actually complain about, rather than the words that merely appear most often.`,
    highlights: [
      'MaxSum similarity to avoid the redundant keyword lists TF-IDF alone produces',
      'Sentence-transformer embeddings over a large review corpus',
      'Sentiment distribution visualised across business categories',
    ],
    tech: ['Python', 'SentenceTransformers', 'pandas', 'Plotly', 'NLP'],
    date: '2023-11',
    dateLabel: 'Nov 2023',
    thumbnail: '/images/projects/reviews.webp',
    github: 'https://github.com/eeshadagar/customer_review_analysis',
    featured: false,
    accent: 'from-stone to-slate',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

const uniqueTech = new Set(projects.flatMap((p) => p.tech));

/** How many projects use each technology. Derived, so it can't go stale. */
export const techUsage = Array.from(uniqueTech)
  .map((name) => ({ name, count: projects.filter((p) => p.tech.includes(name)).length }))
  .filter((t) => t.count > 1)
  .sort((a, b) => b.count - a.count);

export const projectStats = {
  total: projects.length,
  live: projects.filter((p) => p.demo).length,
  technologies: uniqueTech.size,
};
