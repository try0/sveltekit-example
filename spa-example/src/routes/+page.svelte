<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
import { str } from '$lib/i18n/i18n';
	onMount(() => {
		const navigateToPath = $page.url.searchParams.get("nav_to");
		if (navigateToPath) {
			goto(navigateToPath);
		}
	});

</script>

<svelte:head>
	<title>{$str("home.title", "ホーム")}</title>
	<meta name="description" content="{$str("home.title", "ホーム")}" />
</svelte:head>

<section>
	<div class="bg-main" />
</section>

<style lang="postcss">
	.bg-main {
		height: 75vh;
		@apply bg-primary;
	}
</style>
