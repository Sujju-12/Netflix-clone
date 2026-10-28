import Link from "next/link";
import {Search} from "lucide-react";
import {MovieRow} from "@/components/movie-row";
import {getCatalog,searchCatalog} from "@/lib/catalog";
export const dynamic="force-dynamic";
type Props={searchParams:Promise<{q?:string}>};
export default async function SearchPage({searchParams}:Props){const params=await searchParams;const query=(params.q??"").trim();const movies=searchCatalog(await getCatalog(),query);return <div className="inner-page"><div className="page-heading"><span className="eyebrow">FIND YOUR NEXT WATCH</span><h1>Search</h1><form className="search-form" action="/search" method="get"><Search size={20}/><input type="search" name="q" defaultValue={query} placeholder="Titles, genres, years…" aria-label="Search titles"/><button className="button button-red" type="submit">Search</button></form><p>{query?movies.length+" results for “"+query+"”":"Search by title, genre, or release year."}</p></div>{movies.length?<MovieRow title={query?"Search results":"Popular titles"} movies={movies}/>:<div className="empty-state"><Search size={28}/><h2>No titles found</h2><p>Try another title or genre.</p><Link className="button button-outline" href="/browse">Browse all titles</Link></div>}</div>;}
