<script>
	import { Node, Svelvet, Minimap, Controls } from 'svelvet';
	import Node1 from '$lib/components/svelvet/Node1.svelte';
	import Node2 from '$lib/components/svelvet/Node2.svelte';
	import SvelvetPanel from '$lib/components/svelvet/SvelvetPanel.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		let shadowRoot = document.getElementById('wrapper')?.attachShadow({ mode: 'open' });

		if (shadowRoot) {
			new SvelvetPanel({ target: shadowRoot });
		}
	});
</script>

<div>
	<div class="p-2">
		<h3>Shadow DOM</h3>
		<div id="wrapper" />
	</div>

	<!-- <div class="p-2">
		<h3>Normal DOM</h3>
		<SvelvetPanel />
	</div> -->
</div>
