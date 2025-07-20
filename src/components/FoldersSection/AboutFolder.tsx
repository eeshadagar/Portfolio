import { X, MapPin, GraduationCap } from 'lucide-react';

const AboutFolder = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed m-10 h-fit w-fit sm:left-1/2 sm:-translate-x-1/2 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl sm:w-[800px] max-w-full shadow-2xl max-h-[90vh] overflow-hidden z-50">
      {/* Window Header */}
      <div className="bg-gray-200/80 px-4 py-2 flex items-center justify-between border-b border-gray-300/50 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-800 font-medium">About Me</span>
        </div>
        <button onClick={onClose} className="hover:bg-gray-300/50 p-1 rounded">
          <X className="w-4 h-4 text-gray-800" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Photo Section */}
          <div className="md:w-1/3 text-center">
            <div className="relative mb-6">
              <div className="w-40 h-40 mx-auto backdrop-blur-sm rounded-full flex items-center justify-center text-5xl text-white font-bold shadow-lg border border-white/30">
                <img src={`${import.meta.env.BASE_URL}images/me.webp`} className="rounded-full" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-navy backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce border border-white/30">
                That's Me! 
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Eesha Dagar</h2>
            <p className="text-navy font-semibold">Master's Student</p>
          </div>

          {/* Info Section */}
          <div className="md:w-2/3">
            <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-navy mb-4">This is who you're dealing with!</h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                Hey there! I'm Eesha, a passionate Master's student diving deep into the world of Data Science. 
                I love turning raw data into meaningful insights and building solutions that make a real impact.
              </p>
              <p className="text-gray-800 leading-relaxed">
                When I'm not crunching numbers or training models, you'll find me exploring new technologies, 
                contributing to open-source projects, or enjoying a good cup of coffee while brainstorming 
                the next big data-driven solution.
              </p>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-lg">
                <div className="flex items-center mb-2">
                  <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Education</h4>
                </div>
                <p className="text-gray-800 text-sm">Master's in Computer Applications (MCA)</p>
                <p className="text-gray-700 text-xs">Expected 2026</p>
              </div>

              <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-lg">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 text-red-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">Location</h4>
                </div>
                <p className="text-gray-800 text-sm">Gurgaon, Haryana</p>
              </div>

              <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-lg">
                <div className="flex items-center mb-2">
                  <h4 className="font-semibold text-gray-900">Focus</h4>
                </div>
                <p className="text-gray-800 text-sm">AI & ML</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFolder;
