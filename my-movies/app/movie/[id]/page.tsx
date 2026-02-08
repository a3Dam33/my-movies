"use client";
import { useState, useEffect, use } from "react";

const API_KEY = 'ccbb43233b1c2951325a5cd370355110';

export default function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [movie, setMovie] = useState<any>(null);
  const [server, setServer] = useState(4); // سيرفر 4 هو الأفضل عندك

  useEffect(() => {
    // جلب البيانات مع فحص اللغة لضمان عدم ظهور "Send Help"
    const fetchMovie = async () => {
      try {
        const resAr = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ar`);
        const dataAr = await resAr.json();
        
        if (!dataAr.title || dataAr.title === "Send Help") {
          const resEn = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
          const dataEn = await resEn.json();
          setMovie(dataEn);
        } else {
          setMovie(dataAr);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchMovie();
  }, [id]);

  const servers = [
    `https://vidsrc.me/embed/movie?tmdb=${id}`,
    `https://vidsrc.xyz/embed/movie/${id}`,
    `https://embed.su/embed/movie/${id}`,
    `https://player.vidsrc.nl/embed/movie/${id}`
  ];

  if (!movie) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white font-black animate-pulse">
       SHAYESH STREAMING...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 md:p-10 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-10">
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_green]"></div>
              <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">SSL Secure</span>
           </div>
           <h2 className="text-4xl font-black text-red-600 tracking-tighter">SHAYESH</h2>
           <a href="/" className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-2xl font-bold text-xs transition-all">العودة للرئيسية</a>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {['سيرفر 1', 'سيرفر 2', 'سيرفر 3', 'سيرفر 4'].map((name, index) => (
            <button 
              key={index}
              onClick={() => setServer(index + 1)}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all border-2 ${server === index + 1 ? 'bg-red-600 border-red-600 shadow-lg' : 'bg-transparent border-gray-800 text-gray-500 hover:border-red-600'}`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-black mb-12">
          <iframe 
            src={servers[server - 1]} 
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            frameBorder="0"
            referrerPolicy="origin"
          ></iframe>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h1 className="text-5xl font-black mb-8 leading-tight">
                {movie.title || movie.original_title}
            </h1>
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md">
               <h3 className="text-xl font-bold mb-4 text-red-500 border-r-4 border-red-500 pr-3">قصة الفيلم</h3>
               <p className="text-gray-300 leading-relaxed text-xl font-light">
                  {movie.overview || "الوصف غير متوفر حالياً، استمتع بالمشاهدة!"}
               </p>
            </div>
          </div>
          
          <div className="space-y-4">
             <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex justify-between items-center shadow-xl">
                <span className="text-gray-500 font-bold">تقييم SHAYESH</span>
                <span className="text-2xl font-black text-yellow-500 italic">⭐ {movie.vote_average?.toFixed(1)}</span>
             </div>
             <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex justify-between items-center shadow-xl">
                <span className="text-gray-500 font-bold">سنة الإصدار</span>
                <span className="text-xl font-bold">{movie.release_date?.split('-')[0] || "2026"}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}