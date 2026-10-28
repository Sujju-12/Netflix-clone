"use client";
import {useEffect} from "react";
export default function ErrorPage({error,reset}:{error:Error&{digest?:string};reset:()=>void}){useEffect(()=>{console.error("Netflix Clone route error",error);},[error]);return <div className="empty-state"><span className="eyebrow">SOMETHING WENT WRONG</span><h1>Let's try that again.</h1><p>The page could not be loaded. Try again.</p><button className="button button-red" onClick={()=>reset()}>Retry</button></div>;}
