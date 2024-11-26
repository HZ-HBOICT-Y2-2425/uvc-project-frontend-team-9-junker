// @ts-nocheck
import { page } from "$app/stores";
import { Item } from "$lib/models/Item";
import { User } from "$lib/models/User";

const items = [
    new Item(0, 0, "Bike (Barely Used)", "Almost new", "bike.jpg", "", true, 18, 4, "2023-10-05T14:48:00.000Z"),
    new Item(2, 0, "Sneakers [Vintage]", "Size 12", "sneakers.jpg", "", true, 28, 1, "2024-10-05T14:48:00.000Z"),
    new Item(3, 0, "Pan", "", "pan.webp", "", true, 8, 5, "2020-10-05T14:48:00.000Z"),
    new Item(4, 2, "Bookshelf Hardwood 30x15x7", "Hardwood bookshelf dimensions: 30x15x7", "bookshelf.avif", "", true, 1, 0, "2015-10-05T14:48:00.000Z"),
    new Item(5, 0, "Corner Desk", "height: 120cm", "desk.jpg", "", true, 10, 2, "2015-10-05T14:48:00.000Z"),
    new Item(6, 0, "Glass", "self made", "glass.webp", "", true, 20, 7, "2014-10-05T14:48:00.000Z"),
    new Item(7, 0, "Tennis Racket", "I'm trying to cure my tennis elbow.", "tennis_racket.jpg", "", true, 20, 7, "2012-10-05T14:48:00.000Z"),
];

const users = [
    new User(0, "Alisa", "bike.jpg"),
    new User(1, "John", "glass.webp"),
];

export const load = async () => {
    return {items, users}
};