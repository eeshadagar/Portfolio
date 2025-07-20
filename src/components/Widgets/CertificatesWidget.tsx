import { useState, useEffect } from "react";

interface Certificate {
    id: number;
    image: string;
    link: string;
    title: string;
}

export default function CertificatesWidget() {
  const certificates: Certificate[] = [
    {
      id: 1,
      image: `${import.meta.env.BASE_URL}images/Certificates/aws.webp`,
      link: "https://www.credly.com/badges/4f851e5f-baae-40e4-8f77-a273b344abdc/linked_in_profile",
      title: "AWS Cloud Practitioner",
    },
    {
      id: 2,
      image: `${import.meta.env.BASE_URL}images/Certificates/nptel.webp`,
      link: "https://internalapp.nptel.ac.in/NOC/NOC25/SEM1/Ecertificates/106/noc25-cs60/Course/NPTEL25CS60S43520023501218323.pdf",
      title: "Python for Data Science",
    },
    {
      id: 3,
      image: `${import.meta.env.BASE_URL}images/Certificates/google.webp`,
      link: "https://www.coursera.org/account/accomplishments/verify/WWHBHRYVB8BB",
      title: "Google Data Analytics",
    },
    {
      id: 4,
      image: `${import.meta.env.BASE_URL}images/Certificates/py_sql.webp`,
      link: "https://www.udemy.com/certificate/UC-766f4f6f-dbd7-49bd-bd96-60b57e35c58c/",
      title: "Python and PostgreSQL",
    },
    {
      id: 5,
      image: `${import.meta.env.BASE_URL}images/Certificates/py_django.webp`,
      link: "https://www.udemy.com/certificate/UC-3f146d3b-5dbd-440f-b675-06a712d646f8/",
      title: "Python and Django",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
      // Remove previous after fade
      setTimeout(() => {
        setPreviousIndex(null);
      }, 500); // match fade duration
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, certificates.length]);

  const current = certificates[currentIndex];
  const previous = previousIndex !== null ? certificates[previousIndex] : null;

  const handleClick = () => {
    window.open(current.link, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="relative h-32 w-[10rem] sm:w-48 rounded-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-white/10 backdrop-blur-lg hover:scale-105 transition-transform flex flex-col justify-between items-center overflow-hidden mx-auto"
    >

      {/* Image Container */}
      <div className="relative w-full h-40 rounded-2xl">
        {previous && (
          <img
            key={previous.id}
            src={previous.image}
            alt={previous.title}
            className="absolute inset-0 w-48 h-full object-cover rounded-2xl transition-opacity duration-500 opacity-0"
          />
        )}
        <img
          key={current.id}
          src={current.image}
          alt={current.title}
          className="absolute inset-0 w-48 h-full object-cover rounded-2xl transition-opacity duration-500 opacity-100"
        />
      </div>
    </button>
  );
}
