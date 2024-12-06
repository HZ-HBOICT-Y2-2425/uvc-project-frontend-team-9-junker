/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
  const { username } = params; // Extract the `username` parameter
  return { username }; // Pass it to the Svelte page as `data`
};