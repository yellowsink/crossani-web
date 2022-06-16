<script>
	import "@crossani/spring";
	import {onMount} from "svelte";

	let movingDiv;

	const sleep = (ms) => new Promise(res => setTimeout(res, ms));

	const anim = async (from, to, slp) => {
		await movingDiv.doSpring(
			from,
			to,
			"transform",
			"translateX(<>rem)"
		);
		await sleep(slp);
	}

	onMount(async () => {
		while (true) {
			await anim(-5, 5, 250)
			await anim(5, -5, 250)
		}
	});
</script>

<div class="flex justify-center mt-4">
  <div bind:this={movingDiv} class="circle bg-[#ec2a6a] w-4 h-4 rounded-full"></div>
</div>

<style>
  div div { transform: translateX(-5rem); }
</style>