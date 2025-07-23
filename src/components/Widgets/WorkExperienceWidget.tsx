import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart} from 'lucide-react';

const WorkExperiencePlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, _setVolume] = useState(0.7);
  const [isLiked, setIsLiked] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Sample work experience data
  const workExperience = [
    {
      title: "Data Science Intern",
      company: "Datoop",
      duration: "June 2025 - July 2025",
      skills: ["Data Preprocessing", "Machine Learning", "EDA", "Model Tuning"],
      description: "Worked on building a customer churn prediction model using Python and Excel to help the startup identify at-risk users and improve retention.",
      },
    {
      title: "Data Analyst Intern",
      company: "Jobizo",
      duration: "March 2023 - May 2023",
      skills: ["Python", "Data Analysis", "Microsoft Excel"],
      description: "Automated data cleaning pipelines, improving efficiency by 38.1%, Analyzed 12,000+ records for market trends, contributing to a 13.7% growth forecast",
    },
    {
      title: "Web Development Intern",
      company: "Advert Web India",
      duration: "Jan 2023 - March 2023",
      skills: ["React.js", "Tailwind CSS", "PHP"],
      description: "Developed responsive user interfaces",
    },
    {
      title: "Web Development Intern",
      company: "AIM Foundation",
      duration: "Nov 2020 - March 2021",
      skills: ["Python", "Django", "PHP"],
      description: "Started my journey in web development",
    }
  ];

  const currentJob = workExperience[currentTrack];


  // Auto-progress simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextTrack();
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % workExperience.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + workExperience.length) % workExperience.length);
    setProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressTime = Math.floor((progress / 100) * 180); // 3 minutes max
  const remainingTime = 180 - progressTime;

  return (
    <div className="flex items-center justify-center">
      <div className="w-80 relative cursor-pointer">
        {/* Main Player Container - Glassmorphism */}
        <div className="bg-white/40 backdrop-blur-sm rounded-full border border-white/10 rounded-lg p-3 shadow-xl">
          
          {/* Header */}
          <div
            className="flex items-center justify-between mb-2 relative"
            onMouseEnter={() => setShowInstructions(true)}
            onMouseLeave={() => setShowInstructions(false)}
          >
            <img src={`${import.meta.env.BASE_URL}images/icons/about.webp`} className="w-5" />

            {showInstructions && (
              <div className="absolute top-6 left-0 z-20 w-64 p-2 bg-white bg-opacity-90 text-xs text-gray-900 rounded shadow-lg">
                <strong>How to Use:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  <li>Use play/pause to auto-scroll your experience.</li>
                  <li>Skip forward/back to navigate jobs.</li>
                  <li>Adjust volume and mark favorites.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Album Art / Experience Visual - Compact */}
          <div className="relative mb-2">
            <div className={`w-full h-16 rounded-md flex items-center justify-center overflow-hidden transform transition-all duration-500 ${isPlaying ? 'scale-105' : 'scale-100'}`}>
              <div className="absolute inset-0 bg-white/10 backdrop-filter backdrop-blur-sm"></div>
              
              <div className="text-center text-navy relative z-10">
                <div className="text-lg font-bold opacity-60">
                  {currentTrack + 1}
                </div>
                <div className="text-xs font-medium">
                  {currentJob.company.split(' ')[0]}
                </div>
              </div>
              
              {isPlaying && (
                <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
              )}
            </div>
            
            {/* Like button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110"
            >
              <Heart className={`w-2.5 h-2.5 ${isLiked ? 'text-red-400 fill-current' : 'text-gray-800'}`} />
            </button>
          </div>

          {/* Track Info - Compact */}
          <div className="mb-2">
            <h2 className="text-gray-800 text-base font-bold truncate">
              {currentJob.title}
            </h2>
            <p className="text-gray-700 text-xs mb-3">
              {currentJob.company}
            </p>
            <div className="flex flex-wrap gap-1">
              {currentJob.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 bg-navy/30 backdrop-filter backdrop-blur-sm text-gray-800 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-700 mb-1">
              <span>{formatTime(progressTime)}</span>
              <span>-{formatTime(remainingTime)}</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-full h-0.5">
              <div 
                className="bg-gray-700 h-0.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-3 mb-2">
            <button
              onClick={prevTrack}
              className="p-1.5 text-gray-800 hover:text-gray-900 transition-all duration-300 transform hover:scale-110 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-full"
            >
              <SkipBack className="w-3 h-3" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="w-8 h-8 bg-white bg-opacity-90 backdrop-filter backdrop-blur-xl rounded-full flex items-center justify-center text-gray-900 transform transition-all duration-300 hover:scale-110 shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5 ml-0.5" />
              )}
            </button>
            
            <button
              onClick={nextTrack}
              className="p-1.5 text-gray-800 hover:text-gray-900 transition-all duration-300 transform hover:scale-110 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-full"
            >
              <SkipForward className="w-3 h-3" />
            </button>
          </div>

          {/* Volume Control - Compact */}
          <div className="flex items-center space-x-2 mb-2">
            <Volume2 className="w-3 h-3 text-gray-700" />
            <div className="flex-1 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-full h-0.5">
              <div 
                className="bg-gray-700 h-0.5 rounded-full transition-all duration-300"
                style={{ width: `${volume * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Track List Indicator */}
          <div className="flex justify-center space-x-1">
            {workExperience.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentTrack(index);
                  setProgress(0);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentTrack 
                    ? 'bg-gray-700' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperiencePlayer;