import FilmCard from "../components/FilmCard";

const films = [
  {
    title: "A Mountain for Dreamers",
    director: "Ajai Thomas",
    poster: "/films/a-mountain-for-dreamers.jpg",
  },
  {
    title: "Between Frames",
    director: "Nikhil R",
    poster: "/films/between-frames.jpg",
  },
  {
    title: "Red Silence",
    director: "Ananya S",
    poster: "/films/red-silence.jpg",
  },
  {
    title: "Last Reel",
    director: "Arjun K",
    poster: "/films/last-reel.jpg",
  },
];

export default function FilmsSection() {
  return (
    <section className="relative bg-black text-white py-28 px-6">
      <h2 className="text-2xl tracking-widest mb-10">
        FEATURED FILMS
      </h2>

      <div className="flex gap-8 overflow-x-auto scrollbar-hide">
        {films.map((film) => (
          <FilmCard key={film.title} {...film} />
        ))}
      </div>
    </section>
  );
}
