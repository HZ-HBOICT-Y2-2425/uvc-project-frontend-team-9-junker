import { items, users } from "$lib/stores/AllPurposeStore";
import { getItem } from "$lib/stores/ItemStore";
import { page } from "$app/stores";

let itemId = page.params.id;

export const load = async () => {

    return {items, users}
};