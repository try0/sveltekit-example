<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { prefectures, type Prefecture } from '../../data/Prefecture';

    /**
     * 選択中都道府県コード
     */
    let selectedPrefectureCode: string = $page.params.slug;

    /**
     * 都道府県コードをを変更します。
     * 
     * @param event
     */
	function changePrefecture(event: Event & { currentTarget: EventTarget & HTMLSelectElement; }) {
		goto(`./${prefectures.filter(pref => pref.code === selectedPrefectureCode)[0].code}`);
	}
</script>

<div class="p-4">
    <a href="https://www.jma.go.jp/bosai/forecast/">※気象庁のデータを参照しています。</a>
	<div class="p-4">
        <!-- 都道府県ddl -->
		<select class="select select-bordered" bind:value={selectedPrefectureCode} on:change={changePrefecture}>
			{#each prefectures as pref}
				<option value={pref.code} selected={selectedPrefectureCode === pref.code}>{pref.name}</option>
			{/each}
		</select>
	</div>
	<div class="p-4">
		<slot />
	</div>
</div>
