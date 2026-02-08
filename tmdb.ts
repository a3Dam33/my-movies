/**
 * Types for TMDB API responses — used by Home and Browse pages.
 */

export interface TmdbMovie {
  id: number;
  title: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  media_type?: 'movie' | 'tv';
}

export interface TmdbPaginatedResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type MediaType = 'movie' | 'tv';

const API_KEY = 'ضَع_مفتاح_الـ_API_الخاص_بك_هنا';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=ar`);
  const data = await response.json();
  return data.results; // يعيد مصفوفة من الأفلام
};