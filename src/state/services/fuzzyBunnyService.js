import client from './supabase-client.js';

export async function getFamiliesWithBunnies() {
  return await client.from('loving_families').select(`
    id,
    name,
    fuzzy_bunnies (
      id,
      name,
      family_id
    )
  `);
}

export async function removeFamily(id) {
  return await client
    .from('loving_families')
    .delete()
    .eq('id', id)
    .single();
}

export async function addFamily(family) {
  return await client.from('loving_families').insert(family).single();
}

export async function updateFamily(family) {
  return await client
    .from('loving_families')
    .update(family)
    .eq('id', family.id)
    .single();
}
