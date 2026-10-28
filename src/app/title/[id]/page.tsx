import Link from "next/link";
import {ArrowLeft,Play} from "lucide-react";
import {notFound} from "next/navigation";
import {WatchlistButton} from "@/components/watchlist-button";
import {getCatalog} from "@/lib/catalog";
export const dynamic="force-dynamic";
type Props={params:Promise<{id:string}>};
export default async function TitlePage({params}:Props){const {id}=await params;const movie=(await getCatalog()).find((item)=>item.id===id);if(!movie)notFound();return <article className="title-page"><div className="title-backdrop" style={{backgroundImage:"linear-gradient(90deg,#090909 0%,rgba(9,9,9,.62) 55%,rgba(9,9,9,.12)),linear-gradient(0deg,#090909 0%,transparent 65%),url('"+movie.backdropUrl+"')"}}/><div className="title-detail"><Link className="back-link" href="/browse"><ArrowLeft size={16}/> Back to browse</Link><span className="eyebrow">{movie.genre.toUpperCase()} · NETFLIX CLONE ORIGINAL</span><h1>{movie.title}</h1><div className="hero-meta"><span className="match-score">98% Match</span><span>{movie.releaseYear}</span><span className="rating-chip">{movie.rating}</span></div><p>{movie.description}</p><div className="hero-actions"><button className="button button-light" type="button" disabled title="Playback demo will be wired to licensed sample media"><Play size={18} fill="currentColor"/> Playback demo soon</button><WatchlistButton titleId={movie.id}/></div><p className="small-note">Playback is a placeholder. Add licensed sample video before enabling playback.</p></div></article>;}
