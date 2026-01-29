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



export async function deleteBooking(id) {

    // Delete matching rows
    const {data:bookings, error } = await supabase
                .from('bookings')
                .delete()
                .eq('id', 'id')

        if(error){

        throw new Error(error.message);
    }

    return bookings;
}



export async function insertBooking(newBooking) {

    // Insert a row
    const { data, error } = await supabase
        .from('bookings')
        .insert([newBooking])
        .select()

    if(error){

        throw new Error(error.message);
    }

    return data


    // console.log(newBooking);
    
}