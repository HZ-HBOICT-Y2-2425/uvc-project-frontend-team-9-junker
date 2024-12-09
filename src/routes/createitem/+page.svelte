<script>
// @ts-nocheck


    let name = "item3";
    let message = '';
    let url = 'http://localhost:3010/itemmicroservice/items/0';
    let url2 = 'http://localhost:3013/items/0';

    /**
	 * This function fetches the data from the API
	 * @param url
	 */
	const getData = async (url) => {
		try {
			const response = await fetch(url);
			const items = await response.json();
			return items;
		} catch (error) {
			return error;
		}
	};

    /**
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

    const createItem = async () => {
        console.log("createItem()")
        try {
            /*
            const response = await fetch('http://localhost:3010/itemmicroservice/items/1', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            */

            const response = await fetch(url2, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                message = 'Creation successful!';
                //window.location.href = '/login';
            } else {
                message = data.error;
            }
        } catch (error) {
            message = 'An error occurred during creation.';
            console.log(error);
        }
    };

    const getItems = async () => {
        console.log("getItems()")
        try {
            const response = await fetch('http://localhost:3010/itemmicroservice/items', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                message = 'Creation successful!';
                //window.location.href = '/login';
            } else {
                message = data.error;
            }
        } catch (error) {
            message = 'An error occurred during creation.';
            console.log(error);
        }
    };
</script>

<button on:click|preventDefault={createItem}>
    createItem
</button>
<p>
    <button on:click|preventDefault={getItems}>
        get items
    </button>
</p>