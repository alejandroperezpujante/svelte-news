<script>
	import * as Card from '$lib/components/ui/card';
	import FormattedDate from '$lib/components/FormattedDate.svelte';
	import { Button } from '$lib/components/ui/button';

	export let data;
</script>

<main class="flex-1 container py-6 space-y-8">
	<hgroup class="space-y-2">
		<h1 class="text-3xl font-bold">Most Recent Posts</h1>
		<p class="text-sm text-muted-foreground">Here are the most recent posts from the community.</p>
	</hgroup>

	<ul class="space-y-4">
		{#each data.recentPosts as post}
			<li>
				<Card.Root>
					<Card.Header>
						<Card.Title tag="h4">{post.title}</Card.Title>
						<Card.Description>
							<FormattedDate date={post.createdAt} />
						</Card.Description>
					</Card.Header>

					<Card.Content>
						<p>{post.clampedBody}</p>
					</Card.Content>

					<Card.Footer class="gap-4">
						<Button href={`posts/${post.id}`}>Read More</Button>
						{#if data.user?.id === post.userId}
							<Button href={`posts/${post.id}/edit`}>Edit</Button>
							<Button href={`posts/${post.id}/delete`} variant="destructive">Delete</Button>
						{/if}
					</Card.Footer>
				</Card.Root>
			</li>
		{/each}
	</ul>
</main>
