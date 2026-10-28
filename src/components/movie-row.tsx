import {MovieCard} from "@/components/movie-card";
import type {Movie} from "@/lib/types";
export function MovieRow({title,movies}:{title:string;movies:Movie[]}){if(!movies.length)return null;return <section className="content-row"><div className="row-heading"><h2>{title}</h2><span>{movies.length} titles</span></div><div className="movie-grid">{movies.map((movie)=><MovieCard key={movie.id} movie={movie}/>)}</div></section>;}
