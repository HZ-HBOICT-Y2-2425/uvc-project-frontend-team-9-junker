// @ts-nocheck
import { page } from "$app/stores";
import { Item } from "$lib/models/Item";
import { User } from "$lib/models/User";
import { items, users } from "$lib/stores/AllPurposeStore";

export const load = async () => {
    return {items, users}
};