<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import SiteHeaderLinks from './SiteHeaderLinks.svelte';

	export let isAuthenticated: boolean;
</script>

<header class="px-4 py-2 flex items-center justify-between">
	<div class="flex items-center gap-4">
		<h2 class="text-3xl font-bold">Svelte News</h2>

		<Separator orientation="vertical" class="h-8" />

		<SiteHeaderLinks />
	</div>

	{#if isAuthenticated}
		<nav>
			<Button href="/profile" variant="link">Profile</Button>
			<form method="post" action="/?/logout" class="contents" use:enhance>
				<Button type="submit" variant="outline">Log Out</Button>
			</form>
		</nav>
	{:else}
		<nav>
			<Button href="/login" variant="link">Log In</Button>
			<Button href="/register" variant="outline">Create New Account</Button>
		</nav>
	{/if}
</header>
