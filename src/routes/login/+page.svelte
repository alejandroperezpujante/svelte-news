<script>
	import { enhance } from '$app/forms';

	export let form;
</script>

<main class="pt24">
	<form method="post" use:enhance class="grid place-content-center gap4">
		<label>
			Email
			<input type="email" name="email" required class="input" />
		</label>

		<label>
			Password
			<input
				type="password"
				name="password"
				autocomplete="current-password"
				minlength="8"
				required
				class="input"
			/>
		</label>

		<button type="submit" class="btn btn-primary">Log In</button>

		{#if form?.message}
			<p class="text-(center red-500)">{form.message}</p>
		{/if}
	</form>
</main>
