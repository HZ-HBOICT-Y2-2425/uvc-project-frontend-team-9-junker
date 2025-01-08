// @ts-nocheck
import { writable } from 'svelte/store';
import { Item } from '$lib/models/Item';

let message = '';
let mainUrl = 'http://localhost:3017';
let gatewayUrl = 'http://localhost:3010/item_microservice';

/**
 * This function fetches the data from the API
 * @param url
 */
const fetchAPI = async (url, method, body) => {
    try {
        const response = await fetch(mainUrl + url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify({...body}) : body
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
};

/**
 * UNTESTED
 * This function handles multiple request
 * @param urls
 */
const getPromisesData = async (urls) => {
    try {
        const response = await Promise.all(urls);
        return response;
    } catch (error) {
        return error;
    }
};

export const getAllItems = async () => {
    console.log("getAllItems()");
    let items = await fetchAPI('/items', 'GET');
    return items
};

export const getItem = async (itemId) => {
    console.log("getItem()");
    let item = await fetchAPI('/' + itemId, 'GET');
    return item
};

export const storeItem = async (userid, name, description, pictures, action, available, views, interested, categories, communities) => {
    console.log("storeItem()")
    let message = await fetchAPI('/create', 'POST', {userid, name, description, pictures, action, available, views, interested, categories, communities});
    return message
};

export const updateItem = async (itemid, userid, name, description, pictures, action, available, views, interested, categories, communities) => {
    console.log("updateItem()");
    let message = await fetchAPI('/edit/' + itemid + '/' + userid, 'PUT', {name, description, pictures, action, available, views, interested, categories, communities});
    return message
};

export const deleteItem = async (itemid, userid) => {
    console.log("deleteItem()");
    let message = await fetchAPI('/delete/' + itemid + '/' + userid, 'DELETE');
    return message
};