<script>
	import "./client";
	import Overlayer from "./lib/Overlayer.svelte";
	import Background from "./lib/Background.svelte";
	import Button from "./lib/Button.svelte";
	import Springy from "./lib/Springy.svelte";

	const isOnTouch = window.ontouchstart !== undefined;
</script>

<body class="text-light-200 bg-dark-50">
<Overlayer>
  <Background/>

  <div
    id="overlay"
    class="z-100 self-center justify-self-center text-center p-6 bg-dark-100 rounded-xl max-w-100 shadow-xl"
  >
    <h1 class="text-4xl font-bold mb-2">CrossAni</h1>
    <p>The absolutely tiny animation lib powered by CSS transitions</p>
    <p class="mb-2">
      ({isOnTouch ? "Tap a" : "Hover over a"} tile to control the ripples!)
    </p>

    <Button href="https://github.com/lexisother/CrossAni/tree/master/packages/crossani#readme">
      More info
    </Button>
    <Button href="https://npmjs.com/crossani">NPM</Button>
    <Button href="https://npmjs.com/@crossani/spring">Spring</Button>

    <br/>

    <Button href="https://npmjs.com/@crossani/solid">SolidJS</Button>
    <Button href="https://npmjs.com/@crossani/react">React</Button>
    <Button href="https://npmjs.com/@crossani/svelte">Svelte</Button>

    <Springy />
  </div>
</Overlayer>
</body>

<style windi:preflights:global windi:safelist:global>
    @supports (backdrop-filter: blur()) {
        #overlay {
            backdrop-filter: blur(5px);
            --tw-bg-opacity: 0.5;
        }
    }
</style>
