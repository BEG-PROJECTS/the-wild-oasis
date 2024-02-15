import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    toast.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
}

// export async function getCabin(id) {
//   const { data, error } = await supabase.from('cabins').select(id).single();
// }


export async function deleteCabin(cabinId) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', cabinId);
  if (error) {
    toast.error(error);
    throw new Error('Cabin could not be deleted');
  }
  return data;
}

export async function createEditCabin(newCabin, id = null) {
  // 1- CREATE THE CABIN IN THE DATABASE

  //CHECK WHAT KIND OF IMAGE THIS IS
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //STORAGE PATH
  const STORAGEPATH = '/storage/v1/object/public/cabin-images/';

  //  CREATE A RANDOM IMAGE NAME, THIS NAME MUST BE UNIQUE
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');


  //CREATE AN IMAGE PATH
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}${STORAGEPATH}${imageName}`;

  //SAVE IN THE DATABASE THE CABIN
  let query = supabase.from('cabins');
  //CREATE CABIN
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }])
  //UPDATE CABIN
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  const { data, error } = await query.select().single();

  if (error) {
    toast.error(error);
    throw new Error('Cabin could not be created');
  }

  ///////////////////////////////////////////////////////////////
  // 2- UPLOAD THE IMAGE
  if (hasImagePath) return data;
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  ////////////////////////////////////////////////////////////////
  //3- DELETE THE CABIN IF THERE WAS AN ERROR UPLOADING IMAGE
  if (storageError) {
    deleteCabin(newCabin.id);
    toast.error(storageError);
    throw new Error('Cabin image could not be uploaded and the cabin was not created')
  }
  return data;
}