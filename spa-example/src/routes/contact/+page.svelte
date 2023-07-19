<script lang="ts">
	import { fade } from 'svelte/transition';
	import { superForm, setMessage, setError, superValidateSync } from 'sveltekit-superforms/client';
	import { z } from 'zod';
	import { str } from '$lib/i18n/i18n';

	/**
	 * フォームスキーマ
	 */
	const contactFormSchema = z.object({
		// 団体
		organization: z.string(),
		// お名前
		name: z.string().min(1).max(100),
		// メール
		email: z.string().email().min(1).max(1000),
		// 電話番号
		phone: z
			.string()
			.max(100)
			.refine((v) => {
				if (!v) {
					return true;
				}

				const re = new RegExp('^[0-9-]+$');
				return re.test(v);
			}, $str('validation_message.phone_format')),
		// 問い合わせ内容
		text: z.string().min(1).max(5000)
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
	<title>{$str('contact.title', 'フォームサンプル')}</title>
	<meta name="description" content={$str('contact.title', 'フォームサンプル')} />
</svelte:head>

<h2 class="font-bold p-2">{$str('contact.title', 'フォームサンプル')}</h2>

<section class="pt-5 pb-5">
	<form method="POST" use:enhance class="max-w-5xl m-auto p-3" in:fade>
		<div class="mb-6">
			<label for="organization" class="field-label">{$str('contact.organization', '団体名')}</label>
			<input
				type="text"
				id="organization"
				bind:value={$form.organization}
				aria-invalid={$errors.organization ? 'true' : undefined}
				class="form-text"
				placeholder={$str('contact.organization_ph')}
			/>
			{#if $errors.organization}
				<div class="field-error" in:fade>
					{$errors.organization}
				</div>
			{/if}
		</div>

		<div class="mb-6">
			<label for="name" class="field-label"
				>{$str('contact.name', 'お名前')}<span class="text-red-300">＊</span></label
			>
			<input
				type="text"
				id="name"
				bind:value={$form.name}
				aria-invalid={$errors.name ? 'true' : undefined}
				class="form-text"
				placeholder={$str('contact.name_ph')}
			/>
			{#if $errors.name}
				<div class="field-error" in:fade>{$errors.name}</div>
			{/if}
		</div>

		<div class="mb-6">
			<label for="email" class="field-label"
				>{$str('contact.email', 'メールアドレス')}<span class="text-red-300">＊</span></label
			>
			<input
				type="email"
				id="email"
				bind:value={$form.email}
				aria-invalid={$errors.email ? 'true' : undefined}
				class="form-text"
				placeholder={$str('contact.email_ph')}
			/>
			{#if $errors.email}
				<div class="field-error" in:fade>{$errors.email}</div>
			{/if}
		</div>

		<div class="mb-6">
			<label for="phone" class="field-label">{$str('contact.phone', '電話番号')}</label>
			<input
				type="text"
				id="phone"
				bind:value={$form.phone}
				aria-invalid={$errors.phone ? 'true' : undefined}
				class="form-text"
				placeholder={$str('contact.phone_ph')}
			/>
			{#if $errors.phone}
				<div class="field-error" in:fade>{$errors.phone}</div>
			{/if}
		</div>

		<div class="mb-6">
			<label for="text" class="field-label"
				>{$str('contact.text', '問い合わせ内容')}<span class="text-red-300">＊</span></label
			>
			<textarea
				id="text"
				bind:value={$form.text}
				aria-invalid={$errors.text ? 'true' : undefined}
				rows="8"
				placeholder={$str('contact.text_ph')}
				class="form-textarea"
			/>
			{#if $errors.text}
				<div class="field-error" in:fade>{$errors.text}</div>
			{/if}
		</div>
		<div class="mb-6 text-center">
			<button class="btn btn-primary btn-wide">{$str('contact.confirm', '確認')}</button>
		</div>
	</form>
</section>

<dialog id="my_modal_4" class="modal" bind:this={dialog}>
	<div class="modal-box">
		<h3 class="font-bold text-lg">{$str('contact.confirm', '確認')}</h3>
		<p class="py-2">{$str('contact.confirm_message', '以下内容で送信します。よろしいですか？')}</p>
		<div class="py-2">
			<hr />
		</div>

		<div>
			<div class="mb-6">
				<label for="organization" class="field-label">{$str('contact.organization')}</label>
				<span>{$form.organization}</span>
			</div>

			<div class="mb-6">
				<label for="name" class="field-label">{$str('contact.name')}</label>
				<span>{$form.name}</span>
			</div>

			<div class="mb-6">
				<label for="email" class="field-label">{$str('contact.email')}</label>
				<span>{$form.email}</span>
			</div>

			<div class="mb-6">
				<label for="phone" class="field-label">{$str('contact.phone')}</label>
				<span>{$form.phone}</span>
			</div>

			<div class="mb-6">
				<label for="text" class="field-label">{$str('contact.text')}</label>
				<span>{$form.text}</span>
			</div>
		</div>
		<div class="modal-action">
			<button class="btn btn-primary w-32" on:click={sendFormData}>{$str('send', '送信')}</button>
			<button class="btn" on:click={closeConfirmDialog}>{$str('cancel', 'キャンセル')}</button>
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

	.form-text[aria-invalid='true'] {
		@apply input-error;
		@apply bg-red-50;
	}

	.form-textarea[aria-invalid='true'] {
		@apply textarea-error;
		@apply bg-red-50;
	}

	.field-error {
		@apply text-red-600;
		@apply pt-1.5;
	}
</style>
