export type Movie = { id:string; title:string; description:string; genre:string; releaseYear:number; rating:string; posterUrl:string; backdropUrl:string; featured?:boolean };
export type WatchlistActionResult = { ok:boolean; message:string };
