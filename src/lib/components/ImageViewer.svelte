<script>
// @ts-nocheck

    const picturesPreload = import.meta.glob([
      '$lib/assets/pictures/**.jpg', 
      '$lib/assets/pictures/**.png', 
      '$lib/assets/pictures/**.svg', 
      '$lib/assets/pictures/**.webp', 
      '$lib/assets/pictures/**.avif'
    ], { eager: true, as: 'url' });


    export let pictures = [
      'bike.png',
      'desk.jpg',
    ];
    console.log(pictures);
    
    let currentIndex = 0;
  
    // Update picture position
    function goToPicture(index) {
      currentIndex = index;
      document.documentElement.style.setProperty('--currentIndex', currentIndex);
    }
  
    // Next button functionality
    function nextPicture() {
      currentIndex = (currentIndex + 1) % pictures.length;
      document.documentElement.style.setProperty('--currentIndex', currentIndex);
    }
  
    // Previous button functionality
    function prevPicture() {
      currentIndex = (currentIndex - 1 + pictures.length) % pictures.length;
      document.documentElement.style.setProperty('--currentIndex', currentIndex);
    }
</script>
  
  
<div class="picture-viewer">
    {#if (pictures.length >= 2)}
        <div class="picture-wrapper">
            {#each pictures as picture, index}
                <!--img src={picture} alt="picture {index + 1}"-->
                <img src={picturesPreload[`/src/lib/assets/pictures/${picture}`]} alt="Img {index + 1}" />
            {/each}
        </div>

        <button class="nav-button prev" on:click={prevPicture}>&lt;</button>
        <button class="nav-button next" on:click={nextPicture}>&gt;</button>

        <div class="indicator-wrapper">
            {#each pictures as _, index}
            <div
                class="indicator {index === currentIndex ? 'active' : ''}"
                on:click={() => goTopicture(index)}
            ></div>
            {/each}
        </div>
    {:else if pictures.length}
        <div class="picture-wrapper">
            <img src={picturesPreload[`/src/lib/assets/pictures/${pictures[0]}`]} alt="Img 1" />
        </div>
    {/if}
</div>

<style>
    .picture-viewer {
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
  
    .picture-wrapper {
      display: flex;
      transition: transform 0.5s ease-in-out;
      height: 100%;
      transform: translateX(calc(-100% * var(--currentIndex)));
    }
  
    .picture-wrapper img {
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
  