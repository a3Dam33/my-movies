import Link from 'next/link';

const API_KEY = 'ccbb43233b1c2951325a5cd370355110'; 
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export default async function Home() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=ar`, {
    next: { revalidate: 3600 } 
  });
  const data = await res.json();
  const movies = data.results;

  return (
    <main className="min-h-screen bg-[#141414] text-white p-8">
      <header className="mb-12 text-center">
        <h1 className="text-6xl font-black text-red-600 mb-2 tracking-tighter">SHAYESH</h1>
        <p className="text-gray-400 text-sm font-medium tracking-[0.2em]">MOVIES & ENTERTAINMENT</p>
      </header>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {movies?.map((movie: any) => (
          <Link href={`/movie/${movie.id}`} key={movie.id} className="group cursor-pointer">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-900 ring-1 ring-white/10 group-hover:ring-red-600 transition-all">
              <img 
                src={`${IMAGE_BASE}${movie.poster_path}`} 
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                 <span className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold">مشاهدة</span>
              </div>
            </div>
            <h2 className="mt-2 text-sm font-bold truncate">{movie.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}