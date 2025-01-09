// @ts-nocheck
import { writable } from 'svelte/store';
import { User } from '$lib/models/User';

let message = '';
let mainUrl = 'http://localhost:3012';
let gatewayUrl = 'http://localhost:3010/usermicroservice';

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

export const getUserById = async (userId) => {
    console.log("getUser()");
    let user = await fetchAPI('/id/public/' + userId, 'GET');
    return user
};

export const likeItem = async (userid, itemid) => {
    console.log("likeItem()");
    let message = await fetchAPI('/like', 'POST', {userid, itemid});
    return message
};

export const unlikeItem = async (userid, itemid) => {
    console.log("unlikeItem()");
    let message = await fetchAPI('/unlike', 'POST', {userid, itemid});
    return message
};

export const dislikeItem = async (userid, itemid) => {
    console.log("dislikeItem()");
    let message = await fetchAPI('/dislike', 'POST', {userid, itemid});
    return message
};

export const undislikeItem = async (userid, itemid) => {
    console.log("undislikeItem()");
    let message = await fetchAPI('/undislike', 'POST', {userid, itemid});
    return message
};

export const delteLikes = async (userid) => {
    console.log("deleteLikes()");
    let message = await fetchAPI('/likes/' + userid, 'PUT');
    return message
};