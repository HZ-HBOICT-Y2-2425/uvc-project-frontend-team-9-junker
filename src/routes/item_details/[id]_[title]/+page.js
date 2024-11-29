import { items, users } from "$lib/stores/AllPurposeStore";

export const load = async () => {
    return {items, users}
};