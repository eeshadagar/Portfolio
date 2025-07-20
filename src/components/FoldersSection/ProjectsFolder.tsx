import { X, Github, Calendar } from 'lucide-react';

const ProjectsFolder = ({ onClose }: { onClose: () => void }) => {
  const projects = [
    {
      title: "Car Purchase Prediction",
      description: "Built a regression model to predict car purchase amounts based on customer demographics and financial data. Applied data preprocessing, one-hot encoding for categorical variables, and trained a Random Forest model to forecast purchase behavior with high accuracy.",
      tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      date: "Jul 2024",
      color: "from-green-400/80 to-green-600/80",
      gitlink: "https://github.com/eeshadagar/Sales_Prediction.git"
    },
    {
      title: "Customer review Analysis",
      description: "Analyzed Yelp business reviews by merging user and business data to classify sentiment (positive, neutral, negative) based on star ratings. Visualized sentiment distribution and extracted diverse, high-relevance keywords from reviews using BERT embeddings and MaxSum Similarity to identify trending topics across sentiment categories.",
      tech: ["Python", "Pandas", "Plotly", "Scikit-learn", "SentenceTransformer", "NLP"],
      date: "Nov 2023",
      color: "from-green-400/80 to-green-600/80",
      gitlink: "https://github.com/eeshadagar/customer_review_analysis.git"
    },
    {
      title: "Real-time Dashboard",
      description: "Created an interactive dashboard for monitoring KPIs with real-time data updates.",
      tech: ["React", "D3.js", "Node.js", "MongoDB"],
      date: "Oct 2023",
      color: "from-purple-400/80 to-purple-600/80",
      gitlink: "https://github.com/eeshadagar/Real_time_KPI_dashboard"
    },
    {
      title: "Sentiment Analysis Tool",
      description: "Developed a web app to analyze sentiment in social media posts using NLP techniques.",
      tech: ["Python", "NLTK", "Flask", "Bootstrap"],
      date: "Sep 2023",
      color: "from-red-400/80 to-red-600/80",
      gitlink: "https://github.com/eeshadagar/sentiment_analyzer"
    }
  ];

  return (
    <div className="fixed m-10 h-fit w-fit sm:left-1/2 sm:-translate-x-1/2 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl sm:w-[1000px] max-w-full shadow-2xl max-h-[90vh] overflow-hidden">
      {/* Window Header */}
      <div className="bg-gray-200/80 px-4 py-2 flex items-center justify-between border-b border-gray-300/50 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-800 font-medium">My Projects</span>
        </div>
        <button onClick={onClose} className="hover:bg-gray-300/50 p-1 rounded">
          <X className="w-4 h-4 text-gray-800" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Projects</h2>
          <p className="text-gray-800">Here are some of the data science projects I've worked on</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Project Header */}
              <div className={`h-24 bg-gradient-to-r ${project.color} backdrop-blur-sm p-4 flex items-center justify-between border-b border-white/30`}>
                <h3 className="text-white font-bold text-lg">{project.title}</h3>
                <div className="flex space-x-2">
                  {project.gitlink && (
                    <a href={project.gitlink} target="_blank" rel="noopener noreferrer">
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all border border-white/30">
                        <Github className="w-4 h-4 text-white" />
                      </button>
                    </a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4">
                <p className="text-gray-800 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-white/40 backdrop-blur-sm text-gray-800 text-xs rounded-full font-medium border border-white/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center text-gray-700 text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  {project.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Want to see more?</h3>
            <p className="text-gray-800 mb-4">Check out my GitHub for more projects and code samples!</p>
            <button className="px-6 py-2 bg-blue-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600/80 transition-colors font-semibold border border-white/30">
              Visit GitHub Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsFolder;
