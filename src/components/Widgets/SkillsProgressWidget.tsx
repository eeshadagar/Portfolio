import { Code, Database, Cloud, Globe, Brain } from 'lucide-react';

type CircularProgressProps = {
  percentage: number;
  icon: React.ElementType;
  name: string;
};

const SkillsProgressWidget = () => {
  const skills = [
    { name: "Python", level: 90, icon: Code },
    { name: "Machine Learning", level: 80, icon: Brain },
    { name: "AWS", level: 70, icon: Cloud },
    { name: "React", level: 85, icon: Globe },
    { name: "SQL", level: 75, icon: Database }
  ];

  const getProgressColor = (level: number) => {
    if (level >= 90) return 'text-emerald-400';
    if (level >= 80) return 'text-green-400';
    if (level >= 70) return 'text-yellow-300';
    if (level >= 60) return 'text-orange-300';
    return 'text-red-300';
  };

  const CircularProgress = ({ percentage, icon: Icon, name }: CircularProgressProps) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-12 h-12 mb-2">
          {/* Glassmorphism circle background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"></div>
          
          <svg className="w-12 h-12 transform -rotate-90 relative z-10" viewBox="0 0 48 48">
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-white/20"
            />
            {/* Progress circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-out ${getProgressColor(percentage)} drop-shadow-lg`}
              style={{
                filter: 'drop-shadow(0 0 6px currentColor)'
              }}
            />
          </svg>
          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Icon size={16} className="text-white drop-shadow-lg" />
          </div>
        </div>
        <div className="text-center">
          <div className={`text-sm font-semibold ${getProgressColor(percentage)} drop-shadow-lg`}>
            {percentage}%
          </div>
          <div className="text-xs text-white/80 mt-1 max-w-16 leading-tight drop-shadow-sm">
            {name}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Glassmorphism background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
      
      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl max-w-md mx-auto border border-white/20">
        <h2 className="text-white text-lg font-semibold mb-4 text-center drop-shadow-lg">Skills Progress</h2>
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {skills.slice(0, 3).map((skill) => (
          <CircularProgress
            key={skill.name}
            percentage={skill.level}
            icon={skill.icon}
            name={skill.name}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 justify-items-center mt-6">
        {skills.slice(3).map((skill) => (
          <CircularProgress
            key={skill.name}
            percentage={skill.level}
            icon={skill.icon}
            name={skill.name}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default SkillsProgressWidget;