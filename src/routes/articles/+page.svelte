<script lang="ts">
	export let data;
</script>

<main class="space-y4">
	<h2 class="text-3xl font-bold underline">Recent Articles</h2>
	<ul class="space-y4">
		{#each data.posts as post}
			<li class="border-b border-gray-5 border-dashed">
				<a href="/{post.category}/{post.id}">
					<h2 class="text-lg font-semibold">{post.title}</h2>
				</a>
			</li>
		{/each}
	</ul>
</main>
