<script lang="ts">
	import type { Post } from '@prisma/client';

	export let post: Post;
</script>

<li class="border-b border-gray-5 border-dashed">
	{#if post.link}
		<a href={post.link} rel="noopener noreferrer" target="_blank" class="link">
			<h3 class="text-lg font-semibold">{post.title}</h3>
		</a>
	{/if}
</li>
