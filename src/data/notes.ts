/**
 * Writing. Sections are explicit objects rather than one long template string,
 * so headings can never collapse into the body text when rendered.
 */

export type NoteSection = { heading?: string; body: string };

export type Note = {
  id: string;
  title: string;
  preview: string;
  date: string;
  readingTime: string;
  tag: string;
  sections: NoteSection[];
};

export const notes: Note[] = [
  {
    id: 'interpretable-over-accurate',
    title: 'I picked the less accurate model on purpose',
    preview:
      'Random Forest beat Logistic Regression by a point on my fake news classifier. I shipped the Logistic Regression anyway.',
    date: '2025-04-18',
    readingTime: '6 min read',
    tag: 'Machine Learning',
    sections: [
      {
        body: `When I benchmarked classifiers for the fake news detector, Random Forest edged out Logistic Regression by a little over a percentage point. I shipped the Logistic Regression.`,
      },
      {
        heading: 'Why the weaker model won',
        body: `A linear model gives you coefficients. I could pull out which terms pushed a prediction toward "fake" and read them — and several were obviously wrong. The model had latched onto source-specific formatting quirks that happened to correlate with the label in my training set but would mean nothing on a new article. The Random Forest was almost certainly doing the same thing; I just couldn't see it.`,
      },
      {
        heading: 'The point',
        body: `That extra point of accuracy was partly measuring my dataset's artefacts, not the model's ability to detect fabrication. Being able to inspect the failure was worth more than the score. On a classifier that makes a claim about whether something is true, I'd rather be able to explain a wrong answer than shave a decimal off the error rate.`,
      },
      {
        heading: 'When I would choose differently',
        body: `If the task were image classification or anything where features aren't human-readable, this reasoning evaporates — you can't eyeball a convolution filter either way. This is an argument about text and tabular data, where interpretability is actually available if you reach for it.`,
      },
    ],
  },
  {
    id: 'notebook-to-product',
    title: 'The gap between a working model and a working product',
    preview:
      'My classifier hit 94% in a notebook. Getting it to where someone could actually use it took three times longer.',
    date: '2025-02-22',
    readingTime: '7 min read',
    tag: 'Engineering',
    sections: [
      {
        body: `The sentiment analyzer reached 94% accuracy in about two evenings. Turning it into something a person could use took most of the next two weeks.`,
      },
      {
        heading: 'What the notebook hides',
        body: `In a notebook the input is always a clean DataFrame you prepared yourself. In production someone pastes an empty string, or 40,000 characters, or an emoji-only message. Every one of those was a crash before it was a handled case.`,
      },
      {
        heading: 'The FastAPI rewrite',
        body: `Moving to FastAPI forced the model into a real interface: typed request and response schemas, validation at the boundary, and a loading strategy so the model wasn't deserialised from disk on every request. That last one took response times from roughly two seconds to well under a hundred milliseconds.`,
      },
      {
        heading: 'What I would tell myself',
        body: `Build the endpoint first, with a stub that returns a hardcoded answer. You discover the shape of the real problem — validation, latency, error states — before you've committed to a model architecture that makes those problems harder.`,
      },
    ],
  },
  {
    id: 'llm-provider-abstraction',
    title: 'Writing the Code Explainer so the model is swappable',
    preview:
      'Gemini and OpenAI have different SDKs, different streaming formats and different failure modes. One interface hides all three.',
    date: '2025-05-09',
    readingTime: '8 min read',
    tag: 'Generative AI',
    sections: [
      {
        body: `The Code Explainer started on OpenAI, then moved to Gemini for cost reasons, then ended up supporting both. That migration was painful exactly once — after which I made sure it couldn't be again.`,
      },
      {
        heading: 'The interface',
        body: `One function signature: take a prompt and a config, return a stream of text chunks. Everything provider-specific — SDK setup, message formatting, how streaming chunks arrive, how errors surface — lives behind that boundary. The route handler doesn't know or care which model answered.`,
      },
      {
        heading: 'What it bought me',
        body: `Adding a provider became one file. It also made failover trivial: when one API is slow or rate-limited, falling back is a config change rather than a rewrite.`,
      },
      {
        heading: 'What it cost',
        body: `You give up provider-specific features that don't generalise. Function calling and structured output work differently enough across providers that forcing them through one interface makes both worse. Those I handle outside the abstraction, and accept the duplication.`,
      },
    ],
  },
  {
    id: 'data-cleaning',
    title: 'Mean imputation cost me 20 points of accuracy',
    preview:
      'I filled nulls with the column mean without looking at the distribution. It was heavily skewed.',
    date: '2024-11-15',
    readingTime: '5 min read',
    tag: 'Data',
    sections: [
      {
        body: `I spend more time cleaning data than modelling it. This is the mistake that taught me why.`,
      },
      {
        heading: 'What happened',
        body: `A numeric column had around 12% missing values. I filled them with the mean, as one does, and moved on. Accuracy came in about twenty points below what similar work suggested it should.`,
      },
      {
        heading: 'The cause',
        body: `The column was heavily right-skewed — a long tail of large values dragging the mean well above where most of the data actually sat. Every imputed row got a value that was atypical of the distribution, and I'd created a fake cluster of them at exactly the wrong place. Switching to median imputation recovered nearly all of it.`,
      },
      {
        heading: 'The habit it built',
        body: `Plot the distribution before choosing an imputation strategy. It takes one line and it would have saved me two days.`,
      },
    ],
  },
];

export const notesByDate = [...notes].sort((a, b) => b.date.localeCompare(a.date));
