import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://zvcdgjsgktpvqmycgtno.supabase.co'
const supabaseKey = "sb_publishable_J5pktYrqQRKPky_mgVQJmA__vcwrBl2"



const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;


