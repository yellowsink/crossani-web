<script>
  export let x, y, extraSize;

  const yOffset = (x % 2) / 2;

  const tileX = 32 + extraSize;
  const tileY = 32 + extraSize;

  const absX = x * tileX;
  const absY = (y + yOffset) * tileY;

  const z = y * 2 + (x % 2);
</script>

<div
  id={`bg-cell-${x}-${y}`}
  class="absolute w-[64px] h-[32px] bg-blue-[#6a6aff]"
  style={`left: ${absX}px; top: ${absY}px; z-index: ${z}`}
/>

<style>
  * {
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  }
</style>
