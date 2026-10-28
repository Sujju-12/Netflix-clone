import {CatalogBrowser} from "@/components/catalog-browser";
export const dynamic="force-dynamic";
export default function BrowsePage(){return <div className="inner-page"><div className="page-heading"><span className="eyebrow">THE COLLECTION</span><h1>Browse titles</h1><p>Explore the full demo catalog. Live metadata is optional.</p></div><CatalogBrowser/></div>;}
