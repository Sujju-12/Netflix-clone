"use client";
import {useQuery} from "@tanstack/react-query";
import {MovieRow} from "@/components/movie-row";
import type {Movie} from "@/lib/types";
async function fetchCatalog():Promise<Movie[]>{const response=await fetch("/api/catalog",{cache:"no-store"});if(!response.ok)throw new Error("Unable to load catalog");return response.json() as Promise<Movie[]>;}
export function CatalogBrowser(){const query=useQuery({queryKey:["catalog"],queryFn:fetchCatalog});if(query.isLoading)return <div className="status-panel">Loading catalog…</div>;if(query.isError||!query.data)return <div className="status-panel">Catalog unavailable. <button className="text-button" onClick={()=>void query.refetch()}>Try again</button></div>;const genres=Array.from(new Set(query.data.map((movie)=>movie.genre)));return <div className="browse-content"><MovieRow title="Popular on Netflix Clone" movies={query.data}/>{genres.map((genre)=><MovieRow key={genre} title={genre+" picks"} movies={query.data.filter((movie)=>movie.genre===genre)}/>)}</div>;}
