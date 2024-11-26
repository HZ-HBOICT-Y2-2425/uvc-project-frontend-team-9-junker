// @ts-nocheck
import { page } from "$app/stores";
import { Item } from "$lib/models/Item";

const items = [
    new Item(0, 0, "Bike (Barely Used)", "Almost new", "bike.jpg", "", true, 18, 4),
    new Item(2, 0, "Sneakers [Vintage]", "Size 12", "sneakers.jpg", "", true, 28, 1),
    new Item(3, 0, "Pan", "", "pan.webp", "", true, 8, 5),
    new Item(4, 0, "Bookshelf Bookshelf Hardwood 30x15x7", "Hardwood bookshelf dimensions: 30x15x7", "bookshelf.avif", "", true, 1, 0),
    new Item(5, 0, "Desk", "height: 120cm", "desk.jpg", "", true, 10, 2),
    new Item(6, 0, "Glass", "self made", "glass.webp", "", true, 20, 7),
    new Item(7, 0, "Tennis Racket", "I'm trying to cure my tennis elbow.", "tennis_racket.jpg", "", true, 20, 7),
];

export const load = async () => {
    return {items}
};