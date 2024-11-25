// @ts-nocheck
import { page } from "$app/stores";
import { Item } from "$lib/models/Item";

const items = [
    new Item(0, 0, "Bike", "Cool bike.", "bike.png", "", true, 18, 4),
    new Item(1, 0, "Car", "Cool bike.", "bike.png", "", true, 13, 2),
    new Item(2, 0, "Sneakers", "Cool bike.", "bike.png", "", true, 28, 1),
    new Item(3, 0, "Pan", "Cool bike.", "bike.png", "", true, 8, 5),
    new Item(4, 0, "Shelf", "Cool bike.", "bike.png", "", true, 1, 0),
    new Item(5, 0, "Desk", "Cool bike.", "bike.png", "", true, 10, 2),
    new Item(6, 0, "Glass", "Cool bike.", "bike.png", "", true, 20, 7),
];

export const load = async () => {
    return {items}
};