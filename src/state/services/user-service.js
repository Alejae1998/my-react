import client from './supabase-client.js';

export function getUser() {
  return client.auth.user();
}

export async function signUp(credentials) {
  return await client.auth.signUp(credentials);
}

export async function signIn(credentials) {
  return await client.auth.signIn(credentials);
}

export async function signOut() {
  return await client.auth.signOut();
}

export function onAuthChange(handleAuthChange) {
  return client.auth.onAuthStateChange(handleAuthChange);
}

const PROFILE = 'profile';

export function getLocalProfile() {
  const json = localStorage.getItem(PROFILE);
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch (err) {
    localStorage.removeItem(PROFILE);
  }
}

export function saveLocalProfile(profile) {
  localStorage.setItem(PROFILE, JSON.stringify(profile));
}

export function removeLocalProfile() {
  localStorage.removeItem(PROFILE);
}

export async function getProfile() {
  const user = getUser();

  return await client
    .from('profiles2')
    .select()
    .eq('id', user.id)
    .single();
}

export async function upsertProfile(profile) {
  const response = await client
    .from('profiles2')
    .upsert(profile)
    .eq('id', profile.id)
    .single();
  return response;
}

const BUCKET_NAME = 'avatars';

export async function uploadAvatar(userId, imageFile) {
  // put into a folder...
  const imageName = `${userId}/${imageFile.name}`;

  // we can use the storage bucket to upload the image,
  // then use it to get the public URL
  const bucket = client.storage.from(BUCKET_NAME);

  const { data, error } = await bucket.upload(imageName, imageFile, {
    cacheControl: '3600',
    // in this case, we will _replace_ any
    // existing file with same name.
    upsert: true,
  });

  let url = null;

  if (!error) {
    url = bucket.getPublicUrl(
      data.Key.replace(`${BUCKET_NAME}/`, '')
    ).publicURL;
  }

  return { url, error };
}
