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
      className="cursor-pointer bg-navy/50 backdrop-blur-sm border border-navy/40 rounded-lg p-2 h-fit w-fit sm:w-[10rem] sm:h-[11.15rem] mx-8 sm:mx-0 shadow-lg hover:scale-105 transition"
    >
      <h2 className="text-white/50 text-lg font-medium text-center flex-1 mb-2"> Notes </h2>
      <h3 className="text-base font-semibold sm:w-40 text-navy leading-none">{featuredPost.title}</h3>
      <p className="text-white/50 text-sm sm:h-20 line-clamp-5 leading-none">{featuredPost.excerpt}</p>
    </div>
  );
}
