<script lang="ts">
	import { fade } from 'svelte/transition';
	import { superForm, setMessage, setError, superValidateSync } from 'sveltekit-superforms/client';
	import { z } from 'zod';

	/**
	 * フォームスキーマ
	 */
	const contactFormSchema = z.object({
		// 団体
		organization: z.string(),
		// お名前
		name: z.string().min(1, 'お名前を入力してください').max(100, '100文字以下で入力してください'),
		// メール
		email: z
			.string()
			.email('メールアドレスに誤りがあります')
			.min(1, 'メールアドレスを入力してください')
			.max(1000, '1000文字以下で入力してください'),
		// 電話番号
		phone: z
			.string()
			.max(100, '100文字以下で入力してください')
			.refine((v) => {
				if (!v) {
					return true;
				}

				const re = new RegExp('^[0-9-]+$');
				return re.test(v);
			}, '半角数字またはハイフン(-)を入力してください'),
		// 問い合わせ内容
		text: z
			.string()
			.min(1, '問い合わせ内容を入力してください')
			.max(5000, '5000文字以下で入力してください')
	});

	/**
	 * フォーム初期化
	 */
	const { form, errors, message, enhance } = superForm(superValidateSync(contactFormSchema), {
		SPA: true,
		validators: contactFormSchema,
		onUpdate({ form }) {
			console.log('onUpdate');

			if (form.valid) {
				dialog.classList.add('modal-open');
			}
		}
	});

	let dialog: HTMLElement;

	function sendFormData() {
		console.log('送信');

		alert('送信しました');
		closeConfirmDialog();
	}

	function closeConfirmDialog() {
		dialog.classList.remove('modal-open');
	}
</script>

<svelte:head>
	<title>フォームサンプル</title>
	<meta name="description" content="フォームサンプル" />
</svelte:head>

<h2 class="font-bold p-2">お問い合わせフォームサンプル</h2>

<section class="pt-5 pb-5">
	<form method="POST" use:enhance class="max-w-5xl m-auto p-3" in:fade>
		<div class="mb-6">
			<label for="organization" class="field-label">団体名</label>
			<input
				type="text"
				id="organization"
				bind:value={$form.organization}
				aria-invalid={$errors.organization ? 'true' : undefined}
				class="form-text"
				placeholder="所属する会社名、団体名等"
			/>
			{#if $errors.organization}
				<div class="field-error" in:fade>
					{$errors.organization}
				</div>
			{/if}
		</div>

		<div class="mb-6">
			<label for="name" class="field-label">お名前<span class="text-red-300">＊</span></label>
			<input
				type="text"
				id="name"
				bind:value={$form.name}
				aria-invalid={$errors.name ? 'true' : undefined}
				class="form-text"
				placeholder="お名前"
			/>
			{#if $errors.name}
				<div class="field-error" in:fade>{$errors.name}</div>
			{/if}
		</div>

		<div class="mb-6">
			<label for="email" class="field-label"
				>メールアドレス<span class="text-red-300">＊</span></label
			>
			<input
				type="email"
				id="email"
				bind:value={$form.email}
				aria-invalid={$errors.email ? 'true' : undefined}
				class="form-text"
				placeholder="name@example.com"
			/>
			{#if $errors.email}
				<div class="field-error" in:fade>{$errors.email}</div>
			{/if}
		</div>

		<div class="mb-6">
			<label for="phone" class="field-label">電話番号</label>
			<input
				type="text"
				id="phone"
				bind:value={$form.phone}
				aria-invalid={$errors.phone ? 'true' : undefined}
				class="form-text"
				placeholder="電話番号"
			/>
			{#if $errors.phone}
				<div class="field-error" in:fade>{$errors.phone}</div>
			{/if}
		</div>

		<div class="mb-6">
			<label for="text" class="field-label"
				>問い合わせ内容<span class="text-red-300">＊</span></label
			>
			<textarea
				id="text"
				bind:value={$form.text}
				aria-invalid={$errors.text ? 'true' : undefined}
				rows="8"
				class="form-textarea"
			/>
			{#if $errors.text}
				<div class="field-error" in:fade>{$errors.text}</div>
			{/if}
		</div>
		<div class="mb-6 text-center">
			<button class="btn btn-primary btn-wide">確認</button>
		</div>
	</form>
</section>

<dialog id="my_modal_4" class="modal" bind:this={dialog}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">確認</h3>
		<p class="py-2">以下内容で送信します。よろしいですか？</p>
		<div class="py-2">
			<hr />
		</div>

		<div>
			<div class="mb-6">
				<label for="organization" class="field-label">団体名</label>
				<span>{$form.organization}</span>
			</div>

			<div class="mb-6">
				<label for="name" class="field-label">お名前</label>
				<span>{$form.name}</span>
			</div>

			<div class="mb-6">
				<label for="email" class="field-label">メールアドレス</label>
				<span>{$form.email}</span>
			</div>

			<div class="mb-6">
				<label for="phone" class="field-label">電話番号</label>
				<span>{$form.phone}</span>
			</div>

			<div class="mb-6">
				<label for="text" class="field-label">問い合わせ内容</label>
				<span>{$form.text}</span>
			</div>
		</div>
		<div class="modal-action">
			<button class="btn btn-primary w-32" on:click={sendFormData}>送信</button>
			<button class="btn" on:click={closeConfirmDialog}>キャンセル</button>
		</div>
	</div>
</dialog>

<style lang="postcss">
	.field-label {
		@apply block;
		@apply mb-2;
		@apply text-sm;
		@apply font-medium;
		@apply text-gray-900;
	}

	.form-textarea {
		@apply textarea;
		@apply textarea-bordered;
		@apply bg-gray-50;
		@apply w-full;
	}

	.form-text {
		@apply input;
		@apply input-bordered;
		@apply bg-gray-50;
		@apply w-full;
	}

	.field-error {
		@apply text-red-600;
		@apply pt-1.5;
	}
</style>
