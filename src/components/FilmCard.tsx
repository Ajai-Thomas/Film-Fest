type Film = {
  title: string;
  director: string;
  poster: string;
  index?: number;
};

export default function FilmCard({ title, director, poster, index }: Film) {
  return (
    <div className="
      group relative 
      w-56 h-[400px]
      shrink-0 cursor-pointer 
      overflow-hidden 
      bg-neutral-900 
      border border-white/10 
      snap-center
    ">
      
      {/* 1. Image */}
      <img
        src={poster}
        alt={title}
        className="
          absolute inset-0 w-full h-full object-cover 
          transition duration-700 ease-out 
          grayscale group-hover:grayscale-0 
          group-hover:scale-110
        "
      />

      {/* 2. BLACK GRADIENT (Bottom only) */}
      <div className="
        absolute inset-0 
        bg-gradient-to-t from-black via-black/60 to-transparent 
        opacity-90 
        transition-opacity duration-500
        z-10
      " />
      
      {/* 3. Red Tint on Hover */}
      <div className="absolute inset-0 bg-accent mix-blend-multiply opacity-0 transition duration-500 group-hover:opacity-40 z-10" />

      {/* 4. Content Layout */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 z-20">
        
        {/* Top Number */}
        <div className="self-end translate-y-[-10px] opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
           <span className="font-ostwall text-3xl text-white/30">
             {index?.toString().padStart(2, '0')}
           </span>
        </div>

        {/* Bottom Text Info */}
        <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
          
          <h3 className="text-xl font-ostwall leading-none uppercase text-white mb-2 drop-shadow-md">
            {title}
          </h3>
          
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-6 bg-accent transition-all duration-300 group-hover:w-10" />
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
              Dir. {director}
            </p>
          </div>

          {/* Register Button */}
          {/* FIXED: Changed hover:bg-accent to hover:bg-[#b00000] so the red background appears */}
          <div className="
            max-h-0 opacity-0 
            group-hover:max-h-[60px] group-hover:opacity-100 
            transition-all duration-500 ease-out
          ">
             <div className="pt-4">
               <span className="inline-block text-[10px] font-black tracking-[0.3em] uppercase bg-white text-black px-2 py-1.5 hover:bg-[#b00000] hover:text-white transition-colors">
                 Register Now
               </span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}