import supabase from "./supabase";

export async function getGuests() {
  const { data, error } = await supabase
    .from('guests')
    .select('*');
  if (error) {
    console.log('Error fetching guests');
    throw new Error(error);
  }

  return data;

}