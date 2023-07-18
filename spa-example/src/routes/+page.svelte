<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		let pathname: string | null = $page.url.searchParams.get('ref');
		if (pathname && !pathname.includes("404")) {
			goto(pathname + "?r=1");
		}
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Home" />
</svelte:head>

<section>
	<div class="bg-main" />
</section>

<style lang="postcss">
	.bg-main {
		height: 70vh;
		@apply bg-primary;
	}
</style>
