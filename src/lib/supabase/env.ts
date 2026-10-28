export function isSupabaseConfigured():boolean{return Boolean(process.env.SUPABASE_URL&&process.env.SUPABASE_ANON_KEY);}
export function getSupabaseEnvironment(){const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_ANON_KEY;if(!url||!key)throw new Error("Set SUPABASE_URL and SUPABASE_ANON_KEY to enable Supabase.");return{url,key};}
