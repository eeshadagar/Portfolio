export default function Dock({
  toggleWidget,
  openWidgets,
}: {
  toggleWidget: (widget: string) => void;
  openWidgets: string[];
}) {
  const items = [
    { id: "about", label: "About", icon: `${import.meta.env.BASE_URL}images/icons/user.webp`, path: "/about" },
    { id: "projects", label: "Projects", icon: `${import.meta.env.BASE_URL}images/icons/briefcase.webp`, path: "/projects" },
    { id: "contact", label: "Contact", icon: `${import.meta.env.BASE_URL}images/icons/contacts.webp`, path: "/contact" },
    { id: "linkedin", label: "Linkedin", icon: `${import.meta.env.BASE_URL}images/icons/linkedin.webp`, path: "https://www.linkedin.com/eeshadagar/" },
    { id: "mail", label: "Mail", icon: `${import.meta.env.BASE_URL}images/icons/mail.webp`, href: "mailto:eesha5950@gmail.com" },
  ];

  return (
    <div className="fixed bottom-4 w-full sm:w-96 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-4 bg-black/20 sm:bg-white/20 backdrop-blur-md px-3 sm:px-6 py-1 sm:py-2 rounded-full shadow-lg max-w-[90%] sm:max-w-none">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => toggleWidget(item.id)}
          className="px-2 mx-auto sm:px-3 py-1 sm:py-2 rounded hover:bg-white/30 transition-all duration-200 flex flex-col items-center gap-0.5 sm:gap-1"
        >
          <img
            src={item.icon}
            alt={item.label}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          {openWidgets.includes(item.id) && (
            <div className="w-1 h-1 bg-white rounded-full"></div>
          )}
        </button>
      ))}
    </div>
  );
}
