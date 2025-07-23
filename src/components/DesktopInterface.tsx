
import { useState } from 'react';
import { User, Briefcase, Mail, FileText} from 'lucide-react';

import AboutFolder from './FoldersSection/AboutFolder';
import ProjectsFolder from './FoldersSection/ProjectsFolder';
import ContactFolder from './FoldersSection/ContactFolder';
import ResumeFolder from './FoldersSection/ResumeFolder';
import Dock from './Dock';

import NotepadWidget from './Widgets/NotepadWidget';
import NotepadFolder from './Windowspopup/NotepadFolder';

import DashboardWidget from './Widgets/DashboardWidget';
import DashboardFolder from './Windowspopup/DashboardFolder';

import Clock from './Widgets/Clock';
import ProjectsWidget from './Widgets/ProjectsWidget';
import CertificatesWidget from './Widgets/CertificatesWidget';
import WorkExperienceWidget from './Widgets/WorkExperienceWidget';

const blogPosts = [
    {
    title: "How I Built My Fake News Detector",
    excerpt:
      "A detailed walkthrough of building a machine learning model to detect fake news using Python, scikit-learn, and natural language processing techniques.",
    featured: true
  },
]

const DesktopInterface = () => {
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [openWidgets, setOpenWidgets] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggleWidget = (widget: string) => {
    if (openWidgets.includes(widget)) {
      setOpenWidgets(openWidgets.filter(w => w !== widget));
    } else {
      setOpenWidgets([...openWidgets, widget]);
    }
  };

  const desktopItems = [
    { id: 'about', name: 'About Me', icon: User },
    { id: 'projects', name: 'Projects', icon: Briefcase },
    { id: 'contact', name: 'Contact', icon: Mail },
    { id: 'resume', name: 'Resume', icon: FileText },
  ];

  const openFolderHandler = (folderId: string) => {
    setOpenFolder(folderId);
  };

  const closeFolderHandler = () => {
    setOpenFolder(null);
  };

  const renderFolderContent = () => {
    switch (openFolder) {
      case 'about':
        return <AboutFolder onClose={closeFolderHandler} />;
      case 'projects':
        return <ProjectsFolder onClose={closeFolderHandler} />;
      case 'contact':
        return <ContactFolder onClose={closeFolderHandler} />;
      case 'resume':
        return <ResumeFolder onClose={closeFolderHandler} />;
      default:
        return null;
    }
  };
  const [showNotepad, setShowNotepad] = useState(false);

  const featuredPost = blogPosts.find((post) => post.featured);
  const handleExternalLink = (type: string) => {
    if (type === 'linkedin') {
      window.open('https://www.linkedin.com/in/eeshadagar/', '_blank');
    } else if (type === 'mail') {
      window.open('mailto:eesha5950@gmail.com', '_blank');
    }
    setOpenWidgets(openWidgets.filter(w => w !== type));
  };
  const renderDockWidgets = () => {
    return openWidgets.map((widget) => {
      switch (widget) {
        case 'about':
          return (
            <div key={widget} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <AboutFolder onClose={() => toggleWidget('about')} />
            </div>
          );
        case 'projects':
          return (
            <div key={widget} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <ProjectsFolder onClose={() => toggleWidget('projects')} />
            </div>
          );
        case 'contact':
          return (
            <div key={widget} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <ContactFolder onClose={() => toggleWidget('contact')} />
            </div>
          );
          case 'linkedin':
            handleExternalLink('linkedin');
            return null;
          
          case 'mail':
            handleExternalLink('mail');
            return null;
          
        default:
          return null;
      }
    });
  };

  return (
    <div className="sm:bg-banner min-h-screen bg-beige relative overflow-hidden" style={{ backgroundPosition: "center 1px" }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 sm:bg-black/20"></div>
      
      {/* Status Bar - Mobile */}
      <div className="sm:hidden absolute top-0 left-0 right-0 flex justify-between items-center p-2 text-white text-sm z-20">
        <div className="flex items-center gap-1">
          <span><img src={`${import.meta.env.BASE_URL}images/icons/wifi.webp`} className='w-4' /></span>
          <span><img src={`${import.meta.env.BASE_URL}images/icons/battery.webp`} className='w-4' /></span>
        </div>
      </div>

      {/* Desktop Status Bar */}
      <div className="hidden sm:flex flex-row items-center gap-2 mt-4 ml-4 text-white text-sm z-20">
        <span><img src={`${import.meta.env.BASE_URL}images/icons/wifi.webp`} className='w-4' /></span>
        <span><img src={`${import.meta.env.BASE_URL}images/icons/battery.webp`} className='w-4' /></span>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Mobile Header Banner */}
        <div className="sm:hidden pt-12 pb-6 px-4">
          <img src={`${import.meta.env.BASE_URL}images/banner.webp`} className='rounded-lg' />
        </div>
        {/* Desktop Layout */}
        <div className="hidden sm:flex sm:h-screen sm:p-4 justify-between mt-[0px]">
          {/* Left Side - Widgets */}
          <div className='flex flex-col gap-6'>

              {/* Projects Widget */}
              <div className="rounded-3xl h-fit w-max-[440px] overflow-hidden">
                <ProjectsWidget />
              </div>

            <div className="flex flex-row gap-6">
              {/* Featured Post */}
              <div className="flex-1">
                <NotepadWidget 
                  featuredPost={featuredPost} 
                  onOpen={() => setShowNotepad(true)} 
                />
              </div>            
              {/* Learning Dashboard Widget */}
              <div className="h-fit rounded-2xl w-48 overflow-hidden">
                <DashboardWidget onOpen={() => setOpen(true)} />
              </div>
            </div>
            
          </div>

          {/* Right Side - Widgets */}
          <div className="flex flex-col">
            <div className="flex flex-col gap-6">
              {/* certificate and Clock Container */}
              <div className="relative flex justify-center">
                {/* Certificates Widget */}
                <div className="rounded-2xl h-32 w-48 overflow-hidden">
                  <CertificatesWidget />
                </div>
                {/* Clock Widget */}
                <div className="flex items-center justify-center ml-4">
                  <Clock />
                </div>
              </div>
              {/* Sticker and Folder Container */}
              <div className="relative flex justify-center">
                {/* Navigation Folders */}
                <div className="m-6 bg-white/40 rounded-2xl">
                  <div className="grid grid-cols-2 gap-4 w-48 h-fit max-w-sm sm:max-w-lg bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-4 mx-auto">
                    {desktopItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition-all duration-300"
                        onClick={() => openFolderHandler(item.id)}>
                        <div className="hover:shadow-xl hover:bg-white/5 rounded-lg aspect-square flex items-center justify-center">
                          <img src={`${import.meta.env.BASE_URL}images/icons/folder-icon.webp`} className="w-4" />
                        </div>
                        <span
                          className="text-navy font-semibold text-xs text-center">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div> 
                {/* Sticker */}
                <div className='sticker w-32 '>
                  <img src={`${import.meta.env.BASE_URL}images/sticker.webp`} />
                </div>      
              </div>
            </div>
            <div className='h-fit'>
              <WorkExperienceWidget />
            </div>
          </div> 
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden px-4 space-y-6">
          {/* App Grid */}
          <div>
            <div className="grid grid-cols-4 gap-4 w-full bg-white/20 backdrop-blur-sm rounded-xl shadow-lg px-2 pb-2">
              {desktopItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => openFolderHandler(item.id)}
                >
                  <div className="hover:bg-white/40 rounded-lg w-full aspect-square flex items-center justify-center">
                    <img src={`${import.meta.env.BASE_URL}images/icons/folder-icon.webp`} className="w-8" />
                  </div>
                  <span className="text-navy font-semibold text-xs text-center">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Projects Widget */}
          <div className="rounded-2xl overflow-hidden">
            <ProjectsWidget />
          </div>

          {/* Dashboard Widget */}
          <div className="rounded-2xl overflow-hidden">
            <DashboardWidget onOpen={() => setOpen(true)} />
          </div>
          <div className='flex flex-row mx-5 justify-between'>
            {/* clock */}
            <img src={`${import.meta.env.BASE_URL}images/sticker.webp`} className="w-32" />
            {/* Certificates Widget */}
            <div className="rounded-2xl overflow-hidden">
              <div className='mx-auto'>
              <CertificatesWidget />
              </div>
            </div>
          </div>
  
          {/* Featured Post */}
          <div>
            <NotepadWidget 
              featuredPost={featuredPost} 
              onOpen={() => setShowNotepad(true)} 
            />
          </div>
          
          {/* Work Experience */}
          <div className="rounded-2xl overflow-hidden">
            <WorkExperienceWidget />
          </div>
        </div>
      </div>

      {/* Desktop Dock */}
      <div className="hidden sm:flex fixed bottom-0 left-0 right-0 z-30">
        <Dock toggleWidget={toggleWidget} openWidgets={openWidgets} />
      </div>

      {/*Mobile Dock */}
      <div className="flex sm:hidden w-screen fixed bottom-0 left-0 right-0 z-30">
        <Dock toggleWidget={toggleWidget} openWidgets={openWidgets} />
      </div>

      {/* Modals */}
      {openFolder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          {renderFolderContent()}
        </div>
      )}

      {showNotepad && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <NotepadFolder onClose={() => setShowNotepad(false)} />
        </div>
      )}

      {open && (
        <DashboardFolder onClose={() => setOpen(false)} />
      )}

      {renderDockWidgets()}
    </div>
  );
};

export default DesktopInterface;