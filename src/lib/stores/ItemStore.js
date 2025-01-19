// @ts-nocheck
const mainUrl = 'http://localhost:3017';

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

export const getAllItems = async () => {
    console.log("getAllItems()");
    const items = await fetchAPI('/items', 'GET');
    return items
};

export const getItem = async (itemId) => {
    console.log("getItem()");
    const item = await fetchAPI('/' + itemId, 'GET');
    return item
};

export const getItemsByUserId = async (userId) => {
    console.log("getItemsByUserId()");
    const items = await fetchAPI('/items/user/' + userId, 'GET');
    return items;
};

export const storeItem = async (userid, name, description, pictures, action, available, views, interested, categories, communities) => {
    console.log("storeItem()")
    const message = await fetchAPI('/create', 'POST', {userid, name, description, pictures, action, available, views, interested, categories, communities});
    return message
};

export const updateItem = async (itemid, userid, name, description, pictures, action, available, views, interested, categories, communities) => {
    console.log("updateItem()");
    const message = await fetchAPI('/edit/' + itemid + '/' + userid, 'PUT', {name, description, pictures, action, available, views, interested, categories, communities});
    return message
};

export const deleteItem = async (itemid, userid) => {
    console.log("deleteItem()");
    const message = await fetchAPI('/delete/' + itemid + '/' + userid, 'DELETE');
    return message
};