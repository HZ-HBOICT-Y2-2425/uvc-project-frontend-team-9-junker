// @ts-nocheck
const mainUrl = 'http://localhost:3011';

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
    const community = await fetchAPI('/' + communityId, 'GET');
    return community
};

export const getCommunitiesByUserId = async (userid) => {
    console.log("getCommunitiesByUserId()");
    const communities = await fetchAPI('/user/' + userid, 'POST');
    return communities
};