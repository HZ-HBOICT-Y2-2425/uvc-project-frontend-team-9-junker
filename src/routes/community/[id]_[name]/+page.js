import { items, communities } from "$lib/stores/AllPurposeStore";

export const load = async () => {
    
    return {items, communities}
};