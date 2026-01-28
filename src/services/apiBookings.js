import supabase from './supabase.js'

export async function getBookings() {



    let { data: bookings, error } = await supabase
        .from('bookings')
        .select('*');


    if(error){


        throw new Error(error.message);
    }

    return bookings
    
}