import {getSampleMovies} from "@/lib/sample-data";
import {isSupabaseConfigured} from "@/lib/supabase/env";
import {createSupabaseServerClient} from "@/lib/supabase/server";
import {getTmdbMovies} from "@/lib/tmdb";
import type {Movie} from "@/lib/types";
type TitleRow={id:string;title:string;description:string|null;genre:string|null;release_year:number|null;rating:string|null;poster_url:string|null;backdrop_url:string|null;featured:boolean|null};
function mapTitle(row:TitleRow):Movie{return{id:row.id,title:row.title,description:row.description??"More details coming soon.",genre:row.genre??"Featured",releaseYear:row.release_year??new Date().getFullYear(),rating:row.rating??"13+",posterUrl:row.poster_url??"",backdropUrl:row.backdrop_url??row.poster_url??"",featured:row.featured??false};}
export async function getCatalog():Promise<Movie[]>{if(isSupabaseConfigured()){try{const supabase=await createSupabaseServerClient();const {data,error}=await supabase.from("titles").select("id,title,description,genre,release_year,rating,poster_url,backdrop_url,featured").order("featured",{ascending:false}).order("title");if(!error&&data&&data.length)return(data as TitleRow[]).map(mapTitle);}catch{/* Fall through to demo catalog if DB setup is incomplete. */}}const live=await getTmdbMovies();return live.length?live:getSampleMovies();}
export function searchCatalog(movies:Movie[],query:string):Movie[]{const normalized=query.trim().toLowerCase();if(!normalized)return movies;return movies.filter((movie)=>[movie.title,movie.description,movie.genre,String(movie.releaseYear)].join(" ").toLowerCase().includes(normalized));}
