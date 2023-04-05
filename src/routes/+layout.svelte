<script lang="ts">
	import '@unocss/reset/tailwind-compat.css';
	import 'uno.css';
	import '../app.css';

	import { page } from '$app/stores';
</script>

<header
	class="min-h-3rem my4 px3 py2 flex items-center justify-between rounded-lg outline-(~ 2 gray-3)"
>
	<div class="flex items-center gap4">
		<h1 class="text-lg font-(mono semibold)"><a href="/">Svelte News</a></h1>
		<nav class="space-x2">
			<a href="/articles" class="link">Articles</a>
			<a href="/submit" class="link">Submit</a>
		</nav>
	</div>

	<nav class="flex items-center gap4">
		{#if $page.data.account}
			<a href="/profile" class="link">My profile</a>

			<form method="post" action="/logout?/current">
				<button type="submit" class="btn btn-sm">Log Out</button>
			</form>
		{:else}
			<a href="/login" class="link">Login</a>
			<a href="/register" class="link">Register</a>
		{/if}
	</nav>
</header>

<slot />
