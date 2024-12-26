// @ts-nocheck
import { writable } from 'svelte/store';
import { Picture } from '$lib/models/Picture';
let message = '';
let mainUrl = 'http://localhost:3014';
let gatewayUrl = 'http://localhost:3010/picture_microservice';

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

export const getAllPictures = async () => {
    console.log("getAllPictures()");
    let pictures = await fetchAPI('/pictures', 'POST');
    return pictures
};

export const getPicture = async (pictureId) => {
    console.log("getpicture()");
    let picture = await fetchAPI('/' + pictureId, 'POST');
    return picture
};

export const getPictureByName = async (name) => {
    console.log("getpictureByName()");
    let picture = await fetchAPI('/name/' + name, 'POST');
    return picture
};

export const getPicturesByUserId = async (userid) => {
    console.log("getPicturesByUserId()");
    let pictures = await fetchAPI('/user/' + userid, 'POST');
    return pictures
};

export const getPicturesByItemId = async (itemid) => {
    console.log("getPicturesByItemId()");
    let pictures = await fetchAPI('/item/' + itemid, 'POST');
    return pictures
};

export const getPicturesByCommunityId = async (communityid) => {
    console.log("getPicturesByCommunityId()");
    let pictures = await fetchAPI('/community/' + communityid, 'POST');
    return pictures
};

export const storePicture = async (userid, itemid, communityid, name, data) => {
    console.log("storePicture()")
    let message = await fetchAPI('/create', 'POST', {userid, itemid, communityid, name, data});
    return message
};

export const updatePicture = async (pictureid, userid, itemid, communityid, name, data) => {
    console.log("updatePicture()");
    let message = await fetchAPI('/edit/' + pictureid, 'PUT', {userid, itemid, communityid, name, data});
    return message
};

export const deletePicture = async (pictureid) => {
    console.log("deletePicture()");
    let message = await fetchAPI('/delete/' + pictureid, 'DELETE');
    return message
};

