<script lang="ts">
	import type { Snapshot } from './$types';
	import { enhance } from '$app/forms';

	export let form;

	let submitFormData = {
		title: '',
		link: '',
		description: ''
	};

	export const snapshot: Snapshot<typeof submitFormData> = {
		capture: () => submitFormData,
		restore: (value) => (submitFormData = value)
	};
</script>

<main class="mt8">
	<form method="post" use:enhance class="mxa max-w-42rem p4 grid gap4">
		{#if form?.success}
			<p class="text-green-5">
				Successfully submitted!
				<a href="/{form?.category}/{form?.postId}" class="link">Click here to see it.</a>
			</p>
		{/if}

		{#if form?.error}
			<p class="text-red-5">
				{form?.message}
			</p>
		{/if}

		<label>
			Title
			<input
				bind:value={submitFormData.title}
				id="title"
				type="text"
				name="title"
				list="title-suggestions"
				class="input"
				required
			/>
			<datalist id="title-suggestions">
				<option value="Ask SN: " />
				<option value="Show SN: " />
				<option value="Jobs SN: " />
			</datalist>
		</label>

		<label>
			Link
			<input bind:value={submitFormData.link} type="url" name="link" class="input" />
		</label>

		<label>
			Description
			<textarea bind:value={submitFormData.description} name="description" class="input" />
		</label>

		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
</main>
