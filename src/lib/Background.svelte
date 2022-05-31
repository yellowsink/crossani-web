<script>
  import BgCell from "./BgCell.svelte";

  const extraSize = 10;

  let items = [];

  function remakeTiles() {
    const parentWidth = document.getElementById("bg-container")?.clientWidth;
    const parentHeight = document.getElementById("bg-container")?.clientHeight;

    items = [];
    const width = Math.floor(parentWidth / (64 / 1.5));
    const height = Math.floor(parentHeight / (64 / 1.5));

    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++) items.push([x, y]);

    // quick! call the `window` abuse squad!
    // @ts-expect-error
    window.allTiles = items;

    // @ts-expect-error
    setTimeout(window.beginAnimating);
  }

  // lmao i need to run this after page load
  setTimeout(remakeTiles);

  window.addEventListener("resize", remakeTiles);
</script>

<!-- if anyone could tell me why this div needs a transform to be clipped correctly, let me know -->
<div id="bg-container" class="m-8 transform">
  {#each items as [x, y] (`${x}-${y}`)}
    <BgCell {x} {y} {extraSize} />
  {/each}
</div>
