import Link from "next/link";
export default function NotFound(){return <div className="empty-state not-found"><span className="eyebrow">404 · LOST IN THE CATALOG</span><h1>This title isn't here.</h1><p>The title may have moved or the URL may be incorrect.</p><Link className="button button-red" href="/browse">Return to browse</Link></div>;}
