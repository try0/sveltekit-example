<script lang="ts">
	import type { PrefectureWeatherForecast } from '../../../data/PrefectureWeatherForecast';
	import type { PageData } from './$types';

	/**
	 * ページデータ
	 */
	export let data: PageData;

	let forecast: PrefectureWeatherForecast | null = null;

	$: {
		// ページデータ内の予報がanyになっちゃう　なんでだ
		forecast = data.prefectureWeatherForecast;
	}
</script>

<div>
	{#if forecast}
		<div>{forecast?.publishingOffice}</div>
		<div>{forecast?.reportDatetime}</div>
		<div>{forecast?.targetArea}</div>

		<div class="pt-4">
			<div>{forecast?.headlineText}</div>
			<div>{@html forecast?.text.replace('\n', '<br>')}</div>
		</div>
	{:else}
		<div>天気予報を取得できませんでした。</div>
	{/if}
</div>
