// @ts-nocheck
import { writable } from 'svelte/store';
import { Community } from '$lib/models/Community';

let message = '';
let mainUrl = 'http://localhost:3011';
let gatewayUrl = 'http://localhost:3010/community_microservice';

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

export const getCommunity = async (communityId) => {
    console.log("getCommunity()");
    let community = await fetchAPI('/' + communityId, 'GET');
    return community
};

export const getCommunitiesByUserId = async (userid) => {
    console.log("getCommunitiesByUserId()");
    let communities = await fetchAPI('/user/' + userid, 'POST');
    return communities
};