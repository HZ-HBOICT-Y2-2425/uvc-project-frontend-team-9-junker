// @ts-nocheck
import { page } from "$app/stores";
import { Item } from "$lib/models/Item";
import { User } from "$lib/models/User";
import { Community } from "$lib/models/Community";
import { items, communities } from "$lib/stores/AllPurposeStore";

export const load = async () => {
    return {items, communities}
};