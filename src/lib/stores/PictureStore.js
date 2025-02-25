// @ts-nocheck
const mainUrl = 'http://localhost:3015';

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

export const getAllPictures = async () => {
    console.log("getAllPictures()");
    const pictures = await fetchAPI('/pictures', 'POST');
    return pictures
};

export const getPicture = async (pictureId) => {
    console.log("getpicture()");
    const picture = await fetchAPI('/' + pictureId, 'GET');
    return picture
};

export const getPictureByName = async (name) => {
    console.log("getpictureByName()");
    const picture = await fetchAPI('/name/' + name, 'POST');
    return picture
};

export const getPicturesByUserId = async (userid) => {
    console.log("getPicturesByUserId()");
    const pictures = await fetchAPI('/user/' + userid, 'POST');
    return pictures
};

export const getPicturesByItemId = async (itemid) => {
    console.log("getPicturesByItemId()");
    const pictures = await fetchAPI('/item/' + itemid, 'POST');
    return pictures
};

export const getPicturesByCommunityId = async (communityid) => {
    console.log("getPicturesByCommunityId()");
    const pictures = await fetchAPI('/community/' + communityid, 'POST');
    return pictures
};

export const storePicture = async (userid, itemid, communityid, name, data) => {
    console.log("storePicture()")
    const message = await fetchAPI('/create', 'POST', {userid, itemid, communityid, name, data});
    return message
};

export const updatePicture = async (pictureid, userid, itemid, communityid, name, data) => {
    console.log("updatePicture()");
    const message = await fetchAPI('/edit/' + pictureid, 'PUT', {userid, itemid, communityid, name, data});
    return message
};

export const deletePicture = async (pictureid) => {
    console.log("deletePicture()");
    const message = await fetchAPI('/delete/' + pictureid, 'DELETE');
    return message
};

