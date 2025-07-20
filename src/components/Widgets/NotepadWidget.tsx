export default function NotepadWidget({
  featuredPost,
  onOpen,
}: {
  featuredPost: any;
  onOpen: () => void;
}) {
  return (
    <div
      onClick={onOpen}
      className="cursor-pointer bg-navy/50 backdrop-blur-sm border border-navy/40 rounded-lg p-2 h-fit sm:w-[10rem] sm:h-[11.15rem] shadow-lg hover:scale-105 transition"
    >
      <h2 className="text-white/50 text-lg font-medium text-center flex-1 mb-2"> Notes </h2>
      <h3 className="text-base font-semibold sm:w-40 text-navy leading-none">{featuredPost.title}</h3>
      <p className="text-navy text-sm sm:h-20 line-clamp-3 leading-none">{featuredPost.excerpt}</p>
    </div>
  );
}
