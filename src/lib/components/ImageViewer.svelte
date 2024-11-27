<script>
// @ts-nocheck

    const imagesPreload = import.meta.glob(['$lib/assets/images/**.jpg', '$lib/assets/images/**.png', '$lib/assets/images/**.svg', '$lib/assets/images/**.webp', '$lib/assets/images/**.avif'], { eager: true, as: 'url' });


    export let images = [
      'bike.png',
      'desk.jpg',
    ];
    console.log(images);
    
    let currentIndex = 0;
  
    // Update image position
    function goToImage(index) {
      currentIndex = index;
      document.documentElement.style.setProperty('--currentIndex', currentIndex);
    }
  
    // Next button functionality
    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      document.documentElement.style.setProperty('--currentIndex', currentIndex);
    }
  
    // Previous button functionality
    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      document.documentElement.style.setProperty('--currentIndex', currentIndex);
    }
</script>
  
  
<div class="image-viewer">
    {#if (images.length >= 2)}
        <div class="image-wrapper">
            {#each images as image, index}
                <!--img src={image} alt="Image {index + 1}"-->
                <img src={imagesPreload[`/src/lib/assets/images/${image}`]} alt="Img {index + 1}" />
            {/each}
        </div>

        <button class="nav-button prev" on:click={prevImage}>&lt;</button>
        <button class="nav-button next" on:click={nextImage}>&gt;</button>

        <div class="indicator-wrapper">
            {#each images as _, index}
            <div
                class="indicator {index === currentIndex ? 'active' : ''}"
                on:click={() => goToImage(index)}
            ></div>
            {/each}
        </div>
    {:else if images.length}
        <div class="image-wrapper">
            <img src={imagesPreload[`/src/lib/assets/images/${images[0]}`]} alt="Img 1" />
        </div>
    {/if}
</div>

<style>
    .image-viewer {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 0px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      background-color: rgba(0, 0, 0, 0.2);
    }

    :root {
        --currentIndex: 0;
    }
  
    .image-wrapper {
      display: flex;
      transition: transform 0.5s ease-in-out;
      height: 100%;
      transform: translateX(calc(-100% * var(--currentIndex)));
    }
  
    .image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit:contain;
      flex-shrink: 0;
    }
  
    .nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      font-size: 24px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
    }
  
    .nav-button:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  
    .nav-button.prev {
      left: 10px;
    }
  
    .nav-button.next {
      right: 10px;
    }
  
    .indicator-wrapper {
      position: absolute;
      bottom: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 5px;
    }
  
    .indicator {
      width: 10px;
      height: 10px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      cursor: pointer;
    }
  
    .indicator.active {
      background-color: white;
    }
</style>
  