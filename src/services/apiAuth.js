import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email, password, options: {
      data: {
        fullName,
        avatar: '',
      }
    }
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);

}

export async function updateUser({ password, fullName, avatar }) {
  //NOTE 1- UPDATE THE PASSWORD OR THE FULL NAME
  //NOTE ACCORDING TO WHICH DATA WE ACTUALLY RECEIVED HERE WE ARE GOING TO UPDATE PASSWORD OR FULLNAME
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //NOTE 2- UPLOAD THE AVATAR IMAGE
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  //NOTE 3- USE THE AVATAR TO UPDATE THE USER
  const avatarPath = '/storage/v1/object/public/avatars/';
  const { data: updatedAvatar, error: updateAvatarError } = await supabase.auth.updateUser({ data: { avatar: `${supabaseUrl}${avatarPath}${fileName}` } });
  if (updateAvatarError) throw new Error(updateAvatarError.message);
  return updatedAvatar;
}