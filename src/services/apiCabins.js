import supabase from './supabase.js'


export async function getCabins() {
    
    // Read all rows
  let { data: cabins, error } = await supabase
  .from('cabins')
  .select('*')

  if(error){

    throw new Error("Could not loaded");
  }

   return cabins

}


export async function deleteCabin(id){

    // Delete matching rows
  const { data ,error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id);

  if(error){
      throw new Error("Could not delete");
  }

  return data;

}


export async function insertCabin(newCabin){
    // Insert a row
  const { data, error } = await supabase
  .from('cabins')
  .insert([newCabin])
  .select()

  if(error){
      throw new Error("Could not be inserted New Cabin");
  }

  return data;

}

export async function editCabin1(id, updatedCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .update(updatedCabin)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Could not update cabin");
  }
  
  return data;
}
