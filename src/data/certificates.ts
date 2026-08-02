/**
 * Certificates — every one links to an independently verifiable page.
 * Details transcribed from the certificate images, so titles, dates and
 * issuers match what a recruiter sees when they click through.
 */

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  detail?: string;
  image: string;
  link: string;
};

export const certificates: Certificate[] = [
  {
    id: 'google-data-analytics',
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google · Coursera',
    date: 'Mar 2023',
    detail: '8-course program',
    image: '/images/certificates/google.webp',
    // Verification link is for "Analyze Data to Answer Questions" (course 4).
    // TODO: swap for the Professional Certificate credential URL from your
    // Coursera "Accomplishments" page so the link matches the title above.
    link: 'https://www.coursera.org/account/accomplishments/verify/WWHBHRYVB8BB',
  },
  {
    id: 'aws-cloud-foundations',
    title: 'AWS Academy Cloud Foundations',
    issuer: 'Amazon Web Services',
    date: 'May 2025',
    detail: '20 course hours',
    image: '/images/certificates/aws.webp',
    link: 'https://www.credly.com/go/T8cbxnH6',
  },
  {
    id: 'nptel-python',
    title: 'Python for Data Science',
    issuer: 'NPTEL · IIT Madras',
    date: 'Feb 2025',
    detail: 'Elite · 68%',
    image: '/images/certificates/nptel.webp',
    link: 'https://internalapp.nptel.ac.in/NOC/NOC25/SEM1/Ecertificates/106/noc25-cs60/Course/NPTEL25CS60S43520023501218323.pdf',
  },
  {
    id: 'udemy-postgres',
    title: 'The Complete Python & PostgreSQL Developer Course',
    issuer: 'Udemy',
    date: 'Dec 2022',
    detail: '22 hours',
    image: '/images/certificates/py-sql.webp',
    link: 'https://www.udemy.com/certificate/UC-766f4f6f-dbd7-49bd-bd96-60b57e35c58c/',
  },
  {
    id: 'udemy-django',
    title: 'Python and Django Full Stack Web Developer Bootcamp',
    issuer: 'Udemy',
    date: 'Oct 2021',
    detail: '32 hours',
    image: '/images/certificates/py-django.webp',
    link: 'https://www.udemy.com/certificate/UC-3f146d3b-5dbd-440f-b675-06a712d646f8/',
  },
];
