// 1. التعريفات الأساسية (ضرورية لكي يعمل الكود)
const API_KEY = 'ccbb43233b1c2951325a5cd370355110'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export default async function Home() {
  // 2. جلب البيانات من API
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=ar`, {
    next: { revalidate: 3600 } // تحديث البيانات كل ساعة
  });
  const data = await res.json();
  const movies = data.results;

  return (
    <main className="min-h-screen bg-[#141414] text-white pt-20 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-right">أفلام رائجة الآن</h1>
      
      {/* 3. شبكة عرض الأفلام (Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.map((movie: any) => (
          <div key={movie.id} className="group cursor-pointer">
            <div className="overflow-hidden rounded-md bg-gray-800 aspect-[2/3]">
              <img 
                src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : '/no-image.png'} 
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h2 className="mt-2 text-sm font-medium truncate">{movie.title || movie.name}</h2>
            <p className="text-xs text-gray-400">{movie.release_date?.split('-')[0] || 'قريباً'}</p>
          </div>
        ))}
      </div>
    </main>
  );
}