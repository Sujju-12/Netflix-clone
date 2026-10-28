import {NextResponse} from "next/server";
import {getCatalog} from "@/lib/catalog";
export const dynamic="force-dynamic";
export async function GET(){const movies=await getCatalog();return NextResponse.json(movies,{headers:{"Cache-Control":"private, no-store, max-age=0"}});}
