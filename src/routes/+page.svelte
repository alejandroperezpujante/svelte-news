<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>News</title>
</svelte:head>

<main class="space-y4">
	<h2 class="text-3xl font-bold underline">News</h2>
	<ul class="space-y4">
		{#each data.news as post}
			<li class="border-b border-gray-5 border-dashed">
				<a href={post.link} rel="external noopener noreferrer" target="_blank">
					<h2 class="text-lg font-semibold">{post.title}</h2>
				</a>

				<div>
					{#if post._count.upvotes > 0}<p class="text-sm text-gray-5">
							Upvotes: {post._count.upvotes}
						</p>{/if}
					{#if post._count.comments > 0}
						<p class="text-sm text-gray-5">Comments: {post._count.comments}</p>
					{:else}
						<a href="/post/{post.id}" class="text-sm text-gray-5">Create thread</a>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</main>
