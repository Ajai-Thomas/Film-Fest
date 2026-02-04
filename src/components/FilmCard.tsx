type Film = {
  title: string;
  director: string;
  poster: string;
};

export default function FilmCard({ title, director, poster }: Film) {
  return (
    <div className="group relative w-64 h-96 shrink-0 cursor-pointer overflow-hidden bg-black">
      {/* Film poster */}
      <img
        src={poster}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-105"
      />

      {/* Red overlay on hover */}
      <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-90 transition duration-300" />

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-lg tracking-widest text-black">
          {title}
        </h3>
        <p className="text-xs text-black/70 mt-1">
          Dir. {director}
        </p>

        <span className="mt-3 text-sm tracking-widest text-black font-bold">
          REGISTER →
        </span>
      </div>
    </div>
  );
}
