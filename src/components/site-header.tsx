import Link from "next/link";
import {Search,Clapperboard} from "lucide-react";
import {createSupabaseServerClient} from "@/lib/supabase/server";
import {isSupabaseConfigured} from "@/lib/supabase/env";
import {signOut} from "@/app/login/actions";

export async function SiteHeader(){
  let signedIn=false;
  if(isSupabaseConfigured()){
    try{const supabase=await createSupabaseServerClient();const {data}=await supabase.auth.getUser();signedIn=Boolean(data.user);}catch{signedIn=false;}
  }
  return <header className="site-header"><div className="site-header-inner">
    <Link className="brand" href="/" aria-label="Netflix Clone home"><span className="brand-mark"><Clapperboard size={22}/></span><span>NETFLIX<span className="brand-light"> CLONE</span></span></Link>
    <nav className="main-nav" aria-label="Main navigation"><Link href="/">Home</Link><Link href="/browse">Browse</Link><Link href="/watchlist">My List</Link></nav>
    <div className="header-actions"><Link className="icon-link" href="/search" aria-label="Search titles"><Search size={20}/></Link>{signedIn?<form action={signOut}><button className="account-link" type="submit">Sign out</button></form>:<Link className="account-link" href="/login">Sign in</Link>}</div>
  </div></header>;
}
