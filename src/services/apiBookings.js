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
                .eq('id', id)

        if(error){

        throw new Error(error.message);
    }

    return bookings;
}



export async function insertBooking(newBooking) {


//     const newBooking2 = {
//     startDate: "2026-02-01",
//     endDate: "2026-02-05",
//     numGuests: 2,
//     cabinPrice: 150,
//     extraPrice: 50,
//     totalPrice: 50,
//     status: "confirmed",
//     hasBreakFast: true,
//     isPaid: false,
//     observations: "Near lake view",
//     cabinId: 26
//   };


  console.log(newBooking);

  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])  // must be an array of objects
    .select()
    .single();

    

  if (error) throw new Error(error.message);



  return data;


    
}