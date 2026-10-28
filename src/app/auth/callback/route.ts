import {NextResponse,type NextRequest} from "next/server";
import {isSupabaseConfigured} from "@/lib/supabase/env";
import {createSupabaseServerClient} from "@/lib/supabase/server";
export async function GET(request:NextRequest){const origin=new URL(request.url);const code=origin.searchParams.get("code");const next=origin.searchParams.get("next")??"/";if(code&&isSupabaseConfigured()){const supabase=await createSupabaseServerClient();const {error}=await supabase.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL(next.startsWith("/")&&!next.startsWith("//")?next:"/",origin.origin));}return NextResponse.redirect(new URL("/login?error=Could%20not%20complete%20sign-in",origin.origin));}
