// @ts-nocheck
import { page } from "$app/stores";
import { onMount } from "svelte";
import { Item } from "$lib/models/Item";

const items = [
    new Item(0, 0, "Bike", "Cool bike.", "image.png", "", true, 18, 4),
    new Item(1, 0, "Car", "Cool bike.", "image.png", "", true, 13, 2),
    new Item(2, 0, "Sneakers", "Cool bike.", "image.png", "", true, 28, 1),
    new Item(3, 0, "Pan", "Cool bike.", "image.png", "", true, 8, 5),
    new Item(4, 0, "Shelf", "Cool bike.", "image.png", "", true, 1, 0),
    new Item(5, 0, "Desk", "Cool bike.", "image.png", "", true, 10, 2),
    new Item(6, 0, "Glass", "Cool bike.", "image.png", "", true, 20, 7),
];

export const load = async () => {
    return {items}
};