<script>
// @ts-nocheck
    import { getAllItems, getItem, storeItem, updateItem, deleteItem } from "$lib/stores/ItemStore.js";
    import { storePicture, getAllPictures } from "$lib/stores/PictureStore.js";
    import { goto } from "$app/navigation";
    import { authStore } from "$lib/stores/authStore.js";
    import { onMount } from 'svelte';

    let username = '';
    let password = '';
    let message = '';

    let userid = '';
    let name = '';
    let description = '';
    let images = '';
    let action = '';
    let available = '';
    let views = '';
    let interested = '';
    let categories = '';
    let communities = '';

    let picture = "";
    let filename = "";
    let filetype = "";
    let pictures ="";

    const postMyListing = async (userid, name, description, images, action, available, views, interested, categories, communities) => {
        
        storeItem(userid, name, description, images, action, available, views, interested, categories, communities);


    }
  
    const login = async () => {
      try {
        const response = await fetch('http://localhost:3012/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();

        if (response.ok) {
          authStore.set({
            username: username,
            isAuthenticated: !!data.accessToken,
            token: data.accessToken,
          });
          message = 'Login successful!';
          goto('/');
        } else {
          message = data.error;
        }
      } catch (error) {
        message = error.message;
      }
    };

    /**
     * @param {{ target: { files: any[]; }; }} event
     */
    function handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        filename = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            picture = e.target.result;
            //let picture2 = sharp(picture).resize(150).toBuffer();
            //console.log(picture2);
        };
        reader.readAsDataURL(file);
      }
    };

  // Image downscaling

  const MAX_WIDTH = 600;
  const MAX_HEIGHT = 600;
  const MIME_TYPE = "image/jpeg";
  const QUALITY = 1.0;

  onMount(() => {
    const input = document.getElementById('img-input');

    input.onchange = function (ev) {
      const file = ev.target.files[0]; // get the file
      console.log(file);
      const blobURL = URL.createObjectURL(file);
      const img = new Image();
      img.src = blobURL;
      img.onerror = function () {
          URL.revokeObjectURL(this.src);
          // Handle the failure properly
          console.log("Cannot load image");
      };
      img.onload = function () {
          URL.revokeObjectURL(this.src);
          //resize(file, img, 100000);
          //const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
          const [newWidth, newHeight] = resize(file, img, 100000);
          const canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          canvas.toBlob(
              (blob) => {
                  // Handle the compressed image. es. upload or save in local state
                  displayInfo('Original file', file);
                  displayInfo('Compressed file', blob);
              },
              MIME_TYPE
              ,QUALITY
          );
          document.getElementById("root").append(canvas);
          let newfile = canvas.toDataURL("image/jpeg");
          console.log(newfile);
      };
    };
  });

  function resize(file, img, maxSize) {
    let imgWidth = img.width;
    let imgHeight = img.height;
    let imgRatio = imgWidth / imgHeight;

    maxSize = maxSize || 100000;
    let fileSize = file.size;
    let byteRatio = fileSize / maxSize;

    let pixels = imgWidth*imgHeight;
    let requiredPixels = pixels / byteRatio;

    let newHeight = Math.sqrt(requiredPixels / imgRatio);
    let newWidth = newHeight * imgRatio;
    console.log(newWidth + " " + newHeight);
    return [newWidth, newHeight];
  }
  
  function calculateSize(img, maxWidth, maxHeight) {
      let width = img.width;
      let height = img.height;

      // calculate the width and height, constraining the proportions
      if (width > height) {
          if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
          }
      } else {
          if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
          }
      }
      return [width, height];
  }
  

  // Utility functions for demo purpose

  function displayInfo(label, file) {
      const p = document.createElement('p');
      p.innerText = `${label} - ${readableBytes(file.size)}`;
      document.getElementById('root').append(p);
  }

  function readableBytes(bytes) {
      const i = Math.floor(Math.log(bytes) / Math.log(1024)),
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
  }
</script>

<p>
  <button on:click|preventDefault={ async () => pictures = await getAllPictures()}>
      get all pictures
  </button>
  {pictures[0]}
  {#if pictures.length > 0}
    {#each pictures as picture}
    {picture?.name}
      <img src="{picture?.data}" alt="a">
    {/each}
  {/if}
</p>

<div id="root">
  <p>Upload an image and see the result</p>
  <input id="img-input" type="file" accept="image/*" style="display:block" />
</div>


<p>
  <button on:click|preventDefault={ () => storePicture(0, 0, null, filename, picture)}>
      Upload Image
  </button>
  <img
    src={picture}
    alt=""
  />
  <!-- Change Profile Picture -->
  <label for="profile-upload" class="text-green-500 underline cursor-pointer text-sm">
    Change Profile Picture
  </label>
  <input type="file" id="profile-upload" accept="image/*" on:change={handleImageUpload} class="hidden" />
</p>
<p>
  <button on:click|preventDefault={ () => downScale()}>
    DownScale
  </button>
</p>

<p>
    <button on:click|preventDefault={ () => getAllItems()}>
        get all items
    </button>
</p>
<p>
    <button on:click|preventDefault={ () => getItem('8')}>
        get item
    </button>
</p>
<p>
    <button on:click|preventDefault={ () => storeItem(1, "new Item", "it's new", "0", true, true, 0, 0, "", "")}>
        createItem
    </button>
</p>
<p>
    <button on:click|preventDefault={ () => updateItem(8, 1, "no new Item", "it's new", "0", true, true, 0, 0, "", "")}>
        update Item
    </button>
</p>
<p>
    <button on:click|preventDefault={ () => deleteItem(8, 1)}>
        delete Item
    </button>
</p>

<main class="flex items-center justify-center min-h-screen bg-background">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <div class="flex justify-center mb-4" >
        <button on:click={ () => goto("/")}>
          <img src="/Frog.png" alt="Junker Frog Icon" class="h-20 w-20" />
        </button>
      </div>
      <h1 class="text-2xl font-bold text-primary mb-4">Log In</h1>
      <form on:submit|preventDefault={login} class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-text">Username</label>
          <input
            id="username"
            type="text"
            bind:value={username}
            class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm text-text focus:ring-primary focus:border-primary"
            required
          />
          <!-- Binding to the reactive variable -->
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-text">Password</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm text-text focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-primary text-black font-semibold rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Log In
        </button>
      </form>
      {#if message}
        <p class="mt-4 text-sm text-red-500">{message}</p>
      {/if}
      <p class="mt-6 text-sm text-text">
        Don’t have an account? <a href="/register" class="text-primary hover:underline">Register</a>
      </p>
    </div>
  </main>