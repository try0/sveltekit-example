<script lang="ts">
	import { Node, Svelvet, Minimap, Controls } from 'svelvet';
	import Node1 from '$lib/components/svelvet/Node1.svelte';
	import Node2 from '$lib/components/svelvet/Node2.svelte';

</script>

<div>
	<Svelvet id="my-canvas" width={500} height={500} TD minimap>
		<Node1 />
		<Node2 />
        <Controls />
	</Svelvet>
</div>

