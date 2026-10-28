import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Hero} from "@/components/hero";
import {MovieRow} from "@/components/movie-row";
import {getCatalog} from "@/lib/catalog";
export const dynamic="force-dynamic";
export default async function HomePage(){const movies=await getCatalog();const featured=movies.find((movie)=>movie.featured)??movies[0];return <div className="page-shell">{featured?<Hero movie={featured}/>:null}<div className="home-content"><section className="welcome-strip"><div><span className="eyebrow">YOUR NEXT FAVORITE</span><h2>Stories worth staying in for.</h2><p>Explore a curated demo catalog. Sign in to keep a personal watchlist.</p></div><Link className="button button-red" href="/browse">Explore catalog <ArrowRight size={17}/></Link></section><MovieRow title="Trending now" movies={movies.slice(0,6)}/><MovieRow title="Sci-Fi & mystery" movies={movies.filter((movie)=>["Sci-Fi","Mystery"].includes(movie.genre))}/><MovieRow title="Critically curious" movies={movies.filter((movie)=>["Drama","Documentary","Adventure"].includes(movie.genre))}/></div></div>;}
