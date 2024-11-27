import { writable } from 'svelte/store';
import { Community } from '$lib/models/Community.js';
import { Item } from '$lib/models/Item';
import { User } from '$lib/models/User';

export const toggleState = writable("swipe");
export const loadingState = writable(false);
export const darkModeEnabled = writable(false);

export const items = [
    new Item(0, 0, "Bike (Barely Used)", "Almost new", ["bike.jpg", "bike2.jpg"], "", true, 18, 4, "2023-10-05T14:48:00.000Z", ["Bicycles", "Outdoors", "Sports"], [0, 1, 2, 3]),
    new Item(2, 1, "Sneakers [Vintage]", "Size 12", ["sneaker1.avif", "sneaker3.avif", "sneaker4.avif", "sneaker5.avif", "sneaker6.avif", "sneaker7.avif",], "", true, 28, 1, "2024-10-05T14:48:00.000Z", ["Shoes", "Clothing"], [0, 1, 2, 3]),
    new Item(3, 0, "Pan", "", ["pan.webp"], "", true, 8, 5, "2020-10-05T14:48:00.000Z", ["Kitchen"], [0, 1, 2, 3]),
    new Item(4, 2, "Bookshelf Hardwood 30x15x7", "Hardwood bookshelf dimensions: 30x15x7", ["bookshelf.avif"], "", true, 1, 0, "2015-10-05T14:48:00.000Z", ["Furniture"], [0, 1]),
    new Item(5, 0, "Corner Desk", "height: 120cm", ["desk.jpg"], "", true, 10, 2, "2015-10-05T14:48:00.000Z", ["Furniture"], [0, 1, 2]),
    new Item(6, 0, "Glass", "self made", ["glass.webp"], "", true, 20, 7, "2014-10-05T14:48:00.000Z", ["Kitchen"], [0, 1, 2]),
    new Item(7, 0, "Tennis Racket", "I'm trying to cure my tennis elbow.", ["tennis_racket.jpg"], "", true, 20, 7, "2012-10-05T14:48:00.000Z", ["Outdoors", "Sports"], [0, 1, 2]),
];

export const users = [
    new User(0, "Alisa", "blank-pfp.webp"),
    new User(1, "John", "blank-pfp.webp"),
];

export const communities = [
    new Community(0, "Middelburg", "middelburg-church.JPG", 218, 22, "Nearby", ["0", "1", "2"]),
    new Community(1, "HZ Students", "hz-middelburg.jpg", 218, 22, "", ["0", "1", "2"]),
    new Community(2, "APV Residents", "APV-ruyter.jpg", 218, 22, "", ["0", "1", "2"]),
    new Community(3, "APV Residents", "APV-ruyter.jpg", 218, 22, "", ["0", "1", "2"])
  ];
