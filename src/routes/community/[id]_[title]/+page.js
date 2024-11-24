// @ts-nocheck
import { page } from "$app/stores";
import { onMount } from "svelte";
import { Item } from "$lib/models/Item";

const items = [
    new Item(0, 0, "Bike", "Cool bike.", "image.png", "", true, 18, 4),
    new Item(1, 0, "Bike", "Cool bike.", "image.png", "", true, 18, 4),
    new Item(2, 0, "Bike", "Cool bike.", "image.png", "", true, 18, 4),
    new Item(3, 0, "Bike", "Cool bike.", "image.png", "", true, 18, 4),
    new Item(4, 0, "Bike", "Cool bike.", "image.png", "", true, 18, 4),
];

export const load = async () => {
    return {items}
};