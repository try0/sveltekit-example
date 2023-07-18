<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';


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
