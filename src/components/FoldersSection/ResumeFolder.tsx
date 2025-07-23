import { X, Download, Calendar, MapPin, Mail, Phone } from 'lucide-react';

const ResumeFolder = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed m-10 h-fit w-fit sm:left-1/2 sm:-translate-x-1/2 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl sm:w-[900px] max-w-full shadow-2xl max-h-[90vh] overflow-hidden">
      {/* Window Header */}
      <div className="bg-gray-200/80 px-4 py-2 flex items-center justify-between border-b border-gray-300/50 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-800 font-medium">Resume</span>
        </div>
        <div className="flex items-center space-x-2">
          <a href="/your_resume.pdf" download>
            <button className="sm:px-3 sm:py-1 bg-blue-500/80 mx-2 px-1 backdrop-blur-sm text-white rounded text-xs sm:text-sm hover:bg-blue-600/80 transition-colors flex items-center border border-white/30">
              <Download className="w-3 h-3 mr-1" />
              Download PDF
            </button>
          </a>
          <button onClick={onClose} className="hover:bg-gray-300/50 p-1 rounded">
            <X className="w-4 h-4 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="max-h-[80vh] overflow-y-auto">
        <div className="max-w-3xl mx-auto p-8">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-white/30">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Eesha Dagar</h1>
            <p className="text-xl text-blue-600 font-semibold mb-4">MCA Student | Aspiring Data Scientist & AI/ML Enthusiast</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-800">
              <div className="flex items-center"><Mail className="w-4 h-4 mr-1" />eesha5950@gmail.com</div>
              <div className="flex items-center"><Phone className="w-4 h-4 mr-1" />+91 7827491307</div>
              <div className="flex items-center"><MapPin className="w-4 h-4 mr-1" />Gurugram, Haryana</div>
            </div>
          </div>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-white/30 pb-2">Education</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">MCA – The NorthCap University</h3>
              <div className="text-blue-600 font-medium">2024 – 2026 | CGPA: 7.88</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">BCA – Symbiosis International University</h3>
              <div className="text-blue-600 font-medium">2020 – 2023 | CGPA: 6.66</div>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-white/30 pb-2">Experience</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Data Science Intern</h3>
              <div className="text-blue-600 font-medium">Datoop Technology Pvt Ltd</div>
              <div className="flex items-center text-gray-800 text-sm mt-1 mb-2"><Calendar className="w-4 h-4 mr-1" />June 2025 – July 2025</div>
              <ul className="text-gray-800 text-sm space-y-1 ml-4">
                <li>• Cleaned and processed customer datasets using Pandas and Scikit-learn, improving model accuracy by 14.2%.</li>
                <li>• Built ML models for customer segmentation and optimized using cross-validation.</li>
                <li>• Created KPI dashboards using Power BI and Matplotlib.</li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Data Analyst Intern</h3>
              <div className="text-blue-600 font-medium">Jobizo</div>
              <div className="flex items-center text-gray-800 text-sm mt-1 mb-2"><Calendar className="w-4 h-4 mr-1" />Mar 2023 – May 2023</div>
              <ul className="text-gray-800 text-sm space-y-1 ml-4">
                <li>• Automated data cleaning pipelines, improving efficiency by 38.1%</li>
                <li>• Analyzed 12,000+ records for market trends, contributing to a 13.7% growth forecast</li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Web Development Intern</h3>
              <div className="text-blue-600 font-medium">Advert Web Pvt Ltd</div>
              <div className="flex items-center text-gray-800 text-sm mt-1 mb-2"><Calendar className="w-4 h-4 mr-1" />Jan 2023 – Mar 2023</div>
              <ul className="text-gray-800 text-sm space-y-1 ml-4">
                <li>• Built React.js apps using Vite, improving SEO and performance</li>
                <li>• Designed modern UI with Tailwind CSS and Material Design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Web Development Intern</h3>
              <div className="text-blue-600 font-medium">AIM Foundation</div>
              <div className="flex items-center text-gray-800 text-sm mt-1 mb-2"><Calendar className="w-4 h-4 mr-1" />Nov 2020 – Mar 2021</div>
              <ul className="text-gray-800 text-sm space-y-1 ml-4">
                <li>• Built scalable Python/Django APIs</li>
                <li>• Automated tasks with scripts, boosting efficiency</li>
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-white/30 pb-2">Projects</h2>
            <ul className="text-gray-800 text-sm space-y-3">
              <li>
                <strong>News App:</strong> React SPA with NewsAPI integration, infinite scroll, and route-based category views.  
              </li>
              <li>
                <strong>Flask Meme App:</strong> Meme generator web app with Flask and Tailwind, deployed with GitHub.
              </li>
              <li>
                <strong>Depression Prediction System:</strong> Random Forest model + Streamlit frontend; 98% accuracy.
              </li>
              <li>
                <strong>Fake News Detector:</strong> TF-IDF + Logistic Regression with 98.8% accuracy.
              </li>
            </ul>
          </section>

          {/* Technologies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-white/30 pb-2">Technical Skills</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-800">
              <li><strong>Frontend:</strong> React.js, Next.js, Tailwind CSS, Vite</li>
              <li><strong>Backend:</strong> Node.js, Express.js, Django, Flask</li>
              <li><strong>Languages:</strong> Python, SQL, JavaScript, R</li>
              <li><strong>ML & Data:</strong> Pandas, NumPy, scikit-learn, TensorFlow</li>
              <li><strong>Tools:</strong> Git, GitHub, Tableau, Jupyter</li>
            </ul>
          </section>

          {/* Certificates */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-white/30 pb-2">Certifications</h2>
            <ul className="text-gray-800 text-sm space-y-2">
              <li>• Google Data Analytics Professional Certificate</li>
              <li>• AWS Academy Cloud Foundations</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumeFolder;
