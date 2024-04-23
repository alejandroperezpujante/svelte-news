<script>
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	const Links = [
		{ text: 'Home', href: '/' },
		{ text: 'Submit', href: '/submit' },
		{ text: 'About', href: '/about' }
	];
</script>

<nav class="flex items-center gap-6">
	{#each Links as { text, href }}
		<a
			{href}
			class={cn(
				'transition-colors hover:text-foreground/80',
				$page.url.pathname === href ? 'text-foreground' : 'text-foreground/60'
			)}>{text}</a
		>
	{/each}
</nav>
