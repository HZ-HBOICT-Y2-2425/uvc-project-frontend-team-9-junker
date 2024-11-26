// @ts-nocheck
import { page } from "$app/stores";
import { Item } from "$lib/models/Item";

const items = [
    new Item(0, 0, "Bike", "Cool bike.", "bike.jpg", "", true, 18, 4),
    new Item(2, 0, "Sneakers", "Cool bike.", "sneakers.jpg", "", true, 28, 1),
    new Item(3, 0, "Pan", "Cool bike.", "pan.webp", "", true, 8, 5),
    new Item(4, 0, "Bookshelf", "Cool bike.", "bookshelf.avif", "", true, 1, 0),
    new Item(5, 0, "Desk", "Cool bike.", "desk.jpg", "", true, 10, 2),
    new Item(6, 0, "Glass", "Cool bike.", "glass.webp", "", true, 20, 7),
    new Item(7, 0, "Tennis Racket", "Cool bike.", "tennis_racket.jpg", "", true, 20, 7),
];

export const load = async () => {
    return {items}
};