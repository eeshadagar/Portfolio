import { useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: "Fake News Detector",
    thumbnail: `${import.meta.env.BASE_URL}images/Projects/fakenews.webp`,
    description: "https://fakenews-detector.streamlit.app/",
  },
  {
    id: 2,
    title: "Mental health prediction",
    thumbnail: `${import.meta.env.BASE_URL}images/Projects/social.webp`,
    description: "https://socialmediamentalhealthtrends.streamlit.app/",
  },
  {
    id: 3,
    title: "Code Explainer Chat Bot",
    thumbnail: `${import.meta.env.BASE_URL}images/Projects/Code_explainer.webp`,
    description: "https://codeexplainerfrontend.netlify.app/",
  },
  {
    id: 4,
    title: "Real Time KPI Dashboard",
    thumbnail: `${import.meta.env.BASE_URL}images/Projects/Dashboard.webp`,
    description: "https://realtimekpidashboard.netlify.app/",
  },
];

type Project = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
};

export default function ProjectsWidget() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse/desktop swipe simulation
  const handleMouseDown = (e: any) => {
    e.preventDefault();
    setTouchStart(e.clientX);
    setTouchEnd(null);
    setIsDragging(true);
  };

  const handleMouseMove = (e: any) => {
    if (touchStart && isDragging) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd || !isDragging) {
      setIsDragging(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Add global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging, touchStart, touchEnd, currentIndex]);

  const handleMouseEnter = () => {
    setShowSwipeHint(true);
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-lg overflow-visible max-w-sm mx-auto relative border border-white/20">
        {/* Compact Header */}
        <div className="relative">
        <div
            className="bg-white/5 backdrop-blur-sm p-3 border-b border-white/10 flex items-center justify-between"
            onMouseEnter={() => setShowInstructions(true)}
            onMouseLeave={() => setShowInstructions(false)}
        >
            <img src={`${import.meta.env.BASE_URL}images/icons/about.webp`} className="w-5" />
            <h2 className="text-gray-800 text-sm font-medium text-center flex-1">
            Projects
            </h2>
            <div className="w-5"></div>
        </div>
        {showInstructions && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-[9999] w-64 p-2 bg-white/90 text-xs text-gray-900 rounded shadow-xl">
            <strong>How to Use:</strong>
            <ul className="list-disc list-inside mt-1 space-y-0.5">
                <li>Swipe (or drag) to browse projects</li>
                <li>Tap/click to open project preview</li>
                <li>Use arrows or dots to navigate manually</li>
            </ul>
            </div>
        )}
        </div>

      {/* Project Display */}
      <div className="p-4 sm:p-6 relative">
        {/* Left Arrow */}
        <button
          onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-200 ${
            currentIndex > 0 
              ? 'opacity-70 hover:opacity-100 hover:bg-white/30 cursor-pointer' 
              : 'opacity-30 cursor-not-allowed'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-navy">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => currentIndex < projects.length - 1 && setCurrentIndex(currentIndex + 1)}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-200 ${
            currentIndex < projects.length - 1 
              ? 'opacity-70 hover:opacity-100 hover:bg-white/30 cursor-pointer' 
              : 'opacity-30 cursor-not-allowed'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-navy">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div 
          className="relative bg-gray-100 rounded-2xl overflow-hidden cursor-pointer select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => {
            setShowSwipeHint(false);
            if (isDragging) {
              handleMouseUp();
            }
          }}
          onClick={() => {
            if (!isDragging) {
              setSelected(currentProject);
            }
          }}
        >
          <div className="relative w-full h-48 sm:h-56 md:h-64">
            <img 
              src={currentProject.thumbnail} 
              alt={currentProject.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Project title overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/70 p-4">
            <div className="text-white text-sm sm:text-base font-medium">
              {currentProject.title}
            </div>
          </div>
          
          {/* Swipe hint overlay */}
          {showSwipeHint && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-sm font-medium text-white">
                Swipe to navigate • Tap to open
              </div>
            </div>
          )}
          
          {/* Hover effect */}
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Project indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-navy' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Project counter */}
        <div className="text-center mt-2 text-xs text-white/70">
          {currentIndex + 1} of {projects.length}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{selected.title}</h3>
              <p className="text-gray-600 mb-6">{selected.description}</p>
              
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setSelected(null)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}