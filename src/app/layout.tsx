import type {Metadata} from "next";
import type {ReactNode} from "react";
import {QueryProvider} from "@/components/query-provider";
import {SiteHeader} from "@/components/site-header";
import "./globals.css";
export const metadata:Metadata={title:"Netflix Clone | Stream your next story",description:"A streaming catalog demo built with Next.js, Supabase, and GitOps learning workflows.",applicationName:"Netflix Clone"};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body><QueryProvider><SiteHeader/><main>{children}</main><footer className="site-footer"><div className="footer-inner"><span className="footer-brand">NETFLIX CLONE</span><span>Independent learning project · Demo titles and artwork</span><span>Built with Next.js, Supabase and Vercel</span></div></footer></QueryProvider></body></html>;}
