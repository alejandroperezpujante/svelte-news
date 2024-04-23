<script>
	import * as Card from '$lib/components/ui/card';

	export let data;
</script>

<main class="flex-1 container py-6 space-y-8">
	<hgroup class="space-y-2">
		<h1 class="text-3xl font-bold">Most Recent Posts</h1>
		<p class="text-sm text-muted-foreground">Here are the most recent posts from the community.</p>
	</hgroup>

	<Card.Root>
		<Card.Content>
			<ul>
				{#each data.recentPosts as post}
					<li>
						<h2>{post.title}</h2>
						<p>{post.clampedBody}</p>
					</li>
				{/each}
			</ul>
		</Card.Content>
	</Card.Root>
</main>
