import { items, users } from "$lib/stores/AllPurposeStore";
import { getItem } from "$lib/stores/ItemStore";
import { page } from "$app/stores";

export const load = async () => {

    return {items, users}
};