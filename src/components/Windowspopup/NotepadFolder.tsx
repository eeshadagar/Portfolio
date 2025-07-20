import { useState } from "react";
import { X, Plus, Search, ChevronRight, ArrowLeft, Edit3, Share, Trash2 } from "lucide-react";

const SAMPLE_NOTES = [
  {
    id: 1,
    title: "How I Built My Fake News Detector",
    content:
      `Fake news is everywhere. I wanted to tackle this issue head-on by using machine learning to detect false information automatically. Here's how I built a Fake News Detector using Python, scikit-learn, and NLP techniques.

    Step 1: Collecting the DatasetI used the Kaggle Fake News dataset which contains labeled news articles — both real and fake. This data was the foundation for training and testing the model.

    Step 2: Data PreprocessingUsing libraries like pandas and NLTK, I cleaned the text by removing stop words, punctuation, and converting everything to lowercase. Then I applied TF-IDF vectorization to convert the text into numeric features.

    Step 3: Model BuildingI tested Logistic Regression, Random Forest, and Passive Aggressive classifiers. Logistic Regression gave me the highest accuracy.

    Step 4: EvaluationThe model achieved over 93% accuracy. Precision and recall were also strong, especially on the fake news class.

    Step 5: Frontend IntegrationI used Streamlit to build a web app where users can paste a news article and get instant feedback on whether it is fake or real.`,
    preview: "Fake news is everywhere. I wanted to tackle this issue head-on by using machine learning to detect false information automatically. Here's how I built a Fake News Detector using Python, scikit-learn, and NLP techniques.",
    date: "2024-12-15",
    time: "8 min read"
  },
  {
    id: 2,
    title: "Learning Cloud from Scratch: My AWS Journey",
    content: `In 2024, I decided to dive into cloud computing. With zero background, I began preparing for the AWS Cloud Practitioner certification.

    Starting from BasicsI used AWS Academy Cloud Foundations which taught me about regions, availability zones, and the AWS global infrastructure.

    Understanding Key ServicesI learned about EC2, S3, Lambda, IAM, and VPCs. I created my own AWS account and practiced deploying services hands-on.

    ChallengesInitially, billing and networking concepts were confusing. But using AWS Skill Builder helped clarify those areas.

    Certification AttemptI passed the AWS Cloud Practitioner exam on my first try, which validated my grasp on foundational concepts.`,
    preview:
      "My experience preparing for the AWS Cloud Practitioner certification and what I learned about cloud computing fundamentals.",
    date: "2024-12-10",
    time: "6 min read"
  },
  {
    id: 3,
    title: "Tips for MCA Students Getting Into Data",
    content: `As an MCA student, shifting into the data world felt intimidating at first. Here's what I learned:

    Start with Basics: Focus on Python and SQL.

    Projects Matter: Build small projects like weather dashboards or data visualizations.

    Learn Git and GitHub: Version control is essential.

    Networking Helps: Attend tech meetups and webinars.

    Intern Early: Even unpaid internships help gain confidence.`,
    preview:
      "Practical advice for computer applications students who want to transition into data science and engineering roles.",
    date: "2024-12-05",
    time: "5 min read"
  },
  {
    id: 4,
    title: "Building Responsive Data Pipelines",
    content: `Data pipelines are the backbone of any data product. I worked on a project where latency and scale were major challenges.

    Design PhilosophyI followed the ELT (Extract, Load, Transform) paradigm and built modular pipelines.

    Tech StackPython scripts for extraction, Apache Airflow for orchestration, and PostgreSQL for storage. I used pandas and PySpark for transformations.

    Handling FailuresI added retries, logging, and alerting to make the pipeline production-ready.

    Testing and MonitoringUnit tests and Grafana dashboards helped track pipeline health in real-time.`,
    preview:
      "Best practices for creating robust, scalable data processing pipelines that can handle real-world data challenges.",
    date: "2024-11-28",
    time: "10 min read"
  },
  {
    id: 5,
    title: "Why I Chose Streamlit for ML Apps",
    content: `When building my first ML app, I tried Flask, Gradio, and Streamlit. Streamlit won.

    Why Streamlit?

    Instant UI generation

    Clean, modern components

    Easy deployment via Streamlit Cloud

    Use CasesI built apps for sentiment analysis, fake news detection, and exploratory data visualization — all in under 100 lines of code.

    Community SupportTheir docs and community are super helpful. Bugs I faced were already answered on GitHub.`,
    preview:
      "Comparing different frameworks for building machine learning applications and why Streamlit became my go-to choice.",
    date: "2024-11-20",
    time: "7 min read"
  },
  {
    id: 6,
    title: "Data Cleaning: The Unsung Hero",
    content: `Before building any model, I spend more time cleaning the data than anything else. It's not glamorous, but it's critical.

    Common Tasks

    Removing nulls and duplicates

    Normalizing text

    Handling outliers

    Feature scaling and encoding

    Real ExampleIn one project, poor handling of null values reduced model accuracy by 20% — fixing it boosted performance massively.

    TakeawayIf you want better models, spend more time cleaning your data. The effort is always worth it.`,
    preview:
      "Why data cleaning is the most important (and overlooked) part of any data science project, with practical examples.",
    date: "2024-11-15",
    time: "9 min read"
  },
];

type Note = {
  id: number;
  title: string;
  content: string;
  preview: string;
  date: string;
  time: string;
};

export default function NotesApp({ onClose }: { onClose: () => void }) {
  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authForm, setAuthForm] = useState({ username: "", password: "" });
  const [showAuth, setShowAuth] = useState(false);

  const filteredNotes = notes.filter(
    note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNoteClick = (note: typeof SAMPLE_NOTES[number]) => {
    setSelectedNote(note);
    setEditContent(note.content);
    setEditTitle(note.title);
  };

  const handleBackToList = () => {
    setSelectedNote(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedNote) {
      const updatedNotes = notes.map(note => 
        note.id === selectedNote.id 
          ? { 
              ...note, 
              title: editTitle || "Untitled",
              content: editContent,
              preview: editContent.slice(0, 50) + "...",
              date: "Today",
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote({ ...selectedNote, title: editTitle, content: editContent });
    }
    setIsEditing(false);
  };

  const handleNewNote = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "",
      preview: "",
      date: "Today",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setEditTitle("New Note");
    setEditContent("");
    setIsEditing(true);
  };

  const handleDeleteNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.filter(note => note.id !== selectedNote.id);
      setNotes(updatedNotes);
      setSelectedNote(null);
    }
  };

  const handleAuth = (e:any) => {
    if (e) e.preventDefault();
    // Simple authentication - in real app, this would be secure
    if (authForm.username === "admin" && authForm.password === "password") {
      setIsAuthenticated(true);
      setShowAuth(false);
      setAuthForm({ username: "", password: "" });
    } else {
      alert("Invalid credentials. Use admin/password");
    }
  };

  // Authentication Modal
  if (showAuth) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl p-6 w-80 mx-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Authentication Required</h2>
            <button onClick={() => setShowAuth(false)} className="hover:bg-gray-300/50 p-1 rounded">
              <X className="w-5 h-5 text-gray-800" />
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={authForm.username}
              onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
              className="w-full p-3 bg-white/50 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-600"
            />
            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              className="w-full p-3 bg-white/50 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-600"
              onKeyPress={(e) => e.key === 'Enter' && handleAuth(e)}
            />
            <button
              onClick={handleAuth}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center">Demo: admin/password</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed m-10 h-fit w-fit sm:left-1/2 sm:-translate-x-1/2 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl sm:w-[1200px] max-w-full shadow-2xl max-h-[90vh] overflow-hidden">
      {/* Window Header */}
      <div className="bg-gray-200/80 px-4 py-2 flex items-center justify-between border-b border-gray-300/50 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-800 font-medium">Notes</span>
        </div>
        <button onClick={onClose} className="hover:bg-gray-300/50 p-1 rounded">
          <X className="w-4 h-4 text-gray-800" />
        </button>
      </div>

      {/* Content */}
      <div className="max-h-[80vh] overflow-hidden flex">
        {/* Sidebar - Notes List */}
        <div className={`${selectedNote ? 'hidden md:block' : 'block'} w-full md:w-80 bg-white/20 backdrop-blur-sm border-r border-white/20 flex flex-col`}>
          {/* Search and New Note */}
          <div className="p-4 border-b border-white/20 bg-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900">My Notes</h2>
              <button onClick={handleNewNote} className="p-1 hover:bg-gray-300/50 rounded text-blue-600">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white/50 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-600"
              />
            </div>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleNoteClick(note)}
                className={`p-4 border-b border-white/10 cursor-pointer hover:bg-white/30 transition-all duration-200 ${
                  selectedNote?.id === note.id ? 'bg-white/40 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 truncate flex-1">{note.title}</h3>
                  <ChevronRight className="w-4 h-4 text-gray-600 ml-2" />
                </div>
                <div className="flex items-center text-xs text-gray-700 mt-1">
                  <span>{note.date}</span>
                  <span className="mx-2">•</span>
                  <span>{note.time}</span>
                </div>
                <p className="text-sm text-gray-800 mt-1 line-clamp-2">{note.preview}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={`${selectedNote ? 'block' : 'hidden md:block'} flex-1 flex flex-col`}>
          {selectedNote ? (
            <>
              {/* Note Header */}
              <div className="p-4 border-b border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-between">
                <div className="flex items-center">
                  <button 
                    onClick={handleBackToList}
                    className="mr-3 p-1 hover:bg-gray-300/50 rounded md:hidden"
                  >
                    <ArrowLeft className="w-5 h-5 text-blue-600" />
                  </button>
                  {isEditing ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="text-lg font-semibold bg-white/50 border border-gray-300/50 rounded px-3 py-1 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Note title..."
                    />
                  ) : (
                    <h2 className="text-lg font-semibold text-gray-900">{selectedNote.title}</h2>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Done
                    </button>
                  ) : (
                    <>
                      <button onClick={handleEdit} className="p-2 hover:bg-gray-300/50 rounded">
                        <Edit3 className="w-5 h-5 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-300/50 rounded">
                        <Share className="w-5 h-5 text-blue-600" />
                      </button>
                      <button onClick={handleDeleteNote} className="p-2 hover:bg-gray-300/50 rounded">
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Note Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {isEditing ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-full resize-none bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-600"
                    placeholder="Start typing your note..."
                    autoFocus
                  />
                ) : (
                  <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg p-6 shadow-lg">
                    <div className="text-base leading-relaxed whitespace-pre-wrap text-gray-800">
                      {selectedNote.content || "This note is empty."}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/30 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Edit3 className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-lg text-gray-900 font-semibold">Select a note to view</p>
                <p className="text-sm mt-1 text-gray-700">Choose a note from the sidebar to read or edit</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}