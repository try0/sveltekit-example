<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import './styles.css';
	import Icon from 'svelte-awesome';
	import github from 'svelte-awesome/icons/github';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { str, i18n } from '$lib/i18n/i18n';

	onMount(() => {
		i18n.init();
	});

	function onChangeLanguage(lang: string): void {
		if (lang !== 'ja' && lang !== 'en') {
			lang = 'ja';
		}

		i18n.change(lang);
		window.location.href = window.location.href;
	}
</script>

<div class="app" data-theme="light">
	<div class="navbar bg-primary text-primary-content">
		<div class="navbar-start">
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16"
						/></svg
					>
				</label>
				<ul
					tabindex="0"
					class="menu dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-white text-primary"
				>
					<li><a href="{base}/">{$str('nav.home', 'ホーム')}</a></li>
					<li><a href="{base}/contact">{$str('nav.contact', '問い合わせ')}</a></li>
				</ul>
			</div>
			<span class="normal-case text-xl">Sveltekit Example</span>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal px-1">
				<li><a href="{base}/" class="hover:text-white">{$str('nav.home', 'ホーム')}</a></li>
				<li>
					<a href="{base}/contact" class="hover:text-white">{$str('nav.contact', '問い合わせ')}</a>
				</li>
			</ul>
		</div>
		<div class="navbar-end">
			<ul class="menu menu-horizontal px-1">
				<li>
					<div class="dropdown dropdown-bottom dropdown-end hover:text-white">
						<a tabindex="0" class="" href="#">{$str('lang', '言語')}</a>
						<ul
							tabindex="0"
							class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 bg-white text-primary"
						>
							<li>
								<a on:click={() => onChangeLanguage('ja')}>{$str('lang_name.ja', '日本語')}</a>
							</li>
							<li>
								<a on:click={() => onChangeLanguage('en')}>{$str('lang_name.en', 'English')}</a>
							</li>
						</ul>
					</div>
				</li>
			</ul>
			<a class="btn btn-sm btn-circle text-primary" href="https://github.com/try0/sveltekit-example"
				><Icon data={github} scale={1.5} /></a
			>
		</div>
	</div>

	<main>
		<slot />
	</main>

	<footer class="footer footer-center p-10 bg-gray-800 text-primary-content">
		<div>
			<p class="font-bold">
				{$str('company_name')}
			</p>
			<p>Copyright © 2023 - All right reserved</p>
		</div>
		<div>
			<div class="grid grid-flow-col gap-4">
				<a
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="fill-current"
						><path
							d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
						/></svg
					></a
				>
				<a
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="fill-current"
						><path
							d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
						/></svg
					></a
				>
				<a
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="fill-current"
						><path
							d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
						/></svg
					></a
				>
			</div>
		</div>
	</footer>
</div>

<style lang="postcss">
</style>
