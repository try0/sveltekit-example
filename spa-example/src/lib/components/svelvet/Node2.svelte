<script lang="ts">
	import { Node, Anchor } from 'svelvet';
	import type { Connections } from 'svelvet';
	const connections: Connections = [
		['node1', '4'],
		['node2', '3']
	];
</script>

<Node useDefaults let:selected width={100} height={100} position={{ x: 120, y: 10 }}>
	<div class:selected>
		<div style="position: absolute; top: -2rem;">
			Input
			<Anchor bgColor="red" id="data-connection" input />
		</div>
		<div />
		<div style="position: absolute; bottom: -2rem;">
			<Anchor let:linked let:hovering let:connecting output />Output
		</div>
	</div>
</Node>

<style lang="postcss">
</style>
