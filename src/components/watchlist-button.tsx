"use client";
import {useState,useTransition} from "react";
import {BookmarkPlus,LoaderCircle} from "lucide-react";
import {toggleWatchlist} from "@/app/actions/watchlist";
export function WatchlistButton({titleId}:{titleId:string}){const [pending,startTransition]=useTransition();const [message,setMessage]=useState("");function onClick(){startTransition(async()=>{const result=await toggleWatchlist(titleId);setMessage(result.message);});}return <div className="watchlist-control"><button className="button button-outline" type="button" onClick={onClick} disabled={pending}>{pending?<LoaderCircle size={18} className="spin"/>:<BookmarkPlus size={18}/ >}{pending?"Saving…":"Add to My List"}</button>{message?<span className="inline-feedback" role="status">{message}</span>:null}</div>;}
