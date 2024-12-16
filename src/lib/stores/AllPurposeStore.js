import { writable } from 'svelte/store';
import { Community } from '$lib/models/Community.js';
import { Item } from '$lib/models/Item';
import { User } from '$lib/models/User';

export const toggleState = writable("swipe");
export const loadingState = writable(false);
export const darkModeEnabled = writable(false);
export const savedListingsUser = writable('username');

export const items = [
    new Item(0, 0, "Bike (Barely Used)", "Almost new", "1,2", "", true, 18, 4, "2023-10-05T14:48:00.000Z", "0,1,2", "0,1,2,3"),
    new Item(2, 1, "Sneakers [Vintage]", "Size 12", "3,4,5,6,7,8", "", true, 28, 1, "2024-10-05T14:48:00.000Z", "3,4", "0,1,2,3"),
    new Item(3, 0, "Pan", "", "9", "", true, 8, 5, "2020-10-05T14:48:00.000Z", "5", "0,1,2,3"),
    new Item(4, 2, "Bookshelf Hardwood 30x15x7", "Hardwood bookshelf dimensions: 30x15x7", "10", "", true, 1, 0, "2015-10-05T14:48:00.000Z", "6", "0,1"),
    new Item(5, 0, "Corner Desk", "height: 120cm", "11", "", true, 10, 2, "2015-10-05T14:48:00.000Z", "6", "0,1,2"),
    new Item(6, 0, "Glass", "self made", "12", "", true, 20, 7, "2014-10-05T14:48:00.000Z", "5", "0,1,2"),
    new Item(7, 0, "Tennis Racket", "I'm trying to cure my tennis elbow.", "13", "", true, 20, 7, "2012-10-05T14:48:00.000Z", "1,2", "0,1,2"),
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
